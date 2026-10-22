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

  // ---------- Tela de análise (Sessão 18) ----------
  // Escala única v de 0 a 200:
  //  - v 0–100   = fase 1: anel e número de 0 a 100%; etapas acendem em data-at (0, 40, 72);
  //  - v 100–200 = fase 2: título muda, anel e lista saem e o frasco enche de 0 a 100%.
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
    items.forEach((li, i) => {
      li.classList.toggle('is-active', i === activeIdx);
      li.classList.toggle('is-done', i < activeIdx);
    });

    step.classList.toggle('is-phase-2', v > 100);
    const fill = Math.min(Math.max((v - 100) / 100, 0), 1);
    const bottleH = step.querySelector('.analysis__bottle').viewBox.baseVal.height;   // altura do desenho do frasco
    step.querySelector('.analysis__bottle-fill').setAttribute('y', bottleH * (1 - fill));
  }

  // Fase 1 em data-analysis ms, pausa de 0,6 s em 100%, fase 2 em data-fill ms,
  // pausa de 0,9 s com o frasco cheio e segue para a próxima sessão (se houver)
  const PAUSE_BETWEEN = 600;

  // Staggered Progress com pausas dramáticas: cada fase é dividida em trechos
  // [alvo na escala 0–200, fração do tempo da fase]. Alvo repetido = pausa.
  // As frações de cada fase somam 1, então o tempo total não muda.
  // As pausas da fase 1 começam exatamente quando as etapas acendem (40 e 72).
  const PHASE_1 = [[40, .275], [40, .0875], [72, .25], [72, .1125], [94, .1625], [94, .0625], [100, .05]];
  const PHASE_2 = [[135, .28], [135, .10], [178, .30], [178, .12], [200, .20]];
  const easeInOut = (x) => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

  // Monta a linha do tempo: [{ de, para, início (ms), duração (ms) }, ...]
  function buildTimeline(t1, t2) {
    const segs = [];
    let at = 0;
    let v = 0;
    const add = (phase, total) => phase.forEach(([to, frac]) => {
      const dur = frac * total;
      segs.push({ from: v, to, at, dur });
      at += dur;
      v = to;
    });
    add(PHASE_1, t1);
    segs.push({ from: 100, to: 100, at, dur: PAUSE_BETWEEN });   // pausa em 100% antes do frasco
    at += PAUSE_BETWEEN;
    add(PHASE_2, t2);
    return { segs, total: at };
  }

  function valueAt(timeline, t) {
    const seg = timeline.segs.find((s) => t < s.at + s.dur) || timeline.segs[timeline.segs.length - 1];
    const x = Math.min(Math.max((t - seg.at) / seg.dur, 0), 1);
    return seg.from + (seg.to - seg.from) * easeInOut(x);
  }

  function runAnalysis(step) {
    const timeline = buildTimeline(Number(step.dataset.analysis), Number(step.dataset.fill));
    const start = performance.now();
    setAnalysis(step, 0);
    const tick = () => {
      if (!step.classList.contains('is-active')) return;
      const t = performance.now() - start;
      const v = t >= timeline.total ? 200 : valueAt(timeline, t);
      setAnalysis(step, v);
      if (v < 200) setTimeout(tick, 30);
      else autoTimer = setTimeout(() => goTo(current + 1), 900);
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
  }

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

  // O ativo que está no rodapé encolhe e entra no frasco; ao chegar, o preto sobe
  function pourCurrent(animate) {
    const item = traySlot.firstElementChild;
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

  // Adiciona o ativo da pergunta. origin = elemento clicado (de onde o ativo sai voando).
  // Retorna quanto tempo a animação leva (0 se nada mudou). Regra: um ativo por pergunta.
  function addAtivo(id, animate = true, origin = null) {
    const novo = (id || '').split(/\s+/).filter(Boolean).find((x) => !collected.includes(x));
    const tpl = novo && document.getElementById(`ativo-${novo}`);
    if (!tpl) return 0;
    pourCurrent(animate);
    collected.push(novo);
    const item = tpl.content.firstElementChild.cloneNode(true);
    item.dataset.ativo = novo;
    traySlot.appendChild(item);
    const last = collected.length === TOTAL_ATIVOS;
    if (!animate) {
      if (last) pourCurrent(false);
      renderTray();
      return 0;
    }
    renderTray();
    item.style.visibility = 'hidden';
    const to = item.getBoundingClientRect();
    const from = (origin || item).getBoundingClientRect();
    const fl = makeFlyer(item, to);
    const dx = from.left + from.width / 2 - (to.left + to.width / 2);
    const dy = from.top + from.height / 2 - (to.top + to.height / 2);
    const anim = fl.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(1.25)`, opacity: 0 },
        { opacity: 1, offset: 0.2 },
        { transform: 'none', opacity: 1 },
      ],
      { duration: FLY, easing: EASE, fill: 'forwards' }
    );
    whenDone(anim, FLY, () => {
      item.style.visibility = '';
      fl.remove();
      if (last) setTimeout(() => pourCurrent(true), 120);   // último ativo também entra: frasco cheio
    });
    return FLY + (last ? 120 + POUR : 0);
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
