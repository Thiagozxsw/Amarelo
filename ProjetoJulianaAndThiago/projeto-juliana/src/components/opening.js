import { content } from '../content.js';

function openingFlowerSvg() {
  return `
    <svg class="opening-flower" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3">
        <path d="M60 20 C68 28 71 36 66 43 C62 49 53 49 49 43 C44 36 47 28 60 20 Z" fill="var(--color-honey)" />
        <path d="M100 60 C92 68 84 71 77 66 C71 62 71 53 77 49 C84 44 92 47 100 60 Z" fill="var(--color-honey)" />
        <path d="M60 100 C52 92 49 84 54 77 C58 71 67 71 71 77 C76 84 73 92 60 100 Z" fill="var(--color-honey)" />
        <path d="M20 60 C28 52 36 49 43 54 C49 58 49 67 43 71 C36 76 28 73 20 60 Z" fill="var(--color-honey)" />
      </g>
      <circle cx="60" cy="60" r="18" fill="var(--color-amber)" />
      <circle cx="60" cy="60" r="8" fill="var(--color-honey)" />
    </svg>
  `;
}

export function createOpening() {
  const section = document.createElement('section');
  section.className = 'opening';

  section.setAttribute('aria-label', 'Abertura do site');

  section.innerHTML = `
    ${openingFlowerSvg()}
    <h1 id="opening-title">${content.name}</h1>
    <p class="opening-tagline">${content.tagline}</p>
    <p id="opening-extra" class="opening-extra" hidden>Seu jeito alegre e sorridente que leva luz para perto de você.</p>
    <button id="enter-btn" type="button" aria-expanded="false" aria-controls="opening-extra">Descobrir</button>
  `;

  return section;
}
