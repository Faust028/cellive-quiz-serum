# Memória do projeto — Cellive Skin

Histórico vivo de decisões e aprendizados. Registrar só o que ajuda na continuidade.

## Decisões aprovadas

- **2026-10-04** — Stack: Node.js + Express + HTML/CSS/JS puro. Mudanças só com confirmação.
- **2026-10-04** — Quiz em página única (`/`); página de venda em página separada (ex.: `/oferta`).
- **2026-10-04** — Objetivo: venda direta, sem captura de contato antes da oferta.
- **2026-10-04** — Idioma: somente pt-BR.
- **2026-10-04** — Público: mulheres, sem faixa de idade principal por enquanto.
- **2026-10-04** — Tipografia: Acumin Pro e Acumin Pro Condensed via Adobe Fonts. *Atualizada abaixo.*
- **2026-10-04** — Tipografia (substitui a anterior): usar o arquivo **Acumin Variable Concept** da Adobe, enviado pela usuária, hospedado no próprio site. Ele cobre todos os pesos, a largura Condensed e o itálico. A licença para uso web ainda precisa ser confirmada antes de publicar.
- **2026-10-04** — Haverá rastreamento (ferramentas a definir).
- **2026-10-04** — Uso do nome "Evelyn Veras" autorizado.
- **2026-10-04** — Fidelidade máxima às referências `Sessão N.jpeg`, construídas uma por vez com comparação lado a lado.
- **2026-10-04** — Tonaface como referência de comportamento: avanço automático, estado selecionado e transição do stepper.
- **2026-10-04** — Sessão 5 (88%) avança sozinha após 5,5 s, com o anel animado de 0 a 88%. *Atualizada abaixo.*
- **2026-10-05** — Referências renumeradas pela usuária: a Sessão 7 passou a ser a versão com bandeja; a 8 é a dos olhos e a 9 a das dores.
- **2026-10-05** — Bandeja de ativos fixa por pergunta, acumulando: a Sessão 7 adiciona Ácido Hialurônico, a 8 adiciona Retinal e a 9 não adiciona nenhum. Ela só aparece depois do primeiro ativo.
- **2026-10-05** — Ácido Hialurônico e Retinal confirmados como ativos reais da fórmula.
- **2026-10-05** — Sessão 9 é de múltipla escolha. O botão CONTINUAR exige pelo menos 1 seleção.
- **2026-10-05** — Barra de progresso sempre crescente: 9, 14, 20 e 25% (Sessões 6 a 9). *Atualizada abaixo.*
- **2026-10-19** — **Sessão 18: tela de análise pós-respostas**, a partir das 6 referências em `Analise pós respostas/`. Uma tela animada (6,5 s) com duas fases: análise com 3 etapas e, a partir de 75%, frasco enchendo. Comparada lado a lado nos 6 pontos das referências e testada no fluxo real (Sessão 17 → 18 → 100%). Ícones e frasco desenhados em SVG. *Atualizada abaixo.*
- **2026-10-20** — **Frasco da tela de análise trocado** pelo formato das imagens enviadas pela usuária (cinza vazio / preto cheio). Contorno extraído da imagem preta por script (`trace.js`, Ramer–Douglas–Peucker com tolerância 0,3) e colocado como `<path>` único no `clipPath`; cores `#dbdce1` / `#1c1c1c`. Mesmo tamanho e posição do anterior; animação e tempos inalterados.
- **2026-10-20** — **Tela de análise com Staggered Progress + pausas dramáticas + ease-in-out**, a pedido da usuária, mantendo o tempo total (4 s + 0,6 s + 2,5 s + 0,9 s). Anel: pausas em 40%, 72% e 94% (as duas primeiras quando as etapas acendem). Frasco: pausas em 35% e 78%. E o **número fica sempre dentro do anel** (Sessões 5 e 18): limite de 66% do miolo, medido de verdade, valendo para qualquer fonte e tela.
- **2026-10-20** — **Revisão completa de responsividade** a pedido da usuária (frases saindo dos botões no celular). Causa raiz: `white-space: nowrap` nas opções, rótulos dos cards e título da análise, mais larguras/alturas fixas no botão da capa, no CONTINUAR e nos cards. Com fonte reserva (Acumin ainda não carregada), zoom ou "texto grande" do celular, o texto vazava. Correção: tudo quebra linha e cresce (`min-height`/`min-width`), fonte das opções `clamp(15px, 4.3vw, 16px)`, compactação extra em telas ≤ 600 px e `<br>` do subtítulo da capa oculto em ≤ 365 px. **Substitui a regra de 2026-10-12 de manter as opções em uma linha (`nowrap` + `.option--2-linhas`).** Aparência na tela da referência preservada (opção 15,9 px, botão da capa 257 px). Auditoria automática em 12 tamanhos × 3 condições e fluxo completo 1→18 testados.
- **2026-10-19** — **Correção para celular** (a usuária viu botões por cima das opções e opções sumindo): fotos de pergunta encolhem conforme a altura da tela; idade e dores compactas em telas ≤ 740 px; grades fluidas em ≤ 380 px de largura; opções quebram linha em ≤ 365 px; CONTINUAR sem sticky em ≤ 600 px. Auditoria automática (opção escondida, botão sobre card, texto cortado, fora da largura) passou em 360×640, 375×667, 390×664, 412×780, 412×915 e 370×800.
- **2026-10-19** — **Repositório GitHub**: `github.com/Faust028/cellive-quiz-serum`, **público** por escolha da usuária, mesmo avisada de que a fonte Acumin e os documentos ficam visíveis. Branch `main`, primeiro commit `85d9058` (45 arquivos). Git 2.55 instalado via winget (`C:\Program Files\Git\cmd\git.exe`); autor dos commits `Faust028 <Faust028@users.noreply.github.com>`. O `.gitignore` deixa de fora `node_modules`, `Fontes/`, backups, referências, fotos soltas da raiz e a pasta `landing page serum facial/` (outro projeto encontrado dentro da pasta, a confirmar com a usuária).
- **2026-10-19** — **Sessão 18 refeita com as referências v2** (substitui a anterior): duas fases em sequência. Na fase 1 o anel vai até 100% com as etapas (acendem em 0, 40 e 72%). Na fase 2 o anel e a lista somem e um frasco maior (85×278,5 px, logo abaixo do título) enche de 0 a 100%. Tempos: 4 s + pausa de 0,6 s + 2,5 s. Comparada nos 6 pontos das referências e testada no fluxo real.
- **2026-10-19** — **Sessão 7 (frequência de cuidados) removida** a pedido da usuária. As demais sessões mantêm o número (a 7 fica vaga) para continuar batendo com as referências e os documentos; o atalho `/#7` não abre mais nada. O quiz passou a ter 14 perguntas e a barra se recalculou sozinha (Sessão 6 entra em 21,4%).
- **2026-10-19** — Stepper 1-2-3 (Sessões 2–4) com as cores da imagem enviada pela usuária: número do círculo ativo **branco** (antes `--slate`) e círculos concluídos em `#e0e0e0` (antes `#dddddd`). Os números futuros continuam `--slate`.
- **2026-10-19** — Barra de progresso (substitui os valores fixos): calculada no `quiz.js` como respondidas ÷ total de perguntas do quiz (15), crescendo **no momento da resposta**. Sessão 6 entra em 20%, Sessão 17 vai a 100% ao responder. Fluxo completo 1→17 testado no navegador.
- **2026-10-06** — Sessão 5 (substitui a de 2026-10-04): anel e número vão até **100%**, o anel enche em 1 s e a sessão avança em **3,5 s**. A afirmação "100%" segue a confirmar; o texto "99 de 100" foi mantido.
- **2026-10-06** — Animação da bandeja (substitui o "surge subindo com quique"): o ativo novo entra deslizando da esquerda e empurra os anteriores para a direita; no fim, a fila se reorganiza na ordem da referência (Ácido Hialurônico, Retinal). *Atualizada abaixo.*
- **2026-10-06** — Animação da bandeja (substitui a anterior): o ativo novo entra pela esquerda e empurra os anteriores para a direita, **sem reorganizar depois**. A ordem final fica com o mais recente à esquerda (Sessão 9: Retinal, Ácido Hialurônico), inversa à referência, por escolha da usuária.

