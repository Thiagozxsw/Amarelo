# Projeto Juliana Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first, static website for Juliana based on the "Jardim de Mel" design specification.

**Architecture:** A static, mobile-first web application using native HTML5, CSS3, and ES6+ JavaScript. The structure is modular, separating content from logic and presentation.

**Tech Stack:** Native HTML/CSS/JS.

**Spec:** `docs/superpowers/specs/2026-10-10-juliana-site-design.md`

## Global Constraints

- Mobile-first approach (320px - 430px+).
- No external frameworks or backend.
- Accessibility: Semantics, keyboard navigation, `prefers-reduced-motion`.
- Content must be accurate to user input, no invented personal details.

## Review Focus

1. **Mobile Responsiveness:** Ensure no horizontal scroll across common mobile sizes.
2. **Accessibility:** Verify keyboard navigation and contrast ratios.
3. **Content Integrity:** Check that no personal facts were invented.
4. **Interactive Garden:** Validate touch/keyboard interaction logic.
5. **Production Build:** Confirm static files serve correctly.

---

### Task 1: Project Setup and Base Styles

**Files:**
- Modify: `projeto-juliana/src/styles/tokens.css`, `projeto-juliana/src/styles/base.css`
- Create: `projeto-juliana/src/content.js`

**Interfaces:**
- Produces: Global CSS variables (`tokens.css`) and basic layout reset (`base.css`).

- [ ] **Step 1: Define CSS variables in `projeto-juliana/src/styles/tokens.css`**
- [ ] **Step 2: Implement reset/base styles in `projeto-juliana/src/styles/base.css`**
- [ ] **Step 3: Create `projeto-juliana/src/content.js` with placeholders**
- [ ] **Step 4: Commit**

### Task 2: Landing Page (Chapter 1)

**Files:**
- Modify: `projeto-juliana/index.html`
- Create: `projeto-juliana/src/components/opening.js`

**Interfaces:**
- Consumes: Styles from Task 1.

- [ ] **Step 1: Implement basic HTML structure in `index.html`**
- [ ] **Step 2: Create opening component**
- [ ] **Step 3: Integrate and verify responsiveness**
- [ ] **Step 4: Commit**

### Task 3: Core Chapters (Chapters 2-4)

**Files:**
- Create: `projeto-juliana/src/components/chapters.js`

- [ ] **Step 1: Implement chapter components (Alegria, Dualidade, Particularidades)**
- [ ] **Step 2: Add interactivity for Dualidade chapter**
- [ ] **Step 3: Verify accessibility**
- [ ] **Step 4: Commit**

### Task 4: Interactive Garden and Final Chapters (Chapters 5-8)

**Files:**
- Create: `projeto-juliana/src/components/garden.js`, `projeto-juliana/src/components/footer.js`

- [ ] **Step 1: Implement Interactive Garden component**
- [ ] **Step 2: Add musical reference section**
- [ ] **Step 3: Implement personal message and closing sections**
- [ ] **Step 4: Commit**

### Task 5: Final Review and Build

- [ ] **Step 1: Perform accessibility, responsiveness, and content review**
- [ ] **Step 2: Create production build setup**
- [ ] **Step 3: Commit**
