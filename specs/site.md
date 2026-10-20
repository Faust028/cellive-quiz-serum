# Especificação do site — Cellive Skin

Fonte de verdade sobre o que precisa ser construído. Itens marcados como **A definir** não podem ser preenchidos por suposição.

## Objetivo

Levar a visitante por um quiz curto sobre a pele dela e, ao final, direcioná-la para a página de venda, onde ela compra o produto.
Objetivo principal: **venda direta**. Não há captura de contato (e-mail/WhatsApp) antes da oferta.

## Público-alvo

Mulheres brasileiras que querem melhorar a aparência da pele: linhas finas, rugas, aparência jovem, viço.
Faixas de idade atendidas no quiz: 18–25, 25–30, 30–35 e 35+. **Não há faixa principal definida** por enquanto.

## Produto e proposta de valor

- Marca: **Cellive Skin**.
- Proposta exibida nas referências: "Uma nova fase da sua pele começa aqui" — pele revitalizada e com aparência jovem.
- Ativos **confirmados** pela usuária: **Ácido Hialurônico** e **Retinal**.
- Documento de perguntas e ativos enviado pela usuária (PDF, 2026-10-12): cada pergunta do Bloco 3 tem um "ativo referente".

| Pergunta do PDF (Bloco 3) | Ativo | Onde está no quiz |
|---|---|---|
| 1. Qual é sua idade? | Ácido Hialurônico | Sessão 6 (já existia) |
| 2. Sua pele costuma irritar com facilidade? | PDRN | Sessão 10 |
| 3. Você já pensou em fazer botox ou peeling? | GHK-CU | Sessão 11 |
| 4. Quando seu rosto está relaxado, você ainda percebe linhas na testa? | Acetyl Hexapeptide-8 | Sessão 12 |
| 5. Você já tentou seguir uma rotina de skincare antes? | Pentapeptide-4 | Sessão 13 |
| 6. Qual desses sinais mais incomoda você hoje? | Retinal | Sessão 9 (já existia, mantida múltipla escolha) |
| 7. Com que frequência você usa protetor solar? | Propilenoglicol | Sessão 14 |
| 8. Pele do rosto menos firme? | Glutationa | Sessão 15 |
| 8 (repetido). Como sente sua pele sem maquiagem? | Tetrapeptide-7 | Sessão 16 |
| 9 e 10. Ativo específico para rejuvenescimento? (texto repetido) | Exo Skin (Alfa-arbutina fora do quiz) | Sessão 17, uma só vez |
| 11. Linhas ao redor dos olhos quando sorri? | Niacinamida | Sessão 8 (com a foto da pergunta 11) |

Regra: **um ativo por pergunta**. 11 dos 12 ativos do PDF estão no quiz; a Alfa-arbutina ficou de fora porque a pergunta dela é igual à do Exo Skin (decisão da usuária, 2026-10-17).

- Regra combinada: perguntas do PDF **parecidas** com as que já existem só ganham o ativo; as **diferentes** entram a partir da Sessão 10, na ordem do PDF. A Sessão 7 (frequência de cuidados), que não estava no PDF, foi removida em 2026-10-19.
- Nome, tipo, tamanho, demais ativos, preço, kits, garantia e prazo de entrega: **A definir**.

### Afirmações exibidas nas telas (precisam de confirmação antes de publicar)

| Afirmação | Onde aparece | Status |
|---|---|---|
| "Evelyn Veras e +1.000 mulheres usam" | Sessão 1 | Uso do nome da Evelyn **autorizado**; número "+1.000" **a confirmar** |
| "10 perguntas · 2 minutos" | Sessão 1 | **A confirmar** (o quiz tem hoje 14 perguntas) |
| "Entrega Grátis" | Sessão 1 | **A confirmar** |
| "Fórmula com tecnologia coreana" | Sessão 1 | **A confirmar** |
| "100%" (número do anel; antes "88%") | Sessão 5 | **A confirmar** (origem do dado). Atenção: o texto logo abaixo diz "99 de 100" |
| "A cada 100 mulheres, 99 sentiram melhora na sua aparência" | Sessão 5 | **A confirmar** (origem do dado) |
| Foto antes/depois (Dia 1 / Dia 30) | Sessão 5 | **A confirmar** (cliente real ou ilustrativa) |

## Idiomas

Somente **português do Brasil (pt-BR)**.

## Páginas

1. **Quiz:** uma única página (`/`) em que as sessões trocam sem recarregar.
2. **Página de venda:** página separada (ex.: `/oferta`). Ainda não construída.

