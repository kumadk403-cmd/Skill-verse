# SkillVerse — Improve Your Skills. Build Your Future.

A complete, interactive skill-learning website for students. Five learning
paths (Website Development, Graphic Design, Video Editing, 3D Modelling &
CAD, Freelancing), each with a detailed roadmap, a directory of real free
learning resources, an Android/laptop compatibility guide, and a checklist
that tracks your progress locally in your browser — no sign-up required.

Built with plain HTML, CSS, and JavaScript — **no build step, no npm
install needed.** Just open it in a browser.

## Project structure

```
skillverse/
  index.html          ← entry point
  README.md
  src/
    data.js            ← all skill/roadmap/resource content
    app.js              ← routing, rendering, state, localStorage
    styles.css          ← theme + responsive layout
```

## Running it locally

**Option A — just open the file:**
Double-click `index.html`, or open it from your browser's file picker.
Everything works with no server.

**Option B — run a tiny local server (recommended for consistent behavior):**

```bash
cd skillverse
python3 -m http.server 8080
# then visit http://localhost:8080 in your browser
```

or, with Node installed:

```bash
npx serve .
```

## Features

- **Home page** — search, filters (Android friendly, laptop recommended,
  free resources, beginner friendly, freelance-ready), and five skill cards.
- **Skill pages** (`#/skills/<id>`) — intro, "what you'll learn," an
  Android/laptop compatibility breakdown, a collapsible beginner →
  intermediate → practical-project roadmap with assignments, a resource
  directory with real working links, and a progress checklist.
- **Progress tracking** — checking a task instantly updates an animated
  progress bar and a "X / Y tasks completed" counter. Progress is saved to
  `localStorage` and survives a page refresh. Each skill's progress is
  tracked separately.
- **Dashboard** (`#/dashboard`) — overall progress, XP, streak, badges
  (First Step, Consistent Learner, Skill Builder, SkillVerse Legend), and a
  per-skill "Continue learning" card.
- **Settings** (`#/settings`) — optional nickname, device type, goal, and
  daily target (no real name, address, school, phone number, or birth date
  is ever requested). Includes a "clear all progress" option with a
  confirmation dialog.
- **Mobile-first** — bottom navigation on phones, side navigation on
  desktop, large tap targets, no horizontal scrolling, tested down to a
  360px-wide viewport.

## How progress is saved

SkillVerse uses the browser's `localStorage`, scoped to this one browser on
this one device. It is **not** synced to an account or across devices —
that's called out directly in the Dashboard and Settings pages. Clearing
your browser data, or opening the site in a different browser/device, will
not carry progress over.

## Publishing it on GitHub Pages

1. Create a new GitHub repository and push this folder's contents to it:
   ```bash
   cd skillverse
   git init
   git add .
   git commit -m "Initial SkillVerse site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. On GitHub, go to your repository's **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Choose the `main` branch and the `/ (root)` folder, then click **Save**.
5. After a minute or two, your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`

No build command is required since this is a static, framework-free site.

## Notes on resources

Every learning resource listed (freeCodeCamp, MDN, W3Schools, CodeWithHarry,
GitHub, GitHub Pages, Canva, Canva Design School, Photopea, Adobe Express,
DaVinci Resolve, Blackmagic training, VN Video Editor, YouTube Creator
Academy, Tinkercad, Onshape, Fiverr, Upwork, LinkedIn, Google Docs, Google
Sheets) links to each service's real, official site. Pricing is labeled
free, freemium, or "check current pricing" where it can change — always
confirm current pricing and platform age requirements directly on the
service's own site before signing up.
