
/* ===== Jádro prezentace: navigace, routing, generické komponenty ===== */
const CHAPTERS = {
  '00': { name: 'Úvod', color: 'var(--b1)' },
  '01': { name: 'Kyberprostor', color: 'var(--y1)' },
  '02': { name: 'Riziko, zranitelnost, hrozba', color: 'var(--y1)' },
  '03': { name: 'Malware', color: 'var(--b1)' },
  '04': { name: 'Hacking', color: 'var(--b1)' },
  '05': { name: 'Sociální inženýrství', color: 'var(--y1)' },
  '06': { name: 'Bezpečnostní opatření', color: 'var(--g2)' },
  '07': { name: 'Šifrování', color: 'var(--b1)' },
  '08': { name: 'Internet a nové technologie', color: 'var(--b1)' },
  '50': { name: 'Legislativa', color: 'var(--g2)' },
  '51': { name: 'Etika', color: 'var(--g2)' },
  '90': { name: 'Úlohy a procvičování', color: 'var(--y1)' },
  '99': { name: 'Slovník pojmů', color: 'var(--b2)' }
};
const CH_ORDER = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '50', '51', '90', '99'];
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const dataOf = el => { const s = el.querySelector('script[type="application/json"]'); try { return s ? JSON.parse(s.textContent) : null; } catch (e) { console.error('JSON', el, e); return null; } };
const SIMS = {};

const topics = $$('section.topic');
const byId = Object.fromEntries(topics.map(t => [t.id, t]));

function buildNav() {
  const nav = $('#nav');
  const groups = {};
  topics.forEach(t => { const ch = t.dataset.ch; (groups[ch] = groups[ch] || []).push(t); });
  CH_ORDER.forEach(ch => {
    if (!groups[ch]) return;
    const li = document.createElement('li');
    li.className = 'nav-ch'; li.dataset.ch = ch; li.style.setProperty('--chc', CHAPTERS[ch].color);
    const hasSim = t => t.querySelector('[data-sim]') ? '<i class="sim-dot" title="obsahuje simulaci"></i>' : '';
    li.innerHTML = `<button type="button" aria-expanded="false"><span class="num">${ch === '00' ? '›' : ch}</span>${esc(CHAPTERS[ch].name)}</button>
      <ul class="nav-topics">${groups[ch].map(t => `<li><a href="#${t.id}" data-id="${t.id}">${esc(t.dataset.title)}${hasSim(t)}</a></li>`).join('')}</ul>`;
    li.querySelector('button').addEventListener('click', () => {
      if (groups[ch].length === 1) { location.hash = groups[ch][0].id; return; }
      const open = li.classList.toggle('open');
      li.querySelector('button').setAttribute('aria-expanded', open);
    });
    nav.appendChild(li);
  });
}

function addPager() {
  topics.forEach((t, i) => {
    const p = document.createElement('nav'); p.className = 'pager'; p.setAttribute('aria-label', 'Další a předchozí téma');
    const prev = topics[i - 1], next = topics[i + 1];
    p.innerHTML = (prev ? `<a class="prev" href="#${prev.id}"><small>← Předchozí</small>${esc(prev.dataset.title)}</a>` : '') +
      (next ? `<a class="next" href="#${next.id}"><small>Další →</small>${esc(next.dataset.title)}</a>` : '');
    t.appendChild(p);
    if (t.dataset.ch !== '00') {
      const head = t.querySelector('.topic-head');
      if (head && !head.querySelector('.eyebrow')) {
        const e = document.createElement('p'); e.className = 'eyebrow';
        e.textContent = `${t.dataset.ch} · ${CHAPTERS[t.dataset.ch].name}`;
        head.prepend(e);
      }
    }
  });
}

let current = null;
function show(id) {
  const t = byId[id] || topics[0];
  if (current === t) return;
  if (current) current.classList.remove('current');
  current = t; t.classList.add('current');
  const ch = t.dataset.ch, color = CHAPTERS[ch].color;
  document.documentElement.style.setProperty('--accent', color);
  const idx = topics.indexOf(t);
  $('#crumb').innerHTML = ch === '00' ? '<b>Kybernetická bezpečnost</b>' : `<b>${ch}</b> · ${esc(CHAPTERS[ch].name)}`;
  $('#progTxt').textContent = `${idx + 1} / ${topics.length}`;
  $('#progBar').style.width = ((idx + 1) / topics.length * 100) + '%';
  $$('.nav-topics a').forEach(a => a.classList.toggle('active', a.dataset.id === t.id));
  $$('.nav-ch').forEach(li => { const on = li.dataset.ch === ch; li.classList.toggle('open', on); li.querySelector('button').setAttribute('aria-expanded', on); });
  document.title = (ch === '00' ? '' : t.dataset.title + ' · ') + 'Kybernetická bezpečnost KBB';
  initSims(t);
  window.scrollTo({ top: 0, behavior: 'auto' });
  closeMenu();
  try { localStorage.setItem('kbb-last', t.id); } catch (e) {}
}

