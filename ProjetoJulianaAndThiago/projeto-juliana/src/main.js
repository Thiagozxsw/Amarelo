import { createOpening } from './components/opening.js';
import { createChapters } from './components/chapters.js';
import { createGarden } from './components/garden.js';
import { createFooter } from './components/footer.js';

const app = document.getElementById('app');

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function setupDualidade() {
  const dualidadeSection = document.querySelector('.chapter-dualidade');
  if (!dualidadeSection) return;

  const toughText = dualidadeSection.querySelector('.tough');
  const sweetText = dualidadeSection.querySelector('.sweet');
  const toggleBtn = dualidadeSection.querySelector('.toggle-dualidade');

  if (!toughText || !sweetText || !toggleBtn) return;

  const sweetId = sweetText.id;
  if (!toggleBtn.hasAttribute('aria-controls') && sweetId) {
    toggleBtn.setAttribute('aria-controls', sweetId);
  }

  let showSweet = false;

  // Estado inicial: mostra lado "forte".
  toughText.hidden = showSweet;
  sweetText.hidden = !showSweet;

  toggleBtn.setAttribute('aria-expanded', 'false');
  toggleBtn.textContent = 'Ver lado carinhoso';

  toggleBtn.addEventListener('click', () => {
    showSweet = !showSweet;

    toughText.hidden = showSweet;
    sweetText.hidden = !showSweet;

    toggleBtn.textContent = showSweet ? 'Ver lado durão' : 'Ver lado carinhoso';
    toggleBtn.setAttribute('aria-expanded', String(showSweet));
  });
}

function setupScrollReveal() {
  const chapters = document.querySelectorAll('.chapter');
  if (!chapters.length) return;

  // Degradação graciosa: sem IntersectionObserver (ou com reduced-motion), mantém tudo visível.
  if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
    chapters.forEach(chapter => chapter.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    }
  }, { threshold: 0.15 });

  chapters.forEach(chapter => observer.observe(chapter));
}

function init() {
  if (!app) return;

  const opening = createOpening();
  app.appendChild(opening);

  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'content-wrapper';
  contentWrapper.hidden = true;

  contentWrapper.appendChild(createChapters());
  contentWrapper.appendChild(createGarden());
  contentWrapper.appendChild(createFooter());

  app.appendChild(contentWrapper);

  const btn = opening.querySelector('#enter-btn');
  const extra = opening.querySelector('#opening-extra');

  if (!btn || !extra) return;

  btn.addEventListener('click', () => {
    const isHidden = extra.hasAttribute('hidden');

    // Primeiro clique: revela o extra e "entra" na experiência.
    if (isHidden) {
      extra.removeAttribute('hidden');
      extra.classList.add('visible');
      btn.setAttribute('aria-expanded', 'true');

      contentWrapper.hidden = false;
      contentWrapper.classList.remove('hidden');

      // Inicializações que dependem dos capítulos no DOM.
      setupDualidade();
      setupScrollReveal();

      // Rolagem suave só se não houver prefers-reduced-motion.
      if (!prefersReducedMotion()) {
        const firstChapter = contentWrapper.querySelector('.chapters-container');
        if (firstChapter) firstChapter.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      btn.blur();
      return;
    }

    // Clique subsequente: apenas recolhe o extra (mantém conteúdo visível).
    extra.setAttribute('hidden', '');
    extra.classList.remove('visible');
    btn.setAttribute('aria-expanded', 'false');
  });
}

init();
