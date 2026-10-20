(() => {
  const steps = [...document.querySelectorAll('.step')];
  const answers = {};
  const ADVANCE_DELAY = 450;        // tempo para mostrar a opção marcada antes de avançar
  const ADVANCE_DELAY_ATIVO = 1400; // mais tempo quando um ativo entra na bandeja
  const tray = document.querySelector('.tray');
  const trayList = tray.querySelector('.tray__list');
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
    step.querySelector('[data-count]').textContent = Math.round(ring);
    step.querySelector('.analysis__ring').setAttribute('aria-valuenow', Math.round(ring));

    const items = [...step.querySelectorAll('.analysis__steps li')];
    const activeIdx = items.reduce((acc, li, i) => (ring >= Number(li.dataset.at) ? i : acc), 0);
    items.forEach((li, i) => {
      li.classList.toggle('is-active', i === activeIdx);
      li.classList.toggle('is-done', i < activeIdx);
    });

    step.classList.toggle('is-phase-2', v > 100);
    const fill = Math.min(Math.max((v - 100) / 100, 0), 1);
    step.querySelector('.analysis__bottle-fill').setAttribute('y', 226 * (1 - fill));
  }

  // Fase 1 em data-analysis ms, pausa de 0,6 s em 100%, fase 2 em data-fill ms,
  // pausa de 0,9 s com o frasco cheio e segue para a próxima sessão (se houver)
  const PAUSE_BETWEEN = 600;
  function runAnalysis(step) {
    const t1 = Number(step.dataset.analysis);
    const t2 = Number(step.dataset.fill);
    const start = performance.now();
    setAnalysis(step, 0);
    const tick = () => {
      if (!step.classList.contains('is-active')) return;
      const t = performance.now() - start;
      let v;
      if (t < t1) v = (t / t1) * 100;
      else if (t < t1 + PAUSE_BETWEEN) v = 100;
      else v = 100 + Math.min((t - t1 - PAUSE_BETWEEN) / t2, 1) * 100;
      setAnalysis(step, v);
      if (v < 200) setTimeout(tick, 30);
      else autoTimer = setTimeout(() => goTo(current + 1), 900);
    };
    setTimeout(tick, 30);
  }

  // ---------- Bandeja de ativos ----------
  // Aparece nas sessões com data-tray, desde que já exista algum ativo.
  function updateTray() {
    const show = steps[current].hasAttribute('data-tray') && trayList.children.length > 0;
    tray.classList.toggle('is-visible', show);
  }

  const SLIDE_IN = 600;    // novo ativo entrando pela esquerda e empurrando os outros
  const EASE = 'cubic-bezier(.4, 0, .2, 1)';

  // Técnica FLIP: mede as posições, muda o DOM e anima cada item da posição antiga até a nova
  function flip(mutate, duration) {
    const before = new Map([...trayList.children].map((el) => [el, el.getBoundingClientRect().left]));
    mutate();
    before.forEach((left, el) => {
      const dx = left - el.getBoundingClientRect().left;
      if (dx) el.animate([{ transform: `translateX(${dx}px)` }, { transform: 'none' }], { duration, easing: EASE });
    });
  }

  // Adiciona o ativo (uma vez só). Retorna quanto tempo a animação leva (0 se não era novo).
  // Animação: o novo entra pela esquerda, fica na primeira posição e empurra os
  // anteriores para a direita. Ninguém troca de lugar depois.
  // Vários ativos na mesma sessão (data-ativo="a b"): entram um depois do outro.
  function addAtivo(id, animate = true) {
    const ids = (id || '').split(/\s+/).filter(Boolean);
    if (ids.length > 1) {
      let total = 0;
      ids.forEach((one, i) => {
        if (!animate) { addOne(one, false); return; }
        setTimeout(() => addOne(one), i * SLIDE_IN);
        total = i * SLIDE_IN + SLIDE_IN;
      });
      return animate ? total : 0;
    }
    return addOne(ids[0], animate);
  }

  function addOne(id, animate = true) {
    if (!id || trayList.querySelector(`[data-ativo="${id}"]`)) return 0;
    const tpl = document.getElementById(`ativo-${id}`);
    if (!tpl) return 0;
    const item = tpl.content.firstElementChild.cloneNode(true);
    item.dataset.ativo = id;

    if (!animate) {
      trayList.prepend(item);
      updateTray();
      return 0;
    }

    flip(() => trayList.prepend(item), SLIDE_IN);
    updateTray();
    const offscreen = -item.getBoundingClientRect().right - 20;
    item.animate(
      [{ transform: `translateX(${offscreen}px)`, opacity: 0 }, { transform: 'none', opacity: 1 }],
      { duration: SLIDE_IN, easing: EASE }
    );
    return SLIDE_IN;
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
      const animTime = addAtivo(step.dataset.ativo);
      locked = true;
      // Quando um ativo entra, espera a animação terminar + uma pausa para ela ver a bandeja
      const delay = animTime ? Math.max(ADVANCE_DELAY_ATIVO, animTime + 700) : ADVANCE_DELAY;
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
      const animTime = addAtivo(submit.closest('.step').dataset.ativo);
      locked = true;
      setTimeout(() => { locked = false; goTo(current + 1); }, animTime ? ADVANCE_DELAY_ATIVO : 0);
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
