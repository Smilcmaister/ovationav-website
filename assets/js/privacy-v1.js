(() => {
  const ID = 'G-KGDBDWXLHE';
  const KEY = 'ovation-cookie-choice-v1';
  const TTL = 180 * 86400000;
  const en = document.documentElement.lang === 'en';
  let choice = null, loaded = false;
  window['ga-disable-' + ID] = true;
  function read() {
    try {
      const data = JSON.parse(localStorage.getItem(KEY));
      if (data && data.version === 1 && typeof data.analytics === 'boolean' && Number.isFinite(data.at) && data.at <= Date.now() && Date.now() - data.at < TTL) return data;
      localStorage.removeItem(KEY);
      return null;
    } catch { return null; }
  }
  function clearAnalyticsCookies() {
    const host = location.hostname;
    const domains = ['', host, '.' + host, 'ovationav.si', '.ovationav.si'];
    document.cookie.split(';').forEach(part => {
      const name = part.trim().split('=')[0];
      if (!/^_ga(?:_|$)|^_gid$|^_gat/.test(name)) return;
      domains.forEach(domain => {
        document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax' + (domain ? '; domain=' + domain : '');
      });
    });
  }
  function enableAnalytics() {
    // Local previews never transmit test visits to the production property.
    if (loaded || location.hostname !== 'ovationav.si') return;
    loaded = true;
    window['ga-disable-' + ID] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('js', new Date());
    window.gtag('config', ID, { allow_google_signals: false, allow_ad_personalization_signals: false, cookie_domain: 'none', cookie_expires: 15552000, cookie_update: false });
    const script = document.createElement('script');
    script.id = 'ovation-analytics'; script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(script);
  }
  const panel = document.createElement('section');
  panel.className = 'cookie-panel'; panel.setAttribute('aria-label', en ? 'Cookie preferences' : 'Nastavitve piškotkov');
  panel.innerHTML = en ? `<h2>Cookies and privacy</h2><p>Optional Google Analytics helps us understand visits. It loads only if you allow it. You can reject analytics and still use the website and enquiry form.</p><p><a href="/en/cookies/">Cookie details</a> · <a href="/en/privacy/">Privacy notice</a></p><div class="cookie-actions"><button type="button" data-cookie="reject">Reject analytics</button><button type="button" data-cookie="accept">Allow analytics</button><button type="button" data-cookie="close" hidden>Close</button></div>` : `<h2>Piškotki in zasebnost</h2><p>Neobvezna analitika Google Analytics nam pomaga razumeti obisk. Naloži se le, če jo dovolite. Tudi brez analitike lahko uporabljate spletno stran in obrazec.</p><p><a href="/piskotki/">Podrobnosti o piškotkih</a> · <a href="/zasebnost/">Obvestilo o zasebnosti</a></p><div class="cookie-actions"><button type="button" data-cookie="reject">Zavrni analitiko</button><button type="button" data-cookie="accept">Dovoli analitiko</button><button type="button" data-cookie="close" hidden>Zapri</button></div>`;
  document.body.appendChild(panel);
  let opener = null;
  function close() { panel.hidden = true; opener?.focus(); }
  function apply(analytics) {
    const previous = loaded;
    choice = { version: 1, analytics, at: Date.now() };
    try { localStorage.setItem(KEY, JSON.stringify(choice)); } catch { /* Choice still applies to this page. */ }
    if (analytics) enableAnalytics();
    else { window['ga-disable-' + ID] = true; clearAnalyticsCookies(); }
    close();
    // Remove an already loaded third-party runtime after withdrawal.
    if (!analytics && previous) location.reload();
  }
  panel.querySelector('[data-cookie="reject"]').addEventListener('click', () => apply(false));
  panel.querySelector('[data-cookie="accept"]').addEventListener('click', () => apply(true));
  panel.querySelector('[data-cookie="close"]').addEventListener('click', close);
  document.querySelectorAll('[data-cookie-settings]').forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      opener = button; panel.hidden = false;
      panel.querySelector('[data-cookie="close"]').hidden = !choice;
      panel.querySelector('[data-cookie="reject"]').focus();
    });
  });
  choice = read();
  panel.hidden = Boolean(choice);
  if (choice?.analytics) enableAnalytics(); else clearAnalyticsCookies();
  addEventListener('storage', event => {
    if (event.key === KEY) location.reload();
  });
})();
