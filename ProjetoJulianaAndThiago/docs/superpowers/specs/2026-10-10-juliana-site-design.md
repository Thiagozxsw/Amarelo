# Projeto Juliana: Design e Especificação Técnica

> **Status:** Approved
> **Data:** 2026-10-10

## 1. Objetivo e Identidade
Criar uma experiência digital autoral e pessoal como presente para Juliana. O site é um pequeno universo visual que reflete sua personalidade: alegre, gentil, com uma postura durona (o lado "machuda") e um lado carinhoso/sensível. A identidade é baseada no conceito "Jardim de Mel".

## 2. Direção Artística (Jardim de Mel)
- **Paleta:** Amarelo-mel (`#FFB347`), âmbar (`#FFBF00`), creme suave (`#FFFDD0`), branco aquecido (`#FAF9F6`), grafite (`#333333` para contraste).
- **Linguagem:** Editorial, assimétrica, tipografia expressiva para títulos, ilustrações botânicas originais, traços orgânicos.
- **Flores:** Elementos gráficos botânicos originais em SVG/CSS, integrados ao sistema visual (não decorativos).

## 3. Estrutura Narrativa (Constelação de Contrastes)
A experiência conduz o usuário por "movimentos" inspirados na música "Don't Dream It's Over" (Melodia de Luz), sem áudio forçado:
1. **Abertura:** Nome da Juliana e identidade visual.
2. **Alegria e Gentileza:** Retrato dos traços alegres e sorridentes.
3. **Dualidade:** Interação que revela a transição entre a postura durona e o carinho (Constelação de Contrastes).
4. **Particularidades:** Referência discreta ao curso de Análises Clínicas.
5. **Jardim Interativo:** Descoberta de mensagens através de elementos botânicos.
6. **Homenagem Musical:** Referência a Crowded House com link para player externo.
7. **Mensagem Pessoal:** Espaço editável para o usuário.
8. **Encerramento:** Ciclo visual.

## 4. Requisitos Técnicos (Mobile-First)
- **Base:** HTML5 semântico, CSS3, JS modular (ES6+).
- **Responsividade:** Layout fluido funcional de 320px a 430px+ (mobile-first), com ajustes para tablets e desktops. Sem scroll horizontal.
- **Acessibilidade:** Semântica HTML, foco visível, contraste WCAG AA, `prefers-reduced-motion`, navegação completa por teclado.
- **Privacidade:** Site estático, sem backend, sem analytics, sem rastreadores.
- **Conteúdo:** Centralizado em `src/content.js`.
- **Performance:** Carregamento otimizado, sem dependências de framework desnecessárias.

## 5. Critérios de Aceitação
- Site funcional em mobile (320px a 430px).
- Identidade visual "Jardim de Mel" implementada conforme paleta e princípios artísticos.
- Conteúdo pessoal verdadeiro (sem invenções).
- Navegação intuitiva (toque e teclado).
- Sem dependências de framework.
- Acessibilidade validada (teclado, contraste, `prefers-reduced-motion`).
- Build de produção funcional e testado localmente.
