/*
  EmpowerLife4U - simple JavaScript frontend
  -------------------------------------------
  This file intentionally uses plain JavaScript instead of React.

  Beginner guide:
  1. Change text, plans, classes, or images in the data arrays near the top.
  2. Change colors, spacing, fonts, and responsive layout in styles.css.
  3. Browser interactions are grouped in attachInteractions().
  4. Contact enquiries are sent through WhatsApp, so this version needs no backend.
  5. No Node.js / npm / build step: just open index.html in a browser.
*/

// ======================================
// 1. Website content you can edit
// ======================================
const assets = {
  hero: "assets/hero.jpg",
  strength: "assets/strength.jpg",
  conditioning: "assets/conditioning.jpg",
  recovery: "assets/recovery.jpg",
  logo: "assets/logo.webp",
};

const whatsappGroupUrl = "https://chat.whatsapp.com/CLLyfEEXTnX9Kp9QnkCRkp";
const navItems = [
  "home",
  "about",
  "bmi",
  "fitness",
  "nutrition",
  "reviews",
  "contact",
  "membership",
];

const programs = [
  {
    number: "01",
    title: "Strength Lab",
    meta: "Barbell · 60 min",
    slug: "strength-lab",
    image: assets.strength,
    description: "Build real-world strength with progressive programming, expert eyes, and enough structure to keep your effort honest.",
  },
  {
    number: "02",
    title: "Conditioning",
    meta: "Intervals · 45 min",
    slug: "conditioning",
    image: assets.conditioning,
    description: "Move faster, recover smarter. High-output sessions that sharpen your engine without turning every day into chaos.",
  },
  {
    number: "03",
    title: "Reset Room",
    meta: "Mobility · 30 min",
    slug: "reset-room",
    image: assets.recovery,
    description: "A quieter practice for mobility, breath, and recovery that makes tomorrow possible.",
  },
];

const memberships = [
  {
    name: "Zumba Workout",
    price: "1,499",
    detail: "For the joyful mover",
    perks: [
      "12 coached Zumba sessions / month",
      "Dance-focused conditioning",
      "Member community access",
    ],
  },
  {
    name: "Zumba + Gym",
    price: "2,499",
    detail: "For the committed",
    featured: true,
    perks: [
      "Unlimited Zumba sessions",
      "Gym floor access",
      "Monthly coach check-in",
    ],
  },
  {
    name: "All In",
    price: "3,999",
    detail: "For the all-in",
    perks: [
      "Unlimited coached sessions",
      "Personalized training plan",
      "Priority recovery booking",
    ],
  },
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
  "strength-lab": {
    title: "Strength Lab",
    image: assets.strength,
    meta: "Barbell · 60 min",
    intro: "A focused barbell session that builds power, control, and confidence one intentional rep at a time.",
  },
  conditioning: {
    title: "Conditioning",
    image: assets.conditioning,
    meta: "Intervals · 45 min",
    intro: "A high-output interval session designed to sharpen your engine without turning every day into chaos.",
  },
  "reset-room": {
    title: "Reset Room",
    image: assets.recovery,
    meta: "Mobility · 30 min",
    intro: "A slower practice for mobility, breath, and the recovery capacity that keeps your training available.",
  },
};

// ======================================
// 2. Small reusable HTML helpers
// ======================================
const app = document.querySelector("#app");
const select = (query) => document.querySelector(query);
const selectAll = (query) => [...document.querySelectorAll(query)];
const label = (text) => `<span class="label">${text}</span>`;

function whatsappButton(text = "Join the club ↗", className = "nav-join", plan = "") {
  const message = plan ? `?text=${encodeURIComponent(`I am interested in the ${plan} plan.`)}` : "";
  return `<button class="${className} whatsapp-button" data-whatsapp="${message}">${text}</button>`;
}

function sectionLink(text, section, className = "text-link") {
  return `<a class="${className} section-link" href="#${section}" data-section="${section}">${text}</a>`;
}

