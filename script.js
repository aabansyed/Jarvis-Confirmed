const chatBox = document.getElementById("chat");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");

function addMessage(sender, text) {
    const div = document.createElement("div");
    div.innerHTML = `<b>${sender}:</b> ${text}`;
    chatBox.appendChild(div);
}

sendBtn.addEventListener("click", () => {
    const text = userInput.value.trim();
    if (text) {
        addMessage("You", text);
        sendToJarvis(text);
        userInput.value = "";
    }
});

function sendToJarvis(command) {
    fetch("http://localhost:3000/command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command })
    })
    .then(res => res.json())
    .then(data => {
        addMessage("Jarvis", data.reply);
        speak(data.reply);
    })
    .catch(err => addMessage("Error", err.message));
}

// Voice input
voiceBtn.addEventListener("click", () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function(event) {
        const text = event.results[0][0].transcript;
        addMessage("You", text);
        sendToJarvis(text);
    };
});

function speak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}
