/* Rewards World website. All words come from content.json; this file only lays them out. */
(function (root) {
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  };
  function mail(c, subject, body) {
    return "mailto:" + c.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body || (c.contact && c.contact.body) || "");
  }
  function applyMeta(c) {
    if (typeof document === "undefined") return;
    if (c.meta && c.meta.title) document.title = c.meta.title;
    if (c.meta && c.meta.description) {
      var m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute("content", c.meta.description);
    }
  }
  function render(c) {
    var j = c.journey || {};
    var app = c.app || "";
    var hero = c.hero || {};
    var nav = c.nav || {};
    var ui = c.ui || {};
    var services = j.services || [];
    var glance = services.map(function (s, i) {
      return '<li><span class="n">' + (i + 1) + '</span><a href="#svc-' + esc(s.slug) + '">' + esc(s.name) + '</a><span class="tag' + (s.free ? " free" : "") + '">' + esc(s.free ? j.free : j.price) + '</span></li>';
    }).join("");
    var svc = services.map(function (s, i) {
      var then = s.then
        ? '<p class="connect">' + esc(j.then || "Then") + " " + esc(s.then) + "</p>"
        : '<p class="connect empty" aria-hidden="true">&nbsp;</p>';
      var start = (s.free || i === 0) && j.startLabel ? '<p class="start">' + esc(j.startLabel) + "</p>" : '<p class="start empty" aria-hidden="true">&nbsp;</p>';
      var ask = s.free
        ? '<a class="strong" href="' + esc(app + "/signup") + '">' + esc(hero.primary) + "</a>"
        : '<a class="strong" href="' + esc(mail(c, (j.price || "") + ": " + s.name)) + '">' + esc(j.ask) + "</a>";
      return '<li class="svc" id="svc-' + esc(s.slug) + '">' +
        '<div class="svc-top"><span class="num">' + (i + 1) + "</span><span class=\"tag" + (s.free ? " free" : "") + '">' + esc(s.free ? j.free : j.price) + "</span></div>" +
        start +
        "<h3>" + esc(s.name) + "</h3><p>" + esc(s.what) + "</p>" +
        '<div class="svc-links"><a href="' + esc(app + "/services/" + s.slug) + '">' + esc(j.more) + "</a>" + ask + "</div>" +
        then + "</li>";
    }).join("");
    var trustItems = ((c.trust && c.trust.items) || []).map(function (p) {
      return "<li><h3>" + esc(p[0]) + "</h3><p>" + esc(p[1]) + "</p></li>";
    }).join("");
    var probs = ((c.problems && c.problems.items) || []).map(function (p) {
      return "<li><h3>" + esc(p[0]) + "</h3><p>" + esc(p[1]) + "</p></li>";
    }).join("");
    var how = ((c.how && c.how.steps) || []).map(function (s, i) {
      var n = String(i + 1).padStart(2, "0");
      return '<li><span class="num" aria-hidden="true">' + n + "</span><div><h3>" + esc(s[0]) + "</h3><p>" + esc(s[1]) + "</p></div></li>";
    }).join("");
    var levels = ((c.learning && c.learning.levels) || []).map(function (s) {
      return "<li><h3>" + esc(s[0]) + "</h3><p>" + esc(s[1]) + "</p></li>";
    }).join("");
    var legal = ((c.legal && c.legal.links) || []).map(function (l) {
      return '<a href="' + esc(app + l[1]) + '">' + esc(l[0]) + " <small>(draft)</small></a>";
    }).join("");
    var trust = c.trust ? '<section class="trust-band" id="trust"><div class="wrap"><div class="intro"><h2>' + esc(c.trust.title) + "</h2><p class=\"sub\">" + esc(c.trust.lead) + "</p></div><ul class=\"trust-grid\">" + trustItems + "</ul></div></section>" : "";
    var learning = c.learning ? '<section class="block" id="learning"><div class="wrap"><div class="learn-grid"><div><h2>' + esc(c.learning.title) + "</h2><p class=\"sub\">" + esc(c.learning.lead) + "</p></div><ol class=\"levels\">" + levels + "</ol></div></div></section>" : "";
    return "" +
      '<a class="skip" href="#main">' + esc(ui.skip || "Skip to main content") + "</a>" +
      '<div class="bar" aria-hidden="true"></div>' +
      '<header class="top"><a class="logo" href="#top" aria-label="' + esc((ui.home ? c.brand + ", " + ui.home : c.brand) || "Home") + '"><img src="logo.png" alt="" width="36" height="36"><span>' + esc((c.brand || "").toUpperCase()) + "</span></a>" +
      '<div class="top-right">' +
      '<nav id="site-menu">' +
        (nav.services ? '<a href="#services">' + esc(nav.services) + "</a>" : "") +
        (nav.how ? '<a href="#how">' + esc(nav.how) + "</a>" : "") +
        (nav.learning ? '<a href="#learning">' + esc(nav.learning) + "</a>" : "") +
        (nav.trust ? '<a href="#trust">' + esc(nav.trust) + "</a>" : "") +
        (nav.contact ? '<a href="#contact">' + esc(nav.contact) + "</a>" : "") +
      "</nav>" +
      '<a class="pill ghost" href="' + esc(app + "/login") + '">' + esc(nav.signin || hero.secondary || "Sign in") + "</a>" +
      '<button type="button" class="menu-toggle" aria-expanded="false" aria-controls="site-menu" data-open="' + esc(ui.menu || "Open menu") + '" data-close="' + esc(ui.close || "Close menu") + '">' + esc(ui.menu || "Open menu") + "</button>" +
      "</div></header>" +
      '<main id="main">' +
      '<div id="top" class="wrap"><section class="hero">' +
        "<div><p class=\"eyebrow\">" + esc(hero.eyebrow) + "</p><h1>" + esc(hero.title) + "</h1><p class=\"lead\">" + esc(hero.lead) + "</p>" +
        '<div class="cta"><a class="pill gold" data-cta="signup" href="' + esc(app + "/signup") + '">' + esc(hero.primary) + '</a><a class="pill ghost" data-cta="login" href="' + esc(app + "/login") + '">' + esc(hero.secondary) + "</a></div></div>" +
        (hero.panelTitle ? '<aside class="glance"><h2>' + esc(hero.panelTitle) + "</h2><ol>" + glance + "</ol></aside>" : "") +
      "</section></div>" +
      trust +
      '<section class="block" id="problems"><div class="wrap"><h2>' + esc(c.problems.title) + '</h2><ul class="probs">' + probs + "</ul></div></section>" +
      '<section class="band" id="services"><div class="wrap"><h2>' + esc(j.title) + "</h2><p class=\"sub\">" + esc(j.lead) + "</p><ol class=\"journey\">" + svc + "</ol></div></section>" +
      '<section class="block" id="how"><div class="wrap"><h2>' + esc(c.how.title) + '</h2><ol class="how">' + how + "</ol></div></section>" +
      learning +
      '<div class="wrap"><section class="contact-panel" id="contact"><h2>' + esc(c.contact.title) + "</h2><p class=\"sub\">" + esc(c.contact.lead) + "</p>" +
        '<a class="pill gold" data-cta="email" href="' + esc(mail(c, c.contact.subject)) + '">' + esc(c.contact.button) + '</a><p class="mail">' + esc(c.email) + "</p></section></div>" +
      "</main><footer><div class=\"wrap foot\"><div><nav class=\"legal\" aria-label=\"Legal\">" + legal + "</nav><p>" + esc(c.legal && c.legal.note ? c.legal.note : "") + "</p></div><div><p class=\"fine\">" + esc(c.footer) + "</p><p class=\"copy\">© " + new Date().getFullYear() + " " + esc(c.brand) + ". All rights reserved.</p></div></div></footer>";
  }
  function bindMenu() {
    if (typeof document === "undefined") return;
    var btn = document.querySelector(".menu-toggle");
    var menu = document.getElementById("site-menu");
    if (!btn || !menu) return;
    var ui = {};
    try { /* labels already in the button text from last render */ } catch (e) {}
    function setOpen(open) {
      menu.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      var closeLabel = btn.getAttribute("data-close") || "Close menu";
      var openLabel = btn.getAttribute("data-open") || btn.textContent;
      if (!btn.getAttribute("data-open")) btn.setAttribute("data-open", (document.querySelector(".menu-toggle") && openLabel) || "Open menu");
      btn.textContent = open ? (btn.getAttribute("data-close") || "Close menu") : (btn.getAttribute("data-open") || "Open menu");
    }
    if (btn.getAttribute("data-bound") === "1") return;
    btn.setAttribute("data-bound", "1");
    btn.addEventListener("click", function () {
      setOpen(!menu.classList.contains("open"));
    });
    menu.addEventListener("click", function (e) {
      if (e.target && e.target.tagName === "A") setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }
  function mount(c) {
    applyMeta(c);
    var el = document.getElementById("app");
    if (el) el.innerHTML = render(c);
    bindMenu();
  }
  root.RW = { render: render, mount: mount };
  if (typeof document !== "undefined") {
    bindMenu();
    fetch("content.json", { cache: "no-store" }).then(function (r) { return r.json(); }).then(mount).catch(function () {});
  }
})(typeof window !== "undefined" ? window : globalThis);
