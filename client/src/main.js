/*
  EmpowerLife4U - simple JavaScript frontend
  -------------------------------------------
  This file intentionally uses plain JavaScript instead of React.

  Beginner guide:
  1. Change text, plans, classes, or images in the data arrays near the top.
  2. Change colors, spacing, fonts, and responsive layout in styles.css.
  3. Browser interactions are grouped in attachInteractions().
  4. Contact enquiries are sent through WhatsApp, so this version needs no backend.
*/

import "./styles.css";

// ==============================
// 1. Website content you can edit
// ==============================
const assets = {
  hero: "/assets/hero.svg",
  strength: "/assets/strength.svg",
  conditioning: "/assets/conditioning.svg",
  recovery: "/assets/recovery.svg",
  logo: "/assets/logo.svg",
};

const whatsappGroupUrl = "https://chat.whatsapp.com/CLLyfEEXTnX9Kp9QnkCRkp";
const navItems = ["home", "about", "bmi", "fitness", "nutrition", "reviews", "contact", "membership"];

const programs = [
  { number: "01", title: "Strength Lab", meta: "Barbell · 60 min", slug: "strength-lab", image: assets.strength, description: "Build real-world strength with progressive programming, expert eyes, and a room full of intent." },
  { number: "02", title: "Conditioning", meta: "Intervals · 45 min", slug: "conditioning", image: assets.conditioning, description: "Move faster, recover smarter. High-output sessions that sharpen your engine without burning you out." },
  { number: "03", title: "Reset Room", meta: "Mobility · 30 min", slug: "reset-room", image: assets.recovery, description: "A quieter practice for mobility, breath, and recovery that makes tomorrow possible." },
];

const memberships = [
  { name: "Zumba Workout", price: "1,499", detail: "For the joyful mover", perks: ["12 coached Zumba sessions / month", "Dance-focused conditioning", "Member community access"] },
  { name: "Zumba + Gym", price: "2,499", detail: "For the committed", featured: true, perks: ["Unlimited Zumba sessions", "Gym floor access", "Monthly coach check-in"] },
  { name: "All In", price: "3,999", detail: "For the all-in", perks: ["Unlimited coached sessions", "Personalized training plan", "Priority recovery booking"] },
];

const schedule = [
  ["MON", "14", ["06:15 / Strength Lab", "12:30 / Zumba Workout", "18:00 / Conditioning"]],
  ["TUE", "15", ["07:00 / Reset Room", "17:30 / Zumba + Gym", "19:00 / Strength Lab"]],
  ["WED", "16", ["06:15 / Conditioning", "12:30 / Zumba Workout", "18:30 / All In"]],
  ["THU", "17", ["07:00 / Reset Room", "17:30 / Zumba + Gym", "19:00 / Conditioning"]],
  ["FRI", "18", ["06:15 / Strength Lab", "12:30 / Zumba Workout", "18:00 / All In"]],
  ["SAT", "19", ["08:00 / Zumba Workout", "10:30 / Zumba + Gym", "17:00 / All In"]],
  ["SUN", "20", ["09:00 / Reset Room", "11:00 / Zumba Workout", "16:00 / All In"]],
];

const workoutData = {
  "strength-lab": { title: "Strength Lab", image: assets.strength, meta: "Barbell · 60 min", intro: "A focused barbell session that builds power, control, and confidence one intentional rep at a time." },
  conditioning: { title: "Conditioning", image: assets.conditioning, meta: "Intervals · 45 min", intro: "A high-output interval session designed to sharpen your engine without turning every day into a test." },
  "reset-room": { title: "Reset Room", image: assets.recovery, meta: "Mobility · 30 min", intro: "A slower practice for mobility, breath, and the recovery capacity that keeps your training available." },
};

// ==============================
// 2. Small reusable HTML helpers
// ==============================
const app = document.querySelector("#app");
const select = (query) => document.querySelector(query);
const selectAll = (query) => [...document.querySelectorAll(query)];
const label = (text) => `<span class="label">${text}</span>`;

function whatsappButton(text = "Join the club ↗", className = "nav-join", plan = "") {
  const message = plan ? `?text=${encodeURIComponent(`I am interested in the ${plan} plan.`)}` : "";
  return `<button class="${className} whatsapp-button" data-whatsapp="${message}">${text}</button>`;
}

function sectionLink(text, section, className = "text-link") {
  return `<a class="${className} section-link" href="/#${section}" data-section="${section}">${text}</a>`;
}

// ==============================
// 3. Header and home page markup
// ==============================
function headerHtml() {
  return `<header class="site-header" id="top">
    <a class="brand" href="/#home" aria-label="EmpowerLife4U home"><img class="brand-logo" src="${assets.logo}" alt=""><span class="brand-wordmark">EmpowerLife<b>4U</b></span></a>
    <nav class="nav" id="main-nav" aria-label="Main navigation">
      ${navItems.map((item) => `<a class="section-link" href="/#${item}" data-section="${item}">${item}</a>`).join("")}
      ${whatsappButton()}
    </nav>
    <button class="menu" id="menu-button" aria-label="Open menu" aria-expanded="false">☰</button>
  </header>`;
}

