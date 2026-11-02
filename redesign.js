(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  const yearElement = document.getElementById('year');
  const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
  const bookingTriggers = document.querySelectorAll('[data-open-booking]');

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const closeDropdowns = () => {
    dropdownToggles.forEach((toggle) => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.closest('.nav-dropdown')?.classList.remove('open');
    });
  };

  const closeMobileNav = () => {
    if (siteNav && siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
      document.documentElement.classList.remove('nav-open');
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
    closeDropdowns();
  };

  const openDropdown = (dropdown, toggle) => {
    if (!dropdown || !toggle) return;
    dropdown.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');

    dropdownToggles.forEach((otherToggle) => {
      if (otherToggle !== toggle) {
        otherToggle.setAttribute('aria-expanded', 'false');
        otherToggle.closest('.nav-dropdown')?.classList.remove('open');
      }
    });
  };

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.documentElement.classList.toggle('nav-open', isOpen);
      if (!isOpen) {
        closeDropdowns();
      }
    });

    const DROPDOWN_CLOSE_DELAY = 500;

    dropdownToggles.forEach((toggle) => {
      const dropdown = toggle.closest('.nav-dropdown');
      if (!dropdown) return;

      let closeTimer = null;

      toggle.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        clearTimeout(closeTimer);

        const isOpen = dropdown.classList.contains('open');
        if (isOpen) {
          dropdown.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        } else {
          openDropdown(dropdown, toggle);
        }
      });

      dropdown.addEventListener('mouseenter', () => {
        if (window.innerWidth > 860) {
          clearTimeout(closeTimer);
          openDropdown(dropdown, toggle);
        }
      });

      dropdown.addEventListener('mouseleave', () => {
        if (window.innerWidth > 860) {
          clearTimeout(closeTimer);
          closeTimer = setTimeout(() => {
            dropdown.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
          }, DROPDOWN_CLOSE_DELAY);
        }
      });
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!siteNav.contains(target) && !navToggle.contains(target)) {
        closeMobileNav();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 860) {
        siteNav.classList.remove('open');
        document.documentElement.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;

      const openDropdownToggle = Array.from(dropdownToggles).find(
        (toggle) => toggle.getAttribute('aria-expanded') === 'true'
      );
      const wasMobileNavOpen = siteNav.classList.contains('open');

      closeMobileNav();

      if (openDropdownToggle) {
        openDropdownToggle.focus();
      } else if (wasMobileNavOpen) {
        navToggle.focus();
      }
    });
  }

  class Carousel {
    constructor(containerSelector) {
      this.container = document.querySelector(containerSelector);
      if (!this.container) return;

      this.slides = this.container.querySelectorAll('.carousel-slide, .gallery-slide');
      if (!this.slides.length) return;

      this.dots = this.container.querySelectorAll('.dot');
      this.prevBtn = this.container.querySelector('.carousel-prev');
      this.nextBtn = this.container.querySelector('.carousel-next');
      this.currentIndex = 0;
      this.autoPlayInterval = null;

      if (this.prevBtn && this.nextBtn) {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
      }

      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => this.goToSlide(index));
      });

      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (containerSelector === '.hero-carousel' && !this.prefersReducedMotion) {
        this.startAutoPlay();
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => {
          if (!this.container.contains(document.activeElement)) {
            this.startAutoPlay();
          }
        });
        this.container.addEventListener('focusin', () => this.stopAutoPlay());
        this.container.addEventListener('focusout', () => this.startAutoPlay());
      }

      this.updateSlides();
    }

    updateSlides() {
      this.slides.forEach((slide, index) => {
        const isActive = index === this.currentIndex;
        slide.classList.toggle('active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
      });

      this.dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentIndex);
      });
    }

    next() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.updateSlides();
    }

    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.updateSlides();
    }

    goToSlide(index) {
      this.currentIndex = index;
      this.updateSlides();
    }

    startAutoPlay() {
      this.stopAutoPlay();
      this.autoPlayInterval = window.setInterval(() => this.next(), 5500);
    }

    stopAutoPlay() {
      if (this.autoPlayInterval) {
        window.clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    }
  }

  new Carousel('.hero-carousel');
  new Carousel('.gallery-carousel');

  // GA4 events: call_click, book_click, form_submit.
  const trackEvent = (name, element) => {
    if (typeof window.gtag !== 'function') return;
    let location = 'page';
    if (element.closest('.mobile-action-bar')) location = 'sticky_bar';
    else if (element.closest('.hero')) location = 'hero';
    else if (element.closest('.site-header')) location = 'header';
    else if (element.closest('.site-footer')) location = 'footer';
    window.gtag('event', name, { link_location: location, page_path: window.location.pathname });
  };

  const BOOKING_URL = 'https://zaukusmobiledetailing.fieldd.co';

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href.startsWith('tel:')) {
      trackEvent('call_click', link);
    } else if (href.startsWith(BOOKING_URL) || /(^|\/)book-online\.html/.test(href)) {
      trackEvent('book_click', link);
    }
  });

  bookingTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      trackEvent('book_click', trigger);
      window.open(BOOKING_URL, '_blank', 'noopener');
    });
  });

  // Third-party scripts load only when needed, to keep phones fast.
  const loadScript = (src) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    document.head.appendChild(script);
    return script;
  };

  // Lead form: load when the visitor scrolls within ~1.5 screens of it.
  const leadForms = document.querySelectorAll('fieldd-lead-form');
  let leadFormRequested = false;

  const watchFormSubmits = () => {
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      leadForms.forEach((form) => {
        if (form.shadowRoot && !form.dataset.submitTracked) {
          form.dataset.submitTracked = 'true';
          form.shadowRoot.addEventListener('submit', () => trackEvent('form_submit', form));
        }
      });
      const allTracked = Array.from(leadForms).every((form) => form.dataset.submitTracked);
      if (allTracked || tries > 60) window.clearInterval(timer);
    }, 500);
  };

  const loadLeadForm = () => {
    if (leadFormRequested) return;
    leadFormRequested = true;
    loadScript('https://fieldd.me/lead-form').addEventListener('load', watchFormSubmits);
  };

  if (leadForms.length) {
    if ('IntersectionObserver' in window) {
      const formObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          formObserver.disconnect();
          loadLeadForm();
        }
      }, { rootMargin: '1200px 0px' });
      leadForms.forEach((form) => formObserver.observe(form));
    } else {
      window.addEventListener('load', loadLeadForm);
    }
  }

  // Other lazy third-party widgets (e.g. Elfsight reviews): <div data-lazy-script="url">.
  document.querySelectorAll('[data-lazy-script]').forEach((element) => {
    const load = () => loadScript(element.getAttribute('data-lazy-script'));
    if (!('IntersectionObserver' in window)) {
      window.addEventListener('load', load);
      return;
    }
    const widgetObserver = new IntersectionObserver((entries, obs) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        obs.disconnect();
        load();
      }
    }, { rootMargin: '800px 0px' });
    widgetObserver.observe(element);
  });

  // Fieldd's floating booking pill is hidden on phones (the sticky bar covers booking),
  // so only desktop loads it, after the page has finished loading.
  if (window.matchMedia('(min-width: 861px)').matches) {
    window.addEventListener('load', () => {
      window.setTimeout(() => {
        loadScript('https://d3vun76hlrxgjr.cloudfront.net').addEventListener('load', () => {
          if (window.FielddBooking) window.FielddBooking.init('5Hx4Xp');
        });
      }, 1500);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href === '#top') return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.service-card, .faq-item, .process-step, .seo-card, .trust-item, .hub-tile').forEach((element) => {
      element.classList.add('reveal-item');
      observer.observe(element);
    });
  }

  const heroSection = document.querySelector('.hero');
  const scrollCue = document.querySelector('.scroll-cue');

  if (heroSection && scrollCue) {
    if ('IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          scrollCue.classList.toggle('is-hidden', entry.intersectionRatio < 0.6);
        });
      }, { threshold: [0, 0.6, 1] });
      heroObserver.observe(heroSection);
    }

    scrollCue.addEventListener('click', () => {
      heroSection.nextElementSibling?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
})();
