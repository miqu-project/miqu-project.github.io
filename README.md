<p align="center">
  <img src="assets/logo.png" alt="Miqu Project Logo" width="160" />
</p>

# miqu-project.github.io

Official public website and documentation portal for the [**Miqu Project**](https://github.com/miqu-project/miqu).

Live site: **[https://miqu-project.github.io](https://miqu-project.github.io)**

---

## 🌐 Overview

This repository hosts the static landing page, architecture visualizer, and component directory for the Miqu Wayland desktop ecosystem and native companion mobile applications.

It is automatically published via [GitHub Pages](https://pages.github.com/).

---

## 💻 Local Development / Preview

Because this is a zero-dependency static web application, you can preview the website locally using any standard static file server:

### Python 3
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### Node.js (`npx serve`)
```bash
npx serve .
```

---

## 🏛️ Ecosystem Repositories

- [**`miqu`**](https://github.com/miqu-project/miqu) — Umbrella orchestrator & desktop meta-repository
- [**`miquland`**](https://github.com/miqu-project/miquland) — Wayland compositor & window manager
- [**`miqutoolkit`**](https://github.com/miqu-project/miqutoolkit) — C++20 UI framework and application development toolkit
- [**`miqu-linux-apps`**](https://github.com/miqu-project/miqu-linux-apps) — Native desktop application suite
- [**`miqu-android`**](https://github.com/miqu-project/miqu-android) — Native Android companion applications
