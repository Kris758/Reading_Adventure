# Reading Adventure

A kid-friendly reading game: explore worlds, answer comprehension questions, earn coins and XP, and rank up.

**Live site (after Pages is enabled):** [https://kris758.github.io/Reading_Adventure/](https://kris758.github.io/Reading_Adventure/)

## Play on iPad

Open the live link in Safari. For fullscreen play, use **Share → Add to Home Screen**.

## Host on GitHub Pages

This repo is set up for [GitHub Pages](https://pages.github.com/) with a project site at `/Reading_Adventure/`.

### One-time setup

1. Push this repository to GitHub (`main` branch).
2. On GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` (or run the **Deploy to GitHub Pages** workflow manually under **Actions**).

The workflow in `.github/workflows/pages.yml` publishes the site root (`index.html`, `style.css`, `js/`, `data/`). The `.nojekyll` file tells GitHub not to run Jekyll, so all static files are served as-is.

### After deploy

- Site URL: `https://<your-github-username>.github.io/Reading_Adventure/`
- Deployments usually appear within 1–2 minutes after the workflow finishes.

## Run locally

ES modules require a local server (opening `index.html` as a file will not work in most browsers).

```bash
# Python 3
python -m http.server 8080

# Or Node (npx)
npx --yes serve .
```

Then open `http://localhost:8080` (or the port shown).

## Project structure

```
index.html          # App shell
style.css           # Styles (iPad-friendly)
data/               # Worlds, questions, config
js/                 # Game logic, UI, audio, storage
.github/workflows/  # GitHub Pages deploy
```

## Tech

- Vanilla HTML, CSS, and JavaScript (ES modules)
- No build step — what you see is what gets deployed
- Progress saved in the browser (`localStorage`)
