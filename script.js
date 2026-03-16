/* ===========================
   script.js
   K9Elite - Dog Training Los Angeles
=========================== */

(function () {
  'use strict';

  /* -- Hamburger / Mobile Menu -- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const navbar = document.getElementById('navbar');

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('active');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on overlay click
  mobileOverlay.addEventListener('click', closeMenu);

  // Close on mobile link click
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* -- Back to Top -- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 800) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  /* -- Navbar Scroll Effect -- */
  function handleScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* -- Active Nav Link Highlighting -- */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (link) {
          link.classList.remove('active-link');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active-link');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    observer.observe(section);
  });

  /* -- Smooth Scroll for all anchor links -- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  /* -- Scroll-reveal Animations (Intersection Observer) -- */
  const revealElements = document.querySelectorAll(
    '.service-card, .program-card, .trainer-card, .blog-card, .stat-item, .working-content, .working-image, .approach-card, .review-card, .faq-item, .footer-brand, .footer-links, .footer-instagram, .footer-cta'
  );

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(function (el) {
    el.classList.add('reveal-on-scroll');
    revealObserver.observe(el);
  });


  /* -- Hero background slider -- */
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let heroIndex = 0;
    setInterval(function () {
      heroSlides[heroIndex].classList.remove('is-active');
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add('is-active');
    }, 5200);
  }

  /* -- Pause ticker on hover -- */
  const ticker = document.querySelector('.ticker-track');
  if (ticker) {
    const tickerWrapper = document.querySelector('.ticker-wrapper');
    tickerWrapper.addEventListener('mouseenter', function () {
      ticker.style.animationPlayState = 'paused';
    });
    tickerWrapper.addEventListener('mouseleave', function () {
      ticker.style.animationPlayState = 'running';
    });
  }

  /* -- Image placeholder color fill (for missing images) -- */
  const allImages = document.querySelectorAll('img[src*="placeholder"]');
  const placeholderColors = [
    'linear-gradient(135deg, #e8e0f5 0%, #c8b8e8 100%)',
    'linear-gradient(135deg, #dde8f5 0%, #b8cce8 100%)',
    'linear-gradient(135deg, #e8f0e0 0%, #c8e0b8 100%)',
    'linear-gradient(135deg, #f5e8e0 0%, #e8c8b8 100%)',
  ];

  allImages.forEach(function (img, i) {
    img.style.background = placeholderColors[i % placeholderColors.length];
    img.style.minHeight = img.style.minHeight || '80px';

    img.addEventListener('error', function () {
      this.style.background = placeholderColors[i % placeholderColors.length];
      this.alt = this.alt || 'Dog training image placeholder';
    });
  });

})();

/* -- CSS for scroll reveal (injected via JS to keep style.css clean) -- */
(function injectRevealStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .reveal-on-scroll {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .reveal-on-scroll.revealed {
      opacity: 1;
      transform: translateY(0);
    }
    .nav-links a.active-link {
      color: var(--purple);
    }
    .nav-links a.active-link::after {
      width: 100%;
    }
  `;
  document.head.appendChild(style);
})();

