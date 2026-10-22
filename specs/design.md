# Design — Cellive Skin

Padrão visual extraído das referências `Sessões/Sessão 1–9.jpeg` (739×1600 px = 370 px de largura em 2x).
**Regra de conversão:** medida em CSS = pixels da referência ÷ 2.
Os tokens abaixo estão em `public/css/style.css` (`:root`).

## Princípios

- Fidelidade máxima às referências: posições, tamanhos e cores conferidos lado a lado.
- Fundo branco, layout centralizado em coluna única, muito espaço em branco.
- Elementos interativos em formato pílula ou com cantos bem arredondados, com sombra suave.
- Um único azul de destaque (`--blue`) para ação e seleção.

## Cores

| Token | Valor | Uso |
|---|---|---|
| `--blue` | `#b0c6de` | CTA, destaque "NOVA FASE", etapa ativa, anel da Sessão 5, seleção |
| `--blue-glow` | `rgba(176,198,222,.65)` | brilho do CTA |
| `--slate` | `#5f6b7a` | números futuros do stepper, "100%", texto condensado da Sessão 5 |
| barra (preenchimento) | `#626f7f` | barra de progresso |
| `--black` | `#000` | títulos |
| `--text` | `#4d4d4d` | subtítulos |
| texto das opções | `#4b4b4b` | opções e rótulos de cards |
| `--muted` | `#a6a6a6` | infos da capa (10 perguntas · 2 minutos…) |
| subtítulo Sessão 6 | `#a8a8a8` | "Vamos separar os melhores ativos…" |
| trilho / concluído | `#e0e0e0` / `#dddddd` | barra vazia, anel vazio, etapa concluída |
| borda do radio | `#dedede` | círculo das opções |
| fundo selecionado | `#f5f8fc` | opção ou card selecionado |

## Tipografia

- Arquivo: **Acumin Variable Concept** (Adobe), em `public/assets/fonts/AcuminVariable-Latin.woff2`. O original fica em `Fontes/`.
  - Um único arquivo variável contém todos os pesos (eixo `wght`), a largura Condensed (eixo `wdth` 67,5) e o itálico (eixo `slnt`).
  - Foi reduzido só aos caracteres latinos/PT: 413 KB.
  - **Não recortar os eixos:** o arquivo CFF2 fica inválido no navegador.
- **Acumin Pro** (`--font`): `@font-face` com `font-stretch: 100%`. Usada em títulos, textos e opções. Pesos usados: 400, 600 e 700.
- **Acumin Pro Condensed** (`--font-cond`): mesmo arquivo com `font-stretch: 67.5%`. O navegador aplica a largura Condensed automaticamente. Usada em "NOVA FASE", botão CTA, números do stepper, "100%" e textos da Sessão 5. Peso 600.
- **Itálico:** usar `font-style: normal` + `font-variation-settings: 'slnt' 12`. O `font-style: italic` comum não funciona nesta fonte, porque o eixo usa o sinal invertido.
- Os arquivos Regular do site maisfontes (em `Fontes/`) **não são usados**.
- Logo: o arquivo oficial existe (SVG/PNG) e será enviado. Até lá, é recriado em texto com Montserrat 600 (Google Fonts).

| Elemento | Tamanho / altura de linha | Peso |
|---|---|---|
| Título da capa | 29 / 34 px | 700 |
| "NOVA FASE" (condensada) | 31,2 / 30 px | 600 |
| Subtítulo da capa | 16,2 / 19,5 px | 400 |
| CTA (condensada) | 23,6 px | 600 |
| Infos da capa (itálico) | 9,4 px | 600 |
| Prova social / selo coreano / rodapé | 8,4 / 10,9 / 9,2 px | 400–700 |
| Número do stepper (condensada) | 22 px | 600 |
| Título de pergunta | 21,3 / 25,8 px | 700 |
| Opção | 16 px | 700 |
| "100%" (condensada) | 47,6 px | 600 |
| Sessão 5, linha 1 ("A cada" em itálico 20,2 px + condensada) | 21,8 / 22 px | 700 / 600 |
| Sessão 5, linhas 2–3 (condensada) | 21,6 / 25,5 px | 600 |
| Título Sessão 6 | 21,2 / 26 px | 700 |
| Subtítulo Sessão 6 | 14,3 / 17 px | 400 |
| Rótulo do card de idade | 15,5 px | 700 |

