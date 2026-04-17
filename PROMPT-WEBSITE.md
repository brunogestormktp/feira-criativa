# PROMPT — Criar Website Feira Criativa Jurerê

> **Use este prompt para recriar o site completo do zero.**  
> Última atualização: Abril 2026

---

## 🎯 OBJETIVO

Criar um site imersivo de página única (+ 6 páginas individuais de feirantes) para a **Feira Criativa Jurerê** — uma feira de arte, artesanato e gastronomia itinerante em Florianópolis/SC.

**Conceito central:** "A pessoa entra no site como se estivesse entrando na feira." O foco é nos **produtos e na experiência**, não nas pessoas. Design editorial, elegante, orgânico.

---

## 🛠 STACK TÉCNICA

- **HTML/CSS/JS puros** — sem frameworks, sem build tools
- **Google Fonts:** Cormorant Garamond (display/títulos) + Montserrat (corpo/UI)
- **CSS Variables** para cores e tokens de design
- **Responsivo:** breakpoints em 1024px, 768px e 480px
- **Performance:** lazy loading em imagens, CSS puro (sem bibliotecas externas)

---

## 🎨 DESIGN SYSTEM

### Cores (CSS Variables)
```css
--beige:       #F4EDE0   /* fundo principal */
--beige-light: #FDFAF4   /* fundo body */
--beige-dark:  #E5D9C5   /* bordas, divisores */
--green:       #3A5E3F   /* cor principal, CTAs */
--green-light: #527A58   /* hover */
--green-muted: #8FAA8F   /* eyebrows em fundo escuro */
--earth:       #7B5E35   /* acentos terra */
--earth-light: #A07C4A
--text:        #1C1C1A   /* texto principal */
--text-muted:  #6B6558   /* texto secundário */
--white:       #FFFFFF
--cream:       #FAF7F0   /* fundo alternativo */
```

### Tipografia
- **Títulos (h1–h3):** Cormorant Garamond, weight 600–700, line-height 1.1–1.2
- **Corpo:** Montserrat, weight 400–500, line-height 1.65
- **Eyebrows:** Montserrat, 0.72rem, weight 600, letter-spacing 0.2em, uppercase
- **Botões:** Montserrat, 0.88rem, weight 600, letter-spacing 0.04em

### Componentes
- **Botões:** border-radius 40px (pill shape), padding 14px 28px, transição hover com translateY(-2px) + box-shadow
- **Cards:** border-radius 16px, box-shadow sutil, hover com translateY(-6px)
- **Seções:** padding vertical 100px
- **Container:** max-width 1200px, padding 0 24px

---

## 📂 ESTRUTURA DE ARQUIVOS

```
FEIRA CRIATIVA JURERE/
├── index.html                      ← página principal
├── feirante-gabriela.html          ← página individual
├── feirante-maria-oliva.html
├── feirante-domato.html
├── feirante-vasos-alquimicos.html
├── feirante-vera.html
├── feirante-nina.html
├── css/
│   └── style.css                   ← CSS único (~500 linhas)
├── js/
│   └── main.js                     ← JS único (~100 linhas)
├── gabiithaisfotografia/           ← fotos profissionais da feira
├── mariaolivasaboarianatural/      ← fotos sabonetes
└── vasosalquimicos/                ← fotos cerâmica
```

---

## 📄 ESTRUTURA DO index.html

### 1. Loading Screen (`#loadingScreen`)
- Fundo verde (`--green`), position fixed, z-index 10000
- Texto centralizado: "Feira Criativa / Jurerê" (Cormorant Garamond)
- Linha animada pulsante abaixo do texto
- Auto-dismiss após 2.2s (adiciona classe `.hidden` com opacity 0)

### 2. Header (`.header`)
- Position fixed, transparente sobre o hero
- On scroll > 60px: background branco com blur (`backdrop-filter: blur(12px)`)
- Logo à esquerda: "Feira Criativa / Jurerê"
- Menu central: Sobre | Feirantes | Locais | Galeria | Contato
- CTA à direita: ícone Instagram + "Instagram" (link para @feira_criativa_jurere)
- Mobile: hamburger menu → fullscreen overlay verde

### 3. Hero (`.hero`)
- Full viewport height (100vh)
- Background: foto com `object-fit: cover` + animação zoom lento (14s)
- Overlay gradient verde escuro (transparência)
- Conteúdo:
  - Eyebrow: "Arte · Natureza · Comunidade"
  - H1: "Entre na *Feira Criativa*" (itálico no em)
  - Subtítulo: "Uma experiência de arte, artesanato e gastronomia..."
  - 2 botões: "Conhecer os feirantes" (primário) + "Onde nos encontrar" (outline branco)
- Meta no rodapé: "Florianópolis · Sextas & Sábados · Desde 2019"
- Scroll indicator à direita: "Scroll" vertical + linha animada

**Imagem hero:** `gabiithaisfotografia/gabiithaisfotografia_1772490920_3844254877735845864_564360773.jpg`

