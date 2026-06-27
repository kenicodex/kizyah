import { useEffect, useRef, useState } from "react";
import "./App.css";
import { config } from "./config";

const weddingDate = new Date(config.weddingDate);

function parseThemeColors(value) {
  return String(value || "")
    .split(/,|&/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function colorToHex(name) {
  const key = String(name || "").toLowerCase();
  const table = {
    blue: "#3a6ea5",
    green: "#2f6b4f",
    "navy blue": "#102a43",
    emerald: "#0f8b6d",
    peach: "#f7b89c",
    "burnt orange": "#b5502a",
    brown: "#6f4e37",
    orange: "#c65d1a",
    "olive green": "#556b2f",
    olive: "#556b2f",
    burgundy: "#7a1f3d",
    white: "#f8fcfb",
    ivory: "#f7f2e8",
    gold: "#b89676",
    champagne: "#e7d2b5",
    "champagne gold": "#d8c3a5",
    sage: "#8aa98b",
    black: "#101317",
    silver: "#c6cbd3",
    blush: "#f1c7c6",
  };

  return table[key] || "var(--accent)";
}

function getTimeLeft(targetDate) {
  const difference = targetDate.getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function App() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(weddingDate));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedKey, setCopiedKey] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const [stepScrollProgress, setStepScrollProgress] = useState(0);
  const [pageScrollProgress, setPageScrollProgress] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    guestOf: "",
    email: "",
    whatsapp: "",
    plusOne: "no",
    plusOneName: "",
    plusOneRelationship: "",
    note: "",
  });
  const observerRef = useRef(null);
  const stepWrapperRef = useRef(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(weddingDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`,
      );
    };

    updateVh();
    window.addEventListener("resize", updateVh);
    window.addEventListener("orientationchange", updateVh);

    return () => {
      window.removeEventListener("resize", updateVh);
      window.removeEventListener("orientationchange", updateVh);
    };
  }, []);

  // Theme logic
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Reveal-on-scroll logic
  useEffect(() => {
    if (config.structure === "stepper") return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    const sections = document.querySelectorAll(".reveal");
    sections.forEach((section) => observerRef.current.observe(section));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => {
      if (name === "plusOne" && value === "no") {
        return {
          ...current,
          plusOne: value,
          plusOneName: "",
          plusOneRelationship: "",
        };
      }

      return { ...current, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitted(false);

    const date = new Date();
    const inputValue = {
      "Full Name": formData.fullName,
      "Guest Of": formData.guestOf,
      Email: formData.email,
      WhatsApp: formData.whatsapp.replace(/\s+/g, ""),
      "Has Plus One": formData.plusOne,
      "Plus One Name":
        formData.plusOne === "yes" ? formData.plusOneName : "N/A",
      "Relationship With the Couple": formData.plusOneRelationship,
      Note: formData.note || "N/A",
      "Created At": date.toLocaleString(),
    };

    const baseURL =
      "https://script.google.com/macros/s/AKfycby4M8nxqe-fqblHsFC2xKFirEXZDfxpDTg8kipGGUiKw0dw9w3NT0eAEZK3ARCOfhfY/exec";
    const payload = JSON.stringify(inputValue);

    setIsSubmitting(true);
    try {
      // Apps Script web apps don't return CORS headers, so we must use
      // no-cors. That makes the response opaque (res.ok is always false and
      // res.status is 0), so we can't inspect it — a resolved fetch means the
      // request was delivered. Use a "simple" content-type to avoid a preflight;
      // Apps Script reads the raw body from e.postData.contents either way.
      await fetch(baseURL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        mode: "no-cors",
        body: payload,
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error during fetch:", error);
      setSubmitError("Unable to submit your RSVP right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = async (text, key) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "true");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(""), 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const isCopyableAccountLine = (value) => /^\d/.test(String(value || "").trim());

  const handleStepChange = (newStep) => {
    if (isStepper) {
      setStepScrollProgress(0);
    }
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(newStep);
      setIsAnimating(false);
      window.scrollTo(0, 0);
      if (isStepper) {
        requestAnimationFrame(() => {
          if (stepWrapperRef.current) {
            stepWrapperRef.current.scrollTop = 0;
          }
        });
      }
    }, 400); // Match CSS transition duration
  };

  const nextStep = () => {
    handleStepChange(Math.min(currentStep + 1, 7));
  };

  const prevStep = () => {
    handleStepChange(Math.max(currentStep - 1, 0));
  };

  const isStepper = config.structure === "stepper";
  const stepLabels = ["Home", "Story", "Timeline", "RSVP", "Travel", "Gifts", "Share the joy"];
  const totalSteps = stepLabels.length;

  useEffect(() => {
    if (isStepper) return;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setPageScrollProgress(max <= 0 ? 1 : window.scrollY / max);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isStepper]);

  const renderSection = (index, content) => {
    if (isStepper && currentStep !== index) return null;
    const onScroll = isStepper
      ? (event) => {
          const el = event.currentTarget;
          const max = el.scrollHeight - el.clientHeight;
          setStepScrollProgress(max <= 0 ? 1 : el.scrollTop / max);
        }
      : undefined;

    return (
      <div
        className={`section-wrapper ${isAnimating ? "exit" : "enter"}`}
        onScroll={onScroll}
        ref={isStepper ? stepWrapperRef : null}
      >
        {content}
      </div>
    );
  };

  const renderNavigation = (index) => {
    if (!isStepper) return null;
    return (
      <div className="stepper-nav">
        {index > 0 && (
          <button className="button button-secondary" onClick={prevStep}>
            Back
          </button>
        )}
        {index < stepLabels.length - 1 && (
          <button className="button button-primary" onClick={nextStep}>
            Next
          </button>
        )}
      </div>
    );
  };

  const progress = isStepper
    ? (currentStep + stepScrollProgress) / totalSteps
    : pageScrollProgress;
  const progressPercent = Math.max(
    0,
    Math.min(100, Math.round(progress * 100)),
  );

  return (
    <div className={`page-shell has-progress ${isStepper ? "is-stepper" : ""}`}>
      <div
        className="progress-shell"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPercent}
      >
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="progress-meta">
          {isStepper ? (
            <span>
              {currentStep + 1}/{totalSteps} · {stepLabels[currentStep]}
            </span>
          ) : (
            <span>{progressPercent}%</span>
          )}
        </div>
      </div>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      {/* STEP 0: HERO */}
      {renderSection(
        0,
        <header className="hero-section" id="home">
          <div className="hero-overlay"></div>
          <div className="hero-orb hero-orb-left"></div>
          <div className="hero-orb hero-orb-right"></div>

          <nav className="top-nav">
            <a className="brand" href="#home">
              {config.couple.bride[0]} & {config.couple.groom[0]}
            </a>
            <div className="nav-links">
              {!isStepper &&
                config.navItems.map((item) => (
                  <a key={item.href} href={item.href}>
                    {item.label}
                  </a>
                ))}
            </div>
          </nav>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">A celebration of love, faith and family</p>
              <p className="eyebrow">{config.couple.hashtag}</p>
              <h1>
                {config.couple.bride} <span>&</span> {config.couple.groom}
              </h1>
              <p className="hero-lead">
                {config.couple.brideFull} and {config.couple.groomFull} joyfully
                invite you to share in their wedding day — a celebration of
                culture, faith, and the beautiful love story that began in 2021.
              </p>

              <div className="hero-actions">
                <a
                  className="button button-primary"
                  href="#rsvp"
                  onClick={
                    isStepper
                      ? (e) => {
                          e.preventDefault();
                          handleStepChange(3);
                        }
                      : undefined
                  }
                >
                  Confirm attendance
                </a>
                <a
                  className="button button-secondary"
                  href="#travel"
                  onClick={
                    isStepper
                      ? (e) => {
                          e.preventDefault();
                          handleStepChange(5);
                        }
                      : undefined
                  }
                >
                  View venue and map
                </a>
              </div>

              <div className="hero-highlights">
                <div>
                  <span>Wedding date</span>
                  <strong>{config.weddingDateFormatted}</strong>
                </div>
                <div>
                  <span>Theme colors</span>
                  <strong>{config.theme.colors}</strong>
                </div>
                <div>
                  <span>Venue</span>
                  <strong>{config.theme.venue}</strong>
                </div>
              </div>
            </div>

            <aside className="countdown-card">
              <p className="card-kicker">Countdown to our big day</p>
              <div className="countdown-grid">
                <div>
                  <strong>{timeLeft.days}</strong>
                  <span>Days</span>
                </div>
                <div>
                  <strong>{timeLeft.hours}</strong>
                  <span>Hours</span>
                </div>
                <div>
                  <strong>{timeLeft.minutes}</strong>
                  <span>Minutes</span>
                </div>
                <div>
                  <strong>{timeLeft.seconds}</strong>
                  <span>Seconds</span>
                </div>
              </div>
              <p className="countdown-note">
                {config.timeline[0].title} begins at {config.timeline[0].time},
                followed by {config.timeline[1].title} at
                {config.timeline[1].time} and {config.timeline[2].title} at{" "}
                {config.timeline[2].time}.
              </p>
            </aside>
          </div>
          {renderNavigation(0)}
        </header>,
      )}

      {/* SHARED ELEMENTS FOR REGULAR VIEW */}
      {!isStepper && (
        <>
          <section className="facts-strip reveal">
            {config.weddingFacts.map((fact, i) => (
              <article
                className="fact-card"
                key={fact.label}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </article>
            ))}
          </section>

          <section className="parallax-banner parallax-banner-promise reveal">
            <div className="parallax-content">
              <p>
                Save the date for a day of heartfelt vows, cultural splendour,
                and joyful celebration.
              </p>
            </div>
          </section>
        </>
      )}

      {/* STEP 1: STORY */}
      {renderSection(
        1,
        <section className="section two-column-section reveal" id="story">
          <div className="section-heading">
            <p className="eyebrow">Our love story</p>
            <h2>About the couple</h2>
            <p>
              From the day we met, our journey has been one of faith, laughter,
              and growing love.
            </p>
          </div>

          <div className="story-grid">
            {config.storyMoments.map((moment, i) => (
              <article
                className="glass-card"
                key={moment.title}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <h3>{moment.title}</h3>
                <p>{moment.body}</p>
              </article>
            ))}
          </div>
          {renderNavigation(1)}
        </section>,
      )}

      {/* STEP 2: SCHEDULE */}
      {renderSection(
        2,
        <section className="section reveal" id="schedule">
          <div className="section-heading">
            <p className="eyebrow">Event schedule</p>
            <h2>Wedding day timeline</h2>
            <p>
              Three beautiful moments back-to-back, all at {config.theme.venue}.
            </p>
          </div>

          <div className="timeline">
            {config.timeline.map((item, i) => (
              <article
                className="timeline-item"
                key={item.time}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <span className="timeline-time">{item.time}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
          {renderNavigation(2)}
        </section>,
      )}

      {renderSection(
        3,
        <section className="section rsvp-section reveal" id="rsvp">
          <div className="section-heading">
            <p className="eyebrow">RSVP</p>
            <h2>Confirm attendance</h2>
            <p>
              Share your details so we can prepare for you and send your access
              card via WhatsApp.
            </p>
          </div>

          {!isStepper ? (
            <div className="faq-list">
              {config.faqItems.map((item, i) => (
                <article
                  className="faq-card"
                  key={item.title}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          ) : null}

          <form
            className="rsvp-form glass-card rsvp-card"
            onSubmit={handleSubmit}
          >
            <div className="rsvp-fields">
              {config.formFields.fullName && (
                <label>
                  Full name
                  <input
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </label>
              )}
              <label>
                Guest of the Bride or Groom?
                <select
                  name="guestOf"
                  value={formData.guestOf}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="bride">Bride</option>
                  <option value="groom">Groom</option>
                </select>
              </label>
              {formData.guestOf && (
                <article className="glass-card" style={{ marginTop: "1rem", padding: "1rem" }}>
                  <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>
                    Asoebi contact
                  </p>
                  <p>
                    For {formData.guestOf === "bride" ? "Bride's family" : "Groom's family"} asoebi, contact:
                  </p>
                  <div className="copy-row" style={{ marginTop: "0.5rem" }}>
                    <span className="copy-text">
                      {formData.guestOf === "bride" ? config.asoebiContacts.bride : config.asoebiContacts.groom}
                    </span>
                    <button
                      type="button"
                      className="copy-button"
                      onClick={() =>
                        copyToClipboard(
                          formData.guestOf === "bride" ? config.asoebiContacts.bride : config.asoebiContacts.groom,
                          "asoebi"
                        )
                      }
                    >
                      {copiedKey === "asoebi" ? "Copied" : "Copy"}
                    </button>
                  </div>
                </article>
              )}
              {config.formFields.extras && (
                <label>
                  Do you have a plus one?
                  <select
                    name="plusOne"
                    value={formData.plusOne}
                    onChange={handleChange}
                    required
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </label>
              )}
              {config.formFields.email && (
                <label>
                  Email address
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                  />
                </label>
              )}
              {config.formFields.whatsapp && (
                <label>
                  WhatsApp number
                  <input
                    name="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="+234 800 000 0000"
                    required
                  />
                </label>
              )}
              <label>
                Relationship with the couple
                <select
                  name="plusOneRelationship"
                  value={formData.plusOneRelationship}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select relationship</option>
                  <option value="Friends">Friends</option>
                  <option value="Family">Family</option>
                  <option value="Well wisher">Well wisher</option>
                </select>
              </label>
              {formData.plusOne === "yes" && (
                <label>
                  Plus one full name
                  <input
                    name="plusOneName"
                    type="text"
                    value={formData.plusOneName}
                    onChange={handleChange}
                    placeholder="Enter your plus one's full name"
                    required
                  />
                </label>
              )}
            </div>
            {config.formFields.note && (
              <label>
                Note for the couple
                <textarea
                  name="note"
                  rows={isStepper ? 3 : 4}
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Share a warm message or special request"
                ></textarea>
              </label>
            )}
            <button
              className="button button-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending RSVP..." : "Send RSVP"}
            </button>
            {isSubmitted ? (
              <p className="success-note">
                Thank you, {formData.fullName}. Your RSVP has been received
                {formData.plusOne === "yes"
                  ? ` with your plus one, ${formData.plusOneName}.`
                  : "."}
              </p>
            ) : null}
            {submitError ? (
              <p
                className="success-note"
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  color: "#dc2626",
                }}
              >
                {submitError}
              </p>
            ) : null}
          </form>

          {renderNavigation(3)}
        </section>,
      )}

      {renderSection(
        4,
        <section className="section split-section reveal" id="travel">
          <div>
            <div className="section-heading section-heading-left">
              <p className="eyebrow">Venue and directions</p>
              <h2>Where to celebrate with us</h2>
              <p>All ceremonies will take place at {config.theme.venue}.</p>
            </div>

            <div className="venue-grid">
              {config.venueLinks.map((venue, i) => (
                <article
                  className="venue-card"
                  key={venue.label}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <h3>{venue.label}</h3>
                  <p>{venue.address}</p>
                  <a href={venue.map} target="_blank" rel="noreferrer">
                    Open Google Maps
                  </a>
                </article>
              ))}
            </div>

            <article className="glass-card color-card">
              <p className="eyebrow">Wedding colors</p>
              <h3>{config.theme.colors}</h3>
              <div className="color-chips">
                {parseThemeColors(config.theme.colors).map((name) => (
                  <span className="color-chip" key={name}>
                    <span
                      className="color-dot"
                      style={{ background: colorToHex(name) }}
                    ></span>
                    {name}
                  </span>
                ))}
              </div>
              {config.theme.colorNotes?.length ? (
                <ul className="detail-list">
                  {config.theme.colorNotes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              <p>
                Guests are encouraged to wear our theme colors to make the
                celebration even more beautiful.
              </p>
            </article>
          </div>

          <aside className="travel-notes glass-card">
            <p className="eyebrow">Guest support</p>
            <h3>Need assistance?</h3>
            <p>
              For directions, access cards, or anything you need on the day,
              kindly reach our wedding coordinator:
            </p>
            <p>
              <strong>
                {config.socialLinks
                  .find((l) => l.label.includes("Coordinator"))
                  ?.label.split(": ")[1] || "+234 808 298 6043"}
              </strong>
            </p>
            <p>
              After you RSVP, your access card will be sent to your WhatsApp
              number ahead of the celebration.
            </p>
          </aside>
          {renderNavigation(4)}
        </section>,
      )}

      {renderSection(
        5,
        <section className="section gifts-section reveal" id="gifts">
          <div className="section-heading">
            <p className="eyebrow">Gifts</p>
            <h2>Gift account details</h2>
            <p>
              If you'd like to gift the couple, the details are shared below.
            </p>
          </div>

          <div className="gifts-grid">
            <article className="glass-card gift-highlight">
              <p className="gift-label">Primary account</p>
              <div className="gift-account">
                <div className="copy-row">
                  <span className="copy-text">{config.registryOptions[0]}</span>
                  <button
                    type="button"
                    className="copy-button"
                    onClick={() =>
                      copyToClipboard(config.registryOptions[0], "registry.0")
                    }
                  >
                    {copiedKey === "registry.0" ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
              <p className="gift-note">
                Thank you for your love, support, and generosity.
              </p>
            </article>

            {config.registryOptions.length > 1 ? (
              <article className="glass-card">
                <p className="eyebrow">Other notes</p>
                <ul className="detail-list">
                  {config.registryOptions.slice(1).map((item) => (
                    <li key={item} className="copy-row">
                      <span className="copy-text">{item}</span>
                      {isCopyableAccountLine(item) ? (
                        <button
                          type="button"
                          className="copy-button"
                          onClick={() => copyToClipboard(item, `registry.${item}`)}
                        >
                          {copiedKey === `registry.${item}` ? "Copied" : "Copy"}
                        </button>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}
          </div>

          {renderNavigation(5)}
        </section>,
      )}

      {renderSection(
        6,
        <section className="section social-section reveal" id="social">
          <div className="section-heading">
            <p className="eyebrow">Stay connected</p>
            <h2>Share the joy</h2>
            <p>{config.couple.hashtag}</p>
          </div>
          <div className="social-links">
            {config.socialLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {link.label}
              </a>
            ))}
          </div>
          {renderNavigation(6)}
        </section>,
      )}

      {!isStepper || currentStep === 7 ? (
        <footer className="site-footer">
          <p>
            With love, {config.couple.brideFull} and {config.couple.groomFull}
          </p>
          <p>
            {config.weddingDateFormatted} · {config.theme.venue} ·{" "}
            {config.theme.colors}
          </p>
        </footer>
      ) : null}
    </div>
  );
}

export default App;