- **2026-10-12** — PDF de perguntas e ativos adotado como guia. Perguntas parecidas com as existentes só ganham o ativo; as diferentes entram a partir da Sessão 10, na ordem do PDF. Construção por etapas, conforme as imagens chegam.
- **2026-10-12** — Ativos movidos (substitui a decisão de 2026-10-05): Ácido Hialurônico → Sessão 6 (idade); Retinal → Sessão 9 (dores, ao clicar em CONTINUAR). As Sessões 7 e 8 ficam sem ativo. A bandeja passa a aparecer a partir da Sessão 6.
- **2026-10-12** — Sessão 9 continua de múltipla escolha, embora o PDF diga "seleção única".
- **2026-10-12** — Usar as imagens de ativos da pasta `Ativos/` como estão, a pedido da usuária, mesmo com o alerta de marca de terceiros (GHK-Cu "Hidrabene", Acetyl). *Resolvido em 2026-10-16 (imagens trocadas).* A imagem do Pentapeptide-4, que mostrava um frasco de Ácido Hialurônico, foi trocada pela usuária por uma molécula (`Ativos/Pentapeptide-4.png`).
- **2026-10-12** — A Sessão 8 (olhos) recebeu a foto da pergunta 11 do PDF; a Niacinamida será o ativo dela quando a imagem chegar. Reconfirmado em 2026-10-14: a pergunta 11 **não** vira sessão separada.
- **2026-10-12** — Perguntas 9 e 10 do PDF (texto igual) viraram uma só sessão (17).
- **2026-10-16** — A usuária substituiu as imagens de GHK-Cu (pó azul, `.avif`) e Acetyl Hexapeptide-8 (molécula). Nenhuma imagem de ativo mostra mais marca de terceiros. O **Ácido Hialurônico continua com a textura recortada da referência** (a gota com bolhas em `Ativos/ácido hialurônico.png` não deve ser usada).
- **2026-10-17** — Sessão 17 (foto + 4 opções): no celular, a 4ª opção ficava atrás da bandeja (precisava de 783 px de tela). Criada a versão compacta `.step--compacta` (foto de 130 px, espaçamentos menores): agora cabe em 666 px. Testado em 370×667.
- **2026-10-17** — Hospedagem: **Vercel**, só com a pasta `public/` (estático). Domínio do quiz: **quiz.celliveskin.com.br**. O DNS de celliveskin.com.br está no **Registro.br** (`a.auto.dns.br` / `b.auto.dns.br`) e estava vazio (sem www, sem raiz, sem quiz). Criados `vercel.json` (cache das imagens e fontes por 7 dias; CSS e JS sempre revalidados) e `.vercelignore`. Criar a conta, publicar e mexer no DNS ficam com a usuária.
- **2026-10-17** — **Um ativo por pergunta.** A Sessão 17 deixou de adicionar dois ativos e ficou só com o **Exo Skin**. A Alfa-arbutina saiu do quiz (a imagem `ativo-alfa-arbutina.webp` continua na pasta, sem uso). Substitui a decisão de 2026-10-16 de colocar os dois na Sessão 17.
- **2026-10-17** — Imagens do site convertidas para WebP (30 arquivos, 2 MB → 187 KB). Ativos reduzidos para 80 px de altura. Originais movidos para `Backup imagens originais/`, incluindo a `olhos.png` antiga da Sessão 8, que não era mais usada. Todas as 30 imagens conferidas no navegador.
- **2026-10-17** — Referências `Sessão 1–9.jpeg` movidas pela usuária da raiz para a pasta `Sessões/`. As fotos de pergunta (Botox, Testa franzida etc.) continuam na raiz.
- **2026-10-16** — Últimos 4 ativos do PDF adicionados: Niacinamida (Sessão 8), Tetrapeptide-7 (16), Alfa-arbutina e Exo Skin (17, os dois na mesma sessão, em sequência). A imagem da gota com bolhas era da Niacinamida (o arquivo tinha sido salvo antes como "ácido hialurônico.png").
- **2026-10-16** — Bandeja de ativos reduzida ~30% a pedido da usuária (substitui as medidas tiradas da referência): título 12 px, painel 58 px, imagens 40 px, nomes 8,6 px; `--tray-height` 78 px.

