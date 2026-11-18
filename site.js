/* Rewards World website. All words come from content.json; this file only lays them out. */
(function (root) {
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]; }); };
  function mail(c, subject, body) { return "mailto:" + c.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body || c.contact.body); }
  function render(c) {
    var j = c.journey, app = c.app;
    var svc = j.services.map(function (s, i) {
      return '<li class="svc"><div class="svc-top"><span class="num">' + (i + 1) + '</span><span class="tag ' + (s.free ? "free" : "") + '">' + esc(s.free ? j.free : j.price) + '</span></div>' +
        '<h3>' + esc(s.name) + '</h3><p>' + esc(s.what) + '</p>' +
        '<div class="svc-links"><a href="' + esc(app + "/services/" + s.slug) + '">' + esc(j.more) + '</a>' +
        (s.free ? '<a class="strong" href="' + esc(app + "/signup") + '">' + esc(c.hero.primary) + '</a>' : '<a class="strong" href="' + esc(mail(c, j.price + ": " + s.name)) + '">' + esc(j.ask) + '</a>') + '</div></li>';
    }).join("");
    var probs = c.problems.items.map(function (p) { return '<li><h3>' + esc(p[0]) + '</h3><p>' + esc(p[1]) + '</p></li>'; }).join("");
    var how = c.how.steps.map(function (s, i) { return '<li><span class="num">' + (i + 1) + '</span><div><h3>' + esc(s[0]) + '</h3><p>' + esc(s[1]) + '</p></div></li>'; }).join("");
    var legal = c.legal.links.map(function (l) { return '<a href="' + esc(app + l[1]) + '">' + esc(l[0]) + ' <small>(draft)</small></a>'; }).join("");
    return '' +
      '<header class="top"><a class="logo" href="#top" aria-label="' + esc(c.brand) + ' home"><img src="logo.png" alt="" width="36" height="36"><span>' + esc(c.brand.toUpperCase()) + '</span></a>' +
      '<nav><a href="#services">Services</a><a href="#contact">Contact</a><a class="pill ghost" href="' + esc(app + "/login") + '">' + esc(c.hero.secondary) + '</a></nav></header>' +
      '<main id="top">' +
      '<section class="hero"><p class="eyebrow">' + esc(c.hero.eyebrow) + '</p><h1>' + esc(c.hero.title) + '</h1><p class="lead">' + esc(c.hero.lead) + '</p>' +
      '<div class="cta"><a class="pill gold" data-cta="signup" href="' + esc(app + "/signup") + '">' + esc(c.hero.primary) + '</a><a class="pill light" data-cta="login" href="' + esc(app + "/login") + '">' + esc(c.hero.secondary) + '</a></div></section>' +
      '<section class="wrap"><h2>' + esc(c.problems.title) + '</h2><ul class="grid3 probs">' + probs + '</ul></section>' +
      '<section class="wrap" id="services"><h2>' + esc(j.title) + '</h2><p class="sub">' + esc(j.lead) + '</p><ol class="journey">' + svc + '</ol></section>' +
      '<section class="wrap"><h2>' + esc(c.how.title) + '</h2><ol class="how">' + how + '</ol></section>' +
      '<section class="wrap contact" id="contact"><h2>' + esc(c.contact.title) + '</h2><p class="sub">' + esc(c.contact.lead) + '</p>' +
      '<a class="pill gold" data-cta="email" href="' + esc(mail(c, c.contact.subject)) + '">' + esc(c.contact.button) + '</a><p class="mail">' + esc(c.email) + '</p></section>' +
      '</main><footer><div class="wrap"><nav class="legal">' + legal + '</nav><p>' + esc(c.legal.note) + '</p><p>' + esc(c.footer) + '</p><p>© ' + new Date().getFullYear() + ' ' + esc(c.brand) + '. All rights reserved.</p></div></footer>';
  }
  root.RW = { render: render };
  if (typeof document !== "undefined") {
    var el = document.getElementById("app");
    fetch("content.json", { cache: "no-store" }).then(function (r) { return r.json(); }).then(function (c) { el.innerHTML = render(c); }).catch(function () { /* keep the last safe version already on the page */ });
  }
})(typeof window !== "undefined" ? window : globalThis);
