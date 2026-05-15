export const speakText = (text) => {

  if (!text) return

  window.speechSynthesis.cancel()

  const speech = new SpeechSynthesisUtterance(text)

  speech.lang = "en-US"

  speech.rate = 1

  speech.pitch = 1

  window.speechSynthesis.speak(speech)
}

export const stopSpeaking = () => {

  window.speechSynthesis.cancel()
}