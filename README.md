# Xacpant

Official site and release hub for **Xacpant** firmware on **LilyGO T-Embed CC1101 Plus**.

- Site (GitHub Pages): https://Xacpant.github.io/xacpant/
- Firmware source: https://github.com/Xacpant/firmware
- Releases: https://github.com/Xacpant/firmware/releases

Xacpant is a fork inspired by [Bruce](https://github.com/pr3y/Bruce). Credit to the Bruce project and contributors.

## Site files

| Path | Role |
|------|------|
| `index.html` | Landing page (TR/EN) |
| `css/styles.css` | Dark scanline theme |
| `js/app.js` | Language toggle + newest Release fetch from `Xacpant/firmware` |
| `assets/logo.png` | Brand logo |

## Edit the site

1. Clone: `git clone https://github.com/Xacpant/xacpant.git`
2. Edit HTML/CSS/JS
3. `git add -A && git commit -m "Update site" && git push`
4. Pages updates in ~1 minute

## Publish firmware

1. Build your `.bin`
2. GitHub → [Xacpant/firmware](https://github.com/Xacpant/firmware) → **Releases** → **Draft a new release**
3. Tag e.g. `v0.1.0`, upload the `.bin` / `.zip`
4. Site Download button picks the newest release (prereleases included) from `Xacpant/firmware` automatically

## License

Firmware: AGPL-3.0 (see Xacpant/firmware LICENSE). Site license TBD. Bruce credit remains in site About/Credit.