function homePage() {
  return `${headerHtml()}
  <main>
    <section class="hero" id="home"><img src="${assets.hero}" alt="Athletic man performing a dumbbell bicep curl in a dark training room"><div class="hero-shade"></div><div class="hero-content container"><div class="eyebrow reveal">Strength for the life you actually live</div><h1 class="reveal">Build the<br><em>version</em> that<br>shows up.</h1><p class="reveal">Training that meets you where you are — and moves you somewhere better. Expert coaching, an honest room, and a plan you can keep.</p><div class="hero-actions reveal"><button class="button section-button" data-section="membership">Find your membership ↗</button>${sectionLink("Why EmpowerLife4U ↓", "about")}</div><strong class="hero-number">04</strong><div class="hero-footer"><span>EST. 2018 / INDIA</span><span>Scroll to explore ↓</span></div></div></section>
    <section class="stats container"><div class="stat"><strong>07</strong><span>years of<br>showing up</span></div><div class="stat"><strong>24/7</strong><span>access to<br>your practice</span></div><div class="stat"><strong>01</strong><span>room built<br>for real life</span></div><div class="stat"><span>See what makes<br>us different</span><button class="button secondary section-button" data-section="about">Explore ↘</button></div></section>
    <section class="section container about-grid reveal" id="about"><div>${label("About us")}<p class="muted">01 / 08</p></div><div class="about-copy"><p class="eyebrow">You do not need more noise. You need a place to return to.</p><h2>A gym for the<br><em>long game.</em></h2><div class="about-footer"><p class="muted">EmpowerLife4U is a training space for people who care about progress that lasts. We pair serious programming with a human atmosphere so the work feels challenging, clear, and worth coming back to.</p><div class="stamp">Built for<br>becoming</div></div></div></section>
    ${bmiHtml()}
    ${fitnessHtml()}
    ${nutritionHtml()}
    ${scheduleHtml()}
    ${reviewsHtml()}
    ${membershipHtml()}
    ${contactHtml()}
  </main>
  <footer class="footer"><div class="container footer-row"><span>© 2026 EmpowerLife4U</span><span>Train for more than the mirror.</span>${sectionLink("Back to top ↑", "home")}</div></footer>`;
}

function bmiHtml() {
  return `<section class="section container bmi-grid reveal" id="bmi"><div class="bmi-copy"><div class="eyebrow">Personal baseline</div><h2>Know your<br><em>starting point.</em></h2><p class="muted">Use this quick guide as a starting conversation with a coach — not a final verdict.</p></div><div class="bmi-tool"><strong class="eyebrow">Body composition guide</strong><div class="fields"><label>Height<input id="height" type="number" min="80" placeholder="e.g. 175"></label><label>Weight<input id="weight" type="number" min="25" placeholder="e.g. 72"></label></div><div class="bmi-result"><span>Your estimate</span><strong id="bmi-value">—</strong><span class="bmi-category" id="bmi-category">Enter your details</span></div><div class="bmi-range"><strong>Your ideal BMI range</strong><span>18.5–24.9</span><strong>Suggested weight range</strong><span id="weight-range">Enter height to see your range</span></div><p class="disclaimer">For adults, 18.5–24.9 is the standard BMI reference range. BMI is a broad screening measure and does not account for muscle mass, body composition, or individual context.</p><button class="text-link" id="reset-bmi">Reset calculator ↗</button></div></section>`;
}

function fitnessHtml() {
  return `<section class="section container reveal" id="fitness"><div class="heading-row"><div>${label("Fitness floor")}<p class="muted">02 / 08</p></div><div><h2>Choose your<br><em>work.</em></h2><p class="muted">Different goals. Same standard. Find the session that meets your energy.</p></div></div><div class="cards">${programs.map((program) => `<article class="card"><div class="card-media"><img src="${program.image}" alt="${program.title} training session"><div class="card-shade"></div><span class="card-number">${program.number}</span><a class="card-play" href="/workout/${program.slug}" aria-label="Open ${program.title} session">▶</a></div><div class="card-copy"><small>${program.meta}</small><h3>${program.title}</h3><p>${program.description}</p><a class="text-link" href="/workout/${program.slug}">Explore session →</a></div></article>`).join("")}</div></section>`;
}