## Decisões rejeitadas

- Botão "Voltar" (presente na Tonaface): não incluído, porque não aparece nas referências.
- Arquivos `acumin-pro.otf` e `acumin-pro-condensed.otf` (site maisfontes): não usados. Só têm o peso Regular (os negritos ficariam artificiais) e a licença é duvidosa.
- Reorganizar a fila de ativos na ordem da referência ao fim da animação: usado por um dia e retirado a pedido da usuária ("não precisam trocar de lugar").
- Dois ativos na mesma pergunta (Alfa-arbutina + Exo Skin na Sessão 17): retirado a pedido da usuária, a regra é um ativo por pergunta.
- Inverter a ordem em que os ativos são adicionados (para a ordem final bater com a referência sem trocas): oferecido e não escolhido.

## Alterações realizadas

- **2026-10-04** — Sessões 1 a 7 construídas e conferidas com as referências.
- Correções de texto em relação às referências:
  - "masa" → "mas" (Sessão 3);
  - "25- 30" e "30- 35" → "25 - 30" e "30 - 35" (Sessão 6);
  - espaço duplo removido em "frequência  você" (Sessão 7);
  - "de deixa" → "te deixa" (Sessão 8);
  - "mais de trazem" → "mais te trazem" e "contiuar" → "continuar" (Sessão 9).
