from fastapi import FastAPI, UploadFile, File, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from groq import Groq
from PyPDF2 import PdfReader
from youtube_transcript_api import YouTubeTranscriptApi
from dotenv import load_dotenv

from database import engine, SessionLocal, Base
from models.user import User

from auth.password_handler import (
    hash_password,
    verify_password
)

from auth.jwt_handler import (
    create_access_token
)

from schemas.auth_schema import UserAuth

import tempfile
import os
import re

# =========================
# LOAD ENV
# =========================

load_dotenv()

# =========================
# DATABASE
# =========================

Base.metadata.create_all(bind=engine)

# =========================
# FASTAPI APP
# =========================

app = FastAPI()

# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# DATABASE SESSION
# =========================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

# =========================
# GROQ CLIENT
# =========================

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# =========================
# PDF STORAGE
# =========================

combined_pdf_text = ""
uploaded_filenames = []

# =========================
# HOME ROUTE
# =========================

@app.get("/")
def home():

    return {
        "message": "EduMate Backend Running Successfully"
    }

# =========================
# REGISTER
# =========================

@app.post("/register")
def register(
    data: UserAuth,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == data.email
    ).first()

    if existing_user:

        return {
            "message": "Email already exists"
        }

    new_user = User(
        email=data.email,
        password=hash_password(
            data.password
        )
    )

    db.add(new_user)

    db.commit()

    return {
        "message": "User registered successfully"
    }

# =========================
# LOGIN
# =========================

@app.post("/login")
def login(
    data: UserAuth,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:

        return {
            "message": "Invalid email"
        }

    if not verify_password(
        data.password,
        user.password
    ):

        return {
            "message": "Invalid password"
        }

    token = create_access_token(
        {
            "sub": user.email
        }
    )

    return {
        "access_token": token
    }

# =========================
# UPLOAD PDF
# =========================

@app.post("/upload-pdf")
async def upload_pdf(
    file: UploadFile = File(...)
):

    global combined_pdf_text
    global uploaded_filenames

    try:

        # CLEAR OLD PDFs
        combined_pdf_text = ""
        uploaded_filenames.clear()

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf"
        ) as temp_file:

            temp_file.write(
                await file.read()
            )

            temp_path = temp_file.name

        reader = PdfReader(temp_path)

        extracted_text = ""

        for page in reader.pages:

            text = page.extract_text()

            if text:
                extracted_text += text

        combined_pdf_text = f"""

PDF NAME: {file.filename}

{extracted_text[:12000]}

"""

        uploaded_filenames.append(
            file.filename
        )

        return {
            "message": "PDF uploaded successfully",
            "filename": file.filename,
            "total_pdfs": len(uploaded_filenames)
        }

    except Exception as e:

        return {
            "message": f"Error uploading PDF: {str(e)}"
        }

# =========================
# GET PDF LIST
# =========================

@app.get("/pdfs")
def get_pdfs():

    global uploaded_filenames

    return {
        "pdfs": uploaded_filenames
    }

# =========================
# DELETE PDF
# =========================

@app.delete("/delete-pdf/{filename}")
def delete_pdf(filename: str):

    global uploaded_filenames
    global combined_pdf_text

    uploaded_filenames = [
        pdf for pdf in uploaded_filenames
        if pdf != filename
    ]

    combined_pdf_text = ""

    return {
        "message": f"{filename} deleted successfully"
    }

# =========================
# ASK AI ABOUT PDFs
# =========================

@app.post("/ask")
async def ask_pdf(question: str):

    global combined_pdf_text

    try:

        if not combined_pdf_text:

            return {
                "answer": "Please upload a PDF first."
            }

        prompt = f"""
You are an AI study assistant.

Study Material:
{combined_pdf_text[:8000]}

User Question:
{question}

Give a clear and detailed answer.
"""

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        answer = response.choices[0].message.content

        return {
            "answer": answer
        }

    except Exception as e:

        return {
            "answer": f"Error: {str(e)}"
        }

# =========================
# GENERATE QUIZ
# =========================

