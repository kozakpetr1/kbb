/* ===== Simulace: kapitoly 02–04 ===== */

// --- 02 Matice rizik ---
SIMS.risk = el => {
  const scen = [
    { t: 'Zastaralý e-shop se známou chybou, přístupný z internetu', a: 'Web obchodu (primární aktivum)', h: 'Útok exploitem na neopravenou chybu', z: 'Chybějící aktualizace', p: 4, d: 4 },
    { t: 'Administrátor používá heslo „password123“', a: 'Databáze zákazníků', h: 'Brute-force / slovníkový útok', z: 'Slabé heslo bez 2FA', p: 5, d: 5 },
    { t: 'Záloha dat jen na stejném serveru jako data', a: 'Firemní data', h: 'Ransomware', z: 'Chybějící offline záloha', p: 3, d: 5 },
    { t: 'Zaměstnanci neprošli školením o phishingu', a: 'Přihlašovací údaje', h: 'Phishing', z: 'Nízké povědomí uživatelů', p: 4, d: 3 },
    { t: 'Serverovna bez zámku a kamer', a: 'Fyzický server', h: 'Krádež / sabotáž', z: 'Slabá fyzická bezpečnost', p: 2, d: 4 }
  ];
  const sel = $('#risk-sc', el), kv = $('#risk-kv', el), pr = $('#risk-p', el), dr = $('#risk-d', el), pv = $('#risk-pv', el), dv = $('#risk-dv', el), out = $('#risk-out', el), m = $('#risk-m', el);
  sel.innerHTML = scen.map((s, i) => `<option value="${i}">${s.t}</option>`).join('');
  // matice 5×5
  const cells = [];
  m.innerHTML = '';
  for (let d = 5; d >= 1; d--) {
    m.insertAdjacentHTML('beforeend', `<div class="ax">${d}</div>`);
    for (let p = 1; p <= 5; p++) {
      const v = p * d, c = document.createElement('div'); c.className = 'c'; c.textContent = v;
      c.style.background = v >= 15 ? '#ef4444' : v >= 8 ? '#ffd400' : '#a6ce39';
      c.dataset.p = p; c.dataset.d = d;
      c.onclick = () => { pr.value = p; dr.value = d; upd(); };
      m.appendChild(c); cells.push(c);
    }
  }
  m.insertAdjacentHTML('beforeend', '<div class="ax"></div>' + [1, 2, 3, 4, 5].map(p => `<div class="ax">${p}</div>`).join(''));
  const label = n => n >= 15 ? ['Vysoké', 'bad', 'řešit přednostně – snížit nebo přenést riziko'] : n >= 8 ? ['Střední', 'warn', 'zavést opatření a sledovat'] : ['Nízké', 'ok', 'přijatelné, stačí sledovat'];
  function upd() {
    const s = scen[sel.value]; const p = +pr.value, d = +dr.value, v = p * d;
    pv.textContent = p; dv.textContent = d;
    kv.innerHTML = `<dt>Aktivum</dt><dd>${s.a}</dd><dt>Hrozba</dt><dd>${s.h}</dd><dt>Zranitelnost</dt><dd>${s.z}</dd>`;
    const L = label(v); out.className = 'result ' + L[1];
    out.innerHTML = `Riziko = ${p} × ${d} = <b>${v}</b> → <b>${L[0]}</b>. Doporučení: ${L[2]}.`;
    cells.forEach(c => c.classList.toggle('sel', +c.dataset.p === p && +c.dataset.d === d));
  }
  sel.onchange = () => { const s = scen[sel.value]; pr.value = s.p; dr.value = s.d; upd(); };
  pr.oninput = dr.oninput = upd;
  sel.onchange();
};

// --- 02 CVSS ---
SIMS.cvss = el => {
  const s = $('#cvss-s', el), v = $('#cvss-v', el), bar = $('#cvss-bar', el), out = $('#cvss-out', el), ex = $('#cvss-ex', el);
  const examples = [
    { n: 'Log4Shell (CVE-2021-44228)', s: 10.0 },
    { n: 'Heartbleed (CVE-2014-0160)', s: 7.5 },
    { n: 'Chyba zobrazení ikony', s: 2.4 }
  ];
  ex.innerHTML = examples.map((e, i) => `<button class="chip" data-i="${i}">${e.n}</button>`).join('');
  $$('.chip', ex).forEach(b => b.onclick = () => { s.value = examples[b.dataset.i].s; upd(); });
  const band = n => n === 0 ? ['Žádná', '#a6ce39'] : n < 4 ? ['Nízká', '#a6ce39'] : n < 7 ? ['Střední', '#ffd400'] : n < 9 ? ['Vysoká', '#ff8a3d'] : ['Kritická', '#ef4444'];
  function upd() {
    const n = +s.value, B = band(n);
    v.textContent = n.toFixed(1); bar.style.width = (n / 10 * 100) + '%'; bar.style.background = B[1];
    out.className = 'result'; out.style.borderColor = B[1];
    out.innerHTML = `Závažnost: <b>${B[0]}</b> (${n.toFixed(1)} / 10). ${n >= 9 ? 'Záplatovat okamžitě.' : n >= 7 ? 'Záplatovat přednostně.' : n >= 4 ? 'Naplánovat opravu.' : 'Nízká priorita.'}`;
  }
  s.oninput = upd; upd();
};

// --- 03 Šíření viru vs. červa ---
SIMS.spread = el => {
  const N = 120, COLS = 12; const grid = $('#spread-grid', el);
  let state, timer, mode, tick;
  const cells = [];
  grid.innerHTML = '';
  for (let i = 0; i < N; i++) { const b = document.createElement('button'); b.className = 'node off'; b.type = 'button'; b.setAttribute('aria-label', 'uzel ' + i); grid.appendChild(b); cells.push(b); }
  const nb = i => { const r = Math.floor(i / COLS), c = i % COLS, out = []; [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dr, dc]) => { const nr = r + dr, nc = c + dc; if (nr >= 0 && nr < N / COLS && nc >= 0 && nc < COLS) out.push(nr * COLS + nc); }); return out; };
  function reset() { clearInterval(timer); state = Array(N).fill(0); tick = 0; mode = null; draw(); $('#spread-out', el).hidden = true; $('#spread-mode', el).textContent = '—'; }
  function draw() { cells.forEach((c, i) => c.className = 'node ' + (state[i] ? 'inf' : 'off')); const n = state.filter(Boolean).length; $('#spread-n', el).textContent = n; $('#spread-t', el).textContent = tick; }
  function step() {
    tick++;
    const inf = state.map((s, i) => s ? i : -1).filter(i => i >= 0);
    if (mode === 'worm') { // červ: každý nakažený nakazí všechny sousedy
      inf.forEach(i => nb(i).forEach(j => state[j] = 1));
    } else { // virus: jen malá šance, náhodně, jako by uživatel spustil soubor
      inf.forEach(i => nb(i).forEach(j => { if (!state[j] && Math.random() < 0.18) state[j] = 1; }));
    }
    draw();
    if (state.every(Boolean) || tick > 60) {
      clearInterval(timer);
      const o = $('#spread-out', el); o.hidden = false; o.className = 'result ' + (mode === 'worm' ? 'bad' : 'warn');
      o.innerHTML = mode === 'worm'
        ? `Červ zaplnil síť za <b>${tick}</b> kroků. Šíří se sám a exponenciálně – proto dokáže zasáhnout tisíce strojů během minut.`
        : `Virus se po <b>${tick}</b> krocích zastavil na <b>${state.filter(Boolean).length}</b> uzlech. Potřebuje spuštění uživatelem, proto je pomalejší a nepravidelný.`;
    }
  }
  function run(m) { reset(); mode = m; $('#spread-mode', el).textContent = m === 'worm' ? 'červ' : 'virus'; state[Math.floor(N / 2) + 2] = 1; draw(); timer = setInterval(step, 420); }
  $('#spread-v', el).onclick = () => run('virus');
  $('#spread-w', el).onclick = () => run('worm');
  $('#spread-r', el).onclick = reset;
  cells.forEach((c, i) => c.onclick = () => { if (!mode) { state[i] = state[i] ? 0 : 1; draw(); } });
  reset();
};

