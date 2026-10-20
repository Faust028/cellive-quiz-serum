# Cellive Skin — Quiz + Página de Venda

Quiz de skincare da marca Cellive Skin que, ao final, leva a uma página de venda simples.
Projeto em português (pt-BR). Todo o texto voltado ao usuário deve ser escrito em português.

## Documentos do projeto (leia antes de trabalhar)

- @specs/site.md — o que precisa ser construído (escopo, funcionalidades, stack, requisitos).
- @specs/design.md — padrão visual (cores, tipografia, medidas, componentes, animações).
- @memoria.md — histórico de decisões, problemas, soluções e pendências.

## Regra principal

Se algum pedido meu contradisser uma decisão registrada em @specs/site.md, @specs/design.md ou @memoria.md, pare e me avise antes de realizar qualquer alteração. Explique qual decisão seria afetada e pergunte se desejo substituí-la.

## Regras gerais de trabalho

- Não altere a stack técnica sem minha autorização.
- Não remova uma decisão aprovada silenciosamente.
- Não invente informações comerciais, médicas ou técnicas sobre o produto. O que não foi confirmado fica como "a definir".
- Sempre preserve a consistência visual e estrutural entre as seções.
- Antes de uma mudança grande, apresente um plano resumido.
- Depois de uma decisão importante aprovada, atualize @memoria.md.

## Instruções essenciais

- **Fidelidade às referências:** cada sessão segue a imagem `Sessões/Sessão N.jpeg` (739×1600 = celular de 370px em 2x; medidas em CSS = pixels da imagem ÷ 2). Construa uma sessão por vez, compare lado a lado com a referência e só avance com a aprovação do usuário.
- **Referência de comportamento:** o quiz da Tonaface (https://tonaface.com/) serve para interações (avanço automático, opção selecionada, stepper). O visual segue sempre as imagens da Cellive.
- **Como rodar:** `npm start` → http://localhost:3000. Atalho de desenvolvimento: `/#N` abre direto na sessão N.
- **Estrutura:** `server.js` (Express), `public/index.html` (uma `<section class="step" data-step="N">` por sessão), `public/css/style.css`, `public/js/quiz.js`, `public/assets/`.
- Reutilize os componentes existentes (logo, stepper, opções, barra de progresso, cards) antes de criar novos.