@app.get("/generate-quiz")
async def generate_quiz():

    global combined_pdf_text

    try:

        if not combined_pdf_text:

            return {
                "quiz": "Please upload a PDF first."
            }

        prompt = f"""
Generate exactly 5 multiple choice quiz questions from the uploaded PDF.

IMPORTANT RULES:
- DO NOT write introductions
- DO NOT write headings
- DO NOT write explanations outside format
- DO NOT write 'Here are 5 questions'
- DO NOT write any extra text
- ONLY return questions in the exact format below

FORMAT:

Q1:
Question text

A) option
B) option
C) option
D) option

Answer: A
Explanation: explanation

Q2:
Question text

A) option
B) option
C) option
D) option

Answer: B
Explanation: explanation

CONTENT:
{combined_pdf_text[:8000]}
"""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2
        )

        quiz = response.choices[0].message.content.strip()

        return {
            "quiz": quiz
        }

    except Exception as e:

        return {
            "quiz": f"Error generating quiz: {str(e)}"
        }

# =========================
# GENERATE FLASHCARDS
# =========================

@app.get("/generate-flashcards")
async def generate_flashcards():

    global combined_pdf_text

    try:

        if not combined_pdf_text:

            return {
                "flashcards": []
            }

        prompt = f"""
Create 10 flashcards from uploaded PDF.

FORMAT:

Question: ...
Answer: ...

CONTENT:
{combined_pdf_text[:8000]}
"""

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        result = response.choices[0].message.content

        flashcards = []

        pattern = r"Question:\s*(.*?)\s*Answer:\s*(.*?)(?=Question:|$)"

        matches = re.findall(
            pattern,
            result,
            re.DOTALL
        )

        for question, answer in matches:

            flashcards.append({
                "question": question.strip(),
                "answer": answer.strip()
            })

        return {
            "flashcards": flashcards
        }

    except Exception as e:

        return {
            "flashcards": [],
            "error": str(e)
        }

# =========================
# AI ROADMAP GENERATOR
# =========================

@app.post("/generate-roadmap")
async def generate_roadmap(data: dict):

    try:

        topic = data.get("topic")

        prompt = f"""
Create a complete learning roadmap for:
{topic}

Include:

1. Beginner Level
2. Intermediate Level
3. Advanced Level
4. Resources
5. Career Opportunities

Keep it structured and easy to read.
"""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.5
        )

        roadmap = response.choices[0].message.content

        return {
            "roadmap": roadmap
        }

    except Exception as e:

        return {
            "roadmap": f"Error: {str(e)}"
        }

# =========================
# AI STUDY PLANNER
# =========================

@app.post("/generate-study-plan")
async def generate_study_plan(data: dict):

    try:

        goal = data.get("goal")
        hours = data.get("hours")
        level = data.get("level")

        prompt = f"""
You are an expert AI study planner.

Create a personalized study schedule.

Goal:
{goal}

Study Hours Per Day:
{hours}

Skill Level:
{level}

Include:

1. Daily Schedule
2. Topics to Study
3. Practice Tasks
4. Revision Strategy
5. Weekly Goals
6. Productivity Tips

Keep it clean and motivating.
"""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.5
        )

        study_plan = response.choices[0].message.content

        return {
            "study_plan": study_plan
        }

    except Exception as e:

        return {
            "study_plan": f"Error: {str(e)}"
        }

# =========================
# YOUTUBE SUMMARY
# =========================

from youtube_transcript_api import YouTubeTranscriptApi

@app.post("/youtube-summary")
async def youtube_summary(data: dict):

    try:

        youtube_url = data.get("url")

        video_id = ""

        # =========================
        # EXTRACT VIDEO ID
        # =========================

        if "v=" in youtube_url:

            video_id = youtube_url.split("v=")[1].split("&")[0]

        elif "youtu.be/" in youtube_url:

            video_id = youtube_url.split("youtu.be/")[1]
            video_id = video_id.split("?")[0]
            video_id = video_id.split("&")[0]

        else:

            return {
                "summary": "Invalid YouTube URL"
            }

        # =========================
        # FETCH TRANSCRIPT
        # =========================

        transcript_api = YouTubeTranscriptApi()

        fetched_transcript = transcript_api.fetch(video_id)

        transcript = " ".join(
            [snippet.text for snippet in fetched_transcript]
        )

        # =========================
        # AI SUMMARY
        # =========================

        prompt = f"""
Summarize this YouTube lecture clearly in simple points.

Transcript:
{transcript[:5000]}
"""

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        summary = response.choices[0].message.content

        return {
            "summary": summary
        }

    except Exception as e:

        return {
            "summary": f"Error: {str(e)}"
        }