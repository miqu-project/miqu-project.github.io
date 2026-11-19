<p align="center">
  <img src="assets/logo.png" alt="Miqu Project Logo" width="160" />
</p>

# miqu-project.github.io

> **Official website and documentation portal for the Miqu Wayland Desktop Ecosystem.**

Live Website: **[https://miqu-project.github.io](https://miqu-project.github.io)**  
Source Monorepo: **[https://github.com/miqu-project/miqu](https://github.com/miqu-project/miqu)**

---

### What is this?
This repository hosts the static landing page, architecture visualizer, and component documentation for the Miqu desktop environment and mobile companion applications. It is served automatically via GitHub Pages.

### What is What
- **Landing & UI Visualizer**: Interactive showcase of the desktop shell, native applications, and dynamic theme system.
- **Architectural Specifications**: In-depth breakdowns of the wlroots compositor (`miquland`), C++20 UI toolkit (`miqutoolkit`), and IPC contracts.
- **Component Directory**: Direct links and specifications for all 14 shell and desktop apps, plus Android companions.

### Local Development / Preview
Serve with Python 3:
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.