function initSims(root) {
  $$('[data-sim]', root).forEach(el => {
    if (el.dataset.ready) return;
    el.dataset.ready = '1';
    const fn = SIMS[el.dataset.sim];
    if (fn) { try { fn(el); } catch (e) { console.error('Simulace', el.dataset.sim, e); el.insertAdjacentHTML('beforeend', '<p class="result bad">Simulaci se nepodařilo spustit.</p>'); } }
    else console.warn('Chybí simulace', el.dataset.sim);
  });
}

function route() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (byId[id]) show(id);
  else show(topics[0].id);
}

function closeMenu() { $('#sidebar').classList.remove('open'); $('#scrim').classList.remove('on'); $('#menuBtn').setAttribute('aria-expanded', 'false'); }

document.addEventListener('keydown', e => {
  if (e.target.closest('input, textarea, select, [contenteditable]') || e.altKey || e.ctrlKey || e.metaKey) return;
  const i = topics.indexOf(current);
  if (e.key === 'ArrowRight' && topics[i + 1]) { location.hash = topics[i + 1].id; }
  if (e.key === 'ArrowLeft' && topics[i - 1]) { location.hash = topics[i - 1].id; }
});

/* ===== Generické komponenty ===== */
// Kvíz: [{q, a:[...], c:index, e:"vysvětlení"}]
SIMS.quiz = el => {
  const d = dataOf(el); let score = 0, done = 0;
  const box = document.createElement('div');
  d.forEach((it, qi) => {
    const q = document.createElement('div'); q.className = 'q';
    q.innerHTML = `<div class="q-text">${qi + 1}. ${it.q}</div><div class="q-opts">${it.a.map((a, i) => `<button type="button" class="q-opt" data-i="${i}">${a}</button>`).join('')}</div><div class="q-exp" hidden></div>`;
    $$('.q-opt', q).forEach(b => b.addEventListener('click', () => {
      const i = +b.dataset.i;
      $$('.q-opt', q).forEach(x => { x.disabled = true; if (+x.dataset.i === it.c) x.classList.add('right'); });
      if (i !== it.c) b.classList.add('wrong'); else score++;
      done++;
      const ex = $('.q-exp', q); ex.hidden = false; ex.innerHTML = (i === it.c ? '<b style="color:var(--g2)">Správně.</b> ' : '<b style="color:var(--danger-soft)">Chyba.</b> ') + (it.e || '');
      if (done === d.length) res.innerHTML = `Výsledek: <b>${score} / ${d.length}</b> ${score === d.length ? '– výborně!' : score >= d.length * .7 ? '– dobrá práce.' : '– zkuste téma projít znovu.'}`, res.hidden = false;
    }));
    box.appendChild(q);
  });
  const res = document.createElement('div'); res.className = 'result ok'; res.hidden = true;
  const reset = document.createElement('button'); reset.className = 'btn sec sm'; reset.textContent = 'Začít znovu'; reset.style.marginTop = '1rem';
  const host = el.querySelector('.sim-body') || el;
  reset.addEventListener('click', () => { box.remove(); res.remove(); reset.remove(); SIMS.quiz(el); });
  host.append(box, res, reset);
};

// Třídění: {cats:["A","B"], items:[{t:"text", c:index, e:"vysvětlení"}]}
SIMS.classify = el => {
  const d = dataOf(el), host = el.querySelector('.sim-body') || el;
  let ok = 0, n = 0;
  const wrap = document.createElement('div');
  d.items.forEach(it => {
    const row = document.createElement('div'); row.className = 'cls-item';
    row.innerHTML = `<div class="txt">${it.t}</div><div class="btns">${d.cats.map((c, i) => `<button type="button" class="btn sec sm" data-i="${i}">${c}</button>`).join('')}</div><div class="fb" hidden></div>`;
    $$('button', row).forEach(b => b.addEventListener('click', () => {
      const right = +b.dataset.i === it.c; n++; if (right) ok++;
      row.classList.add(right ? 'right' : 'wrong');
      $$('button', row).forEach(x => { x.disabled = true; if (+x.dataset.i === it.c) { x.classList.remove('sec'); } });
      const fb = $('.fb', row); fb.hidden = false; fb.innerHTML = (right ? '✓ ' : `✗ Správně: <b>${d.cats[it.c]}</b>. `) + (it.e || '');
      if (n === d.items.length) { sc.hidden = false; sc.innerHTML = `Správně zařazeno: <b>${ok} / ${n}</b>`; }
    }));
    wrap.appendChild(row);
  });
  const sc = document.createElement('div'); sc.className = 'result ok'; sc.hidden = true;
  host.append(wrap, sc);
};

