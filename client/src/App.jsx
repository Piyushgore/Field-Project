/* EmpowerLife4U — readable React JSX
   This file keeps the existing design and behavior in small components.
*/
import { useEffect, useMemo, useState } from "react";
import "./styles.css";
import { trpc } from "./lib/trpc";

const assets = {
  hero: "/manus-storage/empowerlife4u-hero-male-biceps_a0a22a2c.png",
  strength: "/manus-storage/empowerlife4u-strength-alt_f847df11.jpg",
  conditioning: "/manus-storage/empowerlife4u-conditioning-ref_3ccff4ff.jpg",
  recovery: "/manus-storage/empowerlife4u-recovery-ref_c3fa99d5.jpg",
  logo: "/manus-storage/empowerlife4u-professional-mark_1f0e0bdc.png",
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

function Label({ children }) { return <span className="label">{children}</span>; }
function WhatsAppButton({ children = "Join the club ↗", className = "nav-join", plan }) {
  return <button className={className} onClick={() => window.open(`${whatsappGroupUrl}${plan ? `?text=${encodeURIComponent(`I am interested in the ${plan} plan.`)}` : ""}`, "_blank", "noopener,noreferrer")}>{children}</button>;
}
function ScrollButton({ target, children, className = "button" }) { return <button className={className} onClick={() => document.querySelector(target)?.scrollIntoView({ behavior: "smooth" })}>{children}</button>; }
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(window.scrollY > 25);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 25); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  const navigateToSection = (event, item) => {
    event.preventDefault();
    setMenuOpen(false);
    const target = `#${item}`;
    if (window.location.pathname !== "/") {
      window.location.href = `/${target}`;
      return;
    }
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `/${target}`);
  };
  return <header className={`site-header ${scrolled ? "scrolled" : ""}`} id="top">
    <a className="brand" href="/#home" aria-label="EmpowerLife4U home"><img className="brand-logo" src={assets.logo} alt="" /><span className="brand-wordmark">EmpowerLife<b>4U</b></span></a>
    <nav className={`nav ${menuOpen ? "open" : ""}`} id="main-nav" aria-label="Main navigation">
      {navItems.map((item) => <a key={item} href={`/#${item}`} onClick={(event) => navigateToSection(event, item)}>{item}</a>)}
      <a className="owner-nav" href="/owner/inquiries" onClick={() => setMenuOpen(false)}>OWNER LOGIN</a>
      <WhatsAppButton />
    </nav>
    <button className="menu" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>☰</button>
  </header>;
}
function Reveal({ children, className = "", ...props }) { const [visible, setVisible] = useState(false); const ref = (node) => { if (!node || visible) return; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.12 }); observer.observe(node); }; return <div ref={ref} {...props} className={`${className} reveal ${visible ? "visible" : ""}`}>{children}</div>; }
function Home() {
  return <>
    <Header />
    <main>
      <section className="hero" id="home"><img src={assets.hero} alt="Athletic man performing a dumbbell bicep curl in a dark training room" /><div className="hero-shade" /><div className="hero-content container"><Reveal className="eyebrow">Strength for the life you actually live</Reveal><Reveal><h1>Build the<br /><em>version</em> that<br />shows up.</h1></Reveal><Reveal><p>Training that meets you where you are — and moves you somewhere better. Expert coaching, an honest room, and a plan you can keep.</p></Reveal><Reveal className="hero-actions"><ScrollButton target="#membership">Find your membership ↗</ScrollButton><a className="text-link" href="#about">Why EmpowerLife4U ↓</a></Reveal><strong className="hero-number">04</strong><div className="hero-footer"><span>EST. 2018 / INDIA</span><span>Scroll to explore ↓</span></div></div></section>
      <section className="stats container"><div className="stat"><strong>07</strong><span>years of<br />showing up</span></div><div className="stat"><strong>24/7</strong><span>access to<br />your practice</span></div><div className="stat"><strong>01</strong><span>room built<br />for real life</span></div><div className="stat"><span>See what makes<br />us different</span><ScrollButton target="#about" className="button secondary">Explore ↘</ScrollButton></div></section>
      <Reveal className="section container about-grid" id="about"><div><Label>About us</Label><p className="muted">01 / 08</p></div><div className="about-copy"><p className="eyebrow">You do not need more noise. You need a place to return to.</p><h2>A gym for the<br /><em>long game.</em></h2><div className="about-footer"><p className="muted">EmpowerLife4U is a training space for people who care about progress that lasts. We pair serious programming with a human atmosphere so the work feels challenging, clear, and worth coming back to.</p><div className="stamp">Built for<br />becoming</div></div></div></Reveal>
      <BmiSection />
      <FitnessSection />
      <NutritionSection />
      <ScheduleSection />
      <ReviewsSection />
      <MembershipSection />
      <ContactSection />
    </main>
    <footer className="footer"><div className="container footer-row"><span>© 2026 EmpowerLife4U</span><span>Train for more than the mirror.</span><a href="/#home">Back to top ↑</a></div></footer>
  </>;
}
function BmiSection() {
  const [height, setHeight] = useState(""); const [weight, setWeight] = useState("");
  const bmi = height && weight ? (Number(weight) / Math.pow(Number(height) / 100, 2)).toFixed(1) : "—";
  const hasHeight = Number(height) > 0;
  const healthyWeightRange = hasHeight ? `${(18.5 * Math.pow(Number(height) / 100, 2)).toFixed(1)}–${(24.9 * Math.pow(Number(height) / 100, 2)).toFixed(1)} kg` : "Enter height to see your range";
  const category = bmi === "—" ? "Enter your details" : Number(bmi) < 18.5 ? "Below the suggested range" : Number(bmi) < 25 ? "Suggested range" : Number(bmi) < 30 ? "Above the suggested range" : "High range";
  const reset = () => { setHeight(""); setWeight(""); };
  return <Reveal className="section container bmi-grid" id="bmi"><div className="bmi-copy"><div className="eyebrow">Personal baseline</div><h2>Know your<br /><em>starting point.</em></h2><p className="muted">Use this quick guide as a starting conversation with a coach — not a final verdict.</p></div><div className="bmi-tool"><strong className="eyebrow">Body composition guide</strong><div className="fields"><label>Height<input type="number" min="80" value={height} onChange={(event) => setHeight(event.target.value)} placeholder="e.g. 175" /></label><label>Weight<input type="number" min="25" value={weight} onChange={(event) => setWeight(event.target.value)} placeholder="e.g. 72" /></label></div><div className="bmi-result"><span>Your estimate</span><strong>{bmi}</strong><span className="bmi-category">{category}</span></div><div className="bmi-range"><strong>Your ideal BMI range</strong><span>18.5–24.9</span><strong>Suggested weight range</strong><span>{healthyWeightRange}</span></div><p className="disclaimer">For adults, 18.5–24.9 is the standard BMI reference range. BMI is a broad screening measure and does not account for muscle mass, body composition, or individual context.</p><button className="text-link" onClick={reset}>Reset calculator ↗</button></div></Reveal>;
}
function FitnessSection() { return <Reveal className="section container" id="fitness"><div className="heading-row"><div><Label>Fitness floor</Label><p className="muted">02 / 08</p></div><div><h2>Choose your<br /><em>work.</em></h2><p className="muted">Different goals. Same standard. Find the session that meets your energy.</p></div></div><div className="cards">{programs.map((program) => <article className="card" key={program.slug}><div className="card-media"><img src={program.image} alt={`${program.title} training session`} /><div className="card-shade" /><span className="card-number">{program.number}</span><a className="card-play" href={`/workout/${program.slug}`} aria-label={`Open ${program.title} session`}>▶</a></div><div className="card-copy"><small>{program.meta}</small><h3>{program.title}</h3><p>{program.description}</p><a className="text-link" href={`/workout/${program.slug}`}>Explore session →</a></div></article>)}</div></Reveal>; }
function NutritionSection() { return <Reveal className="section nutrition" id="nutrition"><div className="container nutrition-grid"><div><Label>Fuel the work</Label><h2>Eat to<br /><em>recover.</em></h2><p className="muted">Simple nutrition habits that support the way you train, work, and live.</p></div><div className="nutrition-cards"><article className="nutrition-card"><strong>01</strong><h3>Build your plate</h3><p>Anchor every meal with protein, colorful plants, and a carbohydrate that matches your output.</p></article><article className="nutrition-card"><strong>02</strong><h3>Hydrate early</h3><p>Start your day with water and keep a bottle close during training.</p></article><article className="nutrition-card"><strong>03</strong><h3>Keep it repeatable</h3><p>The best nutrition plan is the one you can practice on a busy Tuesday.</p></article></div></div></Reveal>; }
function ScheduleSection() { const [selected, setSelected] = useState(""); return <Reveal className="section container" id="schedule"><div className="schedule-header"><div><Label>On the floor</Label><p className="muted">03 / 08</p></div><div><h2>This week at<br /><em>the club.</em></h2><p className="muted">Choose a session below to mark it for your visit.</p></div><ScrollButton target="#membership" className="button secondary">View full schedule ↗</ScrollButton></div><div className="schedule-grid">{schedule.map(([day, date, classes]) => <div className="day" key={day}><div className="day-title"><span>{day}</span><strong>{date}</strong></div>{classes.map((item) => <button className={`class-button ${selected === item ? "selected" : ""}`} aria-pressed={selected === item} key={item} onClick={() => setSelected(item)}><span>{item}</span>↗</button>)}</div>)}</div></Reveal>; }
function ReviewsSection() { return <Reveal className="section reviews" id="reviews"><div className="container"><div className="heading-row"><div><Label>Member perspective</Label><p className="muted">06 / 08</p></div><div><h2>Made for<br /><em>the long game.</em></h2><p className="muted">Real progress is personal. This section is ready for approved client stories.</p></div></div><div className="review-feature"><div className="review-symbol">“</div><h3>Real voices<br /><em>belong here.</em></h3><p className="muted">These cards are deliberately structured for approved client words, names, and consent details. No invented testimonials are published.</p></div><div className="review-slots">{["01", "02", "03"].map((number) => <article className="review-slot" key={number}><span>{number} / Approval required</span><strong>Client story</strong><p>Add an approved member experience here.</p></article>)}</div></div></Reveal>; }
function MembershipSection() { return <Reveal className="section membership" id="membership"><div className="container"><div className="heading-row"><div><Label>Make it yours</Label></div><div><h2>Your next hour<br /><em>starts here.</em></h2><p className="muted">Select a plan and continue in the EmpowerLife4U WhatsApp group.</p></div></div><div className="membership-grid">{memberships.map((plan) => <article className={`membership-card ${plan.featured ? "featured" : ""}`} key={plan.name}><span className="eyebrow">{plan.featured ? "Most chosen" : "Membership"}</span><h3>{plan.name}</h3><p className="muted">{plan.detail}</p><div className="price"><span>₹</span><strong>{plan.price}</strong><small>/ month</small></div><ul>{plan.perks.map((perk) => <li key={perk}>✓ {perk}</li>)}</ul><WhatsAppButton className="button" plan={plan.name}>Choose {plan.name} ↗</WhatsAppButton></article>)}</div></div></Reveal>; }
function ContactSection() { const submitInquiry = trpc.inquiries.create.useMutation(); const [formMessage, setFormMessage] = useState(""); const submit = async (event) => { event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); setFormMessage(""); try { await submitInquiry.mutateAsync({ name: String(data.get("name") || ""), email: String(data.get("email") || ""), message: String(data.get("message") || "") }); form.reset(); setFormMessage("Thanks — your inquiry has been received."); } catch (error) { setFormMessage("We could not save your inquiry. Please try again or join us on WhatsApp."); } }; return <Reveal className="section contact" id="contact"><div className="container contact-grid"><div><div className="eyebrow">Start a conversation</div><h2>Questions?<br /><em>We’re here.</em></h2><p className="muted">Tell us what you’re working toward. We’ll help you find the right first session, plan, or next step.</p><div className="contact-details"><span>EmpowerLife4U Training Club<br />India</span><a href="mailto:hello@empowerlife4u.com">hello@empowerlife4u.com</a><span>Open daily / 05:00–23:00</span></div></div><form className="form" onSubmit={submit}><label>Name<input required name="name" minLength="2" maxLength="120" placeholder="Your name" /></label><label>Email<input required type="email" name="email" maxLength="320" placeholder="you@example.com" /></label><label>What can we help with?<textarea required name="message" minLength="10" maxLength="5000" rows="4" placeholder="Tell us a little about your goals..." /></label><button className="button" type="submit" disabled={submitInquiry.isPending}>{submitInquiry.isPending ? "Saving inquiry…" : "Send inquiry ↗"}</button>{formMessage && <p className="muted" role="status">{formMessage}</p>}<WhatsAppButton className="text-link whatsapp">Join the WhatsApp group ↗</WhatsAppButton></form></div></Reveal>; }
function WorkoutPage({ slug }) { const workout = workoutData[slug] || workoutData["strength-lab"]; const steps = ["Set your base", "Own the setup", "Move with intent", "Close the loop"]; return <><header className="site-header scrolled"><a className="brand" href="/#home"><img className="brand-logo" src={assets.logo} alt="" /><span className="brand-wordmark">EmpowerLife<b>4U</b></span></a><a className="text-link" href="/#fitness">← Back to fitness</a><WhatsAppButton /></header><main><section className="container workout-hero"><div><div className="eyebrow">Fitness session</div><h1>{workout.title}</h1><p className="muted">{workout.intro}</p><div className="workout-meta"><span>{workout.meta}</span><span>All levels</span><span>Coach guided</span></div></div><div className="workout-hero-media"><img src={workout.image} alt={`${workout.title} training session`} /></div></section><section className="container workout-steps"><div className="eyebrow">Session guide</div><h2>Make every<br /><em>rep count.</em></h2>{steps.map((step, index) => <article className="step" key={step}><span className="step-number">0{index + 1}</span><div><h3>{step}</h3><p className="muted">Move through this phase with control. Your coach will adjust the details to meet your body and your day.</p></div><span>✓</span></article>)}</section><section className="container video-slot"><div className="eyebrow">Coach walkthrough</div><h2>Video coming<br /><em>to the floor.</em></h2><p className="muted">This media area is ready for an approved workout demonstration video.</p></section></main><footer className="footer"><div className="container footer-row"><span>EmpowerLife4U / {workout.title}</span><a href="/#fitness">Explore another session →</a></div></footer></>; }
function OwnerInquiriesPage() {
  const statusQuery = trpc.owner.status.useQuery();
  const loginMutation = trpc.owner.login.useMutation();
  const logoutMutation = trpc.owner.logout.useMutation();
  const utils = trpc.useUtils();
  const [formMessage, setFormMessage] = useState("");
  const authenticated = statusQuery.data?.authenticated === true;
  const inquiriesQuery = trpc.inquiries.list.useQuery(undefined, { enabled: authenticated });
  const statusMutation = trpc.inquiries.updateStatus.useMutation({ onSuccess: () => utils.inquiries.list.invalidate() });

  const submitLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setFormMessage("");
    const result = await loginMutation.mutateAsync({ username: String(data.get("username") || ""), password: String(data.get("password") || "") });
    if (!result.success) {
      setFormMessage("Those credentials were not accepted. Please try again.");
      return;
    }
    form.reset();
    setFormMessage("");
    await utils.owner.status.invalidate();
  };

  if (statusQuery.isLoading) return <main className="owner-page container"><p className="eyebrow">Owner area</p><h1>Checking secure access…</h1></main>;
  if (!authenticated) return <main className="owner-page container"><div className="owner-login"><p className="eyebrow">Private owner area</p><h1>Sign in to<br /><em>inquiries.</em></h1><p className="muted">This desk is private to the EmpowerLife4U owner.</p><form className="form" onSubmit={submitLogin}><label>Username<input required name="username" autoComplete="username" placeholder="Owner username" /></label><label>Password<input required type="password" name="password" autoComplete="current-password" placeholder="Owner password" /></label><button className="button" type="submit" disabled={loginMutation.isPending}>{loginMutation.isPending ? "Checking…" : "Open inquiry desk ↗"}</button>{formMessage && <p className="muted" role="alert">{formMessage}</p>}</form><a className="text-link" href="/#home">Back to EmpowerLife4U ↗</a></div></main>;
  if (inquiriesQuery.isLoading) return <main className="owner-page container"><p className="eyebrow">Owner area</p><h1>Loading inquiries…</h1></main>;
  if (inquiriesQuery.error) return <main className="owner-page container"><p className="eyebrow">Owner area</p><h1>Could not load inquiries.</h1><p className="muted">Your owner session may have expired. Please sign in again.</p><button className="button" onClick={() => utils.owner.status.invalidate()}>Try again ↗</button></main>;

  return <main className="owner-page container"><header className="owner-header"><div><p className="eyebrow">Private owner area</p><h1>Inquiry desk.</h1><p className="muted">Review contact submissions and keep each follow-up status current.</p></div><div className="owner-actions"><a className="button secondary" href="/#home">Back to website ↗</a><button className="text-link" onClick={async () => { await logoutMutation.mutateAsync(); await utils.owner.status.invalidate(); }}>Sign out</button></div></header><section className="inquiry-list" aria-label="Inquiry submissions">{(inquiriesQuery.data || []).map((inquiry) => <article className="inquiry-row" key={inquiry.id}><div className="inquiry-main"><span className="inquiry-id">#{inquiry.id}</span><h2>{inquiry.name}</h2><a href={`mailto:${inquiry.email}`}>{inquiry.email}</a><p>{inquiry.message}</p></div><div className="inquiry-meta"><time>{new Date(inquiry.createdAt).toLocaleString()}</time><select value={inquiry.status} disabled={statusMutation.isPending} onChange={(event) => statusMutation.mutate({ id: inquiry.id, status: event.target.value })}><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select></div></article>)}{inquiriesQuery.data?.length === 0 && <div className="inquiry-empty"><h2>No inquiries yet.</h2><p className="muted">New contact submissions will appear here.</p></div>}</section></main>;
}

export default function App() { const path = useMemo(() => window.location.pathname, []); const slug = path.startsWith("/workout/") ? path.split("/")[2] : null; if (path === "/owner/inquiries") return <OwnerInquiriesPage />; return slug ? <WorkoutPage slug={slug} /> : <Home />; }
