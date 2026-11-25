/* Rewards World website. All words come from content.json; this file only lays them out. */
(function (root) {
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  };
  function mail(c, subject, body) {
    var ct = c.contact || {};
    return "mailto:" + c.email + "?subject=" + encodeURIComponent(subject || ct.subject || "") + "&body=" + encodeURIComponent(body || ct.body || "");
  }
  function applyMeta(c) {
    if (typeof document === "undefined") return;
    if (c.meta && c.meta.title) document.title = c.meta.title;
    if (c.meta && c.meta.description) {
      var m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute("content", c.meta.description);
    }
  }
  var ARROW = '<svg class="arr" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var EXT = '<span class="sr"> (opens in a new tab)</span>';
  function rv(i) { return ' class="rv" style="--d:' + (i * 70) + 'ms"'; }
  function head(eyebrow, title, lead, id) {
    return '<header class="sec-head rv"><p class="eyebrow">' + esc(eyebrow) + '</p><h2' + (id ? ' id="' + id + '"' : "") + ">" + esc(title) + "</h2>" + (lead ? '<p class="sub">' + esc(lead) + "</p>" : "") + "</header>";
  }

  function render(c) {
    var j = c.journey || {}, hero = c.hero || {}, nav = c.nav || {}, ui = c.ui || {};
    var who = c.who || {}, sm = c.samples || {}, tool = c.tool || {}, trust = c.trust || {}, ins = c.insights || {}, ct = c.contact || {};
    var app = c.app || "", signin = c.signinUrl || app + "/app";
    var services = j.services || [];
    var names = {};
    services.forEach(function (s) { names[s.slug] = s.name; });

    /* header */
    var links = [["#journey", nav.services], ["#who", nav.who], ["#outputs", nav.samples], ["#tool", nav.tool], ["#trust", nav.trust], ["#insights", nav.insights]]
      .map(function (l) { return '<a href="' + l[0] + '">' + esc(l[1]) + "</a>"; }).join("");
    var top = '<a class="skip" href="#main">' + esc(ui.skip) + "</a>" +
      '<div class="bar" aria-hidden="true"></div>' +
      '<header class="top"><a class="logo" href="#top" aria-label="' + esc(ui.home) + '"><img src="logo.png" alt="" width="36" height="36"><span>REWARDS WORLD™</span></a>' +
      '<nav id="site-menu" aria-label="Main">' + links + '<a class="signin-m" href="' + esc(signin) + '">' + esc(nav.signin) + "</a></nav>" +
      '<div class="top-actions"><a class="signin-d" href="' + esc(signin) + '">' + esc(nav.signin) + '</a><a class="pill solid sm" href="#contact">' + esc(nav.contact) + "</a>" +
      '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu" data-open="' + esc(ui.menu) + '" data-close="' + esc(ui.close) + '">' + esc(ui.menu) + "</button></div></header>";

    /* 1 hero */
    var qs = (hero.questions || []).map(function (q, i) {
      return "<li><span class=\"qn\" aria-hidden=\"true\">" + (i + 1) + "</span><span>" + esc(q) + "</span></li>";
    }).join("");
    var tests = (hero.tests || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
    var root = hero.root ? '<p class="root hi" style="--d:200ms">' + esc(hero.root) + "</p>" : "";
    var s1 = '<section class="hero wrap" id="top" aria-labelledby="h1"><div class="hero-copy"><p class="eyebrow hi">' + esc(hero.eyebrow) + '</p><h1 id="h1" class="hi" style="--d:80ms">' + esc(hero.title) + '</h1><p class="lead hi" style="--d:160ms">' + esc(hero.lead) + "</p>" + root +
      '<div class="cta hi" style="--d:240ms"><a class="pill solid" href="#contact">' + esc(hero.primary) + '</a><a class="pill ghost" href="#journey">' + esc(hero.secondary) + " " + ARROW + "</a></div></div>" +
      '<aside class="questions hi" style="--d:200ms" aria-labelledby="qt"><h2 id="qt" class="qt">' + esc(hero.panelTitle) + "</h2><ol>" + qs + "</ol><p class=\"qnote\">" + esc(hero.panelNote) + "</p>" +
      '<ul class="tests" aria-label="Four tests">' + tests + '</ul><p class="tagline">' + esc(hero.tagline) + "</p></aside></section>";

    /* 2 journey */
    var steps = services.map(function (s, i) {
      var last = i === services.length - 1;
      var tag = s.free ? '<span class="tag free">' + esc(j.free) + "</span>" : "";
      var begin = i === 0 && j.startLabel ? '<span class="tag soft">' + esc(j.startLabel) + "</span>" : "";
      var feeds = s.feeds ? '<p class="feeds"><span class="fl">' + esc(ui.feeds) + "</span> " + esc(s.feeds) + "</p>" : "";
      return '<li class="step' + (last ? " last" : "") + ' rv" id="svc-' + esc(s.slug) + '" style="--d:60ms"><span class="node" aria-hidden="true">' + (i + 1) + '</span><div class="step-body"><div class="step-main"><h3>' + esc(s.name) + "</h3><p>" + esc(s.line) + '</p></div><div class="step-side">' + tag + begin +
        '<a class="more" href="' + esc(app + "/services/" + s.slug) + '">' + esc(ui.details) + " " + ARROW + "</a></div>" + feeds + "</div></li>";
    }).join("");
    var s2 = '<section class="block" id="journey" aria-labelledby="h-j"><div class="wrap journey-grid"><div class="journey-intro">' + head(j.eyebrow, j.title, j.lead, "h-j") +
      '<p class="price-note rv">' + esc(j.pricing) + '</p><a class="pill ghost rv" href="#contact">' + esc(j.ask) + "</a></div><ol class=\"steps\">" + steps + "</ol></div></section>";

    /* 3 who */
    var people = (who.people || []).map(function (p, i) {
      return '<article' + rv(i) + '><h3>' + esc(p.role) + '</h3><blockquote><p>' + esc(p.says) + "</p></blockquote><p class=\"gives\">" + esc(p.gives) + '</p><a class="more" href="#svc-' + esc(p.start) + '">' + esc(ui.startWith) + ": " + esc(names[p.start] || p.start) + " " + ARROW + "</a></article>";
    }).join("");
    var ents = (who.entities || []).map(function (e) { return "<li>" + esc(e) + "</li>"; }).join("");
    var s3 = '<section class="block" id="who" aria-labelledby="h-w"><div class="wrap">' + head(who.eyebrow, who.title, who.lead, "h-w") + '<div class="people">' + people + '</div><div class="entities rv"><h3>' + esc(who.entitiesTitle) + '</h3><ul class="chips">' + ents + "</ul><p>" + esc(who.entitiesNote) + "</p></div></div></section>";

    /* 4 outputs */
    var outs = ((sm.items) || []).map(function (it, i) {
      return "<article" + rv(i) + "><h3>" + esc(it[0]) + "</h3><p>" + esc(it[1]) + "</p></article>";
    }).join("");
    var s4 = '<section class="block" id="outputs" aria-labelledby="h-s"><div class="wrap">' + head(sm.eyebrow, sm.title, sm.lead, "h-s") + '<div class="outputs">' + outs + "</div></div></section>";

    /* 5 tool and learning */
    var flow = (tool.steps || []).map(function (s, i) { return "<li><span>" + (i + 1) + "</span>" + esc(s) + "</li>"; }).join("");
    var feats = (tool.features || []).map(function (f, i) { return "<li" + rv(i).replace(' class="rv"', ' class="rv"') + "><h3>" + esc(f[0]) + "</h3><p>" + esc(f[1]) + "</p></li>"; }).join("");
    var lv = (tool.levels || []).map(function (l, i) { return '<li class="rv" style="--d:' + (i * 80) + 'ms;--i:' + i + '"><span class="lvn" aria-hidden="true">' + (i + 1) + "</span><div><h3>" + esc(l[0]) + "</h3><p>" + esc(l[1]) + "</p></div></li>"; }).join("");
    var s5 = '<section class="block" id="tool" aria-labelledby="h-t"><div class="wrap">' + head(tool.eyebrow, tool.title, tool.lead, "h-t") + '<div class="tool-grid"><div class="tool-main"><ol class="flow rv" aria-label="' + esc(tool.stepsNote) + '">' + flow + '</ol><p class="flownote rv">' + esc(tool.stepsNote) + '</p><ul class="feats">' + feats + '</ul><p class="signin-line rv"><span>' + esc(tool.signinLead) + '</span> <a class="pill ghost" href="' + esc(signin) + '">' + esc(tool.signin) + " " + ARROW + '</a></p></div>' +
      '<div class="learn rv"><h3 class="learn-t">' + esc(tool.learnTitle) + '</h3><p class="learn-l">' + esc(tool.learnLead) + '</p><ol class="ladder">' + lv + '</ol><p class="flownote">' + esc(tool.levelsNote) + "</p></div></div></div></section>";

    /* 6 trust */
    var tr = (trust.items || []).map(function (p, i) { return "<li" + rv(i) + "><h3>" + esc(p[0]) + "</h3><p>" + esc(p[1]) + "</p></li>"; }).join("");
    var pe = trust.person || {};
    var s6 = '<section class="block" id="trust" aria-labelledby="h-tr"><div class="wrap">' + head(trust.eyebrow, trust.title, trust.lead, "h-tr") + '<div class="trust-grid"><ul class="trust-items">' + tr + '</ul><aside class="person rv"><p class="kick">' + esc(pe.kicker) + '</p><div class="pn"><div><b>' + esc(pe.name) + "</b><span>" + esc(pe.title) + "</span></div></div><p class=\"bg\">" + esc(pe.background) + "</p></aside></div></div></section>";

    /* 7 insights */
    var series = (ins.series || []).map(function (s, i) { return '<li' + rv(i) + '><a href="' + esc(s[2]) + '" target="_blank" rel="noopener"><span><b>' + esc(s[0]) + "</b><small>" + esc(s[1]) + "</small></span>" + ARROW + EXT + "</a></li>"; }).join("");
    var posts = (ins.posts || []).map(function (p, i) { return '<li' + rv(i) + '><a href="' + esc(p[3]) + '" target="_blank" rel="noopener"><span class="kick">' + esc(p[0]) + "</span><b>" + esc(p[1]) + "</b><small>" + esc(p[2]) + '</small><span class="more">' + esc(ui.readMore) + " " + ARROW + "</span>" + EXT + "</a></li>"; }).join("");
    var s7 = '<section class="block" id="insights" aria-labelledby="h-i"><div class="wrap">' + head(ins.eyebrow, ins.title, ins.lead, "h-i") + '<ul class="posts">' + posts + '</ul><ul class="series">' + series + '</ul><p class="all rv"><a class="pill ghost" href="' + esc(c.substack) + '" target="_blank" rel="noopener">' + esc(ins.all) + " " + ARROW + EXT + "</a> <span>" + esc(ins.allNote) + "</span></p></div></section>";

    /* 8 contact */
    var s8 = '<section class="contact" id="contact" aria-labelledby="h-c"><div class="wrap"><div class="contact-in rv"><p class="eyebrow">' + esc(ct.eyebrow) + '</p><h2 id="h-c">' + esc(ct.title) + "</h2><p class=\"sub\">" + esc(ct.lead) + '</p><p class="sign">' + esc(ct.sign) + '</p><div class="cta"><a class="pill solid light" href="' + esc(mail(c)) + '">' + esc(ct.button) + '</a><a class="mail" href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a></div><p class="price-note">' + esc(ct.pricing) + "</p></div></div></section>";

    var legal = ((c.legal && c.legal.links) || []).map(function (l) { return '<a href="' + esc(app + l[1]) + '">' + esc(l[0]) + " <small>(" + esc(ui.draft) + ")</small></a>"; }).join("");
    var place = c.footerPlace ? "<p class=\"place\">" + esc(c.footerPlace) + "</p>" : "";
    var foot = '<footer class="foot-site"><div class="wrap">' + place + '<div class="legal-links">' + legal + '</div><p>' + esc((c.legal && c.legal.note) || "") + "</p><p>" + esc(c.footer) + '</p><p class="copy">© 2026 ' + esc(c.brand) + "</p></div></footer>";

    return top + '<main id="main">' + s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8 + "</main>" + foot;
  }

  function bindMenu() {
    if (typeof document === "undefined") return;
    var btn = document.querySelector(".menu-toggle"), menu = document.getElementById("site-menu");
    if (!btn || !menu || btn.getAttribute("data-bound") === "1") return;
    btn.setAttribute("data-bound", "1");
    function setOpen(open) {
      menu.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? btn.getAttribute("data-close") : btn.getAttribute("data-open");
    }
    btn.addEventListener("click", function () { setOpen(!menu.classList.contains("open")); });
    menu.addEventListener("click", function (e) { if (e.target && e.target.tagName === "A") setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("open")) { setOpen(false); btn.focus(); } });
    var mq = window.matchMedia("(min-width: 921px)");
    (mq.addEventListener ? mq.addEventListener.bind(mq, "change") : mq.addListener.bind(mq))(function () { setOpen(false); });
  }

  var io;
  function bindReveal() {
    if (typeof document === "undefined") return;
    var els = document.querySelectorAll(".rv:not(.in)");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    if (io) io.disconnect();
    io = new IntersectionObserver(function (list) {
      list.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (e) { io.observe(e); });
  }

  function mount(c) {
    applyMeta(c);
    var el = document.getElementById("app");
    if (el) el.innerHTML = render(c);
    bindMenu();
    bindReveal();
  }
  root.RW = { render: render, mount: mount };
  if (typeof document !== "undefined") {
    bindMenu();
    bindReveal();
    var baked = document.getElementById("rw-baked");
    fetch("content.json", { cache: "no-store" }).then(function (r) { return r.json(); }).then(function (c) {
      try { if (baked && JSON.stringify(JSON.parse(baked.textContent)) === JSON.stringify(c)) return; } catch (e) {}
      mount(c);
    }).catch(function () {});
  }
})(typeof window !== "undefined" ? window : globalThis);
