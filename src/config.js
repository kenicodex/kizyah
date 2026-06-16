/**
 * Wedding Website Configuration
 * 
 * Update these values to customize the wedding website for your own event.
 */

export const config = {
  // Website structure: 'regular' (scrolling) or 'stepper' (page by page)
  structure: 'stepper',

  // Full names of the couple
  couple: {
    bride: 'Omowaleola',
    groom: 'Oluwatobiloba',
    brideFull: 'Balogun Omowaleola',
    groomFull: 'Oluwatobiloba Salaudeen',
    hashtag: '#OmowaleolaAndOluwatobiloba',
  },

  // Wedding date and time
  weddingDate: '2026-08-08T11:00:00', // ISO format for countdown
  weddingDateFormatted: 'August 8, 2026',

  // Navigation Links
  navItems: [
    { label: 'Story', href: '#story' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'RSVP', href: '#rsvp' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Travel', href: '#travel' },
    { label: 'Gifts', href: '#gifts' },
    { label: 'Share', href: '#social' },
  ],

  // Key Wedding Facts
  weddingFacts: [
    { label: 'Date', value: 'Saturday, August 8, 2026' },
    { label: 'Venue', value: 'Ikorodu Musical Village' },
    { label: 'Wolimot Niqqah', value: '11:00 AM' },
    { label: 'Engagement', value: '12:00 PM' },
    { label: 'Reception', value: '2:00 PM' },
    { label: 'Theme Colors', value: 'Burnt orange, olive green & champagne gold' },
  ],

  // Theme
  theme: {
    colors: 'Burnt orange, Brown, Olive green, Burgundy & Champagne gold',
    colorNotes: [
      "Groom's family — Women: Burnt orange with brown gele; Men: Brown polished lace with orange cap",
      "Bride's family — Women: Olive green with burgundy gele; Men: Champagne gold polished lace with burgundy cap",
    ],
    venue: 'Ikorodu Musical Village',
  },

  // Love Story Section
  storyMoments: [
    {
      title: 'How we met',
      body: 'Omowaleola and Oluwatobiloba first crossed paths in 2021, and what began as a simple connection has blossomed into a beautiful journey toward forever.',
    },
    {
      title: 'Growing together',
      body: 'From shared dreams to quiet everyday moments, the years since 2021 have been filled with laughter, faith, and a love that keeps growing stronger.',
    },
    {
      title: 'What this day means',
      body: 'Our wedding is a heartfelt celebration of family, faith, and friendship — a day to share our joy with the loved ones who have walked this journey with us.',
    },
  ],

  // Event Schedule
  timeline: [
    {
      time: '11:00 AM',
      title: 'Wolimot Niqqah',
      detail: 'The sacred Islamic marriage ceremony joining the couple in faith.',
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
  ],

  // Photo/Video Gallery
  galleryItems: [
    {
      title: 'Introduction ceremony moments',
      tag: 'Photo',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Family blessings',
      tag: 'Photo',
      image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Cultural traditions',
      tag: 'Photo',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Wedding day highlights coming soon',
      tag: 'Video',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80',
    },
  ],

  // Registry / Gifts
  registryOptions: [
    '0210409669 — Guaranty Trust Bank — Salaudeen Oluwatobiloba Abiodun',
    '0284768340 — Alat/Wema — Balogun Kizmat Omowaleola',
    'Heartfelt cards, prayers, and well-wishes are warmly welcome',
  ],

  // RSVP / FAQ
  faqItems: [
    {
      title: 'How do I confirm attendance?',
      detail: 'Please RSVP through the form on this website. You can also reach our coordinator on +234 808 298 6043.',
    },
    {
      title: 'What details should I share?',
      detail: 'We will need your full name, email address, WhatsApp number, and your plus one details if you are coming with one, so we can send your access cards.',
    },
    {
      title: 'When is the RSVP deadline?',
      detail: 'Kindly confirm as early as possible so we can prepare for you and send your access card via WhatsApp ahead of the day.',
    },
  ],

  // Social & Contact
  socialLinks: [
    { label: '#OmowaleolaAndOluwatobiloba', href: 'https://instagram.com/explore/tags/wedding/' },
    { label: 'Coordinator: +234 808 298 6043', href: 'tel:+2348082986043' },
  ],

  // Venues & Maps
  venueLinks: [
    {
      label: 'Ikorodu Musical Village',
      address: 'Ikorodu, Lagos',
      map: 'https://www.google.com/maps/search/?api=1&query=Ikorodu+Musical+Village+Lagos',
    },
  ],

  // Form Details (Collection)
  formFields: {
    fullName: true,
    email: true,
    whatsapp: true,
    extras: true,
    note: true,
  }
};