## Seções do quiz

| Nº | Tipo | Conteúdo | Status |
|---|---|---|---|
| 1 | Capa | Título "Uma NOVA FASE sua pele começa aqui!", CTA "Quero melhorar minha pele", prova social, selo coreano, política de privacidade | Pronta |
| 2 | Pergunta 1/3 (stepper) | O que você mais gostaria de melhorar na sua pele? (3 opções) | Pronta |
| 3 | Pergunta 2/3 (stepper) | Como você se sente em relação à aparência da sua pele hoje? (3 opções) | Pronta |
| 4 | Pergunta 3/3 (stepper) | Tem quanto tempo que você reparou que sua pele não está como antes? (3 opções) | Pronta |
| 5 | Resultado | Anel 100% + "A cada 100 mulheres, 99…" + foto antes/depois. Avança sozinha | Pronta |
| 6 | Pergunta com fotos (barra 9%) + bandeja | Quantos anos você tem? (4 cards de idade). Responder adiciona **Ácido Hialurônico** | Pronta |
| ~~7~~ | — | ~~Com que frequência você cuida da sua pele?~~ **Removida em 2026-10-19** a pedido da usuária. Número mantido vago para não desalinhar das referências | Removida |
| 8 | Pergunta com foto (barra 20%) + bandeja | Você acha que suas rugas ao redor dos olhos te deixa mais velha? (foto + 3 opções). Responder adiciona **Niacinamida** | Pronta |
| 9 | Múltipla escolha (barra 25%) + bandeja | Quais dessas dores você gostaria de melhorar na sua aparência? (6 cards) + CONTINUAR. CONTINUAR adiciona **Retinal** | Pronta |
| 10 | Pergunta (barra 30%) + bandeja | Sua pele costuma irritar com facilidade? (4 opções, textos do PDF). Responder adiciona **PDRN**. Sem imagem de referência própria: segue o layout da Sessão 7 | Pronta |
| 11 | Pergunta com foto (35%) | Você já pensou em fazer botox ou peeling? → **GHK-Cu** | Pronta |
| 12 | Pergunta com foto (40%) | Quando seu rosto está relaxado, você ainda percebe linhas na testa? → **Acetyl Hexapeptide-8** | Pronta |
| 13 | Pergunta (45%) | Você já tentou seguir uma rotina de skincare antes? → **Pentapeptide-4** | Pronta |
| 14 | Pergunta (50%) | Com que frequência você usa protetor solar? → **Propilenoglicol** | Pronta |
| 15 | Pergunta com foto (55%) | Você sente que a pele do seu rosto está menos firme do que antes? → **Glutationa** | Pronta |
| 16 | Pergunta com foto (60%) | Quando você se olha no espelho sem maquiagem, como sente sua pele? → **Tetrapeptide-7** | Pronta |
| 17 | Pergunta com foto, 4 opções (65%) | Você já utiliza algum ativo específico para rejuvenescimento? → **Exo Skin** | Pronta |
| 18 | Análise pós-respostas (animação, sem perguntas) | Fase 1 (4 s): "Fazendo uma análise do seu caso" + anel de 0 a 100% + 3 etapas (Analisando as respostas, Entendendo seu tipo de pele, Revisando compatibilidade dos ativos). Fase 2 (2,5 s): "Combinando os melhores ativos" + frasco grande enchendo de 0 a 100%. Total ≈ 8 s. Referências v2 em `Analise pós respostas/` | Pronta |
| 19+ | — | Página de venda (a Sessão 18 avança sozinha 0,9 s depois dos 100%, quando houver próxima tela) | **A definir** |

As Sessões 11–17 não têm imagem de referência própria: seguem o layout da Sessão 8 (com foto) ou da Sessão 7 (sem foto), com os textos do PDF.
| — | Página de venda | Estrutura e conteúdo | **A definir** |

## Funcionalidades

- Navegação entre sessões sem recarregar a página.
- Avanço automático ao escolher uma opção (≈0,45 s depois, para mostrar a seleção).
- Sessões sem botão avançam sozinhas pelo atributo `data-auto-next` (Sessão 5: 3,5 s).
- **Bandeja de ativos** ("Combinação ideal para sua pele:"), fixa no rodapé nas sessões com `data-tray` (6–17):
  - cada sessão com `data-ativo` adiciona o seu ativo quando a visitante responde, com qualquer resposta; **um ativo por pergunta** (o código aceita mais de um separado por espaço, mas a regra do projeto é um só);
  - os ativos se acumulam e não se repetem;
  - a bandeja só aparece depois do primeiro ativo;
  - o ativo novo entra deslizando da esquerda, fica na primeira posição e empurra os anteriores para a direita, sem trocas depois (detalhes em `specs/design.md`);
  - quando um ativo novo entra, o avanço espera 1,4 s para que ela veja o ativo chegar.
