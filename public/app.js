const form = document.querySelector("form");
const messageInput = document.getElementById("message");
const messageBtn = document.getElementById("message-btn");
const chat = document.getElementById("chat");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
if ( messageInput.value == '' ) return ;
const input =  messageInput.value ;
messageInput.value = '' ;
console.log(input);

chat.innerHTML = chat.innerHTML + '<div class="sender"><span class="sender-message-tail"><img src="./images/message-tail-sender.svg"></span>' +
'<span class="sender-message">' + input  + '</span>' +
'<span class="message-time">' + getdate() + '</span>' +
'<span class="message-status"><img src="./images/double-check-seen.svg"></span>' +
'</div>' ;

  messageBtn.disabled = true;

  try {
    const res = await fetch("https://ai.kol.tel/api/flowise", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input}),
    });

    const data = await res.json();

chat.innerHTML = chat.innerHTML + '<div class="receiver">' +
'<span class="receiver-message-tail"><img src="./images/message-tail-receiver.svg"></span>' +
'<span class="receiver-message">' + data.message + '</span>' +
'<span class="message-time">' + getdate() + '</span>' +
'</div>' ;

  } catch (error) {
    alert(error.message);
  } finally {
    messageBtn.disabled = false;
  }
});

function getdate() {
var d = new Date,
    dformat = [d.getHours(),
               d.getMinutes()].join(':');
return dformat ;
}