// --- 03 Ransomware ---
SIMS.ransom = el => {
  const names = ['smlouva.docx', 'faktury_2025.xlsx', 'dovolena.jpg', 'projekt.pdf', 'prezentace.pptx', 'zaloha.zip', 'fotky_rodina.jpg', 'danove_priznani.pdf'];
  const host = $('#ransom-files', el), noteHost = $('#ransom-noteHost', el), out = $('#ransom-out', el);
  const go = $('#ransom-go', el), pay = $('#ransom-pay', el), rest = $('#ransom-restore', el), reset = $('#ransom-reset', el), bak = $('#ransom-bak', el);
  let enc = false;
  function render() {
    host.innerHTML = names.map(n => `<div class="file ${enc ? 'enc' : ''}">${enc ? '🔒 ' + n + '.locked' : n}</div>`).join('');
  }
  function reset_() { enc = false; render(); noteHost.innerHTML = ''; out.hidden = true; pay.disabled = true; rest.disabled = true; go.disabled = false; }
  go.onclick = () => {
    enc = true; render(); go.disabled = true; pay.disabled = false; rest.disabled = !bak.checked;
    noteHost.innerHTML = `<div class="ransom-note"><b>!!! VAŠE SOUBORY BYLY ZAŠIFROVÁNY !!!</b><br>Za dešifrovací klíč zaplaťte 0,05 BTC do 72 hodin na adresu 1A2b3C… jinak budou data smazána.</div>`;
    out.hidden = false; out.className = 'result bad';
    out.innerHTML = bak.checked ? 'Data jsou zašifrovaná. Máte ale offline zálohu – zkuste obnovení.' : 'Data jsou zašifrovaná a nemáte zálohu. Teď se ukáže, proč je záloha tak důležitá.';
  };
  pay.onclick = () => {
    const paid = Math.random() < 0.6;
    out.className = 'result warn';
    out.innerHTML = paid
      ? 'Zaplatili jste výkupné a klíč <i>tentokrát</i> přišel. Přesto jste financovali zločince, porušili doporučení NÚKIB i policie a nemáte jistotu, že útočník nezanechal zadní vrátka. Odhadem jen ~60 % obětí klíč vůbec dostane.'
      : 'Zaplatili jste – a klíč nepřišel. To je častý konec. Peníze jsou pryč, data také. Proto se výkupné platit nedoporučuje.';
    pay.disabled = true;
  };
  rest.onclick = () => {
    enc = false; render(); noteHost.innerHTML = '';
    out.className = 'result ok';
    out.innerHTML = 'Data obnovena z offline zálohy. Žádné výkupné, žádné financování zločinu. <b>Záloha je nejlepší obrana proti ransomwaru.</b>';
    pay.disabled = true; rest.disabled = true;
  };
  bak.onchange = () => { if (enc) rest.disabled = !bak.checked; };
  reset.onclick = reset_;
  render();
};

// --- 03 Detekce: signatura vs. heuristika ---
SIMS.detect = el => {
  const files = [
    { n: 'dokument.pdf', mal: false, known: false, susp: 0 },
    { n: 'update.exe', mal: true, known: true, susp: 3 },
    { n: 'novy_trojan.exe', mal: true, known: false, susp: 3 },
    { n: 'hra_crack.exe', mal: true, known: false, susp: 2 },
    { n: 'makro_faktura.docm', mal: true, known: false, susp: 2 },
    { n: 'zaloha_skript.bat', mal: false, known: false, susp: 2 }
  ];
  const log = $('#det-log', el), out = $('#det-out', el), h = $('#det-h', el), sens = $('#det-sens', el), sv = $('#det-sv', el);
  sens.oninput = () => sv.textContent = ['', 'nízká', 'střední', 'vysoká'][sens.value];
  $('#det-run', el).onclick = () => {
    log.innerHTML = ''; let caught = 0, fp = 0, missed = 0;
    const thr = 4 - (+sens.value); // vyšší citlivost = nižší práh
    files.forEach(f => {
      let verdict, cls, how;
      if (f.known) { verdict = 'MALWARE'; cls = 'no'; how = 'signatura'; caught++; }
      else if (h.checked && f.susp >= thr) {
        if (f.mal) { verdict = 'PODEZŘELÉ'; cls = 'no'; how = 'heuristika'; caught++; }
        else { verdict = 'FALEŠNÝ POPLACH'; cls = 'no'; how = 'heuristika'; fp++; }
      } else { verdict = 'čistý'; cls = 'ok'; how = h.checked ? 'pod prahem' : 'bez heuristiky'; if (f.mal) missed++; }
      log.insertAdjacentHTML('beforeend', `<div class="pkt"><span class="m">${how}</span> ${f.n} <span class="v ${cls}">${verdict}</span></div>`);
    });
    out.hidden = false; out.className = 'result ' + (missed ? 'warn' : 'ok');
    out.innerHTML = `Zachyceno hrozeb: <b>${caught}</b>, uniklo: <b>${missed}</b>, falešných poplachů: <b>${fp}</b>. ` +
      (!h.checked ? 'Jen signatury minuly všechny novinky – neznámý malware nepoznají.' : missed ? 'Zvyšte citlivost, ať chytíte i zbývající novinky.' : fp ? 'Vysoká citlivost chytí vše, ale občas obviní i neškodný soubor.' : 'Dobrá rovnováha.');
  };
};

