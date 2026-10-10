(() => {
  const lang = document.documentElement.lang === 'sl' ? 'sl' : 'en';
  const text = lang === 'sl' ? {
    pause: 'Ustavi animacije', play: 'Predvajaj animacije', sending: 'Pošiljanje …',
    success: 'Hvala — sporočilo je poslano. Kmalu se oglasimo.',
    error: 'Pošiljanje ni uspelo. Poskusite znova ali pišite na info@ovationav.si.'
  } : {
    pause: 'Pause motion', play: 'Play motion', sending: 'Sending …',
    success: "Thank you — your message has been submitted. We'll be in touch soon.",
    error: 'Something went wrong. Please try again or email info@ovationav.si.'
  };
  const nav = document.getElementById('nav');
  const updateNav = () => nav?.classList.toggle('scrolled', window.scrollY > 40);
  addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = preference.matches;
  const videos = [...document.querySelectorAll('.hero-video, .statement-video')];
  const buttons = [...document.querySelectorAll('[data-motion-toggle]')];
  const visible = new Set();
  function syncMotion() {
    document.documentElement.classList.toggle('motion-paused', paused);
    buttons.forEach(button => {
      button.textContent = paused ? text.play : text.pause;
      button.setAttribute('aria-pressed', String(paused));
      button.hidden = false;
    });
    videos.forEach(video => {
      if (paused || document.hidden || !visible.has(video)) {
        video.pause();
        return;
      }
      if (!video.dataset.loaded) {
        video.querySelectorAll('source[data-src]').forEach(source => {
          source.src = source.dataset.src;
        });
        video.dataset.loaded = 'true';
        video.load();
      }
      video.play().catch(() => {});
    });
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    paused = !paused;
    syncMotion();
  }));
  preference.addEventListener('change', event => { paused = event.matches; syncMotion(); });
  document.addEventListener('visibilitychange', syncMotion);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target));
      syncMotion();
    });
    videos.forEach(video => observer.observe(video));
  } else {
    videos.forEach(video => visible.add(video));
  }
  syncMotion();

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;
  // Leave native validation and the normal POST available without JavaScript.
  form.noValidate = true;
  let submitting = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitting || !form.reportValidity()) return;
    submitting = true;
    const button = form.querySelector('[type="submit"]');
    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    status.textContent = text.sending;
    status.className = 'form-status';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('https://formsubmit.co/ajax/info@ovationav.si', {
        method: 'POST', body: new FormData(form),
        headers: { Accept: 'application/json' }, signal: controller.signal
      });
      const result = await response.json();
      if (!response.ok || !(result.success === true || result.success === 'true')) {
        throw new Error('Submission not accepted');
      }
      form.reset();
      status.textContent = text.success;
      status.className = 'form-status is-success';
      // Analytics activation awaits a real delivery and consent-configuration check.
    } catch {
      status.textContent = text.error;
      status.className = 'form-status is-error';
    } finally {
      clearTimeout(timeout);
      submitting = false;
      button.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
})();