function nutritionHtml() {
  const cards = [["01", "Build your plate", "Anchor every meal with protein, colorful plants, and a carbohydrate that matches your output."], ["02", "Hydrate early", "Start your day with water and keep a bottle close during training."], ["03", "Keep it repeatable", "The best nutrition plan is the one you can practice on a busy Tuesday."]];
  return `<section class="section nutrition reveal" id="nutrition"><div class="container nutrition-grid"><div>${label("Fuel the work")}<h2>Eat to<br><em>recover.</em></h2><p class="muted">Simple nutrition habits that support the way you train, work, and live.</p></div><div class="nutrition-cards">${cards.map(([number, title, text]) => `<article class="nutrition-card"><strong>${number}</strong><h3>${title}</h3><p>${text}</p></article>`).join("")}</div></div></section>`;
}

function scheduleHtml() {
  return `<section class="section container reveal" id="schedule"><div class="schedule-header"><div>${label("On the floor")}<p class="muted">03 / 08</p></div><div><h2>This week at<br><em>the club.</em></h2><p class="muted">Choose a session below to mark it for your visit.</p></div><button class="button secondary section-button" data-section="membership">View full schedule ↗</button></div><div class="schedule-grid">${schedule.map(([day, date, classes]) => `<div class="day"><div class="day-title"><span>${day}</span><strong>${date}</strong></div>${classes.map((item) => `<button class="class-button" data-class="${item}"><span>${item}</span>↗</button>`).join("")}</div>`).join("")}</div></section>`;
}

function reviewsHtml() {
  return `<section class="section reviews reveal" id="reviews"><div class="container"><div class="heading-row"><div>${label("Member perspective")}<p class="muted">06 / 08</p></div><div><h2>Made for<br><em>the long game.</em></h2><p class="muted">Real progress is personal. This section is ready for approved client stories.</p></div></div><div class="review-feature"><div class="review-symbol">“</div><h3>Real voices<br><em>belong here.</em></h3><p class="muted">These cards are deliberately structured for approved client words, names, and consent details. No invented testimonials are published.</p></div><div class="review-slots">${["01", "02", "03"].map((number) => `<article class="review-slot"><span>${number} / Approval required</span><strong>Client story</strong><p>Add an approved member experience here.</p></article>`).join("")}</div></div></section>`;
}

function membershipHtml() {
  return `<section class="section membership reveal" id="membership"><div class="container"><div class="heading-row"><div>${label("Make it yours")}</div><div><h2>Your next hour<br><em>starts here.</em></h2><p class="muted">Select a plan and continue in the EmpowerLife4U WhatsApp group.</p></div></div><div class="membership-grid">${memberships.map((plan) => `<article class="membership-card ${plan.featured ? "featured" : ""}"><span class="eyebrow">${plan.featured ? "Most chosen" : "Membership"}</span><h3>${plan.name}</h3><p class="muted">${plan.detail}</p><div class="price"><span>₹</span><strong>${plan.price}</strong><small>/ month</small></div><ul>${plan.perks.map((perk) => `<li>✓ ${perk}</li>`).join("")}</ul>${whatsappButton(`Choose ${plan.name} ↗`, "button", plan.name)}</article>`).join("")}</div></div></section>`;
}

function contactHtml() {
  return `<section class="section contact reveal" id="contact"><div class="container contact-grid"><div><div class="eyebrow">Start a conversation</div><h2>Questions?<br><em>We’re here.</em></h2><p class="muted">Tell us what you’re working toward. We’ll help you find the right first session, plan, or next step.</p><div class="contact-details"><span>EmpowerLife4U Training Club<br>India</span><a href="mailto:hello@empowerlife4u.com">hello@empowerlife4u.com</a><span>Open daily / 05:00–23:00</span></div></div><form class="form" id="contact-form"><label>Name<input required name="name" minlength="2" maxlength="120" placeholder="Your name"></label><label>Email<input required type="email" name="email" maxlength="320" placeholder="you@example.com"></label><label>What can we help with?<textarea required name="message" minlength="10" maxlength="5000" rows="4" placeholder="Tell us a little about your goals..."></textarea></label><button class="button" type="submit" id="inquiry-submit">Send inquiry ↗</button><p class="muted" id="inquiry-message" role="status"></p>${whatsappButton("Join the WhatsApp group ↗", "text-link whatsapp")}</form></div></section>`;
}