// --- 04 XSS ---
SIMS.xss = el => {
  const inp = $('#xss-in', el), bad = $('#xss-bad', el), good = $('#xss-good', el), out = $('#xss-out', el);
  function render() {
    const raw = inp.value;
    // BEZPEČNÉ: nic z uživatelského vstupu se nikdy nevloží jako živé HTML.
    // "Zranitelnou" stránku jen NAZNAČÍME – vstup vždy escapujeme a nebezpečné části zvýrazníme.
    const willRun = /<\s*script|on\w+\s*=|javascript:/i.test(raw);
    const highlighted = esc(raw)
      .replace(/(&lt;\/?\s*script[^&]*&gt;?)/gi, '<span style="color:#ff8a8a;font-weight:700">$1</span>')
      .replace(/(on\w+=)/gi, '<span style="color:#ff8a8a;font-weight:700">$1</span>');
    bad.innerHTML = `<div class="small muted" style="margin-bottom:.4rem">Server vrátil vstup do stránky bez ošetření – prohlížeč by ho vzal jako kód:</div><div style="color:#ffd480">${highlighted || '<span class="muted">(prázdné)</span>'}</div>`
      + (willRun ? '<div style="color:#ff8a8a;margin-top:.6rem">⚠ Červeně označené části by se v reálné zranitelné stránce <b>spustily</b> (krádež cookies, přesměrování…).</div>' : '');
    good.innerHTML = `<div class="small muted" style="margin-bottom:.4rem">Server vstup escapoval, bere ho jako čistý text:</div>${esc(raw) || '<span class="muted">(prázdné)</span>'}`;
    out.hidden = false; out.className = 'result ' + (willRun ? 'bad' : 'ok');
    out.innerHTML = willRun
      ? 'Vlevo by vložený kód <b>ožil</b> a mohl ukrást cookies nebo přesměrovat uživatele. Vpravo z něj zůstal neškodný text – přesně to dělá správné escapování.'
      : 'Tento vstup nic neprovede. Zkuste vložit <code>&lt;script&gt;</code> nebo <code>onerror=</code> a uvidíte rozdíl mezi stránkami.';
  }
  $('#xss-send', el).onclick = render;
  $$('.chip', el).forEach(c => c.onclick = () => { inp.value = c.dataset.x.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"'); render(); });
  render();
};

// --- 04 SQL injection ---
SIMS.sqli = el => {
  const u = $('#sqli-u', el), p = $('#sqli-p', el), safe = $('#sqli-safe', el), q = $('#sqli-q', el), out = $('#sqli-out', el);
  const PW = "Tr0ub4dour&3";
  function render() {
    const user = u.value, pass = p.value;
    if (safe.checked) {
      q.innerHTML = `SELECT * FROM users\nWHERE user = <span style="color:#a6ce39">?</span> AND pass = <span style="color:#a6ce39">?</span>;\n<span class="m">-- parametry: ["${esc(user)}", "${esc(pass)}"]</span>`;
      const ok = user === 'admin' && pass === PW;
      out.hidden = false; out.className = 'result ' + (ok ? 'ok' : 'warn');
      out.innerHTML = ok ? 'Přihlášení úspěšné – správné jméno i heslo.' : 'Přístup odmítnut. Vstup se bere jako <b>data</b>, takže trik <code>\' OR \'1\'=\'1</code> je jen (neexistující) jméno. Injection nefunguje.';
    } else {
      const query = `SELECT * FROM users WHERE user = '${user}' AND pass = '${pass}';`;
      const injected = /'\s*or\s*'?1'?\s*=\s*'?1/i.test(user) || /'\s*or\s*'?1'?\s*=\s*'?1/i.test(pass) || /'\s*--/.test(user);
      q.innerHTML = query.replace(/('[^']*')/g, '<span style="color:#ffd400">$1</span>');
      const ok = (user === 'admin' && pass === PW);
      out.hidden = false;
      if (injected) { out.className = 'result bad'; out.innerHTML = 'Podmínka <code>OR \'1\'=\'1\'</code> je <b>vždy pravdivá</b> → databáze vrátí prvního uživatele a útočník je přihlášen <b>bez hesla</b>. Zapněte obranu vpravo.'; }
      else if (ok) { out.className = 'result ok'; out.innerHTML = 'Přihlášení úspěšné se správným heslem.'; }
      else { out.className = 'result warn'; out.innerHTML = 'Špatné heslo – odmítnuto. Zkuste do jména vložit <code>\' OR \'1\'=\'1</code>.'; }
    }
  }
  $('#sqli-go', el).onclick = render;
  safe.onchange = render;
  $$('.chip', el).forEach(c => c.onclick = () => { u.value = c.dataset.u; p.value = c.dataset.p; render(); });
  render();
};
/* ===== Simulace: kapitoly 05–07 ===== */

// --- 05 / 90 Phishing data ---
const PHISH_MAILS = [
  {
    from: 'Security Alerts Inc.', addr: 'support@security-alerts.com', subj: 'Upozornění: Váš účet bude brzy deaktivován!', phish: true,
    body: [
      { t: 'Vážený uživateli,', flag: 'Neosobní oslovení – pravá instituce zná vaše jméno.' },
      { t: 'Zjistili jsme neobvyklou aktivita na vašem účtu.', flag: 'Pravopisná a gramatická chyba („aktivita“ místo „aktivitu“).' },
      { t: 'Pokud účet neověříte do 24 hodin, bude automaticky deaktivován.', flag: 'Tlak na čas – má vás donutit jednat bez rozmyslu.' },
      { t: 'Klikněte zde: http://security-alerts.org/overit', flag: 'Odkaz vede na jinou doménu (.org) než odesílatel (.com) a není to banka.', link: 'http://security-alerts0rg.verify-login.ru/overit' },
      { t: 'Tento proces je povinný pro všechny uživatele.', flag: 'Výhrůžka a nátlak „pro všechny“ – snaha potlačit pochybnosti.' }
    ]
  },
  {
    from: 'Česká pošta', addr: 'info@ceska-posta.cz', subj: 'Zásilka připravena k vyzvednutí', phish: false,
    body: [
      { t: 'Dobrý den, pane Nováku,' },
      { t: 'Vaše zásilka č. RR123456789CZ je připravena na pobočce Varnsdorf 1.' },
      { t: 'Více informací najdete po přihlášení do svého účtu na oficiálním webu.' }
    ]
  },
  {
    from: 'PayPaI podpora', addr: 'service@paypaI-secure.com', subj: 'Potvrďte platbu 7 499 Kč', phish: true,
    body: [
      { t: 'Z vašeho účtu byla stržena platba 7 499 Kč.', flag: 'Vyvolání paniky z neznámé platby.' },
      { t: 'Pokud jste platbu neprovedli, zrušte ji zde do 2 hodin.', flag: 'Opět tlak na čas.', link: 'http://paypai-secure.com/cancel' },
      { t: 'Odesílatel: service@paypaI-secure.com', flag: 'Podvržená doména – „PayPaI“ s velkým I místo malého l, a cizí doména.' }
    ]
  }
];

SIMS.phish = el => {
  const list = $('#phish-list', el), view = $('#phish-view', el), out = $('#phish-out', el);
  list.innerHTML = PHISH_MAILS.map((m, i) => `<button class="mail-item" role="listitem" data-i="${i}"><span class="from">${m.from}</span><span class="subj">${m.subj}</span></button>`).join('');
  function open(i) {
    const m = PHISH_MAILS[i];
    $$('.mail-item', list).forEach(b => b.classList.toggle('sel', +b.dataset.i === i));
    const total = m.body.filter(x => x.flag).length;
    view.innerHTML = `<div class="hoverbar" id="ph-hover">Najeďte myší na odkaz, ať uvidíte jeho skutečný cíl…</div>
      <div class="mail-meta"><b>${esc(m.from)}</b> &lt;<span class="addr">${esc(m.addr)}</span>&gt;<br><b>Předmět:</b> ${esc(m.subj)}</div>
      <div class="mail-paper">${m.body.map((b, bi) => {
        const txt = b.link ? `${esc(b.t.split('http')[0])}<a href="#" data-real="${esc(b.link)}">${esc('http' + (b.t.split('http')[1] || ''))}</a>` : esc(b.t);
        return `<p>${b.flag ? `<span class="flag" data-fi="${bi}" title="klikněte, pokud je to podezřelé">${txt}</span>` : txt}</p>`;
      }).join('')}</div>
      <div id="ph-found" class="small"></div>`;
    const hover = $('#ph-hover', view);
    $$('.mail-paper a', view).forEach(a => {
      a.addEventListener('mouseenter', () => hover.innerHTML = 'Skutečný cíl odkazu: <b style="color:#ff8a8a">' + esc(a.dataset.real) + '</b>');
      a.addEventListener('mouseleave', () => hover.textContent = 'Najeďte myší na odkaz, ať uvidíte jeho skutečný cíl…');
      a.addEventListener('click', e => e.preventDefault());
    });
    let found = 0;
    const foundBox = $('#ph-found', view);
    $$('.flag', view).forEach(f => f.onclick = () => {
      if (f.classList.contains('found')) return;
      f.classList.add('found'); found++;
      foundBox.insertAdjacentHTML('beforeend', `<div class="result bad" style="margin:.4rem 0 0;padding:.5rem .8rem">⚠ ${m.body[f.dataset.fi].flag}</div>`);
      if (found === total) { out.hidden = false; out.className = 'result ok'; out.innerHTML = `Našli jste všech <b>${total}</b> varovných znaků. Tohle je <b>phishing</b> – nereagovat, nahlásit, smazat.`; }
    });
    out.hidden = true;
    if (!m.phish) { out.hidden = false; out.className = 'result ok'; out.innerHTML = 'Tato zpráva vypadá legitimně: osobní oslovení, konkrétní údaje, žádný nátlak ani cizí doména. Přesto přihlašujte vždy jen přes oficiální web, ne přes odkaz.'; }
  }
  $$('.mail-item', list).forEach(b => b.onclick = () => open(+b.dataset.i));
  open(0);
};

// --- 90 Phishing úloha (jeden e-mail, najdi vše) ---
SIMS.phishtask = el => {
  const host = $('#phishtask-host', el);
  const parts = [
    { t: 'Předmět: Upozornění: Váš účet bude brzy deaktivován!', flag: 'Zbytečně poplašný předmět s vykřičníkem.' },
    { t: 'Odesílatel: support@security-alerts.com', flag: 'Obecná, nedůvěryhodná doména, žádná konkrétní instituce.' },
    { t: 'Vážený uživateli,', flag: 'Neosobní oslovení.' },
    { t: 'Zjistili jsme neobvyklou aktivita na vašem účtu.', flag: 'Gramatická chyba („aktivita“).' },
    { t: 'Pokud tak neučiníte do 24 hodiny, váš účet bude automaticky deaktivován.', flag: 'Tlak na čas + chyba („24 hodiny“).' },
    { t: 'Klikni na následující odkaz: https://security-alerts.org/overit', flag: 'Tykání, jiná doména než odesílatel, podezřelý odkaz.' },
    { t: 'DŮLEŽITÉ: Tento proces je povinný pro všechny uživatele.', flag: 'Nátlak a falešná naléhavost.' }
  ];
  host.innerHTML = `<div class="mail-paper">${parts.map((p, i) => `<p><span class="flag" data-i="${i}">${esc(p.t)}</span></p>`).join('')}</div><div id="pt-found"></div><div class="result" id="pt-out" hidden></div>`;
  let found = 0; const box = $('#pt-found', host), out = $('#pt-out', host);
  $$('.flag', host).forEach(f => f.onclick = () => {
    if (f.classList.contains('found')) return;
    f.classList.add('found'); found++;
    box.insertAdjacentHTML('beforeend', `<div class="result bad" style="margin:.4rem 0 0;padding:.5rem .8rem">${found}. ${parts[f.dataset.i].flag}</div>`);
    if (found === parts.length) { out.hidden = false; out.className = 'result ok'; out.innerHTML = 'Výborně – odhalili jste všechny znaky phishingu.'; }
  });
};

// --- 05 Spear phishing: skládání cílené zprávy z OSINT ---
SIMS.spear = el => {
  const d = dataOf(el);
  const host = $('#spear-chk', el), msg = $('#spear-msg', el), bar = $('#spear-bar', el), out = $('#spear-out', el);
  host.innerHTML = d.chips.map((c, i) => `<label class="chk"><input type="checkbox" data-i="${i}"><span>${esc(c.t)}<br><span class="small muted">→ ${esc(c.v)}</span></span></label>`).join('');
  const hasUse = (on, u) => on.some(i => d.chips[i].use === u);
  function build(on) {
    const greet = hasUse(on, 'name') ? 'Dobrý den, paní Nováková,' : 'Dobrý den,';
    const b = [];
    b.push(hasUse(on, 'boss') ? 'jménem ředitele Petra Dvořáka vás žádám o rychlé vyřízení platby.' : 'žádáme vás o rychlé vyřízení platby.');
    if (hasUse(on, 'conf')) b.push('Jde o fakturu od dodavatele z konference Fakturace 2025, kterou jste navštívila.');
    if (hasUse(on, 'holiday')) b.push('Vím, že od pondělí odjíždíte do Chorvatska, proto to prosím stihněte ještě dnes.');
    if (hasUse(on, 'cafe')) b.push('P.S. Díky za tip na tu kavárnu u kanceláře, skvělé espresso!');
    b.push('Částku pošlete na číslo účtu v příloze. Děkuji.');
    return `<p>${greet}</p>` + b.map(x => `<p>${esc(x)}</p>`).join('');
  }
  function upd() {
    const on = $$('input', host).filter(c => c.checked).map(c => +c.dataset.i);
    msg.innerHTML = build(on);
    const score = Math.min(100, on.reduce((s, i) => s + d.chips[i].w, 0));
    bar.style.width = score + '%';
    bar.style.background = score < 34 ? 'var(--g2)' : score < 67 ? 'var(--y1)' : 'var(--danger)';
    out.className = 'result ' + (score < 34 ? 'ok' : score < 67 ? 'warn' : 'bad');
    out.innerHTML = score === 0
      ? 'Zatím obecná zpráva – takový podvod odhalíte snadno.'
      : score < 67
        ? `Věrohodnost <b>${score} %</b>. Pár osobních detailů a zpráva je najednou mnohem přesvědčivější.`
        : `Věrohodnost <b>${score} %</b>. Takto cílená zpráva oklame i opatrného člověka – přesně proto se vyplatí nesdílet všechno veřejně.`;
  }
  host.addEventListener('change', upd); upd();
};

// --- 05 Rozhodovací scénáře (BEC, baiting, scareware, fyzické) ---
SIMS.decision = el => {
  const d = dataOf(el), host = el.querySelector('.sim-body') || el;
  const wrap = document.createElement('div');
  d.items.forEach((it, qi) => {
    const q = document.createElement('div'); q.className = 'q';
    q.innerHTML = `<div class="q-text">${qi + 1}. ${esc(it.scen)}${it.q ? `<br><span class="muted">${esc(it.q)}</span>` : ''}</div>`
      + `<div class="q-opts">${it.opts.map((o, i) => `<button type="button" class="q-opt" data-i="${i}">${esc(o.t)}</button>`).join('')}</div>`
      + '<div class="q-exp" hidden></div>';
    $$('.q-opt', q).forEach(b => b.addEventListener('click', () => {
      const o = it.opts[+b.dataset.i];
      $$('.q-opt', q).forEach(x => { x.disabled = true; if (it.opts[+x.dataset.i].v === 'good') x.classList.add('right'); });
      if (o.v !== 'good') b.classList.add('wrong');
      const ex = $('.q-exp', q); ex.hidden = false;
      const tag = o.v === 'good' ? '<b style="color:var(--g2)">Dobrá volba.</b> ' : o.v === 'risky' ? '<b style="color:var(--y1)">Riskantní.</b> ' : '<b style="color:var(--danger-soft)">Nebezpečné.</b> ';
      ex.innerHTML = tag + o.fb;
    }));
    wrap.appendChild(q);
  });
  host.appendChild(wrap);
};

// --- 05 Větvený dialog (vishing / pretexting) ---
SIMS.dialog = el => {
  const d = dataOf(el), host = el.querySelector('.dlg-host');
  let i = 0, leaks = 0;
  function step() {
    const st = d.steps[i];
    const box = document.createElement('div'); box.className = 'q';
    box.innerHTML = `<div class="q-text"><span class="badge r" style="margin-right:.5rem">volá „IT“</span>${esc(st.s)}</div>`
      + `<div class="q-opts">${st.opts.map((o, k) => `<button type="button" class="q-opt" data-k="${k}">${esc(o.t)}</button>`).join('')}</div>`
      + '<div class="q-exp" hidden></div>';
    host.appendChild(box);
    $$('.q-opt', box).forEach(b => b.addEventListener('click', () => {
      const o = st.opts[+b.dataset.k];
      $$('.q-opt', box).forEach(x => { x.disabled = true; if (!st.opts[+x.dataset.k].leak) x.classList.add('right'); });
      if (o.leak) { b.classList.add('wrong'); leaks++; }
      const ex = $('.q-exp', box); ex.hidden = false;
      ex.innerHTML = (o.leak ? '<b style="color:var(--danger-soft)">Prozradili jste citlivou informaci.</b> ' : '<b style="color:var(--g2)">Správně – nic jste neprozradili.</b> ') + o.fb;
      i++;
      if (i < d.steps.length) {
        const nx = document.createElement('button'); nx.type = 'button'; nx.className = 'btn sm'; nx.style.marginTop = '.8rem';
        nx.textContent = 'Pokračovat v hovoru →';
        nx.onclick = () => { nx.remove(); step(); };
        host.appendChild(nx);
      } else {
        const r = document.createElement('div'); r.className = 'result ' + (leaks ? 'bad' : 'ok'); r.style.marginTop = '1rem';
        r.innerHTML = (leaks ? `Konec hovoru. Prozradili jste <b>${leaks}</b> ${leaks === 1 ? 'citlivou informaci' : 'citlivé informace'}. Útočníkovi stačí pár střípků. ` : 'Konec hovoru. Neprozradili jste nic. ') + d.end;
        host.appendChild(r);
      }
    }));
  }
  step();
};

// --- 05 Hledání varovných znaků v textu (smishing) ---
SIMS.spot = el => {
  const d = dataOf(el), host = el.querySelector('.spot-host');
  const total = d.items.filter(x => x.flag).length;
  host.innerHTML = `<div class="mail-paper">${d.items.map((p, i) => `<p>${p.flag ? `<span class="flag" data-i="${i}" title="klikněte, pokud je to podezřelé">${esc(p.t)}</span>` : esc(p.t)}</p>`).join('')}</div>`
    + '<div class="spot-found" style="margin-top:.6rem"></div><div class="result" hidden></div>';
  let found = 0; const box = host.querySelector('.spot-found'), out = host.querySelector('.result');
  $$('.flag', host).forEach(f => f.onclick = () => {
    if (f.classList.contains('found')) return;
    f.classList.add('found'); found++;
    box.insertAdjacentHTML('beforeend', `<div class="result bad" style="margin:.4rem 0 0;padding:.5rem .8rem">${found}. ${d.items[f.dataset.i].flag}</div>`);
    if (found === total) { out.hidden = false; out.className = 'result ok'; out.innerHTML = d.win; }
  });
};

// --- 07 Caesar ---
const CZ_UP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function caesar(txt, k) { return txt.toUpperCase().replace(/[A-Z]/g, c => CZ_UP[(CZ_UP.indexOf(c) + k + 26) % 26]); }
SIMS.caesar = el => {
  const inp = $('#cae-in', el), k = $('#cae-k', el), kv = $('#cae-kv', el), out = $('#cae-out', el), freq = $('#cae-freq', el), res = $('#cae-res', el);
  function enc() { kv.textContent = k.value; out.textContent = caesar(inp.value, +k.value); }
  inp.oninput = enc; k.oninput = enc;
  $('#cae-crack', el).onclick = () => {
    const cipher = out.textContent;
    const counts = {}; let max = 0;
    for (const c of cipher) if (/[A-Z]/.test(c)) counts[c] = (counts[c] || 0) + 1;
    freq.innerHTML = '';
    CZ_UP.split('').forEach(c => { const n = counts[c] || 0; max = Math.max(max, n); });
    let topLetter = 'E', topN = -1;
    CZ_UP.split('').forEach(c => {
      const n = counts[c] || 0; if (n > topN) { topN = n; topLetter = c; }
      const d = document.createElement('div'); d.style.height = (max ? n / max * 100 : 0) + '%'; d.innerHTML = `<span>${c}</span>`; freq.appendChild(d);
    });
    // nejčastější písmeno pravděpodobně odpovídá 'E'
    const guess = (CZ_UP.indexOf(topLetter) - CZ_UP.indexOf('E') + 26) % 26;
    res.hidden = false; res.className = 'result ' + (guess === +k.value ? 'ok' : 'warn');
    res.innerHTML = `Nejčastější písmeno šifry je <b>${topLetter}</b>. Pokud odpovídá českému „E“, je posun <b>${guess}</b> → text: <b>${esc(caesar(cipher, -guess))}</b>. Právě proto je Caesarova šifra snadno prolomitelná.`;
  };
  enc();
};

// --- 07 Hash (FNV demo) + sůl ---
function fnv(str) { let h = 0x811c9dc5; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); } return (h >>> 0).toString(16).padStart(8, '0'); }
function longHash(str) { return fnv(str) + fnv('a' + str) + fnv(str + 'z') + fnv('x' + str + 'y'); }
SIMS.hash = el => {
  const inp = $('#hash-in', el), salt = $('#hash-salt', el), src = $('#hash-src', el), out = $('#hash-out', el);
  let saltVal = Math.random().toString(36).slice(2, 10);
  function render() {
    const base = inp.value + (salt.checked ? ':' + saltVal : '');
    src.textContent = salt.checked ? `${inp.value} + sůl(${saltVal})` : inp.value;
    out.textContent = longHash(base);
  }
  inp.oninput = render;
  salt.onchange = () => { if (salt.checked) saltVal = Math.random().toString(36).slice(2, 10); render(); };
  render();
};

// --- 07 Firewall (06) ---
SIMS.firewall = el => {
  const DEF = [
    { act: 'allow', proto: 'TCP', port: '443', note: 'HTTPS web' },
    { act: 'allow', proto: 'TCP', port: '80', note: 'HTTP web' },
    { act: 'deny', proto: 'TCP', port: '23', note: 'Telnet (nešifrovaný)' },
    { act: 'deny', proto: 'any', port: 'any', note: 'vše ostatní' }
  ];
  const PKTS = [
    { proto: 'TCP', port: 443, d: 'Prohlížeč → web (HTTPS)' },
    { proto: 'TCP', port: 80, d: 'Prohlížeč → web (HTTP)' },
    { proto: 'TCP', port: 23, d: 'Pokus o Telnet' },
    { proto: 'TCP', port: 22, d: 'SSH připojení' },
    { proto: 'UDP', port: 53, d: 'DNS dotaz' },
    { proto: 'TCP', port: 3389, d: 'Vzdálená plocha (RDP)' },
    { proto: 'TCP', port: 445, d: 'Sdílení souborů SMB' },
    { proto: 'TCP', port: 443, d: 'Další HTTPS spojení' }
  ];
  let rules = JSON.parse(JSON.stringify(DEF));
  const tbl = $('#fw-rules', el), log = $('#fw-log', el), out = $('#fw-out', el);
  function draw() {
    tbl.innerHTML = '<thead><tr><th>#</th><th>Akce</th><th>Protokol</th><th>Port</th><th>Popis</th></tr></thead><tbody>' +
      rules.map((r, i) => `<tr><td>${i + 1}</td>
        <td><select data-i="${i}" data-f="act" class="inp"><option value="allow"${r.act === 'allow' ? ' selected' : ''}>povolit</option><option value="deny"${r.act === 'deny' ? ' selected' : ''}>zakázat</option></select></td>
        <td><select data-i="${i}" data-f="proto" class="inp"><option${r.proto === 'TCP' ? ' selected' : ''}>TCP</option><option${r.proto === 'UDP' ? ' selected' : ''}>UDP</option><option value="any"${r.proto === 'any' ? ' selected' : ''}>any</option></select></td>
        <td><input data-i="${i}" data-f="port" class="inp mono" value="${r.port}" style="width:5.5rem"></td>
        <td class="small muted">${r.note}</td></tr>`).join('') + '</tbody>';
    $$('select,input', tbl).forEach(c => c.onchange = () => { rules[+c.dataset.i][c.dataset.f] = c.value; });
  }
  function match(p) {
    for (const r of rules) {
      const proto = r.proto === 'any' || r.proto === p.proto;
      const port = r.port === 'any' || +r.port === p.port;
      if (proto && port) return r.act === 'allow';
    }
    return false;
  }
  $('#fw-run', el).onclick = () => {
    log.innerHTML = ''; let allowed = 0;
    PKTS.forEach(p => { const ok = match(p); if (ok) allowed++; log.insertAdjacentHTML('beforeend', `<div class="pkt"><span class="m">${p.proto}/${p.port}</span> ${p.d} <span class="v ${ok ? 'ok' : 'no'}">${ok ? 'PROŠEL' : 'ZAHOZEN'}</span></div>`); });
    out.hidden = false; out.className = 'result'; out.innerHTML = `Prošlo <b>${allowed}</b> z ${PKTS.length} paketů. Pravidla se čtou shora dolů a platí <b>první shoda</b>; poslední „zakázat vše“ chrání před vším, co jste výslovně nepovolili.`;
  };
  $('#fw-reset', el).onclick = () => { rules = JSON.parse(JSON.stringify(DEF)); draw(); out.hidden = true; log.innerHTML = ''; };
  draw();
};

// --- 06 Síla hesla ---
SIMS.pw = el => {
  const inp = $('#pw-in', el), bar = $('#pw-bar', el), sc = $('#pw-score', el), ln = $('#pw-len', el), tm = $('#pw-time', el), tips = $('#pw-tips', el);
  const COMMON = ['123456', 'password', 'heslo', 'qwerty', '111111', 'admin', '12345678', 'heslo123', 'leden2025'];
  function pool(p) { let n = 0; if (/[a-z]/.test(p)) n += 26; if (/[A-Z]/.test(p)) n += 26; if (/[0-9]/.test(p)) n += 10; if (/[^a-zA-Z0-9]/.test(p)) n += 33; if (/[áčďéěíňóřšťúůýž]/i.test(p)) n += 15; return n || 1; }
  function human(sec) {
    if (sec < 1) return 'okamžitě';
    const u = [['s', 60], ['min', 60], ['h', 24], ['dní', 365], ['let', 1000], ['tis. let', 1e6], ['mil. let', 1e9]];
    let v = sec, i = 0; const names = ['sekund', 'minut', 'hodin', 'dní', 'let', 'tisíc let', 'milionů let', 'miliard let'];
    const steps = [60, 60, 24, 365, 1000, 1000, 1000];
    for (i = 0; i < steps.length && v >= steps[i]; i++) v /= steps[i];
    return '~' + (v < 10 ? v.toFixed(1) : Math.round(v)) + ' ' + names[i];
  }
  function render() {
    const p = inp.value, L = p.length;
    ln.textContent = L;
    const common = COMMON.includes(p.toLowerCase());
    const bits = L * Math.log2(pool(p));
    const guesses = Math.pow(2, bits) / 2;
    const sec = guesses / 1e11; // 100 miliard pokusů/s
    let score = common ? 0 : bits < 28 ? 1 : bits < 40 ? 2 : bits < 60 ? 3 : bits < 80 ? 4 : 5;
    const labels = ['velmi slabé', 'velmi slabé', 'slabé', 'střední', 'silné', 'velmi silné'];
    const colors = ['#ef4444', '#ef4444', '#ff8a3d', '#ffd400', '#a6ce39', '#a6ce39'];
    sc.textContent = labels[score]; sc.style.color = colors[score];
    bar.style.width = (score / 5 * 100) + '%'; bar.style.background = colors[score];
    tm.textContent = common ? 'okamžitě (ze seznamu)' : human(sec);
    const t = [];
    if (common) t.push('Toto heslo je na seznamu nejpoužívanějších – útočník ho zkusí jako první.');
    if (L < 12) t.push('Přidejte délku: cílem je aspoň 12–16 znaků.');
    if (!/[A-Z]/.test(p) || !/[a-z]/.test(p)) t.push('Kombinujte velká a malá písmena.');
    if (!/[0-9]/.test(p)) t.push('Přidejte číslice.');
    if (!/[^a-zA-Z0-9]/.test(p)) t.push('Přidejte speciální znak.');
    if (!t.length) t.push('Výborné heslo. Pro každý účet ale použijte jiné a uložte je do správce hesel.');
    tips.innerHTML = t.map(x => '• ' + x).join('<br>');
  }
  inp.oninput = render;
  $$('.chip', el).forEach(c => c.onclick = () => { inp.value = c.dataset.x; render(); });
  render();
};

// --- 06 TOTP ---
SIMS.totp = el => {
  const secret = Math.floor(Math.random() * 1e6);
  const code = $('#totp-code', el), ring = $('#totp-ring', el), secEl = $('#totp-sec', el), inp = $('#totp-in', el), out = $('#totp-out', el);
  function current() { const step = Math.floor(Date.now() / 30000); return String((secret ^ step * 7919) % 1000000).padStart(6, '0'); }
  let shown = '';
  function tick() {
    const c = current(); shown = c;
    code.textContent = c.slice(0, 3) + ' ' + c.slice(3);
    const rem = 30 - Math.floor((Date.now() / 1000) % 30);
    secEl.textContent = rem;
    ring.setAttribute('stroke-dasharray', (rem / 30 * 100) + ' 100');
  }
  tick(); const iv = setInterval(tick, 1000);
  // zastavit interval, až element zmizí ze stromu (bezpečné pro dlouhý běh)
  const obs = new MutationObserver(() => { if (!document.body.contains(el)) { clearInterval(iv); obs.disconnect(); } });
  obs.observe(document.body, { childList: true, subtree: true });
  $('#totp-go', el).onclick = () => {
    const v = inp.value.replace(/\s/g, '');
    out.hidden = false;
    if (v === current()) { out.className = 'result ok'; out.innerHTML = 'Kód platí – přihlášení úspěšné. Stejný kód dopočítal i server ze sdíleného tajemství a času.'; }
    else if (v === shown && v !== current()) { out.className = 'result warn'; out.innerHTML = 'Tento kód právě vypršel. TOTP se mění po 30 s – staré kódy útočníkovi nepomohou.'; }
    else { out.className = 'result bad'; out.innerHTML = 'Nesprávný kód. Opište aktuální šestici z aplikace výše.'; }
  };
};

// --- 06 VPN / TOR route ---
SIMS.route = el => {
  const onion = $('#route-onion', el), hops = $('#route-hops', el), out = $('#route-out', el);
  const MY = '92.45.7.13';
  const modes = {
    none: { onion: '', hops: [
      { n: 'Váš poskytovatel (ISP)', s: 'Vidí vaši IP <b>' + MY + '</b> i to, že jdete na <b>banka.cz</b>.' },
      { n: 'Internet', s: 'Provoz putuje v nešifrované/standardní podobě.' },
      { n: 'Cílový server', s: 'Vidí vaši skutečnou IP <b>' + MY + '</b>.' }
    ], msg: ['bad', 'Bez ochrany vidí vaši IP i cíl prakticky každý po cestě.'] },
    vpn: { onion: '', hops: [
      { n: 'Váš ISP', s: 'Vidí jen <b>šifrovaný tunel</b> k VPN serveru, ne obsah ani cíl.' },
      { n: 'VPN server', s: 'Zná vaši IP i cíl – proto musí být <b>důvěryhodný</b> (no-logs).' },
      { n: 'Cílový server', s: 'Vidí IP <b>VPN serveru</b> (185.2.9.44), ne vaši.' }
    ], msg: ['warn', 'VPN skryje cíl před ISP a vaši IP před webem. Celou cestu ale zná provozovatel VPN.'] },
    tor: { onion: 'core', hops: [
      { n: 'Vstupní uzel', s: 'Zná vaši IP <b>' + MY + '</b>, ale <b>nezná cíl</b>.' },
      { n: 'Prostřední uzel', s: 'Nezná zdroj <b>ani</b> cíl – jen předává.' },
      { n: 'Výstupní uzel', s: 'Zná cíl <b>banka.cz</b>, ale <b>nezná vaši IP</b>.' }
    ], msg: ['ok', 'Žádný jediný uzel nezná zdroj i cíl zároveň – odtud silná anonymita TOR. Pozor: výstupní uzel nešifruje, nutné HTTPS.'] }
  };
  function run(mode) {
    const m = modes[mode];
    onion.innerHTML = mode === 'tor'
      ? '<div class="layers"><span class="onion l1"><span class="onion l2"><span class="onion l3"><span class="onion core">data</span></span></span></span></div><p class="small muted" style="text-align:center">Data zabalená do tří vrstev šifrování – každý uzel sloupne jen jednu.</p>'
      : mode === 'vpn' ? '<p class="small muted">Jeden šifrovaný tunel mezi vámi a VPN serverem.</p>' : '';
    hops.innerHTML = m.hops.map(h => `<div class="hop"><div class="hn">${h.n}</div><div class="sees">${h.s}</div></div>`).join('');
    const nodes = $$('.hop', hops);
    nodes.forEach((n, i) => setTimeout(() => n.classList.add('act'), i * 350));
    out.className = 'result ' + m.msg[0]; out.innerHTML = m.msg[1];
  }
  $$('.btn', el).forEach(b => b.onclick = () => run(b.dataset.mode));
  run('none');
};
/* ===== Simulace: kapitoly 08, 51, 90, 99 ===== */

// --- 08 Blockchain ---
SIMS.chain = el => {
  const host = $('#chain-blocks', el), out = $('#chain-out', el);
  let blocks = [
    { data: 'Alice → Bob: 5 ₿' },
    { data: 'Bob → Čeněk: 2 ₿' },
    { data: 'Čeněk → Dana: 1 ₿' }
  ];
  function h(prev, data) { let x = 0x811c9dc5; const s = prev + '|' + data; for (let i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 0x01000193); } return (x >>> 0).toString(16).padStart(8, '0'); }
  function recompute() { let prev = '00000000'; blocks.forEach(b => { b.prevStored = prev; b.hash = h(prev, b.data); prev = b.hash; }); }
  recompute();
  function draw() {
    // ověř, jestli řetěz sedí
    let prev = '00000000', ok = true;
    host.innerHTML = blocks.map((b, i) => {
      const valid = b.prevStored === prev && b.hash === h(b.prevStored, b.data);
      if (!valid) ok = false;
      prev = b.hash;
      return `<div class="block ${valid ? '' : 'bad'}"><div class="small" style="font-weight:700;margin-bottom:.3rem">Blok ${i + 1} ${valid ? '✓' : '✗ neplatný'}</div>
        <textarea class="inp mono" data-i="${i}">${esc(b.data)}</textarea>
        <div class="bh" style="margin-top:.5rem">prev: <b>${b.prevStored}</b><br>hash: <b>${b.hash}</b></div></div>`;
    }).join('');
    $$('textarea', host).forEach(t => t.oninput = () => { blocks[+t.dataset.i].data = t.value; blocks[+t.dataset.i].hash = h(blocks[+t.dataset.i].prevStored, t.value); draw(); });
    out.className = 'result ' + (ok ? 'ok' : 'bad');
    out.innerHTML = ok ? 'Řetěz je platný – každý blok odkazuje na hash předchozího.' : 'Řetěz je narušený! Změna dat změnila hash bloku, takže už nesedí odkaz v následujících blocích. V reálné síti by takový podvod ostatní uzly odmítly. „Vytěžením“ hashe přepočítáte.';
  }
  $('#chain-mine', el).onclick = () => { recompute(); draw(); };
  $('#chain-reset', el).onclick = () => { blocks = [{ data: 'Alice → Bob: 5 ₿' }, { data: 'Bob → Čeněk: 2 ₿' }, { data: 'Čeněk → Dana: 1 ₿' }]; recompute(); draw(); };
  draw();
};

