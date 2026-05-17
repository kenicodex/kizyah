import { useEffect, useRef, useState } from 'react'
import './App.css'

const weddingDate = new Date('2026-08-08T11:00:00')
const soundtrackUrl =
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

const navItems = [
  { label: 'Story', href: '#story' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Travel', href: '#travel' },
  { label: 'RSVP', href: '#rsvp' },
]

const weddingFacts = [
  { label: 'Date', value: 'Saturday, August 8, 2026' },
  { label: 'Venue', value: 'Ikorodu Musical Village' },
  { label: 'Wolimot Niqqah', value: '11:00 AM' },
  { label: 'Engagement', value: '12:00 PM' },
  { label: 'Reception', value: '2:00 PM' },
  { label: 'Theme Colors', value: 'Blue, Green & White' },
]

const storyMoments = [
  {
    title: 'How we met',
    body:
      'Omowaleola and Oluwatobiloba first crossed paths in 2021, and what began as a simple connection has blossomed into a beautiful journey toward forever.',
  },
  {
    title: 'Growing together',
    body:
      'From shared dreams to quiet everyday moments, the years since 2021 have been filled with laughter, faith, and a love that keeps growing stronger.',
  },
  {
    title: 'What this day means',
    body:
      'Our wedding is a heartfelt celebration of family, faith, and friendship — a day to share our joy with the loved ones who have walked this journey with us.',
  },
]

const timeline = [
  {
    time: '11:00 AM',
    title: 'Wolimot Niqqah',
    detail: 'The sacred Islamic marriage ceremony joining Omowaleola and Oluwatobiloba in faith.',
  },
  {
    time: '12:00 PM',
    title: 'Engagement',
    detail: 'A vibrant traditional engagement celebration with family, culture, and joy.',
  },
  {
    time: '2:00 PM',
    title: 'Reception',
    detail: 'Dinner, music, dancing, and beautiful moments to celebrate the new couple.',
  },
]

const galleryItems = [
  {
    title: 'Introduction ceremony moments',
    tag: 'Photo',
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Family blessings',
    tag: 'Photo',
    image:
      'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Cultural traditions',
    tag: 'Photo',
    image:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Wedding day highlights coming soon',
    tag: 'Video',
    image:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80',
  },
]

const registryOptions = [
  'Gift account: GTB 0210409669',
  'Heartfelt cards, prayers, and well-wishes are warmly welcome',
]

const faqItems = [
  {
    title: 'How do I confirm attendance?',
    detail:
      'Please RSVP through the form on this website. You can also reach our coordinator on +234 808 298 6043.',
  },
  {
    title: 'What details should I share?',
    detail:
      'We will need your full name, number of extras, email address, and WhatsApp number so we can send you access cards.',
  },
  {
    title: 'When is the RSVP deadline?',
    detail:
      'Kindly confirm as early as possible so we can prepare for you and send your access card via WhatsApp ahead of the day.',
  },
]

const socialLinks = [
  { label: '#OmowaleolaAndOluwatobiloba', href: 'https://instagram.com/explore/tags/wedding/' },
  { label: 'Coordinator: +234 808 298 6043', href: 'tel:+2348082986043' },
]

const venueLinks = [
  {
    label: 'Ikorodu Musical Village',
    address: 'Ikorodu, Lagos',
    map: 'https://www.google.com/maps/search/?api=1&query=Ikorodu+Musical+Village+Lagos',
  },
]

function getTimeLeft(targetDate) {
  const difference = targetDate.getTime() - Date.now()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function App() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(weddingDate))
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    extras: '0',
    note: '',
  })
  const audioRef = useRef(null)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(weddingDate))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitted(true)
  }

  const toggleMusic = async () => {
    const player = audioRef.current
    if (!player) {
      return
    }

    if (isPlaying) {
      player.pause()
      setIsPlaying(false)
      return
    }

    try {
      await player.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  return (
    <div className="page-shell">
      <audio ref={audioRef} loop preload="none" src={soundtrackUrl} />

      <header className="hero-section" id="home">
        <div className="hero-overlay"></div>
        <div className="hero-orb hero-orb-left"></div>
        <div className="hero-orb hero-orb-right"></div>

        <nav className="top-nav">
          <a className="brand" href="#home">
            O & O
          </a>
          <div className="nav-links">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">A celebration of love, faith and family</p>
            <h1>
              Omowaleola <span>&</span> Oluwatobiloba
            </h1>
            <p className="hero-lead">
              Balogun Omowaleola and Oluwatobiloba Salaudeen joyfully invite you
              to share in their wedding day — a celebration of culture, faith,
              and the beautiful love story that began in 2021.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#rsvp">
                Confirm attendance
              </a>
              <a className="button button-secondary" href="#travel">
                View venue and map
              </a>
            </div>

            <div className="hero-highlights">
              <div>
                <span>Wedding date</span>
                <strong>August 8, 2026</strong>
              </div>
              <div>
                <span>Theme colors</span>
                <strong>Blue, Green & White</strong>
              </div>
              <div>
                <span>Venue</span>
                <strong>Ikorodu Musical Village</strong>
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
              Wolimot Niqqah begins at 11:00 AM, followed by engagement at
              12:00 PM and reception at 2:00 PM.
            </p>
          </aside>
        </div>
      </header>

      <section className="facts-strip">
        {weddingFacts.map((fact) => (
          <article className="fact-card" key={fact.label}>
            <span>{fact.label}</span>
            <strong>{fact.value}</strong>
          </article>
        ))}
      </section>

      <section className="parallax-banner parallax-banner-promise">
        <div className="parallax-content">
          <p>Save the date for a day of heartfelt vows, cultural splendour, and joyful celebration.</p>
        </div>
      </section>

      <section className="section two-column-section" id="story">
        <div className="section-heading">
          <p className="eyebrow">Our love story</p>
          <h2>About the couple</h2>
          <p>
            From the day we met in 2021, our journey has been one of faith,
            laughter, and growing love.
          </p>
        </div>

        <div className="story-grid">
          {storyMoments.map((moment) => (
            <article className="glass-card" key={moment.title}>
              <h3>{moment.title}</h3>
              <p>{moment.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section feature-section">
        <div className="feature-card feature-card-large">
          <p className="eyebrow">Introduction photos</p>
          <h2>Memories from our introduction</h2>
          <p>
            We haven't taken pre-wedding photos yet, but our introduction
            pictures will be featured here as a sweet preview of the love
            we're celebrating.
          </p>
        </div>
        <div className="feature-card">
          <p className="eyebrow">Our colors</p>
          <h3>Blue, Green & White</h3>
          <p>
            Guests are warmly encouraged to dress in our theme colors — blue,
            green and white — to make our celebration even more beautiful.
          </p>
        </div>
      </section>

      <section className="section" id="schedule">
        <div className="section-heading">
          <p className="eyebrow">Event schedule</p>
          <h2>Wedding day timeline</h2>
          <p>
            Three beautiful moments back-to-back, all at Ikorodu Musical
            Village.
          </p>
        </div>

        <div className="timeline">
          {timeline.map((item) => (
            <article className="timeline-item" key={item.time}>
              <span className="timeline-time">{item.time}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="parallax-banner parallax-banner-gallery">
        <div className="parallax-content">
          <p>Every image slot is ready for our introduction pictures and treasured wedding memories.</p>
        </div>
      </section>

      <section className="section" id="gallery">
        <div className="section-heading">
          <p className="eyebrow">Gallery</p>
          <h2>Introduction and family moments</h2>
          <p>
            A glimpse of the journey so far. Pre-wedding photos haven't been
            taken yet — introduction pictures will be featured here soon.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <article className="gallery-card" key={item.title}>
              <img src={item.image} alt={item.title} />
              <div className="gallery-overlay">
                <span>{item.tag}</span>
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section" id="travel">
        <div>
          <div className="section-heading section-heading-left">
            <p className="eyebrow">Venue and directions</p>
            <h2>Where to celebrate with us</h2>
            <p>
              All three ceremonies — Wolimot Niqqah, engagement and reception
              — will take place at Ikorodu Musical Village.
            </p>
          </div>

          <div className="venue-grid">
            {venueLinks.map((venue) => (
              <article className="venue-card" key={venue.label}>
                <h3>{venue.label}</h3>
                <p>{venue.address}</p>
                <a href={venue.map} target="_blank" rel="noreferrer">
                  Open Google Maps
                </a>
              </article>
            ))}
          </div>
        </div>

        <aside className="travel-notes glass-card">
          <p className="eyebrow">Guest support</p>
          <h3>Need assistance?</h3>
          <p>
            For directions, access cards, or anything you need on the day,
            kindly reach our wedding coordinator:
          </p>
          <p>
            <strong>+234 808 298 6043</strong>
          </p>
          <p>
            After you RSVP, your access card will be sent to your WhatsApp
            number ahead of the celebration.
          </p>
        </aside>
      </section>

      <section className="section experience-grid">
        <article className="glass-card">
          <p className="eyebrow">Gift the couple</p>
          <h3>Gift account details</h3>
          <ul className="detail-list">
            {registryOptions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="glass-card">
          <p className="eyebrow">Music</p>
          <h3>Our wedding soundtrack</h3>
          <p>
            Let a gentle background track set the mood as you browse our
            wedding details.
          </p>
          <button
            className="button button-secondary"
            type="button"
            onClick={toggleMusic}
          >
            {isPlaying ? 'Pause music' : 'Play music'}
          </button>
        </article>

        <article className="glass-card">
          <p className="eyebrow">Dress code</p>
          <h3>Blue, Green & White</h3>
          <p>
            Please join us in our colors — flowing blues, lush greens, and
            crisp whites — to make our celebration unforgettable.
          </p>
        </article>
      </section>

      <section className="section social-section">
        <div className="section-heading">
          <p className="eyebrow">Stay connected</p>
          <h2>Share the joy</h2>
        </div>
        <div className="social-links">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <section className="section split-section rsvp-section" id="rsvp">
        <div>
          <div className="section-heading section-heading-left">
            <p className="eyebrow">RSVP</p>
            <h2>Confirm attendance</h2>
            <p>
              Please share your details below so we can prepare for you and
              send your access card via WhatsApp.
            </p>
          </div>

          <div className="faq-list">
            {faqItems.map((item) => (
              <article className="faq-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <form className="rsvp-form glass-card" onSubmit={handleSubmit}>
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
          <label>
            Number of extras
            <input
              name="extras"
              type="number"
              min="0"
              value={formData.extras}
              onChange={handleChange}
              placeholder="0"
              required
            />
          </label>
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
          <label>
            Note for the couple
            <textarea
              name="note"
              rows="4"
              value={formData.note}
              onChange={handleChange}
              placeholder="Share a warm message or special request"
            ></textarea>
          </label>
          <button className="button button-primary" type="submit">
            Send RSVP
          </button>
          {isSubmitted ? (
            <p className="success-note">
              Thank you, {formData.fullName}. Your RSVP has been received for
              you plus {formData.extras} extra(s). Your access card will be
              sent to your WhatsApp.
            </p>
          ) : null}
        </form>
      </section>

      <footer className="site-footer">
        <p>With love, Omowaleola Balogun and Oluwatobiloba Salaudeen</p>
        <p>August 8, 2026 · Ikorodu Musical Village · Blue, Green & White</p>
      </footer>
    </div>
  )
}

export default App
