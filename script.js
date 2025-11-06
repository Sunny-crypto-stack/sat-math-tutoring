// Utilities
const $ = (s, r=document)=>r.querySelector(s);
const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));

// Navbar transparent -> solid
const siteNav = $("#siteNav") || $(".navbar");
function setHeaderState(){
  if(!siteNav) return;
  const solid = window.scrollY > 32;
  siteNav.classList.toggle("opaque", solid);
  siteNav.classList.toggle("transparent", !solid);
}
setHeaderState();
addEventListener("scroll", setHeaderState, {passive:true});

// Mobile nav toggle
const navToggle = $("#navToggle");
const navMenu   = $("#navMenu");
const navDrawer = $("#navDrawer");
function toggleNav(next){
  if(!navToggle) return;
  const open = (next ?? navToggle.getAttribute("aria-expanded")!=="true");
  navToggle.setAttribute("aria-expanded", String(open));
  if(navMenu)   navMenu.style.display   = open ? "flex" : "";
  if(navDrawer) navDrawer.classList.toggle("hidden", !open);
}
if(navToggle){
  navToggle.addEventListener("click", ()=>toggleNav());
  $$("#navDrawer a, #navMenu a").forEach(a=>a.addEventListener("click",()=>toggleNav(false)));
}

// Modal
const modal = $(".consult-modal");
const openModalButtons  = $$("[data-open-modal]");
const closeModalButtons = $$("[data-close-modal]");
let lastFocus = null;

function openModal(){
  if(!modal) return;
  lastFocus = document.activeElement;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  const f = $("input, textarea, button, [href]", modal);
  f && f.focus();
}
function closeModal(){
  if(!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  lastFocus && lastFocus.focus?.();
}
openModalButtons.forEach(b=>b.addEventListener("click", openModal));
closeModalButtons.forEach(b=>b.addEventListener("click", closeModal));
modal && modal.addEventListener("click", (e)=>{ if(e.target===modal) closeModal(); });
addEventListener("keydown", (e)=>{ if(e.key==="Escape") closeModal(); });

// Scroll reveal
const revealEls = [...$$("[data-reveal]"), ...$$(".reveal")];
if("IntersectionObserver" in window){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(({isIntersecting, target})=>{
      target.classList.toggle("visible", isIntersecting);
    });
  }, {rootMargin:"0px 0px -80px 0px", threshold:0.1});
  revealEls.forEach(el=>io.observe(el));
} else {
  const onScroll=()=>{
    revealEls.forEach(el=>{
      const r=el.getBoundingClientRect();
      el.classList.toggle("visible", r.top<innerHeight-80);
    });
  };
  addEventListener("scroll", onScroll, {passive:true});
  addEventListener("load", onScroll);
  onScroll();
}

// Ambient background: slight cursor/scroll response
const ambient = $("#ambient");
function updateAmbient(x=innerWidth/2, y=innerHeight/2){
  if(!ambient) return;
  const tx = (x/innerWidth - .5) * 24;
  const ty = (y/innerHeight - .5) * 24;
  ambient.style.transform = `translate(${tx}px, ${ty}px) rotate(${tx*.3}deg)`;
  const hue = (scrollY / (document.body.scrollHeight - innerHeight)) * 18;
  ambient.style.filter = `hue-rotate(${hue}deg)`;
}
addEventListener("mousemove", (e)=>updateAmbient(e.clientX,e.clientY), {passive:true});
addEventListener("scroll", ()=>updateAmbient(), {passive:true});

// Progress tracker
const prog = $("#progress-tracker");
function setProgress(){
  if(!prog) return;
  const max = document.documentElement.scrollHeight - innerHeight;
  const pct = max>0 ? (scrollY/max)*100 : 0;
  prog.style.width = pct + "%";
}
setProgress();
addEventListener("scroll", setProgress, {passive:true});

// Price localization (reads data-price OR data-usd)
const rates = { USD:1, EUR:.94, GBP:.82, CAD:1.36, AUD:1.56, INR:83, JPY:149 };
function currencyForLocale(){
  const l = navigator.language || "en-US";
  if(l.startsWith("en-GB")) return "GBP";
  if(/^fr|de|es/.test(l))   return "EUR";
  if(l.startsWith("en-CA")) return "CAD";
  if(l.startsWith("en-AU")) return "AUD";
  if(l.startsWith("hi")||l.startsWith("en-IN")) return "INR";
  if(l.startsWith("ja"))    return "JPY";
  return "USD";
}
(function localizePrices(){
  const currency = currencyForLocale();
  const rate     = rates[currency] || 1;
  const nf = new Intl.NumberFormat(navigator.language || "en-US", {
    style:"currency", currency,
    maximumFractionDigits: (currency==="JPY"||currency==="INR") ? 0 : 2
  });
  $$(".price").forEach(el=>{
    const usd = parseFloat(el.getAttribute("data-price") || el.getAttribute("data-usd"));
    if(!isFinite(usd)) return;
    el.textContent = nf.format(usd*rate);
  });
})();

// Footer year
const y = $("#y"); if(y) y.textContent = String(new Date().getFullYear());