## Layout

- Contêiner: largura máxima de 430 px, centralizado, padding lateral de 16 px.
- Logo: centro a 50 px do topo (margem superior de 41 px, altura de 20 px).
- Cada sessão é uma `<section class="step">` em coluna com itens centralizados e altura mínima de 100svh.

## Componentes

### Logo "CELLIVE SKIN"
"CELLIVE" com 21,6 px e espaçamento entre letras de .085em, mais "SKIN" com 6,4 px e espaçamento de .62em, 10 px à direita. Cor `#1c1c1c`.

### Botão CTA (Sessão 1)
Pílula de 250×51 px, fundo `--blue`, texto branco condensado de 24 px, brilho `0 0 10px 2px --blue-glow`.

### Stepper 1-2-3 (Sessões 2–4)
- Pílula branca com sombra `0 4px 20px rgba(0,0,0,.085)` e padding de 4×6,5 px.
- Círculos de 40 px com 11 px de espaço entre eles; números condensados de 22 px.
- Estados (cores atualizadas a pedido da usuária em 2026-10-19):
  - ativo: fundo `--blue`, número **branco**;
  - concluído: fundo `#e0e0e0`, número branco;
  - futuro: sem fundo, número `--slate`.

### Opção de resposta (Sessões 2–4 e 7)
- Pílula de 340 px de largura máxima e 47,5 px de altura, fundo branco, sombra `0 1.5px 10px rgba(0,0,0,.1)`.
- Radio de 19 px com borda de 1,6 px `#dedede`, a 20 px da esquerda. Texto a 13,5 px do radio.
- Espaço entre opções: 16,5 px (3 opções) e 17 px (4 opções).
- O título da pergunta tem altura mínima fixa, para as opções começarem sempre a 249 px do topo.
- **Texto sempre dentro da pílula** (desde 2026-10-20; substitui o antigo `nowrap` + `.option--2-linhas`): todas as opções quebram linha quando o texto não cabe (`overflow-wrap: break-word`, `text-wrap: pretty`), e a pílula cresce (altura mínima de 47,5 px, padding 8/12/7/20 px, `line-height: 1.2`). **Nunca voltar a usar `nowrap` nas opções**: com fonte reserva, zoom ou "texto grande" do celular, a frase passava da borda.
- Fonte das opções: `clamp(15px, 4.3vw, 16px)` — 16 px a partir de 372 px de largura (na tela da referência fica 15,9 px e "Queria ter uma pele radiante e viçosa." cabe em 1 linha); em telas mais estreitas desce até 15 px antes de quebrar linha.
- Na tela da referência (370 px), só as frases realmente longas quebram: "Apenas quando fico muito tempo no sol." (S14) e "Sinto que minha pele está envelhecida." (S16).

### Barra de progresso (Sessões 6–17)
- Barra de 314,5×12 px, totalmente arredondada, trilho `#e0e0e0`, preenchimento `#626f7f`.
- **Valor calculado no `quiz.js`** (desde 2026-10-19; substitui os valores fixos por sessão): perguntas respondidas ÷ total de perguntas do quiz. Pergunta = sessão com `[data-answer]` ou `[data-toggle]` (hoje 14: Sessões 2–4, 6 e 8–17; a 7 foi removida). Pergunta nova ou removida entra na conta sozinha; não há valores no HTML.
- **Cresce ao responder**, ainda na mesma tela (transição de `width` em 0,6 s). Ao entrar na tela seguinte, a barra já começa nesse valor, sem animar de novo.
- Na primeira tela com barra (Sessão 6), anima de 0 até o progresso feito (3/14 = 21,4%).
- Valores: Sessão 6 entra em 21,4%, cada resposta soma ~7,1%, a Sessão 17 entra em 92,9% e chega a **100%** ao responder.

### Card de idade (Sessão 6)
- Grade de 2 colunas de 160,5 px, com 17,5 px de espaço.
- Card de 199 px de altura, cantos de 20 px, sombra igual à das opções.
- Foto de 133×144 px com cantos de 10 px.
- Rótulo centralizado 13 px abaixo da foto.