// ======================================
// 3. Header and home page markup
// ======================================
function headerHtml() {
  return `<header class="site-header" id="top">
    <a class="brand" href="#home" aria-label="EmpowerLife4U home">
      <img class="brand-logo" src="${assets.logo}" alt="">
      <span class="brand-wordmark">EmpowerLife<b>4U</b></span>
    </a>
    <nav class="nav" id="main-nav" aria-label="Main navigation">
      ${navItems.map((item) => `<a class="section-link" href="#${item}" data-section="${item}">${item}</a>`).join("")}
      ${whatsappButton()}
    </nav>
    <button class="menu" id="menu-button" aria-label="Open menu" aria-expanded="false">☰</button>
  </header>`;
}

function homePage() {
  return `${headerHtml()}
    <main>
      <section class="hero" id="home">
        <img src="${assets.hero}" alt="Athletic man performing a dumbbell bicep curl in a dark training room">
        <div class="hero-shade"></div>
        <div class="hero-content container">
          <div class="eyebrow">Train with purpose</div>
          <h1>Strong habits.<br>Sharper focus.</h1>
          <p>EmpowerLife4U is built for people who want structured training, smarter recovery, and a community that keeps them honest.</p>
          <div class="hero-actions">
            ${sectionLink("Book your first session", "contact", "button")}
            ${sectionLink("See the plan", "membership", "button secondary")}
          </div>
        </div>
        <div class="hero-footer container">
          <span>Small groups · expert coaching</span>
          <span>Low noise · high output</span>
        </div>
      </section>

      <section class="stats container reveal">
        <div class="stat"><strong>07</strong><span>years of<br>showing up</span></div>
        <div class="stat"><strong>24/7</strong><span>access to<br>your practice</span></div>
        <div class="stat"><strong>1.2k</strong><span>sessions<br>completed</span></div>
        <div class="stat"><strong>92%</strong><span>member<br>retention</span></div>
      </section>

      <section class="section container about-grid reveal" id="about">
        <div>
          ${label("About us")}
          <p class="muted">01 / 08</p>
        </div>
        <div class="about-copy">
          <p class="eyebrow">You do not need more noise. You need a system.</p>
          <h2>Build strength,<br>not chaos.</h2>
          <p>We help busy people make steady progress through smart coaching, high-quality programming, and a training model that respects recovery as much as effort.</p>
          <div class="about-footer">
            <p>Structured movement. Real accountability. A stronger version of you.</p>
            <div class="stamp">Coach<br>led</div>
          </div>
        </div>
      </section>

      ${bmiHtml()}
      ${fitnessHtml()}
      ${nutritionHtml()}
      ${scheduleHtml()}
      ${reviewsHtml()}
      ${membershipHtml()}
      ${contactHtml()}
    </main>

    <footer class="footer">
      <div class="container footer-row">
        <span>© 2026 EmpowerLife4U</span>
        <span>Train for more than the mirror.</span>
        ${sectionLink("Back to top ↑", "home")}
      </div>
    </footer>`;
}

function bmiHtml() {
  return `<section class="section container bmi-grid reveal" id="bmi">
    <div class="bmi-copy">
      <div class="eyebrow">Personal baseline</div>
      <h2>Know your<br><em>starting point.</em></h2>
      <p class="muted">Use this quick BMI check to understand where your body sits today and use it as a reference for progress.</p>
    </div>
    <div class="bmi-tools">
      <div class="fields">
        <label>
          Height (cm)
          <input id="height" type="number" min="120" max="220" placeholder="170">
        </label>
        <label>
          Weight (kg)
          <input id="weight" type="number" min="30" max="200" placeholder="68">
        </label>
      </div>
      <div class="bmi-result">
        <strong>BMI</strong>
        <span id="bmi-value">—</span>
      </div>
      <div class="bmi-result">
        <strong>Range</strong>
        <span id="bmi-category">Enter your details</span>
      </div>
      <div class="bmi-range">
        <strong>Suggested range</strong>
        <span id="weight-range">Enter height to see your range</span>
      </div>
    </div>
  </section>`;
}