// Řazení: {items:["krok1", "krok2", ...]} ve správném pořadí
SIMS.order = el => {
  const d = dataOf(el), host = el.querySelector('.sim-body') || el;
  const ol = document.createElement('ol'); ol.className = 'order-list';
  let arr = d.items.map((t, i) => ({ t, i }));
  do { arr.sort(() => Math.random() - .5); } while (arr.every((x, k) => x.i === k));
  const render = () => {
    ol.innerHTML = '';
    arr.forEach((x, k) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="txt">${x.t}</span><button class="mv" type="button" aria-label="Posunout nahoru" ${k === 0 ? 'disabled' : ''}>▲</button><button class="mv" type="button" aria-label="Posunout dolů" ${k === arr.length - 1 ? 'disabled' : ''}>▼</button>`;
      const [up, dn] = $$('.mv', li);
      up.onclick = () => { [arr[k - 1], arr[k]] = [arr[k], arr[k - 1]]; render(); };
      dn.onclick = () => { [arr[k + 1], arr[k]] = [arr[k], arr[k + 1]]; render(); };
      ol.appendChild(li);
    });
  };
  render();
  const b = document.createElement('div'); b.className = 'btns';
  b.innerHTML = '<button class="btn" type="button">Zkontrolovat pořadí</button><button class="btn sec" type="button">Zamíchat</button>';
  const res = document.createElement('div'); res.className = 'result'; res.hidden = true;
  const [chk, mix] = $$('button', b);
  chk.onclick = () => {
    let good = 0; $$('li', ol).forEach((li, k) => { const r = arr[k].i === k; li.classList.toggle('right', r); li.classList.toggle('wrong', !r); if (r) good++; });
    res.hidden = false; res.className = 'result ' + (good === arr.length ? 'ok' : 'warn');
    res.innerHTML = good === arr.length ? 'Pořadí je správně.' + (d.done ? ' ' + d.done : '') : `Na správném místě: <b>${good} / ${arr.length}</b>. Zelené kroky jsou správně, červené přesuňte.`;
  };
  mix.onclick = () => { arr.sort(() => Math.random() - .5); res.hidden = true; render(); };
  host.append(ol, b, res);
};

// Kartičky: [{t:"pojem", d:"definice"}]
SIMS.flip = el => {
  const d = dataOf(el), host = el.querySelector('.sim-body') || el;
  const g = document.createElement('div'); g.className = 'flip-grid';
  d.forEach(x => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'flip';
    b.innerHTML = `<span class="ft">${x.t}</span><span class="fd">${x.d}</span><span class="fh">Klikněte pro definici</span>`;
    b.onclick = () => b.classList.toggle('on');
    g.appendChild(b);
  });
  const tb = document.createElement('div'); tb.className = 'btns'; tb.style.marginTop = '1rem';
  tb.innerHTML = '<button class="btn sec sm" type="button">Otočit vše</button><button class="btn sec sm" type="button">Skrýt vše</button>';
  const [a, z] = $$('button', tb);
  a.onclick = () => $$('.flip', g).forEach(f => f.classList.add('on'));
  z.onclick = () => $$('.flip', g).forEach(f => f.classList.remove('on'));
  host.append(g, tb);
};

// Kontrolní seznam s hodnocením: {items:[{t, w, tip}], levels:[[min, text], ...]}
SIMS.checklist = el => {
  const d = dataOf(el), host = el.querySelector('.sim-body') || el;
  const total = d.items.reduce((s, x) => s + (x.w || 1), 0);
  const list = document.createElement('div');
  d.items.forEach((x, i) => {
    const id = el.id + '-c' + i;
    list.insertAdjacentHTML('beforeend', `<label class="chk" for="${id}"><input type="checkbox" id="${id}" data-w="${x.w || 1}"><span>${x.t}${x.tip ? `<br><span class="small muted">${x.tip}</span>` : ''}</span></label>`);
  });
  const m = document.createElement('div'); m.innerHTML = '<div class="meter"><span></span></div><div class="result"></div>';
  const upd = () => {
    const s = $$('input', list).filter(c => c.checked).reduce((a, c) => a + +c.dataset.w, 0), p = s / total;
    const bar = $('.meter span', m); bar.style.width = (p * 100) + '%'; bar.style.background = p < .4 ? 'var(--danger)' : p < .8 ? 'var(--y1)' : 'var(--g2)';
    const lvl = d.levels.filter(l => p * 100 >= l[0]).pop();
    const r = $('.result', m); r.className = 'result ' + (p < .4 ? 'bad' : p < .8 ? 'warn' : 'ok'); r.innerHTML = `Zabezpečení: <b>${Math.round(p * 100)} %</b> – ${lvl[1]}`;
  };
  list.addEventListener('change', upd);
  host.append(list, m); upd();
};

/* ===== Start ===== */
buildNav();
addPager();
$('#menuBtn').addEventListener('click', () => { const s = $('#sidebar'); const o = s.classList.toggle('open'); $('#scrim').classList.toggle('on', o); $('#menuBtn').setAttribute('aria-expanded', o); });
$('#scrim').addEventListener('click', closeMenu);
window.addEventListener('hashchange', route);