// --- 51 Etická dilemata ---
SIMS.ethics = el => {
  const host = $('#ethics-host', el);
  const D = [
    { q: 'Najdete vážnou chybu na webu školy. Co uděláte?', opts: ['Soukromě to nahlásím vedení a dám čas na opravu', 'Hned to zveřejním na sociálních sítích', 'Zneužiju to k nahlédnutí do známek'],
      good: 0, fb: ['Správně – responsible disclosure. Chráníte uživatele a jednáte eticky i legálně.', 'Okamžité zveřejnění vystaví uživatele riziku dřív, než se chyba opraví.', 'To je trestný čin (§ 230) bez ohledu na to, že jste chybu „jen našli“.'] },
    { q: 'Kamarád vás prosí, ať mu „jen omrknete“ zprávy jeho partnerky na jeho účtu, který znáte.', opts: ['Odmítnu – je to narušení soukromí', 'Pomůžu, je to přece jeho kamarád', 'Udělám to a nikomu neřeknu'],
      good: 0, fb: ['Správně. Respekt k soukromí třetí osoby má přednost, navíc jde o cizí účet.', 'Přístup k cizí komunikaci bez souhlasu je neetický i protiprávní (§ 182).', 'Tajnost nic nemění na tom, že jde o porušení soukromí a zákona.'] },
    { q: 'Firma chce použít AI, která podle dat odhaduje, koho propustit. Co doporučíte?', opts: ['Zachovat člověka v rozhodování a model vysvětlit', 'Nechat rozhodnout jen algoritmus, je objektivní', 'Výsledky tajit před zaměstnanci'],
      good: 0, fb: ['Správně – transparentnost a lidský dohled. Model může být zaujatý podle dat, na kterých se učil.', 'Algoritmus není automaticky spravedlivý – přebírá zkreslení z dat. GDPR navíc chrání před čistě automatizovaným rozhodnutím.', 'Netransparentnost podkopává důvěru a může porušovat práva zaměstnanců.'] }
  ];
  host.innerHTML = D.map((d, i) => `<div class="q" data-i="${i}"><div class="q-text">${i + 1}. ${d.q}</div><div class="q-opts">${d.opts.map((o, j) => `<button class="q-opt" data-j="${j}">${o}</button>`).join('')}</div><div class="q-exp" hidden></div></div>`).join('');
  $$('.q', host).forEach((qel, i) => {
    const d = D[i];
    $$('.q-opt', qel).forEach(b => b.onclick = () => {
      const j = +b.dataset.j;
      $$('.q-opt', qel).forEach(x => { x.disabled = true; if (+x.dataset.j === d.good) x.classList.add('right'); });
      if (j !== d.good) b.classList.add('wrong');
      const ex = $('.q-exp', qel); ex.hidden = false; ex.innerHTML = d.fb[j];
    });
  });
};

