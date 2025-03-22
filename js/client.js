

const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:8000"
  : "https://chat-app-backend-mjk4.onrender.com";

const socket = io("https://chat-app-backend-mjk4.onrender.com");
const form = document.getElementById("sendmsg_r");
const inputmsg = document.getElementById("inputbox1");
const msgcont = document.querySelector(".container");
var audio = new Audio("hey.mp3");

const append = (message, position) => {
  const messageelement = document.createElement("div");
  messageelement.innerText = message;
  messageelement.classList.add("messge");
  messageelement.classList.add(position);
  msgcont.append(messageelement);
  if(position == "left"){
    audio.play();
  }
};

form.addEventListener("submit",(e)=>{
  e.preventDefault();
  const sms =inputmsg.value;
  append(`${sms}`,'right');
  socket.emit("write",sms);
  inputmsg.value="";
})

const names = prompt("enter your name");

socket.emit("new-userjoined", names);

socket.on("user-joined", name => {
  append(`${name} joined the chat`, "right");
});

socket.on("recieve", data => {
  append(`${data.name}:${data.message}`, "left");
});

socket.on("leave", name => {
  append(`${name}:left the chat`, "right");
});
