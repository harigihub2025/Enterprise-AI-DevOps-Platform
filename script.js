const button = document.querySelector("button");

button.addEventListener("click", () => {
    document.getElementById("about").scrollIntoView({
        behavior: "smooth"
    });
});

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-15px) scale(1.05)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0px) scale(1)";
    });
});

const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0px)";
        }
    });
});

document.querySelectorAll("section").forEach((section)=>{
    section.style.opacity="0";
    section.style.transform="translateY(60px)";
    section.style.transition="1s";
    observer.observe(section);
});

const heroTitle=document.querySelector(".hero h2");

const colors=[
"#00E5FF",
"#00FF95",
"#FFD600",
"#FF4081",
"#7C4DFF"
];

let i=0;

setInterval(()=>{
heroTitle.style.color=colors[i];
i++;
if(i>=colors.length){
i=0;
}
},1200);

setInterval(()=>{
document.title="🚀 Enterprise AI DevOps Platform";
},1000);


const counters = document.querySelectorAll(".stat-box h1");

const startCounter = () => {

    counters.forEach(counter => {

        const targetText = counter.innerText;

        const target = parseInt(targetText);

        if (isNaN(target)) return;

        let count = 0;

        const speed = Math.ceil(target / 80);

        const update = () => {

            count += speed;

            if (count >= target) {

                counter.innerText = targetText;

            } else {

                counter.innerText = count;

                requestAnimationFrame(update);

            }

        };

        update();

    });

};

const observerCounter = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            startCounter();

            observerCounter.disconnect();

        }

    });

});

observerCounter.observe(document.querySelector(".stats"));

window.onload=function(){

setTimeout(()=>{

document.getElementById("loader").style.display="none";

},1800);

};

const theme=document.getElementById("themeToggle");

theme.onclick=()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

theme.innerHTML="☀";

}else{

theme.innerHTML="🌙";

}

};

const heroText=document.querySelector(".hero h2");

const words=[

"Enterprise AI DevOps Platform",

"Terraform Infrastructure",

"AWS Cloud Automation",

"Docker Containers",

"Kubernetes Orchestration",

"CI/CD with Jenkins"

];

let index=0;

setInterval(()=>{

heroText.innerHTML=words[index];

index++;

if(index>=words.length){

index=0;

}

},2500);


const timeline=document.querySelectorAll(".timeline-box");

const timelineObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0px)";

}

});

});

timeline.forEach(item=>{

item.style.opacity="0";

item.style.transform="translateY(60px)";

item.style.transition="1s";

timelineObserver.observe(item);

});

const dashboardCards=document.querySelectorAll(".dashboard-card");

dashboardCards.forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="scale(1.05)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="scale(1)";

});

});

const footer=document.querySelector(".footer");

const footerObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

footer.style.opacity="1";

footer.style.transform="translateY(0px)";

}

});

});

footer.style.opacity="0";

footer.style.transform="translateY(80px)";

footer.style.transition="1.5s";

footerObserver.observe(footer);

/* ===========================
   Live Date & Time
=========================== */

const clock=document.createElement("div");

clock.style.position="fixed";
clock.style.top="20px";
clock.style.right="20px";
clock.style.background="rgba(0,0,0,.5)";
clock.style.padding="12px 18px";
clock.style.borderRadius="10px";
clock.style.color="#00e5ff";
clock.style.fontWeight="bold";
clock.style.zIndex="9999";

document.body.appendChild(clock);

setInterval(()=>{

const now=new Date();

clock.innerHTML=now.toLocaleString();

},1000);

/* ===========================
   Scroll To Top Button
=========================== */

const topBtn=document.createElement("button");

topBtn.innerHTML="⬆";

topBtn.style.position="fixed";
topBtn.style.bottom="100px";
topBtn.style.right="25px";
topBtn.style.width="55px";
topBtn.style.height="55px";
topBtn.style.borderRadius="50%";
topBtn.style.border="none";
topBtn.style.background="#00e5ff";
topBtn.style.color="#000";
topBtn.style.fontSize="22px";
topBtn.style.cursor="pointer";
topBtn.style.display="none";
topBtn.style.zIndex="9999";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};
