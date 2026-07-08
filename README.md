# Portfolio — Konner Rigby

A static site (plain HTML/CSS/JS, no build step) so it deploys on Vercel with zero config.
Theme: an original "Trainer Card / Dex" concept inspired by handheld game UI —
no Nintendo/Game Freak logos, fonts, or character art are used, just the shape of
the idea (trainer card, dex entries, type badges, stat bars).

# Hard Rules 

Do not change anything about the links already provided for contact.
Do not add accent marks to resume.
Do not put "Add if applicable" or anything similar to stats. 

## File structure
```
portfolio/
├── index.html    ← all page content lives here
├── styles.css    ← design tokens + all styling
├── script.js     ← tiny nav-highlight script, nothing else
└── README.md     ← this file
```

## Deploy to Vercel (fastest path)

1. Create a new GitHub repo and push this folder to it:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com), sign in with GitHub.
3. Click **Add New → Project**, select your repo.
4. Framework preset: choose **Other** (plain HTML, no build command needed).
5. Click **Deploy**. You'll get a live URL like `your-name.vercel.app` in under a minute.
6. Optional: add a custom domain later under Project → Settings → Domains.

Every time you `git push` after this, Vercel auto-redeploys.

## Page structure

- **Trainer Card (hero)** — your name, status, quick facts.
- **The Dex** — your actual CS projects (class projects + hackathon), the main content.
  Each project is a "Dex Entry" with a number, a type badge, a status, description,
  tools used, and links.
- **Side Quest** — a small, secondary spot for the PFAS research (kept short on purpose,
  since projects are the focus).
- **Trainer Profile (about)** — short bio + quick facts table.
- **Stats** — skill bars (self-rated, not a ranking) plus a couple of tool/professional lists.
- **Contact** — email, phone, links.

## What to edit first

1. **Replace the three placeholder Dex entries** in `index.html` — search for
   `[Project Name]`, `[Hackathon Project Name]`, and `[Class Project Name]` — with your
   real projects. Keep the structure: number, type badge, status, description, stack, links.
2. **Type badges** currently used: `CODE`, `SPEEDRUN` (hackathon-style/time-boxed builds),
   `RESEARCH`. Add more in `styles.css` under `.type-*` if you want categories like
   `WEB`, `DATA`, `GAME`, etc. — just add a new class following the same pattern.
3. **Status tags**: `In Progress`, `Hackathon` exist now — add `Shipped` or `Archived`
   the same way if useful.
4. **Add real links** — swap `#` for your GitHub, LinkedIn, Devpost, and a `resume.pdf`
   dropped into this folder.
5. **Stat bar percentages** in the Stats section are self-rated placeholders — adjust the
   `width` values to whatever feels honest.

## Adding a new Dex entry (copy/paste template)

```html
<article class="dex-entry">
  <div class="dex-head">
    <span class="dex-num">#004</span>
    <span class="dex-type type-code">CODE</span>
    <span class="dex-status status-progress">In Progress</span>
  </div>
  <h3 class="dex-title">Project Name</h3>
  <p class="dex-desc">What it does and why it exists, in plain terms.</p>
  <div class="dex-stack">
    <span>Tool 1</span><span>Tool 2</span>
  </div>
  <div class="dex-links">
    <a href="https://github.com/...">Code →</a>
  </div>
</article>
```

## Design notes

- Palette and type ("Press Start 2P" for pixel-style headings, JetBrains Mono for all
  data/labels, Public Sans for body) are original choices evoking handheld-game UI
  without copying any specific game's actual assets.
- Kept animation minimal (no page-load sequence) so it reads as a considered choice,
  not a gimmick — the theme carries the personality, not motion effects.