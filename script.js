
const memories=[
  {emoji:'🌅',title:'The Mornings',text:'Every morning you woke up before everyone else — to make my tiffin, the tea and paratha was ready, and we started our day right. You never asked for credit. You just loved us through the routine.'},
  {emoji:'🍱',title:'The Food of Home',text:'No restaurant in the world can replicate your cooking. It is not just the taste — it is the care and love embedded in every dish. When we eat your food, we feel held.'},
  {emoji:'🎊',title:'Every Celebration',text:'You turned ordinary days into something beautiful. Birthdays, festivals, small victories — you always made sure we felt celebrated. You are the reason our happiest memories feel so full.'},
  {emoji:'🌙',title:'The Late Nights',text:'How many nights did you lie awake, quietly making sure we were okay? We may have been asleep — but we always felt safe, because you were watching over us.'},
  {emoji:'🌸',title:'Your Garden of Kindness',text:'You have given so much to so many — often without anyone asking. The kindness you have planted in others will bloom for generations. That is your legacy, Mama.'},
  {emoji:'😂',title:'That Laugh',text:'When you laugh — really laugh — everything is right with the world. Your joy is contagious, your smile is a gift, and your laugh is the soundtrack of our best memories.'}
];

let currentSlide=0;
const totalSlides=5;

function buildDots(){
  document.querySelectorAll('.slide-dots').forEach(container=>{
    container.innerHTML='';
    for(let i=0;i<totalSlides;i++){
      const d=document.createElement('div');
      d.className='dot'+(i===currentSlide?' active':'');
      const idx=i;
      d.onclick=()=>goToSlide(idx);
      container.appendChild(d);
    }
  });
}

function goToSlide(n){
  document.getElementById('slide-'+currentSlide).classList.remove('active');
  currentSlide=n;
  document.getElementById('slide-'+currentSlide).classList.add('active');
  buildDots();
  document.querySelector('.story-page').scrollIntoView({behavior:'smooth',block:'start'});
}

function changeSlide(dir){
  const next=currentSlide+dir;
  if(next>=0&&next<totalSlides)goToSlide(next);
}

function openSecret(idx){
  const panel=document.getElementById('secret-'+idx);
  if(panel){
    panel.classList.toggle('open');
    if(panel.classList.contains('open'))launchConfetti();
  }
}

function showPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav button').forEach(b=>b.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  const idx=['home','notes','memories','story'].indexOf(name);
  document.querySelectorAll('.nav button')[idx].classList.add('active');
  if(name==='story')buildDots();
}

document.querySelectorAll('.nav button').forEach((btn,i)=>{
  btn.addEventListener('click',()=>showPage(['home','notes','memories','story'][i]));
});

function revealSecret(el){
  const msg=el.querySelector('.secret-message');
  if(msg){
    msg.classList.toggle('revealed');
    if(msg.classList.contains('revealed')){
      el.querySelector('h3').textContent='💗 With all the love in the world';
      launchConfetti();
    }
  }
}

function openMemory(i){
  const m=memories[i];
  document.getElementById('popup-emoji').textContent=m.emoji;
  document.getElementById('popup-title').textContent=m.title;
  document.getElementById('popup-text').textContent=m.text;
  document.getElementById('popup').classList.add('open');
}

function closePopup(e){if(e.target.id==='popup')document.getElementById('popup').classList.remove('open');}

function launchConfetti(){
  const colors=['#e8a0b0','#f5c4a1','#9bbd9b','#d4a853','#c0697e','#fdf0f3'];
  for(let i=0;i<55;i++){
    setTimeout(()=>{
      const c=document.createElement('div');
      c.className='confetti-piece';
      c.style.left=Math.random()*100+'vw';
      c.style.background=colors[Math.floor(Math.random()*colors.length)];
      c.style.animationDuration=(2+Math.random()*2)+'s';
      c.style.animationDelay=(Math.random()*.5)+'s';
      c.style.borderRadius=Math.random()>.5?'50%':'2px';
      document.body.appendChild(c);
      setTimeout(()=>c.remove(),4000);
    },i*28);
  }
}

// Petals
const petalsEl=document.getElementById('petals');
['🌸','🌺','🌼','✿','❀'].forEach(e=>{
  for(let j=0;j<3;j++){
    const p=document.createElement('div');
    p.className='petal';p.textContent=e;
    p.style.left=(Math.random()*100)+'%';
    p.style.fontSize=(14+Math.random()*14)+'px';
    p.style.animationDuration=(9+Math.random()*10)+'s';
    p.style.animationDelay=(Math.random()*12)+'s';
    petalsEl.appendChild(p);
  }
});

// Countdown
function updateCountdown(){
  const now=new Date();
  let bday=new Date(now.getFullYear(),4,5,0,0,0);
  if(now>=bday)bday=new Date(now.getFullYear()+1,4,5,0,0,0);
  const diff=bday-now;
  document.getElementById('cd-d').textContent=Math.floor(diff/86400000);
  document.getElementById('cd-h').textContent=Math.floor((diff%86400000)/3600000);
  document.getElementById('cd-m').textContent=Math.floor((diff%3600000)/60000);
  document.getElementById('cd-s').textContent=Math.floor((diff%60000)/1000);
  if(now.getMonth()===4&&now.getDate()===5){
    document.getElementById('countdown').innerHTML='<div style="font-family:Playfair Display,serif;font-size:20px;color:var(--rose-deep);">🎂 Today is the Day! Happy Birthday, Mama! 🎂</div>';
  }
}
setInterval(updateCountdown,1000);
updateCountdown();
buildDots();