### Foto de pergunta (Sessões 8, 11, 12, 15, 16, 17)
- Imagem de 314×200 px, 5 px abaixo do título, cantos de 15 px via CSS (raio medido na referência da Sessão 8).
- Arquivos `pergunta-*.jpg` gerados em 628×400 (2x) a partir das fotos da raiz do projeto; o enquadramento do espelho foi ajustado à mão para não cortar o rosto.
- As opções começam 22 px abaixo da foto, com 17 px de espaço entre elas.
- O título usa `.question__title--photo`: 52,5 px abaixo da barra de progresso, altura de linha de 25,5 px.
- **Versão compacta `.step--compacta`** (foto + 4 opções, Sessão 17): título 26 px abaixo da barra, foto com 130 px de altura (`object-position: center 30%`), opções 16 px abaixo da foto e 12 px entre elas. Assim a última opção termina em 580 px e cabe acima da bandeja em telas de ~666 px; sem isso precisava de 783 px.
- Altura de tela necessária para ver todas as opções acima da bandeja: Sessões 8, 12, 15 e 16 = 719 px; Sessão 11 = 693 px; Sessão 17 = 666 px.

### Card de dor (Sessão 9, múltipla escolha)
- Grade de 3 colunas de 109 px, com 10,5 px de espaço horizontal e 12 px vertical. A grade fica 17 px abaixo do subtítulo.
- Card de 135 px de altura, cantos de 12 px, padding superior de 7 px, sombra igual à das opções.
- Foto de 91×99 px com cantos de 6 px.
- Rótulo de 10,8 px, peso 700, `#4b4b4b`.
- O estado selecionado é igual ao das opções. Cada card alterna marcado/desmarcado.
- Subtítulo: 14,3 / 17,5 px, `#a8a8a8`.

### Botão CONTINUAR (Sessão 9)
- Pílula de 153×50,5 px, 38 px abaixo da grade. Mesmo estilo do CTA da capa, com texto condensado de 22,7 px em maiúsculas.
- **Sempre visível:** `position: sticky` com `bottom: calc(var(--tray-height) + 16px)` (10 px em telas ≤ 740 px), onde `--tray-height` é a altura do rodapé de ativos (107 / 86 / 76 px conforme a altura da tela).
  - Em telas altas (800 px, como a referência), fica no lugar original.
  - Em telas baixas, gruda logo acima do rodapé de ativos, sem cobrir os cards.
  - Para isso funcionar, o `.app` usa `overflow-x: clip`. Não usar `hidden`: ele cria um contêiner de rolagem e quebra o sticky.
- Desativado: fundo sólido `#dbe5f0`, sem brilho. Não usar opacidade, porque o botão pode ficar por cima das fotos.

### Rodapé de ativos (Sessão 6 em diante) — layout de 2026-10-22
Referência: imagem enviada pela usuária em 2026-10-22 (Sessão 6 com o rodapé novo). **Substitui a bandeja anterior** (fila de ativos lado a lado com FLIP).
- **Estrutura** (370×800): fixo no rodapé, largura do contêiner, fundo branco, 107 px de altura (`--tray-height`).
  - Linha fina no topo `#e3e3e3`, recuada 6,5 px das bordas.
  - Cabeçalho: "Combinação ideal para sua pele:" (condensada, 15 px, peso 600, itálico, `#999`) à esquerda e contador **"x/N"** (condensada, 15 px, peso 700, itálico, preto) à direita.
  - Corpo de 45 px: **frasquinho** à esquerda (14×45 px, mesmo contorno do frasco da análise, vazio `#dbdce1`, preto `#1c1c1c` com 3% na base mesmo vazio) e, centralizado na largura, o texto "Responda para revelar o primeiro ativo" (14,5 px, `#d8d9db`) ou o **ativo atual** (imagem + nome em 13 px, peso 700, `#4b4b4b`).
  - Padding: 10 px em cima, 14,5/15,5 px nas laterais, 27,5 px embaixo (+ área segura do iPhone).
  - Telas ≤ 740 px: rodapé de 86 px (frasco 40 px). Telas ≤ 600 px: 76 px.
