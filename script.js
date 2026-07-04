(() => {
  const body = document.body;
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  const yearElement = document.getElementById('year');
  const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
  const bookingTriggers = document.querySelectorAll('[data-open-booking]');
  const bookingModal = document.getElementById('bookingModal');
  const closeControls = document.querySelectorAll('[data-close-booking]');
  const contactForm = document.querySelector('.contact-form');

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
      if (!isOpen) {
        closeDropdowns();
      }
    });

    dropdownToggles.forEach((toggle) => {
      const dropdown = toggle.closest('.nav-dropdown');
      if (!dropdown) return;

      toggle.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        const isOpen = dropdown.classList.contains('open');
        if (isOpen) {
          dropdown.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        } else {
          openDropdown(dropdown, toggle);
        }
      });

      dropdown.addEventListener('mouseenter', () => {
        if (window.innerWidth > 720) {
          openDropdown(dropdown, toggle);
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
      if (!siteNav.contains(target) && target !== navToggle) {
        closeMobileNav();
      }
    });
  }

  class Carousel {
    constructor(containerSelector) {
      this.container = document.querySelector(containerSelector);
      if (!this.container) return;

      this.slides = this.container.querySelectorAll('.carousel-slide, .gallery-slide, .testimonial-slide');
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

      if (containerSelector === '.hero-carousel') {
        this.startAutoPlay();
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
      }

      this.updateSlides();
    }

    updateSlides() {
      this.slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === this.currentIndex);
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
      this.autoPlayInterval = window.setInterval(() => this.next(), 5000);
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
  new Carousel('.testimonials-carousel');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[\d\s\-()]+$/;

      if (!data.name || !data.email || !data.phone || !data.vehicle || !data.service || !data.message || !data.consent) {
        alert('Please fill out all required fields.');
        return;
      }

      if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
      }

      if (!phoneRegex.test(data.phone) || data.phone.length < 10) {
        alert('Please enter a valid phone number.');
        return;
      }

      if (contactForm.getAttribute('netlify')) {
        contactForm.submit();
      } else {
        alert('Thank you for your inquiry! We\'ll get back to you soon.');
        contactForm.reset();
      }
    });
  }

  const openBookingModal = () => {
    if (!bookingModal) return;
    bookingModal.classList.add('open');
    bookingModal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
  };

  const closeBookingModal = () => {
    if (!bookingModal) return;
    bookingModal.classList.remove('open');
    bookingModal.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
  };

  if (bookingModal) {
    bookingTriggers.forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        openBookingModal();
      });
    });

    closeControls.forEach((control) => {
      control.addEventListener('click', closeBookingModal);
    });

    bookingModal.addEventListener('click', (event) => {
      if (event.target === bookingModal) {
        closeBookingModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && bookingModal.classList.contains('open')) {
        closeBookingModal();
      }
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
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 600ms ease forwards';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.service-card, .benefit-item, .faq-item, .step').forEach((element) => {
      element.style.opacity = '0';
      element.style.animation = 'none';
      observer.observe(element);
    });
  }
})();