### 4. Sobre (`#sobre`, `.sobre`)
- Background branco
- Grid 2 colunas: imagem à esquerda + texto à direita
- Imagem com tag "Desde 2019" (badge verde, position absolute)
- Eyebrow: "NOSSA HISTÓRIA"
- H2: "Onde a criatividade encontra a comunidade"
- 2 parágrafos descritivos
- 3 pilares em grid: 🌿 Arte Local | 🤝 Comunidade | 🌎 Sustentável

**Imagem sobre:** `gabiithaisfotografia/gabiithaisfotografia_1772490920_3844254877735845862_564360773.jpg`

### 5. Feirantes (`#feirantes`, `.feirantes`)
- Background beige-light
- Header centralizado: eyebrow + H2 + subtítulo
- Grid 3 colunas com 6 cards (`.feirante-card`)
- Cada card é um `<a>` que leva à página individual
- Card: imagem (aspect-ratio 4/3) + conteúdo (nome, marca, descrição curta, Instagram)
- Cards sem foto (Vera, Nina): placeholder com inicial grande em fundo colorido

**Dados dos 6 feirantes:**

| Nome | Marca | Categoria | Instagram | WhatsApp | Foto |
|------|-------|-----------|-----------|----------|------|
| Gabriela Thaís | Fotografia Artística | Fotografia | @gabiithaisfotografia | — | `gabiithaisfotografia/..._5858_...jpg` |
| Carla Benetti | Maria Oliva Saboaria Natural | Saboaria Natural | @mariaolivasaboarianatural | 5548991209593 | `mariaolivasaboarianatural/maria_oliva_saboaria_1.jpg` |
| Dalvana | doMATO Arte & Kokedamas | Kokedamas | @domato_arte_jurere | 5548984154922 | `gabiithaisfotografia/..._5860_...jpg` |
| Vivianne | Vasos Alquímicos | Cerâmica | @vasosalquimicos | 5548988288539 | `vasosalquimicos/vasosalquimicos_1.jpg` |
| Vera | Doces Artesanais | — | — | — | ❌ placeholder "V" terra |
| Nina | Pão de Fermentação Natural | — | — | — | ❌ placeholder "N" verde |

### 6. Locais (`#locais`, `.locais`)
- Background beige-light
- Header centralizado
- Grid 3 colunas com cards numerados (01, 02, 03)

| # | Nome | Referência | Endereço | Horário |
|---|------|-----------|----------|---------|
| 01 | AMOJU | Associação de Moradores | Jurerê Tradicional, Florianópolis – SC | Sextas · 8h às 12h |
| 02 | Vila Jurerê Internacional | Open Shopping | Jurerê Internacional, Florianópolis – SC | Sábados · a partir das 17h |
| 03 | Magia das Tintas | Canasvieiras | Canasvieiras, Florianópolis – SC | Sábados · a partir das 15h |

- Nota de rodapé: "Horários podem variar — siga @feira_criativa_jurere para atualizações"

### 7. Galeria (`#galeria`, `.galeria`)
- Background cream
- Header flex (título à esquerda + botão "Ver mais no Instagram" à direita)
- Grid 4 colunas, 7 fotos
- Primeiro item: span 2 colunas + 2 rows (foto grande)
- Cada item tem overlay hover + `data-lightbox` para abrir no lightbox
- Fotos: 4 de gabiithaisfotografia + 1 maria oliva + 1 vasos alquímicos + 1 extra

### 8. Vitrine Itinerante (`.vitrine`)
- Background beige-light com inner card verde (border-radius 16px)
- Layout flex: conteúdo à esquerda + botão à direita
- Eyebrow: "VITRINE ITINERANTE"
- H2: "Leve a feira para o seu evento"
- Botão branco: "Fale conosco →" (link WhatsApp 5548991209593)

### 9. CTA Final (`#contato`, `.cta-final`)
- Background verde com radial gradient sutil
- Centralizado: eyebrow + H2 "A feira te espera ✦" + subtítulo
- Botão light: "Seguir @feira_criativa_jurere"
- Texto secundário: "ou escreva para feiracriativajurere@gmail.com"

### 10. Footer (`.footer`)
- Background escuro (`--text`)
- Grid 3 colunas: Marca | Navegação | Contato
- Social links: Instagram + Email (ícones em círculos com borda)
- Rodapé: "© 2025 Feira Criativa Jurerê" + "Feito com ♥ em Florianópolis"

### 11. Lightbox (`#lightbox`)
- Position fixed, z-index 10001, fundo preto 92%
- Botão close (×) no canto superior direito
- Imagem centralizada (max-width 90vw, max-height 85vh)
- Fecha com click no fundo ou tecla Escape

---

## 📄 PÁGINAS INDIVIDUAIS (feirante-*.html)

Cada página segue a mesma estrutura:

