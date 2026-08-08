# Arjit Agarwal — AI/ML Portfolio

A single-page, fully responsive portfolio website built for college placements,
internships, and recruiters. Dark AI/ML themed design with glassmorphism cards,
a neural-network hero animation, and smooth scroll navigation.

Plain **HTML + CSS + JavaScript** — no build tools, no frameworks required.

---

## 📁 Folder structure

```
portfolio/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
└── assets/
    ├── profile.jpg          ← add your photo here (optional, not yet used in HTML)
    ├── resume.pdf           ← add your resume PDF here
    └── project-images/      ← add project screenshots here if you want real images
```

---

## ▶️ How to run it in VS Code

1. Open the `portfolio` folder in VS Code (`File → Open Folder…`).
2. Install the **Live Server** extension (by Ritwick Dey) if you don't have it.
3. Right-click `index.html` → **Open with Live Server**.
4. Your browser opens the site at something like `http://127.0.0.1:5500`.

You can also just double-click `index.html` to open it directly in a browser,
but Live Server gives you auto-refresh on save, which is much nicer while editing.

---

## ✏️ How to replace your information

Open `index.html`. At the very top there's a comment block titled
**"QUICK-EDIT GUIDE"** listing every place you need to personalize:

| What to change      | How to find it                                   |
|----------------------|---------------------------------------------------|
| Name / role          | Search for `Arjit Agarwal`                        |
| Email                | Search for `YOUR_EMAIL@example.com`               |
| Phone                | Search for `+91 00000 00000`                      |
| College              | Search for `GLA University`                       |
| GitHub username      | Search for `YOUR_GITHUB_USERNAME`                 |
| LinkedIn username    | Search for `YOUR_LINKEDIN_USERNAME`                |
| Resume               | Add your PDF at `assets/resume.pdf`                |
| Profile photo        | Add your photo at `assets/profile.jpg`             |

**Tip:** use VS Code's "Find & Replace" (`Ctrl+H` / `Cmd+H`) and enable
"Replace in all files" to swap `YOUR_GITHUB_USERNAME` etc. across the whole
project in one go.

### Colors

All colors live at the top of `style.css` inside `:root { ... }`. Change the
hex values there (e.g. `--accent-blue`, `--accent-purple`, `--accent-cyan`)
and the whole site updates automatically.

---

## ➕ How to add a new project

In `index.html`, find the `<div class="projects-grid">` section. Each project
is one `<article class="project-card">…</article>` block. To add a new one:

1. Copy an entire `<article class="project-card">…</article>` block.
2. Paste it right before the closing `</div>` of `projects-grid`.
3. Edit:
   - The icon class inside `<i class="fa-solid fa-... project-icon">` (browse
     free icons at [fontawesome.com/icons](https://fontawesome.com/icons))
   - Title, tagline, description
   - The `<span>` tags inside `.project-tech`
   - The list items inside `.project-features` (optional — you can delete the
     whole `<ul>` if a project doesn't need it)
   - The two links inside `.project-links` (set real GitHub/demo URLs)

---

## 📄 How to add your resume

1. Export your resume as a PDF.
2. Rename it to `resume.pdf`.
3. Place it inside the `assets/` folder, replacing the placeholder path.

Both "Download Resume" buttons (hero section and the dedicated Resume section)
already point to `assets/resume.pdf` — no HTML changes needed once the file
is in place.

---

## 📬 Making the contact form actually send messages

Right now the form only validates input in the browser (name required, valid
email format, message length) and shows a success message — it does **not**
send anything anywhere yet. Pick one option:

**Option A — Formspree (easiest, no code)**
1. Create a free form at [formspree.io](https://formspree.io).
2. In `index.html`, change:
   ```html
   <form class="contact-form glass-card" id="contact-form" novalidate>
   ```
   to:
   ```html
   <form class="contact-form glass-card" id="contact-form" novalidate
         action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. In `script.js`, remove the line `e.preventDefault();` inside the submit
   handler so the form actually posts to Formspree.

**Option B — EmailJS**
1. Set up a template at [emailjs.com](https://www.emailjs.com).
2. Include their SDK script in `index.html`.
3. Inside the submit handler in `script.js`, call `emailjs.sendForm(...)`
   instead of just showing the success message.

**Option C — Your own Flask backend**
1. Create a `/contact` route in Flask that accepts `POST` with `name`,
   `email`, `message`.
2. Set `action="/contact" method="POST"` on the form.
3. Remove `e.preventDefault();` in `script.js`.

---

## 🌐 How to deploy on GitHub Pages

1. Create a new GitHub repository (e.g. `portfolio`).
2. Push this folder's contents to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/portfolio.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`.
5. Save. After a minute, your site will be live at:
   ```
   https://YOUR_GITHUB_USERNAME.github.io/portfolio/
   ```

---

## 🖼️ Adding your photo to the 3D frame

The hero section's right side has a glowing, slightly-tilted 3D photo frame
(with floating tech badges and rotating rings around it) that currently shows
a placeholder icon and the text "Add assets/profile.jpg".

To put your real photo in:
1. Add your photo at `assets/profile.jpg`.
2. In `index.html`, find the `.photo-frame` block (search for `frame-placeholder`).
3. Delete the `<div class="frame-placeholder">...</div>` block.
4. Uncomment the line right below it:
   ```html
   <img src="assets/profile.jpg" alt="Arjit Agarwal">
   ```

The frame tilts slightly as you move your mouse over it (skipped automatically
if the visitor has "reduce motion" turned on).

## ✅ What's already handled

- Fixed navbar with smooth scroll + active-section highlighting
- Mobile hamburger menu
- Scroll progress bar
- Site-wide animated background — soft drifting gradient orbs + a faint grid,
  fixed behind every section (not just the hero)
- Scroll-reveal animations for every section (skipped if the user has
  "reduce motion" turned on in their OS)
- Animated neural-network canvas in the hero
- 3D photo frame with floating badges and mouse-tilt interaction
- Typing animation (`Machine Learning • Deep Learning • Python • AI`)
- Education timeline with three entries: University, Class 12th, Class 10th
- Back-to-top button
- Frontend contact form validation
- Fully responsive layout — desktop, tablet, and mobile, no horizontal scroll

## 🛠 Built with

HTML5, CSS3, vanilla JavaScript, [Font Awesome](https://fontawesome.com) icons,
and Google Fonts (Space Grotesk, Inter, JetBrains Mono).