- **N automático**: quantidade de perguntas com `data-ativo` (hoje 11). Aparece em toda sessão com `data-tray`, já em 0/N na idade.
- **Animação** (rápida, no `quiz.js`, Web Animations API):
  - Ao responder, uma cópia do ativo **voa da opção marcada até o centro do rodapé** (0,45 s, `cubic-bezier(.4,0,.2,1)`, começa 1,25× e transparente). Na Sessão 9 sai do último card de dor marcado.
  - Ao mesmo tempo, o **ativo anterior encolhe e entra no frasquinho** (0,35 s, aceleração ease-in, até 12% do tamanho). Ao chegar, o frasco dá uma leve "engolida" (0,3 s) e o **preto sobe** 1/N (transição de 0,35 s via `transform`, que funciona também no Safari).
  - O contador sobe na hora da resposta. Na **última pergunta**, o último ativo também entra no frasco depois de pousar: **frasco cheio, N/N**.
  - O quiz avança 0,85 s depois da resposta (1,2 s na última). Antes eram 1,4 s.
  - Cada animação termina pelo evento **ou** por tempo (`whenDone`), para não deixar cópias presas se a aba ficar em segundo plano.
- Item do ativo:
  - Ácido Hialurônico: textura recortada da referência, `.ativo--ah` (43×32 px).
  - Retinal: 39×40 px (recorte da referência).
  - PDRN: 38×38 px.
  - Demais ativos (GHK-Cu, Pentapeptide-4, Propilenoglicol, Glutationa, Niacinamida, Tetrapeptide-7, Exo Skin): padrão `.ativo img` com 40 px de altura e largura automática, gerados da pasta `Ativos/` (bordas recortadas, salvos em 114 px de altura).
  - Acetyl Hexapeptide-8: imagem horizontal, `.ativo--largo` (46 px de largura, altura automática).
  - Tetrapeptide-7: o original tinha fundo cinza liso; ele foi tornado transparente (`prep3.js`) para não aparecer como retângulo na bandeja.
- **Imagens de ativos:** usar texturas, moléculas ou imagens neutras, **nunca o frasco/embalagem de outra marca**. Desde 2026-10-16 todas as imagens da pasta `Ativos/` seguem essa regra.
- Entrada do rodapé: sobe da borda inferior (`translateY 100%→0`, 0,4 s) ao entrar na Sessão 6.
- As sessões com rodapé têm `padding-bottom: calc(var(--tray-height) + 22px)`, para o conteúdo não ficar escondido.
- Auditoria de responsividade refeita com o rodapé novo (320×568 a 1366×657, fonte normal / reserva / texto ampliado): tudo ok.

### Anel de resultado (Sessão 5)
- SVG de 139 px, raio de 63,25 e traço de 12,5.
- Trilho `#e2e2e2`, progresso `--blue` com ponta arredondada, começando no topo em sentido horário.
- Fecha em 100% (`data-percent="100"`). A referência mostrava 88%; a mudança foi aprovada pela usuária em 2026-10-06.

### Tela de análise (Sessão 18)
Referências v3 (atualizadas pela usuária em 2026-10-22; substituem as v2): `Analise pós respostas/Tela de analise1–5.jpeg`. Imagens 1–3: fase 1 em 10, 63 e 99%, uma etapa por vez; imagem 4: fase 2 com os ativos em círculo em volta do frasco e o primeiro entrando; imagem 5: frasco cheio e "Fórmula concluída!".
- **Duas fases em sequência** (`.analysis__p1` e `.analysis__p2` no mesmo lugar, troca com fade de 0,45 s):
  - **Fase 1**: título "FAZENDO UMA ANALISE **DO SEU CASO**" + anel de 0 a 100% + **uma etapa por vez** (ícone em cima, texto embaixo).
  - **Fase 2**: título "MONTANDO SUA **FÓRMULA**" + frasco no centro de um círculo tracejado com os ativos da visitante, que **entram no frasco um por um**; embaixo "COMBINANDO OS **ATIVOS**" + nome do ativo que está entrando ("+ÁCIDO HIALURÔNICO"). No fim: "FÓRMULA **CONCLUÍDA!**" + check azul.