1. **Header** — igual ao index.html (mesma nav)
2. **Hero do feirante** (`.feirante-hero`) — 60vh, foto de fundo, overlay gradient, nome + marca + categoria
3. **Body** (`.feirante-body`) — container 900px max-width
   - Descrição longa (parágrafo estilizado)
   - Links de contato: Instagram (verde) + WhatsApp (verde #25D366) quando disponível
   - Galeria de fotos/vídeos em grid 3 colunas
4. **Link de volta:** "← Voltar para a feira" (link para index.html#feirantes)
5. **Footer** — igual ao index.html
6. **Lightbox** — igual ao index.html

---

## ⚡ JAVASCRIPT (main.js)

6 funções, todas dentro de uma IIFE:

1. **`initEntrada()`** — setTimeout 2.2s → adiciona `.hidden` ao `#loadingScreen`
2. **`initNavbar()`** — scroll listener → toggle `.scrolled` no `.header` quando scrollY > 60
3. **`initMobileMenu()`** — click no `.nav__toggle` → toggle `.active` e `.open` no menu + lock body overflow
4. **`initScrollReveal()`** — IntersectionObserver (threshold 0.15) → adiciona `.visible` aos `.reveal`
5. **`initLightbox()`** — click em `[data-lightbox]` → abre `#lightbox` com a imagem; fecha com click/Escape
6. **`initHeroScroll()`** — click no `.hero__scroll` → smooth scroll até `.sobre`

Todas inicializadas no `DOMContentLoaded`.

---

## 🎬 ANIMAÇÕES CSS

- **Loading line:** pulse (scaleX 0.6↔1, opacity 0.3↔1) — 1.2s infinite
- **Hero zoom:** scale(1) → scale(1.07) — 14s forwards
- **Scroll line:** top -100% → 100% — 2s infinite
- **Reveal:** opacity 0, translateY(40px) → opacity 1, translateY(0) — 0.7s ease
- **Reveal delays:** .15s, .3s, .45s (classes `.reveal-delay-1/2/3`)
- **Cards hover:** translateY(-6px) + box-shadow maior
- **Links nav:** underline width 0 → 100% on hover

---

## 📱 RESPONSIVE

### 1024px
- Sobre: grid 1 coluna
- Feirantes: grid 2 colunas
- Locais: grid 2 colunas
- Galeria: grid 3 colunas

### 768px
- Nav: esconde menu + CTA, mostra hamburger
- Mobile menu: fullscreen overlay verde
- Hero meta: vertical, scroll indicator hidden
- Sobre pilares: 1 coluna
- Feirantes: 1 coluna
- Locais: 1 coluna
- Galeria: 2 colunas (primeiro item span 2)
- Vitrine: vertical, centrado
- Footer: 1 coluna

### 480px
- Galeria: 2 colunas iguais (sem span)

---

## 🔗 LINKS EXTERNOS

- **Instagram feira:** https://www.instagram.com/feira_criativa_jurere/
- **Email:** feiracriativajurere@gmail.com
- **WhatsApp Carla (Maria Oliva):** https://wa.me/5548991209593
- **WhatsApp Dalvana (doMATO):** https://wa.me/5548984154922
- **WhatsApp Vivianne (Vasos Alquímicos):** https://wa.me/5548988288539
- **Instagram Gabriela:** https://www.instagram.com/gabiithaisfotografia/
- **Instagram Maria Oliva:** https://www.instagram.com/mariaolivasaboarianatural/
- **Instagram doMATO:** https://www.instagram.com/domato_arte_jurere/
- **Instagram Vasos Alquímicos:** https://www.instagram.com/vasosalquimicos/

---

## 🖼 IMAGENS DISPONÍVEIS

### Pasta `gabiithaisfotografia/`
Fotos profissionais da feira (usar no hero, sobre, galeria e cards):
- `gabiithaisfotografia_1772490920_3844254877735845864_564360773.jpg` ← **HERO**
- `gabiithaisfotografia_1772490920_3844254877735845862_564360773.jpg` ← **SOBRE**
- `gabiithaisfotografia_1772490920_3844254877735845860_564360773.jpg`
- `gabiithaisfotografia_1772490920_3844254877735845858_564360773.jpg`
- `gabiithaisfotografia_1772490920_3844254877735845856_564360773.jpg`
- *(e mais fotos na pasta)*

### Pasta `mariaolivasaboarianatural/`
Fotos dos sabonetes e produtos da Carla:
- `maria_oliva_saboaria_1.jpg`
- *(e mais fotos/vídeos na pasta)*

### Pasta `vasosalquimicos/`
Fotos da cerâmica da Vivianne:
- `vasosalquimicos_1.jpg`
- *(e mais fotos/vídeos na pasta)*

---

## 📝 SEO

**Title:** Feira Criativa Jurerê — Arte, Natureza e Comunidade  
**Description:** Feira de arte, artesanato e gastronomia em Jurerê, Florianópolis. Conheça nossos feirantes, locais e horários.

**Keywords:** feira de artesanato florianópolis, feira criativa jurerê, artesanato jurerê, feira de arte floripa, produtos naturais artesanais florianópolis, sabonetes artesanais florianópolis, kokedamas florianópolis, cerâmica artesanal florianópolis
