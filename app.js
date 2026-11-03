const screens = [
  ["01 · Welcome — SkillUp.png","Welcome","Getting started"],
  ["02 · Get started — SkillUp.png","Get started","Getting started"],
  ["03 · Create account with email — SkillUp.png","Create account","Getting started"],
  ["04 · Create a password — SkillUp.png","Create a password","Getting started"],
  ["05 · Create a password · ready — SkillUp.png","Password ready","Getting started"],
  ["06 · Tell us about yourself — SkillUp.png","About you","Build your profile"],
  ["07 · Choose your role — SkillUp.png","Choose your role","Build your profile"],
  ["08 · Profile details complete — SkillUp.png","Profile complete","Build your profile"],
  ["09 · Learning goal · choose state — SkillUp.png","Choose a learning goal","Your learning plan"],
  ["10 · Your learning goals — SkillUp.png","Your learning goals","Your learning plan"],
  ["11 · Interests · choose state — SkillUp.png","Choose interests","Your learning plan"],
  ["12 · Choose your interests — SkillUp.png","Your interests","Your learning plan"],
  ["13 · Set a learning reminder — SkillUp.png","Set a reminder","Your learning plan"],
  ["14 · Choose a reminder time — SkillUp.png","Choose a reminder time","Your learning plan"],
  ["15 · Reminder set for 10 AM — SkillUp.png","Reminder set","Your learning plan"],
  ["16 · Subscription plans — SkillUp.png","Subscription plans","Getting started"],
  ["17 · Subscription processing — SkillUp.png","Setting up your plan","Getting started"],
  ["18 · Personalizing your experience — SkillUp.png","Personalizing SkillUp","Getting started"],
  ["19 · Choose your first course — SkillUp.png","Choose your first course","Discover and learn"],
  ["20 · Recommended courses — SkillUp.png","Recommended courses","Discover and learn"],
  ["21 · Beginner courses — SkillUp.png","Beginner courses","Discover and learn"],
  ["22 · Intermediate courses — SkillUp.png","Intermediate courses","Discover and learn"],
  ["23 · Advanced courses — SkillUp.png","Advanced courses","Discover and learn"],
  ["24 · Home — SkillUp.png","Home","Your learning"],
  ["25 · Lesson — What is UX design_ — SkillUp.png","Lesson: What is UX design?","Learn and practice"],
  ["26 · Level 1 test — SkillUp.png","Level 1 test","Learn and practice"],
  ["27 · Exercise library — SkillUp.png","Exercise library","Learn and practice"],
  ["28 · Explore courses — SkillUp.png","Explore courses","Discover and learn"],
  ["29 · Quartz league — SkillUp.png","Quartz league","Your learning"],
  ["30 · Saved lessons — SkillUp.png","Saved lessons","Your learning"],
  ["31 · Profile — SkillUp.png","Profile","Your account"],
  ["32 · Settings — SkillUp.png","Settings","Your account"]
].map(([file,title,group],index) => ({file,title,group,index}));

const groupDescriptions = {
  "Getting started":"A friendly welcome and simple steps to get your SkillUp journey underway.",
  "Build your profile":"Add a little context so your learning experience feels like yours.",
  "Your learning plan":"Choose your goals, interests, and a rhythm that works for you.",
  "Discover and learn":"Find a course that matches your goals and current skill level.",
  "Your learning":"See your learning path, milestones, and recent progress together.",
  "Learn and practice":"Build understanding through short lessons, checks, and exercises.",
  "Your account":"Keep your profile and app preferences in one simple place."
};

const screenList = document.querySelector("#screenList");
const galleryGrid = document.querySelector("#galleryGrid");
const screenSearch = document.querySelector("#screenSearch");
const image = document.querySelector("#screenImage");
let current = 23;

function selectScreen(index,options={}) {
  current=(index+screens.length)%screens.length;
  const screen=screens[current];
  image.src=encodeURIComponent(screen.file);
  image.alt=`SkillUp ${screen.title} screen`;
  document.querySelector("#currentCategory").textContent=screen.group.toUpperCase();
  document.querySelector("#screenTitle").textContent=screen.title;
  document.querySelector("#screenDescription").textContent=groupDescriptions[screen.group];
  document.querySelector("#screenEyebrow").textContent=screen.group.toUpperCase();
  document.querySelector("#screenCount").textContent=`${String(current+1).padStart(2,"0")} / ${String(screens.length).padStart(2,"0")}`;
  document.querySelector("#stageIndex").textContent=String(current+1).padStart(2,"0");
  document.querySelectorAll(".screen-option").forEach(button=>{
    const active=Number(button.dataset.index)===current;
    button.classList.toggle("active",active);
    if(active)button.setAttribute("aria-current","step");else button.removeAttribute("aria-current");
  });
  document.querySelectorAll(".gallery-card").forEach(button=>button.classList.toggle("active",Number(button.dataset.index)===current));
  if(options.scroll)document.querySelector("#prototype").scrollIntoView({behavior:"smooth",block:"start"});
}

function buildScreenList(query="") {
  screenList.replaceChildren();
  let previousGroup="";
  const term=query.trim().toLowerCase();
  screens.forEach((screen,index)=>{
    if(term&&!`${screen.title} ${screen.group}`.toLowerCase().includes(term))return;
    if(screen.group!==previousGroup){
      const heading=document.createElement("span");
      heading.className="screen-group";
      heading.textContent=screen.group.toUpperCase();
      screenList.append(heading);
      previousGroup=screen.group;
    }
    const button=document.createElement("button");
    button.type="button";
    button.className="screen-option";
    button.dataset.index=index;
    button.innerHTML=`<span class="screen-number">${String(index+1).padStart(2,"0")}</span><span>${screen.title}</span>`;
    button.addEventListener("click",()=>selectScreen(index));
    screenList.append(button);
  });
  if(term&&!screenList.children.length){const empty=document.createElement("p");empty.className="empty-search";empty.textContent="No matching screens";screenList.append(empty);}
  selectScreen(current);
}

function buildGallery(){
  galleryGrid.replaceChildren();
  screens.forEach((screen,index)=>{
    const button=document.createElement("button");
    button.type="button";
    button.className="gallery-card";
    button.dataset.index=index;
    button.setAttribute("aria-label",`Preview ${screen.title}`);
    button.innerHTML=`<span class="gallery-thumb"><img src="${encodeURIComponent(screen.file)}" alt="" loading="lazy"></span><strong>${screen.title}</strong><small>${screen.group}</small>`;
    button.addEventListener("click",()=>selectScreen(index,{scroll:true}));
    galleryGrid.append(button);
  });
}

screenSearch.addEventListener("input",event=>buildScreenList(event.target.value));
document.querySelector("#prevScreen").addEventListener("click",()=>selectScreen(current-1));
document.querySelector("#nextScreen").addEventListener("click",()=>selectScreen(current+1));
document.addEventListener("keydown",event=>{
  if(event.target.matches("input,textarea")||document.querySelector("#screenDialog").open)return;
  if(event.key==="ArrowLeft")selectScreen(current-1);
  if(event.key==="ArrowRight")selectScreen(current+1);
});

const dialog=document.querySelector("#screenDialog");
document.querySelector("#expandScreen").addEventListener("click",()=>{
  document.querySelector("#dialogImage").src=image.src;
  document.querySelector("#dialogImage").alt=image.alt;
  dialog.showModal();
});
document.querySelector("#closeDialog").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});

buildGallery();
buildScreenList();