- **Título** (condensada, 23,5 px, `#111`, 99 px abaixo do logo): parte fina em peso 300, parte forte em 700. Troca com fade de 0,4 s.
- **Anel**: 159 px, raio 72, traço 15, trilho `#e0e0e0`, progresso `--blue` com ponta arredondada, 40 px abaixo do título. Número condensado 48 px, peso 700, `#5d646a`.
- **Etapas** (55 px abaixo do anel, só a atual aparece, troca com fade + 6 px de subida em 0,35 s): ícone azul `--blue` de 46,5 px de altura (lupa com gráfico; camadas de pele com brilhos, 70 px de largura; mais no círculo) + texto Acumin 20 px peso 700 `#111`, 18,5 px abaixo do ícone. Textos como na referência: "ANALISANDO AS RESPOSTAS" (maiúsculas), "Entendendo seu tipo de pele" e "Revisando sensibilidade da pele" (a etapa 3 antes era "Revisando compatibilidade dos ativos"). Trocam em 0%, 40% e 72% (`data-at`).
- **Fase 2** (medidas em % de um quadrado de 323 px, que encolhe em telas pequenas: `min(323px, 100%, 100svh − 330px)`):
  - Círculo tracejado de raio 147,5 px (traço 1,6 px `#e9e9eb`, 6/4,2 px), com o topo dos ativos a 224 px do topo da tela.
  - **Ativos**: os coletados no quiz (11), em círculos de 28 px distribuídos por igual a partir do topo, com a imagem de cada ativo recortada em círculo (ampliada 1,45× para a textura preencher). Aparecem com um leve "pop" em sequência.
  - **Frasco**: mesmo contorno do frasco enviado em 2026-10-20 (`clipPath#frasco`, viewBox 69×224,25), agora a **72×234 px**, topo a 274 px do topo da tela, com brilho azulado suave atrás. Vazio `#dbdce1`, preto `#1c1c1c` (3% na base, como no frasquinho do rodapé).
  - Texto: "COMBINANDO OS ATIVOS" condensada 21,4 px (300/700), 23,5 px abaixo do quadrado; nome do ativo condensada 16,5 px peso 400 `#7e7e80` em maiúsculas. Check: círculo `--blue` de 43 px com visto branco, entra com "pop".
- **Animação e tempo**:
  - Fase 1: **anel contínuo de 0 a 100% em 4 s, sem pausas** (`data-analysis="4000"`, ease-in-out senoidal). Substitui o Staggered Progress com pausas de 2026-10-20.
  - 0,35 s em 100% e troca para a fase 2 (fade de 0,45 s).
  - Fase 2: os ativos entram **um a cada 2,5 s ÷ N** (`data-fill="2500"`, ~0,23 s): cada um encolhe e voa para dentro do frasco (0,42 s), o nome aparece embaixo, o frasco dá uma leve "engolida" e o preto sobe 1/N. Último ativo dentro = frasco 100%.
  - 0,25 s depois: "Fórmula concluída!" + check. Fica 1,2 s e segue para a próxima sessão, se existir. Total ≈ 8 s.
  - Cada voo termina pelo evento **ou** pelo tempo (`whenDone`), como no rodapé.
- **Número dentro do anel** (Sessões 5 e 18): `fitRingValue()` mede a largura real do texto e, se passar de **66% do miolo** do anel, reduz a fonte. Recalcula quando muda o número de dígitos, quando a fonte termina de carregar e quando a tela muda de tamanho. Os números de 2 dígitos ficam no tamanho da referência; o "100%" diminui um pouco (S18: 48 → ~45 px; S5: 47,6 → 40,9 px).
- No código, uma escala única de 0 a 200 (`cellive.setAnalysis(step, v)`, usada nos testes): 0–100 = anel, 100–200 = quantos ativos já entraram no frasco, 200 = concluída.
- Telas ≤ 600 px de altura: etapas com ícone de 38 px e texto de 18 px; fase 2 com o quadrado menor (em 320×568 tudo cabe sem rolagem).

### Foto antes/depois (Sessão 5)
Imagem de 280×175 px com cantos de 24 px.

## Ajustes para celular (2026-10-19)

