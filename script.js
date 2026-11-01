const introScreen=document.getElementById('introScreen');
const introVideo=document.getElementById('introVideo');
const mainContent=document.getElementById('mainContent');
const siteHeader=document.getElementById('siteHeader');
const enterButton=document.getElementById('enterButton');
const skipButton=document.getElementById('skipButton');
const progress=document.getElementById('videoProgress');
let entered=false;
function enterPortfolio(){if(entered)return;entered=true;introScreen.classList.add('done');mainContent.classList.remove('is-hidden');siteHeader.style.position='fixed';document.body.style.overflow='';setTimeout(()=>{introScreen.style.display='none';},1100);}
function attemptPlay(){const p=introVideo.play();if(p&&p.catch)p.catch(()=>{});}
enterButton.addEventListener('click',enterPortfolio);skipButton.addEventListener('click',enterPortfolio);introVideo.addEventListener('ended',enterPortfolio);introVideo.addEventListener('timeupdate',()=>{if(introVideo.duration)progress.style.width=(introVideo.currentTime/introVideo.duration*100)+'%';});window.addEventListener('load',attemptPlay);document.body.style.overflow='hidden';
// The calendar flips through the five creative hats.
const roles=['AI VIDEO PRODUCER','UI DESIGNER','AI GRAPHICS DESIGNER','CONTENT PLANNER','ENERGY HOUSE'];
let roleIndex=0;const calendarWord=document.getElementById('calendarWord');const calendarCount=document.getElementById('calendarCount');
setInterval(()=>{if(!entered)return;calendarWord.classList.remove('flip-in');calendarWord.classList.add('flip-out');setTimeout(()=>{roleIndex=(roleIndex+1)%roles.length;calendarWord.textContent=roles[roleIndex];calendarCount.textContent=String(roleIndex+1).padStart(2,'0')+' / 05';calendarWord.classList.remove('flip-out');calendarWord.classList.add('flip-in');},330);},2600);
// Bhopal local clock.
function updateClock(){document.getElementById('localClock').textContent=new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date());}
updateClock();setInterval(updateClock,1000);document.getElementById('yearNow').textContent=new Date().getFullYear();
// Timeline active year follows the scroll position.
const timelineItems=[...document.querySelectorAll('.timeline-item')];const bigYear=document.getElementById('bigYear');const counter=document.getElementById('timelineCounter');const trackFill=document.getElementById('trackFill');
const timelineObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){const index=timelineItems.indexOf(entry.target);timelineItems.forEach((item,i)=>item.classList.toggle('active',i===index));bigYear.textContent=entry.target.dataset.year;counter.innerHTML=String(index+1).padStart(2,'0')+' <span>/ 05</span>';trackFill.style.height=(index/(timelineItems.length-1)*100)+'%';}});},{rootMargin:'-38% 0px -45% 0px',threshold:0});timelineItems.forEach(item=>timelineObserver.observe(item));
// Door destinations: first room is populated; the other three are deliberately kept as future placeholders.
const roomData={
 experience:{kicker:'ROOM 01 / THE WORK SO FAR',title:'Experience &<br><em>the toolkit.</em>',lead:'From May to August 2026, I worked at Scalyn Pvt. Ltd. as a Social Media Manager and AI Graphics Designer. That chapter gave me hands-on experience creating social content, developing visual ideas and contributing to a brand’s digital presence. I have since moved on and am exploring new creative opportunities.',body:`<div class="experience-grid"><article class="experience-card"><span class="tiny-label">01 / MAY — AUGUST 2026</span><h3>Scalyn Pvt. Ltd.</h3><p><strong>Social Media Manager & AI Graphics Designer</strong></p><p>Worked with a private limited company, contributing to social media and AI-assisted visual content. This chapter helped me build practical creative experience, work with a team and understand how ideas translate into a brand’s digital presence.</p><p class="experience-status">PAST EXPERIENCE <span>／</span> OPEN TO WHAT'S NEXT</p></article><article class="experience-card"><span class="tiny-label">02 / CREATIVE TOOLKIT</span><h3>Tools I work with</h3><p>A flexible toolkit for creating, editing, designing, planning and bringing ideas to life.</p><div class="tool-list"><span>Canva</span><span>Filmora</span><span>Premiere Pro</span><span>ChatGPT</span><span>Google Flow</span><span>Higgsfield</span><span>Claude</span></div></article></div>`},
 archive:{kicker:'ROOM 02 / VISUAL ARCHIVE',title:'A space for<br><em>visual experiments.</em>',lead:'The work will live here — designs, edits, AI films, campaigns and everything in between.',body:`<div class="placeholder-room"><span class="tiny-label">UNDER CONSTRUCTION</span><p>This room is intentionally being kept empty for now. We'll curate the visual archive together and build it into a collection that feels like you.</p><div class="placeholder-mark">COMING<br>INTO FOCUS.</div></div>`},
 clients:{kicker:'ROOM 03 / COLLABORATIONS',title:'Good work is<br><em>never solo.</em>',lead:"A room dedicated to the people, brands and teams I've had the chance to work with.",body:`<div class="placeholder-room"><span class="tiny-label">CLIENT WALL / RESERVED</span><p>This room is intentionally blank. We'll add your client logos, names and collaborations when you're ready.</p><div class="placeholder-mark">THE PEOPLE<br>BEHIND THE WORK.</div></div>`},
 opportunity:{kicker:'ROOM 04 / THE NEXT CHAPTER',title:'The biggest<br><em>opportunity.</em>',lead:'Some opportunities are too exciting to describe before they happen.',body:`<div class="placeholder-room"><span class="tiny-label">A PLACE FOR WHAT'S NEXT</span><p>This room is reserved for your biggest opportunity. We'll reveal it when the time is right.</p><div class="placeholder-mark">TO BE<br>CONTINUED.</div></div>`}
};
const overlay=document.getElementById('doorOverlay');const roomContent=document.getElementById('roomContent');
function openRoom(key){const room=roomData[key];roomContent.innerHTML=`<p class="room-kicker">${room.kicker}</p><h2>${room.title}</h2><p class="room-lead">${room.lead}</p>${room.body}`;overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';}
function closeRoom(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');document.body.style.overflow='';}
document.querySelectorAll('.door-card').forEach(card=>card.addEventListener('click',()=>openRoom(card.dataset.door)));document.getElementById('overlayClose').addEventListener('click',closeRoom);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeRoom();});