- Acumin aplicada (`AcuminVariable-Latin.woff2`, 413 KB). Inter e Barlow Condensed removidas do Google Fonts (fica só a Montserrat do logo). Tamanhos e posições de todas as 7 sessões reajustados e conferidos lado a lado.
- Servidor com `Cache-Control: no-store` para o navegador sempre carregar a versão mais recente.
- **2026-10-05** — Sessões 8 e 9 construídas, bandeja de ativos adicionada às Sessões 7–9; tudo conferido lado a lado. O atalho `/#N` já entra com os ativos das sessões anteriores na bandeja.
- **2026-10-06** — Sessão 5 alterada para 100% e mais rápida (`data-percent="100"`, `data-auto-next="3500"`, duração do anel 1 s).
- **2026-10-06** — Animação dos ativos refeita no `quiz.js` com FLIP (Web Animations API); a animação CSS `ativoIn` foi removida.
- **2026-10-12** — Sessão 10 (sensibilidade, PDRN) construída com os textos do PDF e o layout da Sessão 7 (barra 30%). Imagem `ativo-pdrn.png` gerada a partir de `Ativos/PDRN.png`. Fluxo 6→10 testado no navegador.
- **2026-10-12** — Sessões 11 a 17 construídas com os textos do PDF (fotos nas 11, 12, 15, 16 e 17), barra de 35% a 65%, ativos GHK-Cu, Acetyl Hexapeptide-8, Pentapeptide-4, Propilenoglicol e Glutationa. Fluxo 10→17 testado no navegador, sem imagens quebradas.
- Correções de texto do PDF: "Sim, Inclusive já fiz.." → "Sim, inclusive já fiz."; "perdo" → "perdi"; pontuação final padronizada nas opções.
- **2026-10-06** — Botão CONTINUAR (Sessão 9) sempre visível: `position: sticky` acima da bandeja em telas baixas. O `.app` passou de `overflow-x: hidden` para `clip`. O estado desativado passou a usar cor sólida (`#dbe5f0`) em vez de opacidade. Testado em 800, 667 e 568 px de altura.

## Problemas encontrados

- O quiz "não avançava" no teste da usuária. Causa: a última sessão construída não tinha próxima, e havia possível cache antigo do navegador.
- A captura com o Edge em modo invisível pegava as animações pela metade (anel em 0%, telas desbotadas).
- O painel do navegador oculto não redesenha a página nem roda `requestAnimationFrame` / animações.
- Fonte variável reduzida com os eixos recortados (`subset-font` com `variationAxes`) é rejeitada pelo navegador ("network error") e cai na Arial.
- `font-style: italic` não inclina a Acumin variável: o eixo `slnt` dela usa valores positivos (0 a 12).
- **2026-10-12** — Liberar a quebra de linha em todas as opções fez "Queria ter uma pele radiante e viçosa." (Sessão 2) quebrar: o texto já era um pouco mais largo que o espaço. Solução da época: manter `nowrap` e usar `.option--2-linhas` só onde precisa. *Revista em 2026-10-20: o `nowrap` era a causa das frases saindo dos botões; agora todas quebram linha e a fonte se ajusta (`clamp`) para a Sessão 2 seguir em 1 linha na tela da referência.*
- **2026-10-20** — A auditoria com a fonte Acumin carregada não mostrava os vazamentos que a usuária via no celular. Lição: testar sempre também com fonte reserva (Arial) e com texto ampliado, que é o que acontece em aparelhos reais (fonte ainda carregando, Samsung Internet com "tamanho do texto", zoom).
- **2026-10-12** — Scripts de captura na pasta temporária sumiram; o recriado (`render.ps1`) precisa achar "Sessão N.jpeg" por curinga, porque o PowerShell 5.1 lê o "ã" de arquivos UTF-8 sem BOM errado.
- **2026-10-06** — Em telas baixas, o botão CONTINUAR ficava escondido atrás da bandeja fixa. Um primeiro `position: sticky` não funcionou porque `overflow-x: hidden` no `.app` criava um contêiner de rolagem.
- **2026-10-19** — O `git push` pelo terminal do Claude falha ("terminal prompts disabled"), porque o login do GitHub precisa de janela. Solução: rodar o push no terminal da usuária (painel de terminal), onde o Git Credential Manager abre o navegador.
- **2026-10-19** — Na primeira versão da barra automática, a Sessão 6 entrava em 0% quando a aba não estava visível: a animação dependia de `requestAnimationFrame`. Trocado por reflow forçado + transição, que funciona sempre.
- **2026-10-16** — Interpretei mal "substituí o GHK-Cu e o Ácido Hialurônico" e troquei a imagem do Ácido Hialurônico, apagando o recorte antigo. Recriado a partir de `Sessões/Sessão 8.jpeg` (x 22, y 1458, 122×90). Lição: antes de trocar uma imagem, confirmar quais arquivos a usuária realmente mudou.
- **2026-10-06** — Substituições em lote nos documentos via PowerShell corromperam `specs/design.md` e `memoria.md` (hífens e quebras de linha apagados). Causa: em PowerShell a vírgula tem precedência sobre `+`, e um array com um só par é "desembrulhado"; os pares viraram letras soltas.

