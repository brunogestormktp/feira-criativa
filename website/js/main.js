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
    initFeiranteCardSlideshow();
    initFloatBack();
    initFeirantesEditor();
  });

  // Botão flutuante "Voltar para a feira": surge depois de 5s só nas páginas de feirante.
  function initFloatBack() {
    if (!document.querySelector('.feirante-hero')) return;
    if (document.querySelector('.float-back')) return;
    var a = document.createElement('a');
    a.className = 'float-back';
    a.href = '../index.html#feirantes';
    a.innerHTML = '<span class="float-back__arrow" aria-hidden="true">←</span> Voltar';
    document.body.appendChild(a);
    setTimeout(function () { a.classList.add('visible'); }, 5000);
  }

  // Slideshow do card de feirante (home): ao rolar e o card entrar na tela,
  // começa da 1ª foto e troca a cada 3s, em loop até a última.
  function initFeiranteCardSlideshow() {
    var boxes = document.querySelectorAll('[data-slideshow]');
    if (!boxes.length) return;

    boxes.forEach(function (box) {
      var imgs = box.querySelectorAll('img');
      if (imgs.length < 2) return;
      var idx = 0;
      var timer = null;

      function show(i) {
        for (var k = 0; k < imgs.length; k++) {
          imgs[k].classList.toggle('is-active', k === i);
        }
      }
      function start() {
        if (timer) return;
        idx = 0;
        show(0);
        timer = setInterval(function () {
          idx = (idx + 1) % imgs.length;
          show(idx);
        }, 3000);
      }
      function stop() {
        if (timer) { clearInterval(timer); timer = null; }
      }

      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { start(); } else { stop(); }
          });
        }, { threshold: 0.4 });
        io.observe(box);
      } else {
        start();
      }
    });
  }

  function initEntrada() {
    var loading = document.getElementById('loadingScreen');
    if (!loading) return;
    // Marca que o loading já apareceu nesta sessão (o <head> usa isso pra não repetir).
    try { sessionStorage.setItem('feiraLoadingShown', '1'); } catch (e) {}
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

  function initFeirantesEditor() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('editor') !== 'feirantes') return;

    var cards = Array.prototype.slice.call(document.querySelectorAll('#feirantes .feirante-card'));
    if (!cards.length) return;

    document.body.classList.add('feirantes-editor-on');
    var loading = document.getElementById('loadingScreen');
    if (loading) loading.classList.add('hidden');

    var labels = ['Gabriela', 'Carla', 'Dalvana', 'Vivianne', 'Vera', 'Nina'];
    var controls = [
      { key: '--feirante-card-top-space', label: 'Card: espaço acima da imagem', min: 60, max: 280, step: 1, unit: 'px' },
      { key: '--feirante-card-padding-x', label: 'Card: respiro lateral', min: 0, max: 42, step: 1, unit: 'px' },
      { key: '--feirante-card-padding-bottom', label: 'Card: respiro inferior', min: 0, max: 80, step: 1, unit: 'px' },
      { key: '--feirante-card-hover-y', label: 'Card: hover sobe/desce', min: -24, max: 8, step: 1, unit: 'px' },
      { key: '--feirante-guarda-left', label: 'Guarda-chuva: mover X base', min: 0, max: 100, step: 1, unit: '%' },
      { key: '--feirante-guarda-top', label: 'Guarda-chuva: mover Y base', min: -160, max: 120, step: 1, unit: 'px' },
      { key: '--feirante-guarda-width', label: 'Guarda-chuva: largura', min: 60, max: 320, step: 1, unit: '%' },
      { key: '--feirante-guarda-height', label: 'Guarda-chuva: altura', min: 60, max: 520, step: 1, unit: 'px' },
      { key: '--feirante-guarda-scale', label: 'Guarda-chuva: escala final', min: 0.35, max: 2.4, step: 0.01, unit: '' },
      { key: '--feirante-guarda-x', label: 'Guarda-chuva: ajuste fino X', min: -140, max: 60, step: 1, unit: '%' },
      { key: '--feirante-guarda-y', label: 'Guarda-chuva: ajuste fino Y', min: -140, max: 180, step: 1, unit: 'px' },
      { key: '--feirante-guarda-opacity', label: 'Guarda-chuva: opacidade', min: 0, max: 1, step: 0.01, unit: '' },
      { key: '--feirante-guarda-z', label: 'Guarda-chuva: camada', min: 0, max: 10, step: 1, unit: '' },
      { key: '--feirante-placeholder-z', label: 'Imagem: camada', min: 0, max: 12, step: 1, unit: '' },
      { key: '--feirante-placeholder-x', label: 'Imagem: mover X', min: -80, max: 80, step: 1, unit: 'px' },
      { key: '--feirante-placeholder-y', label: 'Imagem: mover Y', min: -80, max: 120, step: 1, unit: 'px' },
      { key: '--feirante-placeholder-scale', label: 'Imagem: escala', min: 0.5, max: 1.8, step: 0.01, unit: '' },
      { key: '--feirante-placeholder-border-width', label: 'Imagem: borda madeira', min: 0, max: 24, step: 1, unit: 'px' },
      { key: '--feirante-placeholder-border-bottom-width', label: 'Imagem: base madeira', min: 0, max: 36, step: 1, unit: 'px' },
      { key: '--feirante-placeholder-front-height', label: 'Imagem: faixa frontal', min: 0, max: 90, step: 1, unit: 'px' },
      { key: '--feirante-body-margin-x', label: 'Texto: largura lateral', min: 0, max: 44, step: 1, unit: 'px' },
      { key: '--feirante-balcao-left', label: 'Balcão: expandir esquerda', min: -60, max: 20, step: 1, unit: 'px' },
      { key: '--feirante-balcao-right', label: 'Balcão: expandir direita', min: -60, max: 20, step: 1, unit: 'px' },
      { key: '--feirante-balcao-bottom', label: 'Balcão: sobe/desce', min: -90, max: 40, step: 1, unit: 'px' },
      { key: '--feirante-balcao-height', label: 'Balcão: altura', min: 0, max: 180, step: 1, unit: 'px' },
      { key: '--feirante-wood-plank', label: 'Madeira: largura das ripas', min: 4, max: 48, step: 1, unit: 'px' },
      { key: '--feirante-wood-groove', label: 'Madeira: linha escura', min: 6, max: 60, step: 1, unit: 'px' },
      { key: '--feirante-wood-cycle', label: 'Madeira: ciclo da textura', min: 12, max: 90, step: 1, unit: 'px' },
      { key: '--feirante-wood-front-start', label: 'Madeira: início da frente', min: 20, max: 92, step: 1, unit: '%' }
    ];
    var colorControls = [
      { key: '--feirante-wood-light', label: 'Madeira clara' },
      { key: '--feirante-wood-mid', label: 'Madeira média' },
      { key: '--feirante-wood-dark', label: 'Madeira escura' },
      { key: '--feirante-wood-post', label: 'Postes laterais' },
      { key: '--feirante-placeholder-border-color', label: 'Imagem: borda' }
    ];

    var activeIndex = 0;
    var panel = document.createElement('aside');
    panel.className = 'feirantes-editor';
    panel.innerHTML = [
      '<div class="feirantes-editor__top">',
      '<strong>Editor dos cards</strong>',
      '<button type="button" data-close>×</button>',
      '</div>',
      '<p class="feirantes-editor__hint">Clique em um card para selecionar. Mexa nos sliders e copie o CSS final.</p>',
      '<label class="feirantes-editor__field">Card<select data-card></select></label>',
      '<div data-controls></div>',
      '<div class="feirantes-editor__colors" data-colors></div>',
      '<textarea data-output readonly rows="10"></textarea>',
      '<button type="button" data-copy>Copiar CSS do card</button>'
    ].join('');
    document.body.appendChild(panel);

    var select = panel.querySelector('[data-card]');
    var controlsWrap = panel.querySelector('[data-controls]');
    var colorsWrap = panel.querySelector('[data-colors]');
    var output = panel.querySelector('[data-output]');

    labels.forEach(function (label, index) {
      var option = document.createElement('option');
      option.value = String(index);
      option.textContent = (index + 1) + ' ' + label;
      select.appendChild(option);
    });

    controls.forEach(function (control) {
      var row = document.createElement('label');
      row.className = 'feirantes-editor__range';
      row.innerHTML = '<span>' + control.label + '</span><input type="range"><output></output>';
      var input = row.querySelector('input');
      input.min = control.min;
      input.max = control.max;
      input.step = control.step;
      input.dataset.key = control.key;
      input.dataset.unit = control.unit;
      input.addEventListener('input', onControlInput);
      controlsWrap.appendChild(row);
    });

    colorControls.forEach(function (control) {
      var row = document.createElement('label');
      row.className = 'feirantes-editor__color';
      row.innerHTML = '<span>' + control.label + '</span><input type="color">';
      var input = row.querySelector('input');
      input.dataset.key = control.key;
      input.addEventListener('input', onColorInput);
      colorsWrap.appendChild(row);
    });

    select.addEventListener('change', function () {
      activeIndex = parseInt(select.value, 10);
      syncPanel();
    });

    panel.querySelector('[data-close]').addEventListener('click', function () {
      panel.hidden = true;
    });

    panel.querySelector('[data-copy]').addEventListener('click', function () {
      output.select();
      document.execCommand('copy');
    });

    cards.forEach(function (card, index) {
      card.addEventListener('click', function (event) {
        event.preventDefault();
        activeIndex = index;
        select.value = String(index);
        syncPanel();
      });
    });

    syncPanel();
    setTimeout(function () {
      var section = document.getElementById('feirantes');
      if (section) section.scrollIntoView({ block: 'start' });
    }, 100);

    function currentCard() {
      return cards[activeIndex];
    }

    function readValue(key) {
      var card = currentCard();
      var value = card.style.getPropertyValue(key) || getComputedStyle(card).getPropertyValue(key);
      return value.trim();
    }

    function numericValue(raw, fallback) {
      var parsed = parseFloat(String(raw).replace('min(', '').replace('%', '').replace('px', ''));
      return Number.isFinite(parsed) ? parsed : fallback;
    }

    function onControlInput(event) {
      var input = event.target;
      currentCard().style.setProperty(input.dataset.key, input.value + input.dataset.unit);
      syncOutput();
      input.nextElementSibling.textContent = input.value + input.dataset.unit;
    }

    function onColorInput(event) {
      currentCard().style.setProperty(event.target.dataset.key, event.target.value);
      syncOutput();
    }

    function syncPanel() {
      cards.forEach(function (card, index) {
        card.classList.toggle('feirante-card--editing', index === activeIndex);
      });

      controlsWrap.querySelectorAll('input').forEach(function (input) {
        var raw = readValue(input.dataset.key);
        var value = numericValue(raw, input.min);
        input.value = value;
        input.nextElementSibling.textContent = value + input.dataset.unit;
      });

      colorsWrap.querySelectorAll('input').forEach(function (input) {
        var raw = readValue(input.dataset.key);
        input.value = rgbToHex(raw) || '#b97834';
      });

      syncOutput();
    }

    function syncOutput() {
      var card = currentCard();
      var selector = '.feirantes__grid .feirante-card:nth-child(' + (activeIndex + 1) + ')';
      var keys = controls.map(function (item) { return item.key; }).concat(colorControls.map(function (item) { return item.key; }));
      var lines = [selector + ' {'];
      keys.forEach(function (key) {
        var value = card.style.getPropertyValue(key) || readValue(key);
        lines.push('  ' + key + ': ' + value.trim() + ';');
      });
      lines.push('}');
      output.value = lines.join('\n');
    }

    function rgbToHex(value) {
      if (!value) return '';
      if (value.indexOf('#') === 0) return value;
      var match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return '';
      return '#' + [match[1], match[2], match[3]].map(function (part) {
        return parseInt(part, 10).toString(16).padStart(2, '0');
      }).join('');
    }
  }
})();
