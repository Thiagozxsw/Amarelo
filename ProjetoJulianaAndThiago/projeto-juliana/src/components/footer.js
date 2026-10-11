import { content } from '../content.js';

function finalFlowerSvg() {
  // Decorativo
  return `
    <svg class="final-flower" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <g fill="none" stroke="var(--color-amber)" stroke-width="2">
        <path d="M60 16 C68 30 70 38 60 44 C50 38 52 30 60 16 Z" fill="var(--color-honey)" opacity="0.95"/>
        <path d="M104 60 C90 52 82 50 76 60 C82 70 90 68 104 60 Z" fill="var(--color-honey)" opacity="0.95"/>
        <path d="M60 104 C52 90 50 82 60 76 C70 82 68 90 60 104 Z" fill="var(--color-honey)" opacity="0.95"/>
        <path d="M16 60 C30 68 38 70 44 60 C38 50 30 52 16 60 Z" fill="var(--color-honey)" opacity="0.95"/>
      </g>
      <circle cx="60" cy="60" r="14" fill="var(--color-amber)"/>
      <circle cx="60" cy="60" r="7" fill="var(--color-honey)"/>
    </svg>
  `;
}

export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';

  const musicHtml = `
    <section class="music-section">
      <h2>Uma referência musical</h2>
      <p>A música que combina com você:</p>
      <p><strong>${content.music.title}</strong> - ${content.music.artist}</p>
    </section>
  `;

  let messageHtml = '';
  if (content.personalMessage && content.personalMessage.trim() !== '') {
    messageHtml = `
      <section class="personal-message">
        <h2>Uma mensagem de verdade</h2>
        <p>${content.personalMessage}</p>
      </section>
    `;
  }

  footer.innerHTML = `
    ${musicHtml}
    ${messageHtml}
    ${finalFlowerSvg()}
    <p class="closing">Com todo o carinho.</p>
  `;

  return footer;
}
