## Relatório (Task 2) — 2026-10-10

### 1. Resultado geral
Escopo de Task 2 **parcialmente concluído**: a landing page (Chapter 1) está implementada e agora integra de forma funcional a sequência inicial ao renderizar também capítulos 2–5 e o rodapé (capítulos 6–8) após o clique em **“Descobrir”**.

### 2. Funcionalidades implementadas
- **Abertura (Chapter 1)** (`createOpening`): botão “Descobrir” alterna um bloco adicional com `hidden` + classe `visible`, sincronizando `aria-expanded`/`aria-controls`.
- **Capítulos 2–4** (`createChapters`): conteúdo de alegria/gentileza, dualidade e referência discreta a Análises Clínicas.
- **Capítulo 5 (Jardim interativo)** (`createGarden`): toque/click em dois botões altera mensagem e anuncia mudanças com `aria-live="polite"`.
- **Referência musical + mensagem pessoal (capítulos 6–8)** (`createFooter`): exibe título/artista e oculta a mensagem quando `content.personalMessage` está vazio.
- **Reveal por rolagem**: `IntersectionObserver` adiciona `.visible` para elementos com classe `.chapter`.
- **Preferência de movimento reduzido**: CSS e smooth scroll desativados quando `prefers-reduced-motion: reduce`.

### 3. Arquivos alterados/criados (Task 2)
- `projeto-juliana/index.html`
- `projeto-juliana/src/main.js`
- `projeto-juliana/src/content.js`
- `projeto-juliana/src/components/opening.js`
- `projeto-juliana/src/components/chapters.js`
- `projeto-juliana/src/components/garden.js`
- `projeto-juliana/src/components/footer.js`
- `projeto-juliana/src/styles/tokens.css`
- `projeto-juliana/src/styles/base.css`
- `projeto-juliana/src/styles/layout.css`
- `projeto-juliana/src/styles/components.css`
- `projeto-juliana/src/styles/animations.css`
- `test-content.js`
- `test-dualidade.js`

### 4. Validação executada
- `node test-content.js` => PASS
- `node --check` em `src/main.js` e nos componentes => sem erros
- `grep` hex colors => somente em `src/styles/tokens.css`
- HTTP 200 via `python3 -m http.server` + `curl` para `/`, `/src/main.js` e CSS

### 5. Build e execução
Sem Vite/build configurado. Para executar:
```bash
python3 -m http.server <porta> --directory projeto-juliana
```
Abra `http://127.0.0.1:<porta>/`.

### 6. Problemas corrigidos
- Integração do `main.js`: antes montava apenas `createOpening`; agora monta wrapper e inicializa dualidade/reveal quando a visitante clica em “Descobrir”.
- Ajustes de acessibilidade na abertura e atualização do jardim para usar botões acessíveis.

### 7. Limitações
- Validação visual em viewports reais (320/390/768/1280) **não realizada**.

### 8. Pendências
- Testar no navegador (manual ou automatizado) que:
  - foco visível funciona em mobile;
  - toggle de dualidade funciona por teclado;
  - layout não causa overflow horizontal;
  - `IntersectionObserver` não prejudica leitura.

### 9. Continuidade
Próxima tarefa real do plano: **Task 3 (Core Chapters 2–4)**, com foco em refinar o capítulo de dualidade e alinhar ainda mais a narrativa/estilo conforme especificação.
