## Relatório (Task 3) — 2026-10-10

### 1. Resultado geral
Concluída a base do **Capítulo 2–4** (Constelação de Contrastes / Dualidade / Particularidades), com integração funcional ao fluxo iniciado pelo botão **“Descobrir”**.

### 2. Funcionalidades implementadas e integradas
- **Capítulo 2 — Constelação de Contrastes (chapter-constelacao)**
  - Estrelas (botões) selecionáveis por clique e teclado.
  - Linhas de conexão destacadas conforme o momento selecionado.
  - Área de leitura com `aria-live="polite"` para anunciar mudanças sem depender de hover.
  - Botão **“Voltar para visão geral”** para restaurar o estado inicial.
  - Alternativa acessível para telas estreitas: lista de atalhos (botões com `aria-pressed`).

- **Capítulo 3 — Dualidade (chapter-dualidade)**
  - Ajuste de visibilidade baseado em `hidden` (mais robusto que `style.display`).
  - Sincronização de `aria-expanded` no toggle.
  - Manter estado inicial consistente: lado “forte” visível, lado “carinhoso” oculto.

- **Capítulo 4 — Particularidades (chapter-particularidades)**
  - Continuidade com a descrição do curso de Análises Clínicas.

### 3. Ajustes de integração global
- **`src/main.js`**
  - `setupScrollReveal()` agora faz fallback gracioso:
    - se `IntersectionObserver` não existir **ou** `prefers-reduced-motion` estiver ativo, adiciona `.visible` a todos os capítulos para não prejudicar leitura.

### 4. Arquivos modificados
- `projeto-juliana/src/content.js` (adição de `content.constellation`)
- `projeto-juliana/src/components/chapters.js` (novo capítulo 2: constelação; integração com dualidade e particularidades)
- `projeto-juliana/src/main.js` (fallback no reveal)
- `projeto-juliana/src/styles/components.css` (estilos da constelação + atalhos)
- `test-content.js` (validação estrutural de `content.constellation`)

### 5. Testes executados (local)
- `node test-content.js` => PASS
- `node test-dualidade.js` => PASS
- `node --check` em:
  - `src/main.js`
  - `src/components/chapters.js`
  - `src/components/garden.js`
  - `src/components/footer.js`
  - `src/components/opening.js`

- Verificação estática de paleta:
  - Hex colors presentes apenas em `src/styles/tokens.css` (grep)

- Carregamento via servidor estático + HTTP HEAD:
  - `index`, `src/main.js`, `src/styles/*.css` => HTTP 200

### 6. Validação visual / acessibilidade
- **Não realizada visualmente em viewports reais** (320/390/768/1280).
- Motivo: ambiente sem acesso para instalar browsers do Playwright (falha por ausência de Chrome e necessidade de sudo).
- A acessibilidade foi garantida por construção:
  - controles são `<button>` nativos;
  - `aria-live` na área de leitura;
  - `aria-pressed`/`aria-expanded` sincronizados;
  - fallback para reduced-motion/no IntersectionObserver.

### 7. Pendências
- Validar manualmente em navegador real:
  - foco visível durante navegação por teclado;
  - layout/sem overflow horizontal nos viewports-alvo;
  - legibilidade e ordem visual após seleção de estrelas.

### 8. Próxima ação concreta
Prosseguir para **Task 4** (Capítulos 5–8 / Jardim e fechamento), mantendo a constelação e a dualidade estáveis e sem regressões.