- **Múltipla escolha** (Sessão 9): cards com `data-toggle`. O botão CONTINUAR fica desativado até haver pelo menos 1 seleção. Ao clicar, adiciona o ativo da sessão e espera a animação (1,4 s) antes de avançar.
- **Barra de progresso automática**: respondidas ÷ total de perguntas do quiz (14, desde a remoção da Sessão 7). Avança no momento da resposta e chega a 100% na última pergunta.
- Respostas guardadas em memória (`window.cellive.answers`, chave = número da sessão; na múltipla escolha, uma lista).
- Rota `POST /api/respostas` no servidor (por enquanto só registra no console; o quiz ainda não envia).
- Rastreamento: **sim**, ferramentas **a definir** (ex.: Meta Pixel, Google Analytics). Confirmar antes de instalar.
- Botão "Voltar": **não** existe nas referências e não foi implementado.

## Chamadas para ação

- Sessão 1: "Quero melhorar minha pele" → inicia o quiz.
- Sessão 9: "CONTINUAR" → próxima sessão (exige pelo menos 1 dor marcada).
- Final do quiz → página de venda: texto e destino **a definir**.
- Página de venda → checkout: texto do botão e plataforma/link **a definir**.

## Stack técnica

- Node.js + Express (servidor estático) + HTML, CSS e JavaScript puro, sem framework.
- Manter esta stack. **Qualquer mudança precisa de confirmação.**
- Hospedagem: **Vercel** (escolhida em 2026-10-17; a usuária não tinha preferência). Publica só a pasta `public/` como site estático (`vercel.json`, `.vercelignore`). O Express continua só para desenvolvimento local; a rota `/api/respostas` não vai para o ar até virar uma função da Vercel.
- Domínio: **`quiz.celliveskin.com.br`** (registro CNAME no DNS do Registro.br apontando para a Vercel). `www.celliveskin.com.br` e o domínio raiz ficam livres por enquanto (hoje sem site).
- Fontes: Acumin Variable Concept (Adobe), hospedada no próprio site (`public/assets/fonts/`). Ela substitui Acumin Pro e Acumin Pro Condensed. **Confirmar a licença para uso web antes de publicar.**

## Responsividade

- Mobile-first, base de **370–375 px** de largura (medidas tiradas das referências em 2x).
- Conteúdo centralizado em um contêiner de no máximo **430 px**. No desktop aparece como coluna de celular centralizada.
- Margem lateral mínima de 16 px. Sem rolagem horizontal.
- Testar também em 320 px e 414–430 px.

## Acessibilidade

- Opções como `<button>` com `role="radio"` e `aria-checked`. O stepper e a barra de progresso têm rótulos ARIA.
- Imagens com `alt` (as decorativas usam `alt=""`).
- Navegação por teclado (Tab/Enter) nas opções e nos botões.
- Respeitar `prefers-reduced-motion` (pendente).
- Contraste e textos muito pequenos (7,8–9 px na Sessão 1) vêm da referência e devem ser revisados com o usuário.

## Desempenho

- Sem frameworks nem bibliotecas no front-end.
- Imagens em **WebP** no dobro do tamanho exibido (feito em 2026-10-17: 2 MB → 187 KB). Pendente: carregamento tardio (`loading="lazy"`) das imagens fora da primeira tela.
- Fontes com `font-display: swap`.
- Meta: página inicial abaixo de ~500 KB e LCP < 2,5 s em 4G.
- A fonte variável sozinha tem 413 KB e é pré-carregada com `<link rel="preload">`. Ela é o maior item da página e vem antes das imagens na lista de otimização.

## Escopo

**Dentro do escopo**
- Quiz (Sessões 1–18 prontas, sem a 7; próximas conforme o PDF de perguntas e novas imagens).
- Página de venda simples.
- Rastreamento de conversão, quando as ferramentas forem definidas.

**Fora do escopo (por enquanto)**
- Checkout próprio ou pagamentos (o checkout será externo, a definir).
- Painel administrativo, contas de usuário, banco de dados.
- Outros idiomas.
- Captura de leads.
