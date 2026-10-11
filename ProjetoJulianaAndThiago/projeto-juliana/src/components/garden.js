function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function safeJsonParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function sanitizeJarMessage(raw, { maxLen = 450 } = {}) {
  const text = String(raw ?? '').replace(/\s+/g, ' ').trim();
  if (!text) return '';
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trim();
}

export function computeHoneyLevelPercent(messagesCount, maxLevel = 8) {
  const count = Math.max(0, Number(messagesCount) || 0);
  const clamped = Math.min(count, maxLevel);
  return {
    count,
    maxLevel,
    percent: maxLevel === 0 ? 0 : clamped / maxLevel
  };
}

const STORE_KEY = 'projeto-juliana-jarro-mensagens-v1';

function loadMessages() {
  if (!window.localStorage) return [];

  const raw = window.localStorage.getItem(STORE_KEY);
  if (!raw) return [];

  const parsed = safeJsonParse(raw);
  if (!Array.isArray(parsed)) return [];

  // Normaliza entradas.
  return parsed
    .map((m) => ({
      id: String(m?.id ?? ''),
      text: String(m?.text ?? ''),
      createdAt: Number(m?.createdAt ?? 0)
    }))
    .filter((m) => m.id && m.text && Number.isFinite(m.createdAt));
}

function saveMessages(messages) {
  window.localStorage.setItem(STORE_KEY, JSON.stringify(messages));
}

function formatLocalDateTime(ms) {
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(ms));
  } catch {
    return new Date(ms).toLocaleString();
  }
}

