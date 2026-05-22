# 💍 Elegant Wedding Website Template

A beautiful, modern, and fully animated wedding website built with **React** and **Vite**. This template is designed to be a "plug-and-play" solution for couples who want a luxury digital presence for their big day.

## ✨ Features

- **Animated Hero Section**: Luxurious parallax effects and floating orbs.
- **Live Countdown**: Dynamic timer ticking down to the wedding moment.
- **Love Story Timeline**: A beautifully designed section to share how you met.
- **Event Schedule**: Clear timeline for ceremonies and receptions.
- **Interactive Gallery**: Showcase your pre-wedding or introduction photos.
- **Travel & Venue**: Integrated Google Maps links and venue details.
- **RSVP System**: A polished form for guests to confirm attendance.
- **Registry & Gifts**: Easy-to-find account details for gifts.
- **Responsive Design**: Looks perfect on mobile, tablet, and desktop.

## 🚀 Quick Start (Plugin Your Details)

This project is designed so anyone can use it by simply updating one file.

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd wedding
```

### 2. Install dependencies
```bash
npm install
```

### 3. Customize the Website
Open [config.js](src/config.js) and update the values with your own wedding details.

```javascript
// Example: src/config.js
export const config = {
  // Website structure: 'regular' (scrolling) or 'stepper' (page by page)
  structure: 'regular',

  couple: {
    bride: 'Your Name',
    groom: 'Partner Name',
    // ...
  },
  weddingDate: '2026-08-08T11:00:00',
  // ... update images, schedule, and maps
};
```

### 4. Run locally
```bash
npm run dev
```

## 🛠 Customization Guide

### Images
Replace the placeholder images in the `galleryItems` array within `src/config.js`. You can use links from Unsplash, Cloudinary, or your own hosting.

### Colors & Styling
Most styling is controlled via CSS variables in [App.css](src/App.css) and [index.css](src/index.css). You can easily change the primary gold/purple accents to match your wedding theme.

### RSVP Form
The RSVP form currently handles frontend validation and state. To collect real data, you can connect the `handleSubmit` function in `App.jsx` to a service like **Formspree**, **Netlify Forms**, or a custom backend.

## 🌐 Deployment

### Deploy to Netlify (Recommended)
1. Push your code to GitHub.
2. Connect your repo to [Netlify](https://www.netlify.com/).
3. Set the build command to `npm run build` and the publish directory to `dist`.

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root.

---

Built with ❤️ for couples everywhere.