function fitnessHtml() {
  const cards = programs.map((program) => `
    <article class="card">
      <div class="card-media">
        <img src="${program.image}" alt="${program.title}">
        <div class="card-shade"></div>
        <div class="card-number">${program.number}</div>
        <a class="card-play" href="#/workout/${program.slug}">▶</a>
      </div>
      <div class="card-copy">
        <small>${program.meta}</small>
        <h3>${program.title}</h3>
        <p>${program.description}</p>
      </div>
    </article>
  `).join("");

  return `<section class="section container reveal" id="fitness">
    <div class="heading-row">
      <div>
        ${label("Fitness floor")}
        <p class="muted">02 / 08</p>
      </div>
      <div>
        <h2>Choose your<br><em>work.</em></h2>
        <p class="muted">Every program is built to be coached, clear, and repeatable.</p>
      </div>
    </div>
    <div class="cards">${cards}</div>
  </section>`;
}

function nutritionHtml() {
  const cards = [
    ["01", "Build your plate", "Anchor every meal with protein, colorful plants, and a carbohydrate that matches your output."],
    ["02", "Hydrate early", "Start your day with water and keep a steady rhythm through the training window."],
    ["03", "Recover with intent", "Use a post-session meal, quality sleep, and structured downtime to keep adapting."],
  ];

  return `<section class="section nutrition reveal" id="nutrition">
    <div class="container nutrition-grid">
      <div>
        ${label("Fuel the work")}
        <h2>Eat to<br><em>recover.</em></h2>
        <p class="muted">Simple nutrition that supports effort, not perfection.</p>
      </div>
      <div class="nutrition-cards">
        ${cards.map(([number, title, description]) => `
          <article class="nutrition-card">
            <strong>${number}</strong>
            <h3>${title}</h3>
            <p>${description}</p>
          </article>
        `).join("")}
      </div>
    </div>
  </section>`;
}

function scheduleHtml() {
  return `<section class="section container reveal" id="schedule">
    <div class="schedule-header">
      <div>
        ${label("On the floor")}
        <p class="muted">03 / 08</p>
      </div>
      <div>
        <h2>This week at<br><em>the club.</em></h2>
      </div>
      <a class="button secondary" href="#contact">Book a session</a>
    </div>

    <div class="schedule-grid">
      ${schedule.map(([day, date, sessions]) => `
        <div class="day">
          <div class="day-title">
            <span>${day}</span>
            <strong>${date}</strong>
          </div>
          ${sessions.map((session) => `
            <button class="class-button" type="button">
              <span>${session}</span>
            </button>
          `).join("")}
        </div>
      `).join("")}
    </div>
  </section>`;
}

function reviewsHtml() {
  return `<section class="section reviews reveal" id="reviews">
    <div class="container">
      <div class="heading-row">
        <div>
          ${label("Member perspective")}
          <p class="muted">06 / 08</p>
        </div>
        <div>
          <h2>Made for<br><em>real life.</em></h2>
        </div>
      </div>

      <div class="review-feature">
        <div class="review-symbol">“</div>
        <h3>“I finally found a place where the plan is clear, the coaching is personal, and I actually enjoy showing up.”</h3>
        <p class="muted">— Priya, member</p>
      </div>

      <div class="review-slots">
        <article class="review-slot">
          <span>Consistency</span>
          <strong>4.9/5</strong>
          <p>Members report stronger routines and better follow-through within the first month.</p>
        </article>
        <article class="review-slot">
          <span>Energy</span>
          <strong>+31%</strong>
          <p>Participants feel more physically capable and mentally clear across the week.</p>
        </article>
        <article class="review-slot">
          <span>Recovery</span>
          <strong>Better</strong>
          <p>Structured movement and mobility create room for sustainable progress.</p>
        </article>
      </div>
    </div>
  </section>`;
}