// Ash Bot: lightweight, local FAQ assistant powered by portfolio information.
const ashBotPanel=document.getElementById('ashBotPanel');
const ashBotLaunch=document.getElementById('ashBotLaunch');
const ashBotClose=document.getElementById('ashBotClose');
const ashBotMessages=document.getElementById('ashBotMessages');
const ashBotForm=document.getElementById('ashBotForm');
const ashBotText=document.getElementById('ashBotText');
function toggleAshBot(open){ashBotPanel.classList.toggle('visible',open);ashBotPanel.setAttribute('aria-hidden',String(!open));ashBotLaunch.setAttribute('aria-expanded',String(open));if(open)ashBotText.focus();}
ashBotLaunch.addEventListener('click',()=>toggleAshBot(!ashBotPanel.classList.contains('visible')));
ashBotClose.addEventListener('click',()=>toggleAshBot(false));
function addBotMessage(text,kind){const node=document.createElement('div');node.className=kind==='user'?'user-message':'bot-message';node.textContent=text;ashBotMessages.appendChild(node);ashBotMessages.scrollTop=ashBotMessages.scrollHeight;}
function ashBotReply(raw){const q=raw.toLowerCase();
 if(/\b(hi|hello|hey|hii|namaste)\b/.test(q))return "Hey! 👋 I'm Ash Bot. I can tell you about Ashish's work, experience, creative tools and contact details. What would you like to know?";
 if(/who is ashish|about ashish|tell me about ashish|who are you/.test(q))return "Ashish is a Bhopal-based creative professional interested in AI video production, UI design, AI graphics, content planning and creative marketing.";
 if(/what (does|do) ashish do|services|offer|speciali[sz]|work on/.test(q))return "Ashish works across AI video production, UI design, AI graphics design and content planning. He's interested in turning ideas into engaging visual and digital experiences.";
 if(/experience|scalyn|worked|job|company/.test(q))return "Ashish worked at Scalyn Pvt. Ltd. from May to August 2026 as a Social Media Manager and AI Graphics Designer. He's no longer working there and is exploring new creative opportunities.";
 if(/tool|software|canva|filmora|premiere|chatgpt|flow|higgsfield|claude/.test(q))return "His creative toolkit includes Canva, Filmora, Adobe Premiere Pro, ChatGPT, Google Flow, Higgsfield and Claude.";
 if(/project|portfolio|visual|archive|client|brand/.test(q))return "The visual archive and client rooms are being curated and will be updated with selected work. You can use the Contact section to ask Ashish about a specific project or collaboration.";
 if(/location|where|based|city/.test(q))return "Ashish is based in Bhopal, India.";
 if(/contact|email|mail|reach|phone|number/.test(q))return "You can email Ashish at ashish.sagu2007@gmail.com, or use the message form in the Contact section. The phone number will be added later.";
 if(/hire|available|freelance|collaborat|opportunity/.test(q))return "Ashish is open to exploring new creative opportunities and collaborations. Share your idea through the Contact form and it will be sent to his inbox.";
 if(/education|jee|school|board|study|college/.test(q))return "Ashish completed Class 10 at SPS with 92% in 2023, scored 82% in Class 12 boards in 2025 and appeared for JEE. He's currently pursuing his college journey while building his creative path.";
 return "I don't have that detail in my portfolio notes yet. You can send your question directly to Ashish using the message form below in the Contact section, or email ashish.sagu2007@gmail.com.";
}
function askAshBot(question){const value=question.trim();if(!value)return;addBotMessage(value,'user');ashBotText.value='';setTimeout(()=>addBotMessage(ashBotReply(value),'bot'),220);}
ashBotForm.addEventListener('submit',e=>{e.preventDefault();askAshBot(ashBotText.value);});
document.querySelectorAll('.ashbot-suggestions button').forEach(button=>button.addEventListener('click',()=>askAshBot(button.dataset.question)));

// Contact form sends messages through the portfolio's Node.js mail endpoint.
const contactForm=document.getElementById('contactForm');
const contactStatus=document.getElementById('contactStatus');
const contactSubmit=document.getElementById('contactSubmit');
contactForm.addEventListener('submit',async e=>{e.preventDefault();contactStatus.textContent='Sending your message…';contactSubmit.disabled=true;
 try{const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:contactForm.email.value.trim(),message:contactForm.message.value.trim()})});const data=await response.json();if(!response.ok)throw new Error(data.error||'Unable to send your message right now.');contactStatus.textContent='Message sent — thank you! Ashish will get back to you.';contactForm.reset();}
 catch(error){contactStatus.textContent=error.message.includes('Email delivery is not configured')?'Email delivery needs SMTP setup. You can email Ashish directly at ashish.sagu2007@gmail.com.':'Could not send right now. Please email ashish.sagu2007@gmail.com instead.';}
 finally{contactSubmit.disabled=false;}
});