Em telas como a das referências (≥ 760 px de altura, 370–430 px de largura) **nada muda**. Em telas menores o layout se adapta para nenhuma opção ficar atrás da bandeja e nenhum botão ficar por cima das opções:
- **Perguntas com foto** (8, 11, 12, 15, 16, 17): a sessão tem exatamente a altura da tela (`100svh`) e a **foto encolhe** (`flex: 0 1 200px`, mínimo 100 px) para as opções caberem. Em 360×640 as fotos ficam com ~164 px; em 375×667, com ~191 px.
- **Altura ≤ 740 px**: menos espaço acima do título (30 px) e entre as opções (13 px); idade com cards de 172 px (foto 118×120); dores com cards de 112 px (foto 80×78) e CONTINUAR 18 px abaixo da grade.
- **Altura ≤ 600 px** (iPhone SE antigo): cards ainda menores, e o CONTINUAR deixa de ser sticky (fica no fluxo, com um pouco de rolagem) para não cobrir os cards.
- **Largura ≤ 380 px**: as grades da idade e das dores se ajustam à largura (colunas `minmax`); **≤ 365 px**: opções com texto longo quebram em 2 linhas.
- **Nada com tamanho fixo que prenda texto** (revisão de 2026-10-20): botão da capa (`min-width: min(250px, 100%)`, `min-height: 51px`), CONTINUAR (`min-width: 153px`, `min-height`), cards de idade e de dores (`min-height`), rótulos dos cards, título e etapas da análise — todos quebram linha e crescem em vez de vazar.
- **Altura ≤ 600 px** também compacta: logo a 26 px do topo, barra 14 px abaixo, opções com 44 px de altura mínima (área de toque) e 10 px entre elas, fotos de pergunta até 80 px, capa com o título a 64 px, tela de análise com anel de 128 px.
- **Largura ≤ 365 px**: o `<br>` do subtítulo da capa some e a frase se distribui sozinha (antes sobrava "com" sozinho numa linha).
- **Auditoria automática** (texto fora de botão/opção/card, elemento fora da largura, clicável escondido atrás da bandeja, toque < 44 px, clicáveis sobrepostos) em todas as sessões, inclusive as duas fases da análise, em 3 condições — fonte normal, fonte reserva Arial (fonte ainda não carregada) e texto 15% maior (zoom/"texto grande" do celular): **tudo ok** em 320×568, 360×640, 360×740, 370×800, 375×667, 390×664, 390×844, 430×932, 768×1024, 1024×768, 1366×657 e 1920×969. Única exceção: 320×568 com texto 15% maior, onde a última opção da S17 fica 3 px sob a bandeja (resolve com rolagem).
- Em telas largas (tablet, notebook, computador), o quiz continua como uma coluna de até 430 px centralizada, com a bandeja da mesma largura.

## Estados e interações

- **Selecionado** (opções e cards): fundo `#f5f8fc`, anel de 2 px `--blue` e sombra maior. Radio preenchido de azul com ponto branco de 7 px.
- **Hover:** anel de 1 px `rgba(176,198,222,.6)`. **Clique:** `scale(.985)` nas opções, `.98` nos cards, `.97` no CTA.

## Animações

- Entrada de sessão: `opacity 0→1` + `translateY(8px→0)`, 0,35 s.
- Etapa ativa do stepper: o círculo "aparece" (`scale .85→1`, fundo transparente→azul), 0,4 s.
- Barra de progresso: cresce no momento da resposta (transição de `width`, 0,6 s). Ver "Barra de progresso".
- Anel da Sessão 5: de 0 a 100% em 1 s (ease-out, 0,25 s de atraso), com o número subindo junto. A sessão avança sozinha em 3,5 s.
- Ativos da bandeja: ver "Bandeja de ativos" acima.
- Curva padrão: `cubic-bezier(.4, 0, .2, 1)`.

## Imagens

- **Formato: WebP** (desde 2026-10-17). Todas as imagens do site estão em `public/assets/img/*.webp`: 30 arquivos, 187 KB no total (antes 2 MB em PNG/JPG).
  - Fotos: qualidade 80, no dobro do tamanho exibido (ex.: perguntas em 628×400 para 314×200).
  - Ativos: no máximo 80 px de altura (dobro dos 40 px da bandeja), qualidade 85, com transparência.
  - Os PNG/JPG originais ficam em `Backup imagens originais/` (fora do site). Imagem nova: gerar a versão `.webp` e referenciar só ela.
- Recortadas das referências (provisórias): `avatars`, `antes-depois`, `idade-*`, `dor-*`, e as texturas de Ácido Hialurônico e Retinal. Devem ser trocadas pelos originais em alta resolução.