function membershipHtml() {
  const plans = memberships.map((plan) => `
    <article class="membership-card ${plan.featured ? "featured" : ""}">
      <small>${plan.detail}</small>
      <h3>${plan.name}</h3>
      <div class="price">
        <span>₹</span>
        <strong>${plan.price}</strong>
      </div>
      <ul>
        ${plan.perks.map((perk) => `<li>• ${perk}</li>`).join("")}
      </ul>
      ${whatsappButton("Join plan ↗", "button", plan.name)}
    </article>
  `).join("");

  return `<section class="section membership reveal" id="membership">
    <div class="container">
      <div class="heading-row">
        <div>${label("Make it yours")}</div>
        <div>
          <h2>Your next hour<br><em>starts here.</em></h2>
        </div>
      </div>

      <div class="membership-grid">
        ${plans}
      </div>
    </div>
  </section>`;
}

function contactHtml() {
  return `<section class="section contact reveal" id="contact">
    <div class="container contact-grid">
      <div>
        <div class="eyebrow">Start a conversation</div>
        <h2>Questions?<br><em>We’re here.</em></h2>
        <p class="muted">Tell us what you want to improve and we’ll point you toward the right plan, class, or coaching route.</p>

        <div class="contact-details">
          <span>📍 Koramangala, Bengaluru</span>
          <span>📞 +91 98765 43210</span>
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">WhatsApp us</a>
        </div>
      </div>

      <form class="form" id="contact-form">
        <label>
          Name
          <input name="name" type="text" placeholder="Your name" required>
        </label>
        <label>
          Email
          <input name="email" type="email" placeholder="you@example.com" required>
        </label>
        <label>
          Message
          <textarea name="message" placeholder="Tell us what you're looking for" required></textarea>
        </label>
        <button class="button" id="inquiry-submit" type="submit">Send inquiry ↗</button>
        <p id="inquiry-message" class="muted"></p>
      </form>
    </div>
  </section>`;
}

// ======================================
// 4. Workout and owner pages
// ======================================
function workoutPage(slug) {
  const workout = workoutData[slug] || workoutData["strength-lab"];
  const steps = [
    { title: "Set your base", text: "Pick the right load and slow the first reps down so your form supports the movement." },
    { title: "Own the setup", text: "Brace the torso, align the joints, and make the target muscles clear before you drive the effort." },
    { title: "Move with intent", text: "Work through a controlled range with smooth tempo and a deliberate breath pattern." },
    { title: "Close the loop", text: "Finish with a short reset, note what felt strong, and carry that clarity into the next session." },
  ];

  return `
    <header class="site-header scrolled">
      <a class="brand" href="#home">
        <img class="brand-logo" src="${assets.logo}" alt="">
        <span class="brand-wordmark">EmpowerLife<b>4U</b></span>
      </a>
      <nav class="nav" id="main-nav" aria-label="Main navigation">
        <a class="section-link" href="#home" data-section="home">home</a>
        ${whatsappButton()}
      </nav>
    </header>

    <main class="container workout-hero reveal">
      <div>
        <div class="eyebrow">Workout detail</div>
        <h1>${workout.title}</h1>
        <p class="muted">${workout.intro}</p>
        <div class="workout-meta">
          <span>${workout.meta}</span>
          <span>40–60 mins</span>
          <span>Beginner friendly</span>
          <span>Coach guided</span>
        </div>
      </div>

      <div class="workout-hero-media">
        <img src="${workout.image}" alt="${workout.title}">
      </div>
    </main>

    <section class="section container workout-steps reveal">
      <div class="heading-row">
        <div>${label("Session flow")}</div>
        <div>
          <h2>How the block<br><em>works.</em></h2>
        </div>
      </div>

      <div class="steps">
        ${steps.map((step, index) => `
          <article class="step">
            <div class="step-number">0${index + 1}</div>
            <h3>${step.title}</h3>
            <p>${step.text}</p>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="section container reveal">
      <div class="video-slot">
        <div class="eyebrow">Coach note</div>
        <h2>Keep the effort honest.<br><em>Finish strong.</em></h2>
        <p class="muted">The best sessions are repeatable, not random. Stay consistent, track your output, and let recovery do its job.</p>
      </div>
    </section>
  `;
}

// ======================================
// 5. Interactive website behavior
// ======================================
function goToSection(section) {
  const target = document.getElementById(section);
  if (!target) return;

  const headerOffset = document.querySelector(".site-header")?.offsetHeight || 82;
  window.scrollTo({
    top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset),
    behavior: "smooth",
  });

  history.replaceState(null, "", `#${section}`);
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
    select("#bmi-category").textContent = bmi < 18.5
      ? "Below the suggested range"
      : bmi < 25
        ? "Suggested range"
        : bmi < 30
          ? "Above the suggested range"
          : "High range";
  }

  select("#weight-range").textContent = height
    ? `${(18.5 * Math.pow(height / 100, 2)).toFixed(1)}–${(24.9 * Math.pow(height / 100, 2)).toFixed(1)} kg`
    : "Enter height to see your range";
}

