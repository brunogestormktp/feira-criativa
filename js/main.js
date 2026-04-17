(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initEntrada();
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initLightbox();
    initHeroScroll();
    initHeroSlideshow();
  });

  function initEntrada() {
    var loading = document.getElementById('loadingScreen');
    if (!loading) return;
    setTimeout(function () {
      loading.classList.add('hidden');
    }, 2200);
  }

  function initNavbar() {
    var header = document.querySelector('.header');
    if (!header) return;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  function initMobileMenu() {
    var toggle = document.querySelector('.nav__toggle');
    var menu = document.querySelector('.mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      menu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        menu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });

    document.addEventListener('click', function (e) {
      if (menu.classList.contains('active') && !menu.contains(e.target) && !toggle.contains(e.target)) {
        toggle.classList.remove('open');
        menu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  }

  function initScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    var lbImg = lightbox.querySelector('img');
    var closeBtn = lightbox.querySelector('.lightbox__close');

    document.querySelectorAll('[data-lightbox]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var src = el.getAttribute('data-lightbox') || el.querySelector('img').src;
        lbImg.src = src;
        lightbox.classList.add('active');
        document.body.classList.add('no-scroll');
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.classList.remove('no-scroll');
      lbImg.src = '';
    }

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  function initHeroScroll() {
    var scrollEl = document.querySelector('.hero__scroll');
    if (!scrollEl) return;
    scrollEl.addEventListener('click', function () {
      var sobre = document.querySelector('.sobre');
      if (sobre) sobre.scrollIntoView({ behavior: 'smooth' });
    });
  }

  function initHeroSlideshow() {
    var slides = document.querySelectorAll('.hero__slide');
    if (slides.length < 2) return;
    var current = 0;
    setInterval(function () {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 5000);
  }
})();
