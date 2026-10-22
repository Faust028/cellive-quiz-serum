(() => {
  const steps = [...document.querySelectorAll('.step')];
  const answers = {};
  const ADVANCE_DELAY = 450;        // tempo para mostrar a opção marcada antes de avançar
  const ADVANCE_DELAY_ATIVO = 850;  // tempo mínimo quando um ativo voa para o rodapé (animação rápida)
  const tray = document.querySelector('.tray');
  let current = 0;
  let locked = false;
  let autoTimer = null;

  function goTo(index) {
    if (index < 0 || index >= steps.length) return;
    clearTimeout(autoTimer);
    steps[current].classList.remove('is-active');
    current = index;
    steps[current].classList.add('is-active');
    window.scrollTo(0, 0);
    onEnter(steps[current]);
  }

  // Comportamentos ao entrar em uma sessão
  function onEnter(step) {
    const ring = step.querySelector('.result__ring');
    if (ring) animateRing(ring);
    if (step.dataset.analysis) runAnalysis(step);

    updateTray();
    enterProgress(step);

    // Sessões sem botão (ex.: 88%) avançam sozinhas após o tempo definido
    const delay = Number(step.dataset.autoNext);
    if (delay) autoTimer = setTimeout(() => goTo(current + 1), delay);
  }

  // ---------- Barra de progresso ----------
  // Calculada sozinha: perguntas respondidas ÷ total de perguntas do quiz.
  // Pergunta = sessão com opções (data-answer) ou múltipla escolha (data-toggle).
  const questions = steps.filter((s) => s.querySelector('[data-answer], [data-toggle]'));
  const answeredBefore = (step) => questions.filter((q) => steps.indexOf(q) < steps.indexOf(step)).length;
  const pct = (n) => Math.round((n / questions.length) * 1000) / 10;

  function setProgress(step, value, animate = true) {
    const bar = step.querySelector('.progress');
    if (!bar) return;
    const fill = bar.querySelector('.progress__fill');
    if (!animate) fill.style.transition = 'none';
    fill.style.width = value + '%';
    bar.setAttribute('aria-valuenow', Math.round(value));
    if (!animate) { fill.offsetWidth; fill.style.transition = ''; }
  }

  // Ao entrar: mostra o progresso já feito. Se a tela anterior também tinha barra,
  // ela já terminou nesse valor, então não anima (continuidade visual).
  function enterProgress(step) {
    if (!step.querySelector('.progress')) return;
    const prev = steps[steps.indexOf(step) - 1];
    const cameFromBar = prev && prev.querySelector('.progress');
    const value = pct(answeredBefore(step));
    if (cameFromBar) { setProgress(step, value, false); return; }
    setProgress(step, 0, false);   // já força o reflow, então a transição até o valor anima
    setProgress(step, value);
  }

  // Ao responder: a barra já avança na mesma tela, antes de trocar de pergunta
  function answerProgress(step) {
    setProgress(step, pct(answeredBefore(step) + 1));
  }

  // ---------- Número dentro do anel (Sessões 5 e 18) ----------
  // O "100%" tem que caber no miolo do anel em qualquer fonte e tamanho de tela.
  // Mede a largura real do texto e, se passar de 66% do miolo, reduz a fonte (dá folga ao "100%").
  // Só recalcula quando muda a quantidade de dígitos (ex.: 9 → 10 → 100).
  const RING_TEXT_MAX = .66;
  function fitRingValue(counter) {
    const value = counter.parentElement;               // .analysis__value / .result__value
    const ring = value.parentElement;                  // .analysis__ring / .result__ring
    const key = `${counter.textContent.length}|${ring.clientWidth}`;
    if (value.dataset.fit === key) return;
    value.dataset.fit = key;
    value.style.fontSize = '';
    const svg = ring.querySelector('svg');
    const circle = ring.querySelector('circle');
    const scale = ring.clientWidth / svg.viewBox.baseVal.width;
    const stroke = parseFloat(getComputedStyle(circle).strokeWidth) * scale;
    const inner = ring.clientWidth - 2 * stroke;
    const range = document.createRange();
    range.selectNodeContents(value);
    const width = range.getBoundingClientRect().width;
    if (!width || !inner) return;
    const limit = inner * RING_TEXT_MAX;
    if (width > limit) {
      const base = parseFloat(getComputedStyle(value).fontSize);
      value.style.fontSize = `${Math.floor(base * (limit / width) * 10) / 10}px`;
    }
  }
  // Quando a fonte Acumin termina de carregar (ou a tela muda de tamanho), mede de novo
  const refitRings = () => document.querySelectorAll('.analysis__value, .result__value').forEach((v) => {
    delete v.dataset.fit;
    const c = v.querySelector('[data-count]');
    if (c && v.offsetParent) fitRingValue(c);
  });
  if (document.fonts) document.fonts.ready.then(refitRings);
  window.addEventListener('resize', refitRings);

  // ---------- Tela de análise (Sessão 18, referências v3 de 2026-10-22) ----------
  // Fase 1: anel de 0 a 100% em data-analysis ms, contínuo (sem pausas); uma etapa por vez,
  //         trocando em data-at (0, 40, 72).
  // Fase 2: "Montando sua fórmula". Os ativos da visitante ficam num círculo em volta do frasco
  //         e entram nele um por um (todos em data-fill ms); a cada entrada o preto sobe 1/N.
  //         Frasco cheio → "Fórmula concluída!" + check e segue para a próxima sessão (se houver).
  // Escala única v de 0 a 200 (cellive.setAnalysis, usada também nos testes):
  //  v 0–100 = anel; v 100–200 = quantos ativos já entraram no frasco; v = 200 = concluída.
  const FORMULA_SWITCH = 350;   // anel em 100% → troca para a fase 2
  const FORMULA_FADE = 450;     // fade entre as fases (igual ao CSS)
  const FORMULA_POUR = 420;     // ativo voando do círculo para dentro do frasco
  const FORMULA_HOLD = 1200;    // "Fórmula concluída!" na tela antes de seguir
  const easeInOutSine = (x) => -(Math.cos(Math.PI * x) - 1) / 2;

  const formulaIds = () => (collected.length ? collected : steps.flatMap((s) => (s.dataset.ativo || '').split(/\s+/).filter(Boolean)));
  const ativoName = (id) => {   // nome do ativo do template (os <br> viram espaço)
    const span = document.getElementById(`ativo-${id}`)?.content.querySelector('span');
    if (!span) return '';
    return [...span.childNodes].map((n) => (n.nodeName === 'BR' ? ' ' : n.textContent)).join('').replace(/\s+/g, ' ').trim();
  };

  // Monta o círculo de ativos (uma vez por entrada na sessão), distribuídos por igual a partir do topo
  function buildFormula(step) {
    const list = step.querySelector('.formula__ativos');
    const ids = formulaIds();
    list.innerHTML = '';
    ids.forEach((id, i) => {
      const img = document.getElementById(`ativo-${id}`)?.content.querySelector('img');
      const li = document.createElement('li');
      li.className = 'formula__ativo';
      li.dataset.ativo = id;
      li.style.setProperty('--i', i);
      const a = -Math.PI / 2 + (2 * Math.PI * i) / ids.length;
      li.style.left = `${50 + 45.67 * Math.cos(a)}%`;   // raio do círculo: 147,5 de 323
      li.style.top = `${50 + 45.67 * Math.sin(a)}%`;
      if (img) li.appendChild(Object.assign(document.createElement('img'), { src: img.getAttribute('src'), alt: '' }));
      list.appendChild(li);
    });
  }

  // Estado da fase 2 com k ativos já dentro do frasco
  function setFormula(step, k) {
    const items = [...step.querySelectorAll('.formula__ativo')];
    const n = items.length || 1;
    items.forEach((li, i) => li.classList.toggle('is-in', i < k));
    step.querySelector('.analysis__bottle-fill').style.transform = `translateY(${(1 - k / n) * 97}%)`;
    const id = items[Math.min(Math.max(k - 1, 0), items.length - 1)]?.dataset.ativo;
    step.querySelector('[data-formula-name]').textContent = id ? `+${ativoName(id)}` : '';
  }

  function setAnalysis(step, v) {
    const ring = Math.min(v, 100);
    const circle = step.querySelector('.analysis__progress');
    const length = 2 * Math.PI * circle.r.baseVal.value;
    circle.style.strokeDasharray = length;
    circle.style.strokeDashoffset = length * (1 - ring / 100);
    const counter = step.querySelector('[data-count]');
    counter.textContent = Math.round(ring);
    fitRingValue(counter);
    step.querySelector('.analysis__ring').setAttribute('aria-valuenow', Math.round(ring));

    const items = [...step.querySelectorAll('.analysis__steps li')];
    const activeIdx = items.reduce((acc, li, i) => (ring >= Number(li.dataset.at) ? i : acc), 0);
    items.forEach((li, i) => li.classList.toggle('is-active', i === activeIdx));

    step.classList.toggle('is-phase-2', v > 100);
    step.classList.toggle('is-done', v >= 200);
    if (v > 100) {
      if (!step.querySelector('.formula__ativo')) buildFormula(step);
      const n = step.querySelectorAll('.formula__ativo').length;
      setFormula(step, Math.round(((v - 100) / 100) * n));
    }
  }

  // Um ativo sai do círculo, encolhe e entra no frasco; ao chegar, o preto sobe e o frasco "engole"
  function pourFormula(step, li, k, done) {
    const bottle = step.querySelector('.analysis__bottle');
    const r = li.getBoundingClientRect();
    const b = bottle.getBoundingClientRect();
    const dx = b.left + b.width / 2 - (r.left + r.width / 2);
    const dy = b.top + b.height * 0.45 - (r.top + r.height / 2);
    step.querySelector('[data-formula-name]').textContent = `+${ativoName(li.dataset.ativo)}`;
    const anim = li.animate(
      [{ transform: 'none', opacity: 1 }, { transform: `translate(${dx}px, ${dy}px) scale(.3)`, opacity: 0.3 }],
      { duration: FORMULA_POUR, easing: 'cubic-bezier(.55, 0, .8, .3)', fill: 'forwards' }
    );
    whenDone(anim, FORMULA_POUR, () => {
      li.classList.add('is-in');
      anim.cancel();
      step.querySelector('.analysis__bottle-fill').style.transform =
        `translateY(${(1 - k / step.querySelectorAll('.formula__ativo').length) * 97}%)`;
      bottle.classList.remove('is-receiving');
      void bottle.getBoundingClientRect();   // reinicia a "engolida"
      bottle.classList.add('is-receiving');
      done();
    });
  }

  function runAnalysis(step) {
    const run = {};
    step.analysisRun = run;
    const alive = () => step.analysisRun === run && step.classList.contains('is-active');
    const t1 = Number(step.dataset.analysis);
    const t2 = Number(step.dataset.fill);
    step.querySelector('.formula__ativos').innerHTML = '';
    setAnalysis(step, 0);
    buildFormula(step);
    setFormula(step, 0);

    const start = performance.now();
    const tick = () => {
      if (!alive()) return;
      const x = Math.min((performance.now() - start) / t1, 1);
      setAnalysis(step, 100 * easeInOutSine(x));
      if (x < 1) { setTimeout(tick, 30); return; }
      setTimeout(phase2, FORMULA_SWITCH);
    };

    const phase2 = () => {
      if (!alive()) return;
      step.classList.add('is-phase-2');
      const items = [...step.querySelectorAll('.formula__ativo')];
      const gap = t2 / Math.max(items.length, 1);
      let entered = 0;
      items.forEach((li, i) => setTimeout(() => {
        if (!alive()) return;
        pourFormula(step, li, i + 1, () => {
          if (++entered < items.length || !alive()) return;
          setTimeout(() => {
            if (!alive()) return;
            step.classList.add('is-done');
            autoTimer = setTimeout(() => goTo(current + 1), FORMULA_HOLD);
          }, 250);
        });
      }, FORMULA_FADE + i * gap));
    };
    setTimeout(tick, 30);
  }

  // ---------- Rodapé de ativos (layout de 2026-10-22) ----------
  // Aparece em toda sessão com data-tray (da idade em diante), já mostrando 0/N.
  // Ao responder: o ativo voa da opção marcada até o rodapé; o ativo anterior "entra"
  // no frasco e o preto do frasco sobe. O último ativo também entra: frasco cheio.
  const traySlot = tray.querySelector('.tray__slot');
  const trayBottle = tray.querySelector('.tray__bottle');
  const trayFill = tray.querySelector('.tray__bottle-fill');
  const trayCount = tray.querySelector('[data-tray-count]');
  const TOTAL_ATIVOS = steps.reduce((n, s) => n + (s.dataset.ativo || '').split(/\s+/).filter(Boolean).length, 0);
  tray.querySelector('[data-tray-total]').textContent = TOTAL_ATIVOS;
  const collected = [];   // ativos recebidos, na ordem
  let inBottle = 0;       // quantos já entraram no frasco
  const FLY = 450;        // voo da opção até o rodapé
  const POUR = 350;       // ativo anterior entrando no frasco
  const EASE = 'cubic-bezier(.4, 0, .2, 1)';

  function updateTray() {
    tray.classList.toggle('is-visible', steps[current].hasAttribute('data-tray'));
  }

  function renderTray() {
    trayCount.textContent = collected.length;
    // 3% de preto na base mesmo vazio (como na referência); cheio = 0%
    trayFill.style.transform = `translateY(${(1 - inBottle / TOTAL_ATIVOS) * 97}%)`;
    tray.classList.toggle('has-ativo', collected.length > 0);   // o texto inicial só aparece antes do 1º ativo
    fitPills();
  }

  // Pílula cinza (anterior): se uma palavra do nome não cabe inteira, mostra só a imagem
  function fitPills() {
    traySlot.querySelectorAll('.ativo--pilula').forEach((p) => {
      p.classList.remove('is-compacta');
      const span = p.querySelector('span');
      if (p.classList.contains('is-prev') && span && span.scrollWidth > span.clientWidth + 0.5) p.classList.add('is-compacta');
    });
  }
  window.addEventListener('resize', fitPills);
  if (document.fonts) document.fonts.ready.then(fitPills);

  // Executa fn uma única vez quando a animação termina — pelo evento ou, se ele não vier
  // (aba em segundo plano, celular economizando bateria), pelo tempo da animação.
  function whenDone(anim, ms, fn) {
    let done = false;
    const run = () => { if (done) return; done = true; fn(); };
    anim.onfinish = run;
    setTimeout(run, ms + 60);
  }

  // Cópia do ativo, presa à tela, para animar sem mexer no layout do rodapé
  function makeFlyer(item, rect) {
    const fl = item.cloneNode(true);
    fl.classList.add('ativo--voando');
    Object.assign(fl.style, { left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px`, visibility: '' });
    document.body.appendChild(fl);
    return fl;
  }

  // Um ativo do rodapé encolhe e entra no frasco; ao chegar, o preto sobe
  function pourItem(item, animate) {
    if (!item) return;
    inBottle++;
    if (animate) {
      const r = item.getBoundingClientRect();
      const b = trayBottle.getBoundingClientRect();
      const fl = makeFlyer(item, r);
      const dx = b.left + b.width / 2 - (r.left + r.width / 2);
      const dy = b.top + b.height * 0.4 - (r.top + r.height / 2);
      const anim = fl.animate(
        [{ transform: 'none', opacity: 1 }, { transform: `translate(${dx}px, ${dy}px) scale(.12)`, opacity: 0.2 }],
        { duration: POUR, easing: 'cubic-bezier(.55, 0, .8, .3)', fill: 'forwards' }
      );
      whenDone(anim, POUR, () => {
        fl.remove();
        trayBottle.classList.remove('is-receiving');
        void trayBottle.getBoundingClientRect();   // reinicia a "engolida"
        trayBottle.classList.add('is-receiving');
        renderTray();
      });
    }
    item.remove();
    if (!animate) renderTray();
  }

  // Versão de teste (pílulas): o ativo novo chega em uma pílula com borda azul; o anterior fica
  // cinza ao lado dele por um instante e logo entra no frasco (como na versão original: a cada
  // resposta, o ativo anterior entra no produto). Na última pergunta, o último também entra: frasco cheio.
  // Retorna quanto tempo a animação leva (0 se nada mudou). Regra: um ativo por pergunta.
  const GRAY_HOLD = 220;   // tempo que o anterior fica cinza ao lado do novo antes de entrar no frasco
  function addAtivo(id, animate = true, origin = null) {
    const novo = (id || '').split(/\s+/).filter(Boolean).find((x) => !collected.includes(x));
    const tpl = novo && document.getElementById(`ativo-${novo}`);
    if (!tpl) return 0;
    const prev = traySlot.firstElementChild;
    const prevFrom = prev && animate ? prev.getBoundingClientRect() : null;
    if (prev) prev.classList.add('is-prev');
    collected.push(novo);
    const item = tpl.content.firstElementChild.cloneNode(true);
    item.classList.add('ativo--pilula');
    item.querySelectorAll('span br').forEach((br) => br.replaceWith(' '));   // nome numa linha só quando couber
    item.dataset.ativo = novo;
    traySlot.prepend(item);
    const last = collected.length === TOTAL_ATIVOS;
    if (!animate) {
      pourItem(prev, false);
      if (last) pourItem(item, false);
      renderTray();
      return 0;
    }
    renderTray();
    // O anterior desliza para a direita (FLIP), fica cinza e logo entra no frasco
    if (prev) {
      const to = prev.getBoundingClientRect();
      prev.animate(
        [{ transform: `translate(${prevFrom.left - to.left}px, ${prevFrom.top - to.top}px)` }, { transform: 'none' }],
        { duration: GRAY_HOLD, easing: EASE }
      );
      setTimeout(() => pourItem(prev, true), GRAY_HOLD);
    }
    item.style.visibility = 'hidden';
    const to = item.getBoundingClientRect();
    const from = (origin || item).getBoundingClientRect();
    const fl = makeFlyer(item, to);
    const dx = from.left + from.width / 2 - (to.left + to.width / 2);
    const dy = from.top + from.height / 2 - (to.top + to.height / 2);
    const anim = fl.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(1.15)`, opacity: 0 },
        { opacity: 1, offset: 0.2 },
        { transform: 'none', opacity: 1 },
      ],
      { duration: FLY, easing: EASE, fill: 'forwards' }
    );
    const pourEnd = prev ? GRAY_HOLD + POUR : 0;
    whenDone(anim, FLY, () => {
      item.style.visibility = '';
      fl.remove();
      if (last) setTimeout(() => pourItem(item, true), Math.max(120, pourEnd - FLY + 60));   // último também entra: frasco cheio
    });
    return last ? Math.max(FLY + 120, pourEnd + 60) + POUR : Math.max(FLY, pourEnd);
  }

  // ---------- Anel de porcentagem (Sessão 5) ----------
  function animateRing(ring) {
    const target = Number(ring.dataset.percent);
    const progress = ring.querySelector('.result__progress');
    const counter = ring.querySelector('[data-count]');
    const length = 2 * Math.PI * progress.r.baseVal.value;
    const duration = 1000;
    const delay = 250;
    let start = null;

    progress.style.strokeDasharray = length;
    progress.style.strokeDashoffset = length;
    counter.textContent = '0';

    function frame(now) {
      if (start === null) start = now;
      const t = Math.min(Math.max((now - start - delay) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out
      const value = target * eased;
      progress.style.strokeDashoffset = length * (1 - value / 100);
      counter.textContent = Math.round(value);
      fitRingValue(counter);
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // ---------- Cliques ----------
  document.addEventListener('click', (e) => {
    const next = e.target.closest('[data-next]');
    if (next) goTo(current + 1);

    // Escolha única: marca, adiciona o ativo da sessão (se houver) e avança
    const option = e.target.closest('[data-answer]');
    if (option && !locked) {
      const step = option.closest('.step');
      answers[step.dataset.step] = option.dataset.answer;
      step.querySelectorAll('[data-answer]').forEach((el) => {
        el.classList.toggle('is-selected', el === option);
        el.setAttribute('aria-checked', el === option);
      });
      answerProgress(step);
      const animTime = addAtivo(step.dataset.ativo, true, option);
      locked = true;
      // Quando um ativo entra, espera a animação terminar + uma pausa para ela ver a bandeja
      const delay = animTime ? Math.max(ADVANCE_DELAY_ATIVO, animTime + 250) : ADVANCE_DELAY;
      setTimeout(() => { locked = false; goTo(current + 1); }, delay);
    }

    // Múltipla escolha: alterna a seleção e libera o CONTINUAR com 1+ item
    const toggle = e.target.closest('[data-toggle]');
    if (toggle) {
      const step = toggle.closest('.step');
      const on = !toggle.classList.contains('is-selected');
      toggle.classList.toggle('is-selected', on);
      toggle.setAttribute('aria-checked', on);
      const chosen = [...step.querySelectorAll('[data-toggle].is-selected')].map((el) => el.dataset.toggle);
      answers[step.dataset.step] = chosen;
      step.querySelector('[data-submit]').disabled = chosen.length === 0;
    }

    // CONTINUAR da múltipla escolha: adiciona o ativo da sessão (se houver) e avança
    // depois da animação, igual às perguntas de escolha única
    const submit = e.target.closest('[data-submit]');
    if (submit && !submit.disabled && !locked) {
      answerProgress(submit.closest('.step'));
      const lastCard = [...submit.closest('.step').querySelectorAll('[data-toggle].is-selected')].pop();
      const animTime = addAtivo(submit.closest('.step').dataset.ativo, true, lastCard || submit);
      locked = true;
      setTimeout(() => { locked = false; goTo(current + 1); }, animTime ? Math.max(ADVANCE_DELAY_ATIVO, animTime + 250) : 0);
    }
  });

  // Atalho de desenvolvimento: /#8 abre direto na sessão 8
  // (já com os ativos das sessões anteriores na bandeja)
  const start = steps.findIndex((s) => s.dataset.step === location.hash.slice(1));
  if (start > 0) {
    steps.slice(0, start).forEach((s) => addAtivo(s.dataset.ativo, false));
    goTo(start);
  }

  window.cellive = { goTo, answers, addAtivo, setAnalysis };
})();
