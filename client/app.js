const form = document.getElementById("guestbook-form");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const messagesContainer = document.getElementById("messages");

async function getMessages() {
  try {
    const response = await fetch("http://localhost:8080/messages");
    const messages = await response.json();

    messagesContainer.innerHTML = "";
    messages.forEach((msg) => {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message");
      messageDiv.innerHTML = `<strong>${msg.name}</strong>: ${msg.message}`;
      messagesContainer.appendChild(messageDiv);
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const message = messageInput.value;

  const newMessage = { name, message };

  try {
    const response = await fetch("http://localhost:8080/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage),
    });

    if (response.ok) {
      getMessages();
      form.reset();
    }
  } catch (error) {
    console.error("Error submitting message:", error);
  }
});

getMessages();
