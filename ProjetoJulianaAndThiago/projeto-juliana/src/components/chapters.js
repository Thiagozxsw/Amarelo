import { content } from '../content.js';

function createConstellationSection() {
  const section = document.createElement('section');
  section.className = 'chapter chapter-constelacao';

  const constellation = content.constellation || {};
  const title = constellation.title || 'Nossa história em constelação';
  const intro = constellation.intro || 'Toque em uma estrela para descobrir um traço. Sempre dá para voltar.';

  const overviewTitle = constellation.overviewTitle || 'Escolha uma estrela';
  const overviewText = constellation.overviewText || 'A constelação vai mostrando detalhes conforme você toca.';

  const stars = Array.isArray(constellation.stars) ? constellation.stars : [];
  const connections = Array.isArray(constellation.connections) ? constellation.connections : [];

  const starsById = new Map(stars.map(s => [s.id, s]));

  section.innerHTML = `
    <h2>${title}</h2>
    <p>${content.traits.joy}</p>
    <p>${content.traits.kindness}</p>
    <p>${intro}</p>

    <div class="constellation-card">
      <div class="constellation-map" aria-label="Constelação de Contrastes">
        <svg class="constellation-lines" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
          ${connections
            .map((c) => {
              const a = starsById.get(c.from);
              const b = starsById.get(c.to);
              if (!a || !b) return '';
              return `<line class="constellation-line" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" data-a="${a.id}" data-b="${b.id}" />`;
            })
            .join('')}
        </svg>

        ${stars
          .map(
            (star) => `
            <button
              type="button"
              class="star-btn"
              style="left:${star.x}%; top:${star.y}%;"
              data-star-id="${star.id}"
              aria-label="${star.title}"
              aria-pressed="false"
            >
              <svg width="42" height="42" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  d="M12 2l2.7 6.1L21 12l-6.3 3.9L12 22l-2.7-6.1L3 12l6.3-3.9L12 2z"
                  fill="var(--color-honey)"
                  stroke="var(--color-amber)"
                  stroke-width="1.2"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          `
          )
          .join('')}
      </div>

      <div class="constellation-list" aria-label="Atalhos para as estrelas">
        ${stars
          .map(
            (star) => `
              <button
                type="button"
                class="star-list-btn"
                data-star-id="${star.id}"
                aria-pressed="false"
              >
                ${star.title}
              </button>
            `
          )
          .join('')}
      </div>

      <div class="constellation-reading" aria-live="polite" aria-atomic="true">
        <h3 class="constellation-reading-title">${overviewTitle}</h3>
        <p class="constellation-reading-text">${overviewText}</p>
      </div>

      <button class="constellation-clear" type="button" hidden>Voltar para visão geral</button>
    </div>
  `;

  const readingTitleEl = section.querySelector('.constellation-reading-title');
  const readingTextEl = section.querySelector('.constellation-reading-text');
  const clearBtn = section.querySelector('.constellation-clear');
  const starButtons = Array.from(section.querySelectorAll('[data-star-id]'));
  const lineEls = Array.from(section.querySelectorAll('.constellation-line'));

  // Se não houver estrelas, mantém um estado consistente e legível.
  if (!starButtons.length) {
    const card = section.querySelector('.constellation-card');
    if (card) {
      card.innerHTML = `
        <div class="constellation-reading" aria-live="polite" aria-atomic="true">
          <h3 class="constellation-reading-title">${overviewTitle}</h3>
          <p class="constellation-reading-text">Por enquanto, a constelação está em silêncio.</p>
        </div>
      `;
    }
    return section;
  }

  let activeStarId = null;

  function setActive(starId) {
    activeStarId = starId;

    const star = starsById.get(starId);
    if (!star) return;

    readingTitleEl.textContent = star.title;
    readingTextEl.textContent = star.text;

    clearBtn.hidden = false;

    starButtons.forEach((btn) => {
      const isActive = btn.dataset.starId === starId;
      btn.classList.toggle('is-selected', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    lineEls.forEach((line) => {
      const a = line.dataset.a;
      const b = line.dataset.b;
      const isActive = a === starId || b === starId;
      line.classList.toggle('is-active', isActive);
    });
  }

  function clearSelection() {
    activeStarId = null;
    readingTitleEl.textContent = overviewTitle;
    readingTextEl.textContent = overviewText;

    clearBtn.hidden = true;

    starButtons.forEach((btn) => {
      btn.classList.remove('is-selected');
      btn.setAttribute('aria-pressed', 'false');
    });

    lineEls.forEach((line) => line.classList.remove('is-active'));
  }

  starButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setActive(btn.dataset.starId);
    });
  });

  clearBtn.addEventListener('click', clearSelection);

  return section;
}

export function createChapters() {
  const container = document.createElement('div');
  container.className = 'chapters-container';

  // Capítulo 2 — Nossa história em constelação
  container.appendChild(createConstellationSection());

  // Capítulo 3 — Dualidade
  const dualidade = document.createElement('section');
  dualidade.className = 'chapter chapter-dualidade';
  dualidade.innerHTML = `
    <h2>Entre a Força e o Carinho</h2>
    <div class="dualidade-content">
      <p class="tough" id="tough-side">${content.traits.strength}</p>
      <p class="sweet" id="sweet-side" hidden>${content.traits.delicacy}</p>
      <button
        class="toggle-dualidade"
        type="button"
        aria-expanded="false"
        aria-controls="sweet-side"
      >Ver lado carinhoso</button>
    </div>
  `;

  // Capítulo 4 — Particularidades (Análises Clínicas)
  const particularidades = document.createElement('section');
  particularidades.className = 'chapter chapter-particularidades';
  particularidades.innerHTML = `
    <h2>Cuidado e Precisão</h2>
    <p>${content.traits.studies}</p>
  `;

  container.append(dualidade, particularidades);
  return container;
}