// ==============================
// 4. Workout and owner pages
// ==============================
function workoutPage(slug) {
  const workout = workoutData[slug] || workoutData["strength-lab"];
  const steps = ["Set your base", "Own the setup", "Move with intent", "Close the loop"];
  return `<header class="site-header scrolled"><a class="brand" href="/#home"><img class="brand-logo" src="${assets.logo}" alt=""><span class="brand-wordmark">EmpowerLife<b>4U</b></span></a>${sectionLink("← Back to fitness", "fitness")}${whatsappButton()}</header><main><section class="container workout-hero"><div><div class="eyebrow">Fitness session</div><h1>${workout.title}</h1><p class="muted">${workout.intro}</p><div class="workout-meta"><span>${workout.meta}</span><span>All levels</span><span>Coach guided</span></div></div><div class="workout-hero-media"><img src="${workout.image}" alt="${workout.title} training session"></div></section><section class="container workout-steps"><div class="eyebrow">Session guide</div><h2>Make every<br><em>rep count.</em></h2>${steps.map((step, index) => `<article class="step"><span class="step-number">0${index + 1}</span><div><h3>${step}</h3><p class="muted">Move through this phase with control. Your coach will adjust the details to meet your body and your day.</p></div><span>✓</span></article>`).join("")}</section><section class="container video-slot"><div class="eyebrow">Coach walkthrough</div><h2>Video coming<br><em>to the floor.</em></h2><p class="muted">This media area is ready for an approved workout demonstration video.</p></section></main><footer class="footer"><div class="container footer-row"><span>EmpowerLife4U / ${workout.title}</span>${sectionLink("Explore another session →", "fitness")}</div></footer>`;
}

// ==============================
// 6. Interactive website behavior
// ==============================
function goToSection(section) {
  const target = document.getElementById(section);
  if (!target) return;
  const headerOffset = document.querySelector(".site-header")?.offsetHeight || 82;
  window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset), behavior: "smooth" });
  history.replaceState(null, "", `/#${section}`);
  document.querySelector("#main-nav")?.classList.remove("open");
  document.querySelector("#menu-button")?.setAttribute("aria-expanded", "false");
}

function updateBmi() {
  const height = Number(select("#height")?.value);
  const weight = Number(select("#weight")?.value);
  if (!select("#bmi-value")) return;
  if (!height || !weight) {
    select("#bmi-value").textContent = "—";
    select("#bmi-category").textContent = "Enter your details";
  } else {
    const bmi = weight / Math.pow(height / 100, 2);
    select("#bmi-value").textContent = bmi.toFixed(1);
    select("#bmi-category").textContent = bmi < 18.5 ? "Below the suggested range" : bmi < 25 ? "Suggested range" : bmi < 30 ? "Above the suggested range" : "High range";
  }
  select("#weight-range").textContent = height ? `${(18.5 * Math.pow(height / 100, 2)).toFixed(1)}–${(24.9 * Math.pow(height / 100, 2)).toFixed(1)} kg` : "Enter height to see your range";
}

function attachInteractions() {
  // Navbar and CTA buttons use data-section, so they are easy to edit in HTML.
  selectAll(".section-link, .section-button").forEach((element) => element.addEventListener("click", (event) => {
    const section = element.dataset.section;
    if (section && window.location.pathname === "/") { event.preventDefault(); goToSection(section); }
  }));

  const menu = select("#main-nav");
  select("#menu-button")?.addEventListener("click", (event) => { const button = event.currentTarget; const isOpen = menu?.classList.toggle("open"); button.setAttribute("aria-expanded", String(Boolean(isOpen))); });
  selectAll(".whatsapp-button").forEach((button) => button.addEventListener("click", () => window.open(`${whatsappGroupUrl}${button.dataset.whatsapp || ""}`, "_blank", "noopener,noreferrer")));
  selectAll("#height, #weight").forEach((input) => input.addEventListener("input", updateBmi));
  select("#reset-bmi")?.addEventListener("click", () => { select("#height").value = ""; select("#weight").value = ""; updateBmi(); });
  selectAll(".class-button").forEach((button) => button.addEventListener("click", () => { selectAll(".class-button").forEach((item) => item.classList.remove("selected")); button.classList.add("selected"); }));
  window.addEventListener("scroll", () => select(".site-header")?.classList.toggle("scrolled", window.scrollY > 25), { passive: true });

  // Reveal animation: elements fade in as they enter the viewport.
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold: 0.12 });
  selectAll(".reveal").forEach((item) => observer.observe(item));

  select("#contact-form")?.addEventListener("submit", submitInquiry);
}

function submitInquiry(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const button = select("#inquiry-submit");
  const message = select("#inquiry-message");
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const inquiry = String(data.get("message") || "").trim();
  const text = encodeURIComponent(`Hi EmpowerLife4U!\n\nName: ${name}\nEmail: ${email}\n\nMessage: ${inquiry}`);
  button.disabled = true;
  button.textContent = "Opening WhatsApp…";
  window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  form.reset();
  message.textContent = "WhatsApp opened with your enquiry ready to send.";
  button.disabled = false;
  button.textContent = "Send inquiry ↗";
}

function start() {
  const path = window.location.pathname;
  app.innerHTML = path.startsWith("/workout/") ? workoutPage(path.split("/")[2]) : homePage();
  attachInteractions();
  if (window.location.hash) setTimeout(() => goToSection(window.location.hash.slice(1)), 80);
}

document.addEventListener("DOMContentLoaded", start);