function attachInteractions() {
  // Navbar and CTA buttons use data-section, so they are easy to edit in HTML.
  selectAll(".section-link, .section-button").forEach((element) => {
    element.addEventListener("click", (event) => {
      const section = element.dataset.section;
      if (section && !isWorkoutRoute()) {
        event.preventDefault();
        goToSection(section);
      }
    });
  });

  const menu = select("#main-nav");
  select("#menu-button")?.addEventListener("click", (event) => {
    const button = event.currentTarget;
    const isOpen = menu?.classList.toggle("open");
    button.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });

  selectAll(".whatsapp-button").forEach((button) => {
    button.addEventListener("click", () => {
      window.open(`${whatsappGroupUrl}${button.dataset.whatsapp || ""}`, "_blank", "noopener,noreferrer");
    });
  });

  selectAll("#height, #weight").forEach((input) => {
    input.addEventListener("input", updateBmi);
  });

  select("#reset-bmi")?.addEventListener("click", () => {
    select("#height").value = "";
    select("#weight").value = "";
    updateBmi();
  });

  selectAll(".class-button").forEach((button) => {
    button.addEventListener("click", () => {
      selectAll(".class-button").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
    });
  });

  // Reveal animation: elements fade in as they enter the viewport.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

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

// ======================================
// 6. Routing (hash based, so index.html works when opened directly)
//    #home, #about, ...      -> home page, scrolled to that section
//    #/workout/strength-lab  -> workout detail page
// ======================================
let currentView = null; // "home" or "workout:<slug>"

function isWorkoutRoute() {
  return window.location.hash.startsWith("#/workout/");
}

function route() {
  const hash = window.location.hash;
  const view = isWorkoutRoute() ? `workout:${hash.split("/")[2] || ""}` : "home";

  // Already showing the home page: just scroll, don't rebuild it (keeps BMI inputs etc.)
  if (view === "home" && currentView === "home") {
    if (hash.length > 1) {
      goToSection(hash.slice(1));
    }
    return;
  }

  currentView = view;
  app.innerHTML = view === "home" ? homePage() : workoutPage(view.split(":")[1]);
  attachInteractions();
  select(".site-header")?.classList.toggle("scrolled", view !== "home" || window.scrollY > 25);

  if (view === "home" && hash.length > 1) {
    setTimeout(() => goToSection(hash.slice(1)), 80);
  } else {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}

function start() {
  window.addEventListener("scroll", () => {
    select(".site-header")?.classList.toggle("scrolled", window.scrollY > 25);
  }, { passive: true });

  window.addEventListener("hashchange", route);
  route();
}

document.addEventListener("DOMContentLoaded", start);
