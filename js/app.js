// miqu-project shared interactive behaviors (theme toggle, clipboard, lightbox)
(function () {
  // ---------------------------------------------------------
  // 1. Light / Dark Theme Toggle
  // ---------------------------------------------------------
  var themeToggle = document.getElementById('theme-toggle');
  var themeIcon = document.getElementById('theme-icon');
  var themeLabel = document.getElementById('theme-label');

  function syncThemeButton() {
    if (!themeIcon || !themeLabel) return;
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    if (current === 'dark') {
      themeIcon.innerHTML = '&#9728;';
      themeLabel.textContent = 'Light';
    } else {
      themeIcon.innerHTML = '&#9790;';
      themeLabel.textContent = 'Dark';
    }
  }

  syncThemeButton();

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try {
        localStorage.setItem('miqu-theme', next);
      } catch (e) {
        // Ignore storage restrictions
      }
      syncThemeButton();
    });
  }

  // ---------------------------------------------------------
  // 2. Copy to Clipboard & Toast
  // ---------------------------------------------------------
  var toast = document.getElementById('toast');
  var toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 2400);
  }

  function copyText(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (err) {
      ok = false;
    }
    document.body.removeChild(ta);
    return ok;
  }

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-copy');
      var el = document.getElementById(id);
      if (!el) return;
      if (copyText(el.innerText.trim())) {
        var orig = btn.textContent;
        btn.textContent = 'Copied';
        btn.classList.add('copied');
        showToast('Copied to clipboard');
        setTimeout(function () {
          btn.textContent = orig;
          btn.classList.remove('copied');
        }, 1800);
      }
    });
  });

  // Clickable component names in table (Home page)
  var pkgStatus = document.getElementById('pkg-status');
  document.querySelectorAll('.pkg-btn[data-build]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pkg = btn.getAttribute('data-build');
      var cmd = './make.sh ' + pkg;
      if (copyText(cmd)) {
        if (pkgStatus) {
          pkgStatus.innerHTML = 'Copied build command: <code>' + cmd + '</code>';
        }
        showToast('Copied: ' + cmd);
      }
    });
  });

  // ---------------------------------------------------------
  // 3. Screenshot Fallback & Lightbox (Home page)
  // ---------------------------------------------------------
  window.handleShotError = function (img, fallbackUrl, label) {
    if (!img.dataset.triedFallback && fallbackUrl) {
      img.dataset.triedFallback = '1';
      img.src = fallbackUrl;
    } else if (!img.dataset.triedPlaceholder) {
      img.dataset.triedPlaceholder = '1';
      img.src =
        'https://placehold.co/1200x675/141e30/94a3b8?text=' +
        encodeURIComponent('miqu-project ' + label);
    }
  };

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src, fallbackUrl) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.dataset.triedFallback = '';
    lightboxImg.onerror = function () {
      if (!lightboxImg.dataset.triedFallback && fallbackUrl) {
        lightboxImg.dataset.triedFallback = '1';
        lightboxImg.src = fallbackUrl;
      }
    };
    lightboxImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.shot-card[data-shot]').forEach(function (card) {
    card.addEventListener('click', function () {
      var img = card.querySelector('img');
      var currentSrc = img && img.src ? img.src : card.getAttribute('data-shot');
      openLightbox(currentSrc, card.getAttribute('data-fallback'));
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
})();