function makeId() {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID();
  }

  return `msg_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function updateHoneyFill(svgRoot, messagesCount) {
  const honey = computeHoneyLevelPercent(messagesCount);

  // Dimensões do "recorte" no viewBox.
  const clipTop = 30;
  const clipHeight = 110;

  const fillHeight = Math.round(honey.percent * clipHeight);
  const y = clipTop + (clipHeight - fillHeight);

  const fillRect = svgRoot.querySelector('.honey-fill');
  if (!fillRect) return;

  fillRect.setAttribute('y', String(y));
  fillRect.setAttribute('height', String(fillHeight));

  const levelText = svgRoot.querySelector('.honey-level-text');
  if (levelText) levelText.textContent = `(${honey.count} de ${honey.maxLevel})`;
}

function setDropVisible(section, isVisible) {
  const drop = section.querySelector('.jar-drop');
  if (!drop) return;

  // Mantém a queda decorativa como estado visual controlado.
  drop.querySelectorAll('circle, path').forEach((el) => {
    el.style.opacity = isVisible ? '0.95' : '0.0';
  });
}

function triggerHoneyDrop(section) {
  if (prefersReducedMotion()) return;

  setDropVisible(section, true);

  section.classList.remove('jar-animate');
  // Reflow para permitir re-trigger.
  void section.offsetWidth;
  section.classList.add('jar-animate');

  window.setTimeout(() => {
    section.classList.remove('jar-animate');
    setDropVisible(section, false);
  }, 900);
}

export function createGarden() {
  const section = document.createElement('section');
  section.className = 'chapter chapter-garden';

  section.innerHTML = `
    <h2>Jarro de Mel</h2>
    <p>Um lugar para deixar pequenas mensagens. Você pode registrar uma gota quando quiser.</p>

    <div class="jar" aria-label="Ilustração do jarro de mel">
      <svg class="jar-svg" viewBox="0 0 120 160" role="img" aria-label="Jarro de mel" focusable="false">
        <defs>
          <clipPath id="jar-clip">
            <rect x="28" y="30" width="64" height="110" rx="26" />
          </clipPath>
        </defs>

        <path d="M42 18H78C83 18 87 22 87 27V33C87 37 84 40 80 40H40C36 40 33 37 33 33V27C33 22 37 18 42 18Z" fill="var(--color-warm-white)" stroke="rgba(255, 191, 0, 0.55)" stroke-width="2"/>
        <path d="M36 40H84C88 40 91 43 91 47V124C91 135 82 144 71 144H49C38 144 29 135 29 124V47C29 43 32 40 36 40Z" fill="var(--color-warm-white)" stroke="rgba(255, 191, 0, 0.55)" stroke-width="2"/>
        <path d="M41 52H79" stroke="rgba(255, 191, 0, 0.4)" stroke-width="2"/>

        <g clip-path="url(#jar-clip)">
          <rect class="honey-fill" x="28" y="140" width="64" height="0" rx="24" fill="var(--color-honey)" opacity="0.95"/>
        </g>

        <path d="M49 144C45 144 41.5 140.8 41.5 136.7V40H58.5V136.7C58.5 140.8 55 144 51 144H49Z" fill="rgba(255, 191, 0, 0.10)" />

        <g class="jar-drop" aria-hidden="true">
          <circle cx="60" cy="46" r="4" fill="var(--color-honey)" opacity="0.0"/>
          <path d="M60 54C60 54 56 58 56 62C56 66 58.5 68 60 68C61.5 68 64 66 64 62C64 58 60 54 60 54Z" fill="var(--color-honey)" opacity="0.0"/>
        </g>

        <text class="honey-level-text" x="60" y="22" text-anchor="middle" fill="rgba(51, 51, 51, 0.65)" font-size="10"></text>
      </svg>
    </div>

    <div class="jar-composer-wrap">
      <button type="button" class="jar-open-btn" aria-expanded="false" aria-controls="jar-composer">Registrar uma gota</button>

      <div id="jar-composer" class="jar-composer" hidden>
        <h3 class="jar-composer-title">Deixar uma mensagem</h3>
        <div class="jar-composer-body">
          <label for="jar-message-input" class="jar-label">Sua gota</label>
          <textarea
            id="jar-message-input"
            rows="4"
            maxlength="450"
            placeholder="Você pode escrever algo curto e verdadeiro..."
          ></textarea>

          <p class="jar-hint">Salvo apenas neste dispositivo.</p>
          <p class="jar-error" role="alert" hidden></p>

          <div class="jar-actions">
            <button type="button" class="jar-review-btn">Revisar</button>
            <button type="button" class="jar-cancel-btn">Voltar</button>
          </div>
        </div>

        <div class="jar-review" hidden>
          <p class="jar-review-label">Prévia</p>
          <p class="jar-preview" id="jar-preview"></p>
          <p class="jar-hint">Se estiver tudo certo, confirme.</p>
          <p class="jar-error jar-error-review" role="alert" hidden></p>
          <div class="jar-actions">
            <button type="button" class="jar-confirm-btn">Confirmar e registrar</button>
            <button type="button" class="jar-edit-btn">Editar</button>
          </div>
          <div class="jar-saving" hidden>Salvando...</div>
        </div>
      </div>

      <p class="jar-status" aria-live="polite" aria-atomic="true"></p>
    </div>

    <div class="jar-history" aria-label="Histórico de mensagens">
      <h3 class="jar-history-title">Histórico</h3>
      <ul class="jar-history-list"></ul>
      <p class="jar-empty" hidden>Por enquanto, o jarro está quieto.</p>
    </div>
  `;

  const openBtn = section.querySelector('.jar-open-btn');
  const composer = section.querySelector('.jar-composer');
  const cancelBtn = section.querySelector('.jar-cancel-btn');
  const reviewBtn = section.querySelector('.jar-review-btn');
  const textarea = section.querySelector('#jar-message-input');
  const errorEl = section.querySelector('.jar-error');

  const reviewPane = section.querySelector('.jar-review');
  const previewEl = section.querySelector('#jar-preview');
  const confirmBtn = section.querySelector('.jar-confirm-btn');
  const editBtn = section.querySelector('.jar-edit-btn');
  const errorReviewEl = section.querySelector('.jar-error-review');
  const savingEl = section.querySelector('.jar-saving');

  const statusEl = section.querySelector('.jar-status');
  const historyList = section.querySelector('.jar-history-list');
  const emptyEl = section.querySelector('.jar-empty');

  const svgRoot = section.querySelector('.jar-svg');

  let saving = false;

  function setError(targetEl, text) {
    if (!targetEl) return;
    targetEl.textContent = text;
    targetEl.hidden = !text;
  }

  function clearErrors() {
    setError(errorEl, '');
    if (errorEl) errorEl.hidden = true;
    setError(errorReviewEl, '');
    if (errorReviewEl) errorReviewEl.hidden = true;
  }

  let messages = loadMessages();
  messages = messages.sort((a, b) => a.createdAt - b.createdAt);

  function renderHistory() {
    if (!historyList) return;

    historyList.innerHTML = '';

    if (!messages.length) {
      emptyEl.hidden = false;
      updateHoneyFill(svgRoot, 0);
      return;
    }

    emptyEl.hidden = true;

    for (const m of messages) {
      const li = document.createElement('li');
      li.className = 'jar-history-item';

      const time = document.createElement('time');
      time.dateTime = String(m.createdAt);
      time.textContent = formatLocalDateTime(m.createdAt);

      const p = document.createElement('p');
      p.className = 'jar-history-text';
      p.textContent = m.text;

      li.append(time, p);
      historyList.appendChild(li);
    }

    updateHoneyFill(svgRoot, messages.length);
  }

  renderHistory();

  function openComposer() {
    composer.hidden = false;
    openBtn.setAttribute('aria-expanded', 'true');

    errorEl.hidden = true;
    errorReviewEl.hidden = true;

    // Modo: escrita.
    reviewPane.hidden = true;
    composer.classList.remove('jar-review-mode');

    textarea.hidden = false;
    textarea.removeAttribute('hidden');
    textarea.focus();

    statusEl.textContent = '';
  }

  function closeComposer() {
    composer.hidden = true;
    openBtn.setAttribute('aria-expanded', 'false');
    reviewPane.hidden = true;
    composer.classList.remove('jar-review-mode');
    openBtn.focus();
    statusEl.textContent = '';
  }

  function toReviewMode() {
    const sanitized = sanitizeJarMessage(textarea.value);

    if (!sanitized) {
      setError(errorEl, 'Escreva uma gota antes de revisar.');
      textarea.focus();
      return;
    }

    textarea.value = sanitized;
    previewEl.textContent = sanitized;

    setError(errorEl, '');
    errorEl.hidden = true;

    errorReviewEl.hidden = true;
    reviewPane.hidden = false;
    composer.classList.add('jar-review-mode');

    textarea.hidden = true;
    textarea.setAttribute('hidden', '');

    confirmBtn.focus();
  }

  function toEditMode() {
    reviewPane.hidden = true;
    composer.classList.remove('jar-review-mode');

    textarea.hidden = false;
    textarea.removeAttribute('hidden');

    errorReviewEl.hidden = true;
    editBtn.blur();
    textarea.focus();
  }

  async function confirmSave() {
    if (saving) return;
    saving = true;

    setError(errorReviewEl, '');
    errorReviewEl.hidden = true;

    savingEl.hidden = false;
    confirmBtn.disabled = true;
    editBtn.disabled = true;

    try {
      const sanitized = sanitizeJarMessage(textarea.value);
      if (!sanitized) {
        throw new Error('Mensagem vazia.');
      }

      const msg = {
        id: makeId(),
        text: sanitized,
        createdAt: Date.now()
      };

      messages.push(msg);
      messages.sort((a, b) => a.createdAt - b.createdAt);
      saveMessages(messages);

      // UI: sucesso e animação.
      statusEl.textContent = 'Gota registrada com carinho.';
      triggerHoneyDrop(section);

      // Reset.
      textarea.value = '';
      reviewPane.hidden = true;
      composer.hidden = true;
      openBtn.setAttribute('aria-expanded', 'false');
      openBtn.focus();

      renderHistory();
    } catch (err) {
      // Mantém texto digitado.
      const message = err instanceof Error ? err.message : String(err);
      setError(errorReviewEl, 'Não foi possível salvar agora. Tente novamente.');

      statusEl.textContent = '';
      // Ajuste leve: reabilita controle.
      previewEl.textContent = sanitizeJarMessage(textarea.value);

      // Evita silêncio total com erro de debug.
      if (message && message !== 'Mensagem vazia.') {
        // Mantém a mensagem principal, sem vazar detalhes.
      }

      errorReviewEl.hidden = false;
      textarea.focus();
    } finally {
      saving = false;
      savingEl.hidden = true;
      confirmBtn.disabled = false;
      editBtn.disabled = false;
    }
  }

  openBtn.addEventListener('click', () => {
    const isOpen = !composer.hidden;
    if (isOpen) closeComposer();
    else openComposer();
  });

  cancelBtn.addEventListener('click', closeComposer);
  reviewBtn.addEventListener('click', toReviewMode);
  editBtn.addEventListener('click', toEditMode);
  confirmBtn.addEventListener('click', confirmSave);

  return section;
}
