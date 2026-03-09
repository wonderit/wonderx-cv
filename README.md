# Wonsuk Kim - Portfolio

Personal portfolio website for Wonsuk Kim (CTO at SAFE AI, AI Researcher, Engineer).

Built with Three.js, GSAP, and vanilla HTML/CSS/JS. No build tools required.

## Features

- Interactive 3D neural network particle animation (Three.js)
- Smooth scroll-triggered animations (GSAP ScrollTrigger)
- Korean/English language toggle with localStorage persistence
- Fully responsive (mobile, tablet, desktop)
- Dark-mode futuristic sci-fi design
- Zero backend dependencies

## Tech Stack

- **HTML/CSS/JS** — No frameworks, no build step
- **Three.js r128** — 3D particle scene (CDN)
- **GSAP 3.12** — Scroll animations (CDN)
- **Google Fonts** — Space Grotesk + Noto Sans KR

## File Structure

```
/
├── index.html          # Main HTML page
├── css/
│   └── style.css       # Styles, layout, responsive breakpoints
├── js/
│   ├── main.js         # Three.js scene setup
│   ├── animations.js   # GSAP scroll animations
│   └── i18n.js         # Korean/English language switch
├── assets/             # Profile photo placeholder
├── CNAME               # Custom domain config
└── README.md
```

## Local Development

Simply open `index.html` in a browser, or use any static file server:

```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve .
```

## Deployment (GitHub Pages)

1. Push all files to a GitHub repository (e.g., `wonderit/wonderit.github.io` or `wonderit/portfolio`)
2. Go to **Settings > Pages > Source**: select `main` branch, `/ (root)`
3. Site will be live at `https://wonderit.github.io/` or the custom domain

### Custom Domain (wonderit.co.kr)

1. The `CNAME` file is already included containing `wonderit.co.kr`
2. Set DNS A records to GitHub Pages IPs:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Optionally add a CNAME record: `www` -> `wonderit.github.io`
4. Enable "Enforce HTTPS" in GitHub Pages settings

## License

All rights reserved. Wonsuk Kim.