## Soluções aplicadas

- Desativado o cache no Express. Orientação para usar Ctrl + Shift + R.
- Comparação visual feita com uma cópia estática temporária (`__static.html`, apagada depois de cada uso), com a sessão ativa e as animações desligadas.
- Fonte reduzida apenas nos caracteres, mantendo os eixos completos. Antes de trocar, conferir no navegador se `document.fonts` mostra `loaded`.
- Itálico feito com `font-variation-settings: 'slnt' 12`. Condensed feito com um segundo `@font-face` de `font-stretch: 67.5%` sobre o mesmo arquivo.
- Documentos restaurados por inteiro a partir da última versão conhecida. **Editar os documentos `.md` só com a ferramenta de edição de arquivos, nunca com substituição em lote no PowerShell.**
- Animações da bandeja verificadas pela ordem dos itens no DOM ao longo do tempo (o painel oculto não mostra o movimento).

## Pendências

- Bandeja com 8 ativos: só os 3–4 mais recentes aparecem; os mais antigos saem pela direita. Avaliar se está bom assim.
- Pontos do PDF: perguntas 9 e 10 com o mesmo texto; duas perguntas "8"; "Nunca utilizei" sobrando na 11; "perdo" (perdi?) na segunda 8; "Propilenoglicol" é mais um veículo/umectante do que um ativo anti-idade, confirmar se deve aparecer como ativo.
- Confirmar se a licença da Acumin Variable Concept permite hospedar a fonte no site. Se não permitir, usar um kit do Adobe Fonts antes de publicar.
- Logo oficial (SVG/PNG).
- Fotos originais: avatares da capa, antes/depois, as 4 fotos de idade, a foto dos olhos, as 6 fotos de dores e as texturas dos ativos. A 3ª foto de idade tem um "×" herdado do print.
- Informações do produto: nome, tipo, demais ativos, preço, kits, garantia, prazo e frete.
- Confirmar as afirmações das telas (ver tabela em `specs/site.md`): "+1.000 mulheres", "10 perguntas · 2 minutos", "Entrega Grátis", "tecnologia coreana", "100%" (antes "88%"), "99 de 100", foto antes/depois.
- Texto e destino da CTA final e plataforma de checkout.
- Importar o repositório do GitHub na Vercel e criar o CNAME `quiz` no Registro.br.
- Decidir o que é a pasta `landing page serum facial/` (página de venda?) e se entra neste repositório.
- Ferramentas de rastreamento (Meta Pixel, GA etc.).
- Link real da Política de Privacidade (hoje `href="#"`).
- Implementar `prefers-reduced-motion` e `loading="lazy"` nas imagens fora da primeira tela.
- Fonte Acumin (413 KB) agora é o maior arquivo da página, maior que todas as imagens juntas.

## Próximos passos

1. Próxima etapa: página de venda (o que vem depois da análise da Sessão 18). Hoje a análise para em 100%.
2. Trocar as imagens provisórias pelos originais.
3. Definir e construir a página de venda.
4. Integrar o envio das respostas e o rastreamento, após confirmação.