// --- 90 Dešifrování (Caesar -4) ---
SIMS.decode = el => {
  const CIPHER = 'ZIWIPIZERSGITVINIZEWSWSFRMLEGOIVLELELE';
  const cipherEl = $('#decode-cipher', el), k = $('#decode-k', el), kv = $('#decode-kv', el), out = $('#decode-out', el), res = $('#decode-res', el);
  cipherEl.textContent = CIPHER;
  function render() {
    kv.textContent = k.value;
    const dec = caesar(CIPHER, -(+k.value));
    out.textContent = dec;
    const ok = +k.value === 4;
    res.hidden = !ok;
    if (ok) { res.className = 'result ok'; res.innerHTML = 'Rozluštěno posunem 4! Zpráva (bez diakritiky a mezer) zní: <b>VESELE VANOCE PREJE VAS OSOBNI HACKER HAHAHA</b>. Postup: šifra posouvá o +4, dešifrování tedy posouvá o −4. Nejrychleji pomůže frekvenční analýza nebo prostě vyzkoušení všech 25 posunů.'; }
  }
  k.oninput = render; render();
};

// --- 90 Falešné zprávy ---
SIMS.fake = el => {
  const host = $('#fake-host', el);
  const arts = [
    { title: 'Pití kávy ráno zvyšuje riziko rakoviny o 50 %', real: false,
      text: 'Tým z „prestižní Univerzity zdraví“ údajně zjistil, že ranní káva zvyšuje riziko rakoviny o 50 %. Studie nebyla publikována v recenzovaném časopise a odborníci zpochybňují její metodiku. Přesto se zpráva šíří po sítích a lidé přestávají pít kávu.',
      fb: 'HOAX. Varovné znaky: senzační procento bez kontextu, neexistující/neověřitelná instituce, chybějící recenzovaný zdroj, zpochybněná metodika a cíl vyvolat paniku.' },
    { title: 'Vědecké poznatky o zdravotních přínosech kávy', real: true,
      text: 'Pravidelná mírná konzumace kávy (3–5 šálků denně) bývá spojována s nižším rizikem některých chorob. Článek uvádí konkrétní mechanismy (antioxidanty, kofein), zmiňuje i rizika nadměrné konzumace a odkazuje na zdroje typu NIH a CDC.',
      fb: 'DŮVĚRYHODNÉ. Uvádí vyvážené informace, přiznává rizika i přínosy a odkazuje na seriózní zdroje (NIH, CDC). Přesto i tady platí: ověřte, že odkazy skutečně existují.' }
  ];
  host.innerHTML = arts.map((a, i) => `<div class="card" style="margin-bottom:1rem"><h4>${esc(a.title)}</h4><p class="small">${esc(a.text)}</p>
    <div class="btns"><button class="btn sec sm" data-i="${i}" data-v="1">Důvěryhodné</button><button class="btn sec sm" data-i="${i}" data-v="0">Hoax</button></div>
    <div class="q-exp" hidden></div></div>`).join('');
  $$('.btn', host).forEach(b => b.onclick = () => {
    const i = +b.dataset.i, said = b.dataset.v === '1', a = arts[i], card = b.closest('.card');
    const ex = $('.q-exp', card); ex.hidden = false;
    const correct = said === a.real;
    ex.innerHTML = `<span class="result ${correct ? 'ok' : 'bad'}" style="display:block;margin-top:.5rem">${correct ? '✓ Správně. ' : '✗ Ne tak docela. '}${a.fb}</span>`;
    $$('.btn', card).forEach(x => x.disabled = true);
  });
};

