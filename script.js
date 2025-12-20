// -------------------------
// 1️⃣ Animated Futuristic City
// -------------------------
const canvas = document.getElementById('cityCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Building {
  constructor(x, y, w, h, color){
    this.x = x; this.y = y; this.w = w; this.h = h; this.color = color;
  }
  draw(){ ctx.fillStyle = this.color; ctx.fillRect(this.x,this.y,this.w,this.h);}
}
let buildings = [];
for(let i=0;i<50;i++){
  const w = Math.random()*50+20;
  const h = Math.random()*200+50;
  const x = Math.random()*canvas.width;
  const y = canvas.height-h;
  const color = `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},255,0.7)`;
  buildings.push(new Building(x,y,w,h,color));
}
function animateCity(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  buildings.forEach(b=>{
    b.x -= 0.5;
    if(b.x + b.w < 0){ b.x = canvas.width; }
    b.draw();
  });
  requestAnimationFrame(animateCity);
}
animateCity();
window.addEventListener('resize',()=>{canvas.width=window.innerWidth; canvas.height=window.innerHeight;});

// -------------------------
// 2️⃣ EmailJS Contact Form + Auto-reply
// -------------------------
(function(){ emailjs.init("YOUR_PUBLIC_KEY"); })();
const form=document.getElementById("contact-form");
const status=document.getElementById("status");
form.addEventListener("submit",function(e){
  e.preventDefault();
  status.textContent="Sending...";
  emailjs.sendForm("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",this)
  .then(()=>{
    status.textContent="Message sent successfully 🚀";
    emailjs.send("YOUR_SERVICE_ID","YOUR_AUTOREPLY_TEMPLATE",{
      name:form.name.value,
      email:form.email.value,
      message:form.message.value
    });
    form.reset();
  },(error)=>{status.textContent="Failed ❌";console.error(error);});
});

// -------------------------
// 3️⃣ Simple Chatbot
// -------------------------
const chatbotToggle=document.getElementById("chatbot-toggle");
const chatbot=document.getElementById("chatbot");
const chatbotInput=document.getElementById("chatbot-input");
const chatbotMessages=document.getElementById("chatbot-messages");
const botResponses={
  "hello":"Hello! Welcome to Future Dream Hub 👋",
  "hi":"Hi there! How can I help you today?",
  "projects":"Check out my Projects section above 🚀",
  "contact":"Use the contact form to reach me 📧",
  "default":"I am here to help! Try asking about Projects or Contact."
};
chatbotToggle.addEventListener("click",()=>{chatbot.style.display=(chatbot.style.display==="flex")?"none":"flex";});
chatbotInput.addEventListener("keypress",(e)=>{
  if(e.key==="Enter"){
    const userMsg=chatbotInput.value.trim();
    if(!userMsg) return;
    const p=document.createElement("p"); p.textContent="You: "+userMsg; chatbotMessages.appendChild(p);
    const response=botResponses[userMsg.toLowerCase()]||botResponses["default"];
    const botP=document.createElement("p"); botP.textContent="Bot: "+response; chatbotMessages.appendChild(botP);
    chatbotInput.value="";
    chatbotMessages.scrollTop=chatbotMessages.scrollHeight;
  }
});
