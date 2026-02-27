/* ==========================================
   MOTO JOVE MOLINS - JavaScript Principal
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // LANGUAGE SYSTEM
  // ==========================================
  const defaultLang = localStorage.getItem('mjLang') || 'es';
  document.body.classList.add('lang-' + defaultLang);

  function setLang(lang) {
    document.body.classList.remove('lang-es', 'lang-cat');
    document.body.classList.add('lang-' + lang);
    localStorage.setItem('mjLang', lang);
    // Update active buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  // Init lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === defaultLang);
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  // ==========================================
  // STICKY HEADER
  // ==========================================
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // ==========================================
  // HAMBURGER MENU
  // ==========================================
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-overlay');

  function closeMenu() {
    hamburger && hamburger.classList.remove('open');
    mobileNav && mobileNav.classList.remove('open');
    overlay && overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  function openMenu() {
    hamburger && hamburger.classList.add('open');
    mobileNav && mobileNav.classList.add('open');
    overlay && overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.contains('open') ? closeMenu() : openMenu();
    });
  }
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close mobile nav on link click
  document.querySelectorAll('.mobile-nav a, .mobile-nav button').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ==========================================
  // SMOOTH SCROLL FOR ANCHORS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // SCHEDULE MODAL
  // ==========================================
  const scheduleModal = document.getElementById('scheduleModal');
  const scheduleOpenBtns = document.querySelectorAll('[data-open-schedule]');
  const scheduleClose = document.querySelector('.modal-close');

  function openSchedule() {
    scheduleModal && scheduleModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeSchedule() {
    scheduleModal && scheduleModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  scheduleOpenBtns.forEach(btn => btn.addEventListener('click', e => {
    e.preventDefault();
    openSchedule();
  }));
  if (scheduleClose) scheduleClose.addEventListener('click', closeSchedule);
  if (scheduleModal) {
    scheduleModal.addEventListener('click', e => {
      if (e.target === scheduleModal) closeSchedule();
    });
  }

  // ==========================================
  // COOKIE BANNER
  // ==========================================
  const cookieBanner = document.querySelector('.cookie-banner');
  const cookieAccept = document.getElementById('cookieAccept');

  if (!localStorage.getItem('mjCookies')) {
    setTimeout(() => {
      cookieBanner && cookieBanner.classList.add('active');
    }, 1500);
  }

  if (cookieAccept) {
    cookieAccept.addEventListener('click', () => {
      localStorage.setItem('mjCookies', 'accepted');
      cookieBanner && cookieBanner.classList.remove('active');
    });
  }

  // ==========================================
  // LEGAL MODALS
  // ==========================================
  document.querySelectorAll('[data-open-legal]').forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.preventDefault();
      const targetId = trigger.dataset.openLegal;
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  document.querySelectorAll('.legal-modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay || e.target.closest('.modal-close')) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // ==========================================
  // SCROLL REVEAL ANIMATIONS
  // ==========================================
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ==========================================
  // ACTIVE NAV LINK HIGHLIGHT ON SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    const scrollPos = window.scrollY + 200;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav);

  // ==========================================
  // CONTACT FORM HANDLING
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const lang = document.body.classList.contains('lang-cat') ? 'cat' : 'es';
      const msg = lang === 'cat'
        ? 'Gràcies pel teu missatge! Et contactarem aviat.'
        : '¡Gracias por tu mensaje! Te contactaremos pronto.';

      // Simple visual feedback
      const btn = contactForm.querySelector('button[type="submit"]');
      const origText = btn.innerHTML;
      btn.innerHTML = lang === 'cat' ? '✓ Enviat!' : '✓ ¡Enviado!';
      btn.style.background = '#27ae60';
      setTimeout(() => {
        btn.innerHTML = origText;
        btn.style.background = '';
        contactForm.reset();
      }, 2500);
    });
  }

  // ==========================================
  // FLOATING BUTTON - SCROLL TO CONTACT
  // ==========================================
  const floatingBtn = document.querySelector('.floating-btn');
  if (floatingBtn) {
    floatingBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        const offset = header ? header.offsetHeight : 0;
        const top = contactSection.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }

  // ==========================================
  // ESC KEY TO CLOSE MODALS
  // ==========================================
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeSchedule();
      closeMenu();
      document.querySelectorAll('.legal-modal-overlay.active').forEach(m => {
        m.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  });
});