// --- 99 Slovník ---
SIMS.glossary = el => {
  const data = dataOf(el).sort((a, b) => a[0].localeCompare(b[0], 'cs'));
  const q = $('#gloss-q', el), list = $('#gloss-list', el), letters = $('#gloss-letters', el), count = $('#gloss-count', el);
  const ALPH = Array.from(new Set(data.map(d => d[0][0].toUpperCase()))).sort((a, b) => a.localeCompare(b, 'cs'));
  let letter = '';
  letters.innerHTML = `<button class="on" data-l="">vše</button>` + ALPH.map(l => `<button data-l="${l}">${l}</button>`).join('');
  function render() {
    const term = q.value.trim().toLowerCase();
    const items = data.filter(([t, d]) => (!letter || t.toUpperCase().startsWith(letter)) && (!term || t.toLowerCase().includes(term) || d.toLowerCase().includes(term)));
    list.innerHTML = items.map(([t, d]) => `<div class="gloss-item"><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join('') || '<p class="muted">Nic nenalezeno.</p>';
    count.textContent = `${items.length} z ${data.length} pojmů`;
  }
  q.oninput = () => { letter = ''; $$('button', letters).forEach(b => b.classList.toggle('on', b.dataset.l === '')); render(); };
  $$('button', letters).forEach(b => b.onclick = () => { letter = b.dataset.l; q.value = ''; $$('button', letters).forEach(x => x.classList.toggle('on', x === b)); render(); });
  render();
};

/* ===== Úvodní dlaždice kapitol ===== */
(function () {
  const tiles = document.getElementById('chTiles');
  if (!tiles) return;
  const desc = {
    '01': ['Základní pojmy', 'Co je kyberprostor, kdo je hacker, triáda CIA a druhy kriminality.'],
    '02': ['Riziko a hrozby', 'Aktivum, zranitelnost, hrozba, riziko a kde hledat zranitelnosti.'],
    '03': ['Malware', 'Viry, červi, trojani, ransomware, spyware a jak je antivir pozná.'],
    '04': ['Hacking', 'Typy hackerů, techniky útoků, XSS a SQL injection, penetrační testování.'],
    '05': ['Sociální inženýrství', 'Manipulace místo techniky a phishing pod lupou.'],
    '06': ['Bezpečnost', 'Firewall, hesla, 2FA, VPN, TOR a digitální well-being.'],
    '07': ['Šifrování', 'Symetrické i asymetrické šifry, hashování, kryptoanalýza.'],
    '08': ['Internet a technologie', 'Blockchain, IoT, darknet a umělá inteligence.'],
    '50': ['Legislativa', 'Nový zákon 264/2025, GDPR, NIS2, NÚKIB a trestní právo.'],
    '51': ['Etika', 'Etické kodexy a digitální dilemata.'],
    '90': ['Úlohy', 'Interaktivní cvičení a závěrečný test.'],
    '99': ['Slovník', 'Všechny pojmy na jednom místě.']
  };
  const first = { '01': 'k-pojmy', '02': 'r-pojmy', '03': 'm-uvod', '04': 'h-principy', '05': 'si-uvod', '06': 'b-techniky', '07': 's-principy', '08': 'i-uvod', '50': 'l-uvod', '51': 'e-kodexy', '90': 'u-phish', '99': 'g-slovnik' };
  const colors = { '01': 'var(--y1)', '02': 'var(--y1)', '03': 'var(--b1)', '04': 'var(--b1)', '05': 'var(--y1)', '06': 'var(--g2)', '07': 'var(--b1)', '08': 'var(--b1)', '50': 'var(--g2)', '51': 'var(--g2)', '90': 'var(--y1)', '99': 'var(--b2)' };
  const order = ['01', '02', '03', '04', '05', '06', '07', '08', '50', '51', '90', '99'];
  const plural = (n, a, b, c) => n === 1 ? a : (n >= 2 && n <= 4 ? b : c);
  const countTopics = ch => document.querySelectorAll('section.topic[data-ch="' + ch + '"]').length;
  const countSims = ch => document.querySelectorAll('section.topic[data-ch="' + ch + '"] [data-sim]').length;
  tiles.innerHTML = order.map(ch => {
    const nt = countTopics(ch), ns = countSims(ch);
    const meta = nt + ' ' + plural(nt, 'téma', 'témata', 'témat') + (ns ? ' · ' + ns + ' ' + plural(ns, 'simulace', 'simulace', 'simulací') : '');
    return `<a class="ch-tile" style="--chc:${colors[ch]}" href="#${first[ch]}"><span class="n">${ch}</span><span class="t">${desc[ch][0]}</span><span class="d">${desc[ch][1]}</span><span class="m">${meta}</span></a>`;
  }).join('');
  const ds = document.getElementById('dashStats');
  if (ds) {
    const tot = document.querySelectorAll('section.topic:not(#uvod)').length;
    const sims = document.querySelectorAll('section.topic [data-sim]').length;
    ds.innerHTML = [[order.length, 'kapitol'], [tot, 'témat'], [sims, 'interaktivních simulací']]
      .map(x => `<div class="stat"><b>${x[0]}</b><small>${x[1]}</small></div>`).join('');
  }
})();

/* ===== Spuštění routeru (po načtení celé stránky) ===== */
(function () {
  let last = null;
  try { last = localStorage.getItem('kbb-last'); } catch (e) {}
  if (!location.hash && last && document.getElementById(last)) location.hash = last;
  route();
})();
