import { initFluxField, initFluxTrace } from './flux-field';

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

/* ------------------------------------------------------------------ *
 * Header: background on scroll + scroll progress bar
 * ------------------------------------------------------------------ */
function initHeader() {
  const headerBg = $('[data-header-bg]');
  const progress = $('#scroll-progress');
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    if (headerBg) {
      headerBg.style.opacity = y > 24 ? '1' : '0';
      headerBg.style.borderBottomColor = y > 24 ? 'var(--color-line)' : 'transparent';
    }
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    }
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();
}

/* ------------------------------------------------------------------ *
 * Mobile menu
 * ------------------------------------------------------------------ */
function initMenu() {
  const toggle = $<HTMLButtonElement>('[data-menu-toggle]');
  const menu = $('[data-mobile-menu]');
  if (!toggle || !menu) return;

  const close = () => {
    menu.removeAttribute('data-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const open = () => {
    menu.setAttribute('data-open', '');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  toggle.addEventListener('click', () =>
    toggle.getAttribute('aria-expanded') === 'true' ? close() : open()
  );

  $$('a', menu).forEach((a) => a.addEventListener('click', close));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.hasAttribute('data-open')) close();
  });

  const mq = window.matchMedia('(min-width: 1024px)');
  mq.addEventListener('change', (e) => e.matches && close());
}

/* ------------------------------------------------------------------ *
 * Scroll reveal
 * ------------------------------------------------------------------ */
function initReveal() {
  const items = $$('[data-reveal]');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
  );

  items.forEach((el) => io.observe(el));
}

/* ------------------------------------------------------------------ *
 * Cursor spotlight on cards
 * ------------------------------------------------------------------ */
function initSpotlight() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  $$('.spotlight').forEach((card) => {
    card.addEventListener(
      'pointermove',
      (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${((e as PointerEvent).clientX - rect.left)}px`);
        card.style.setProperty('--my', `${((e as PointerEvent).clientY - rect.top)}px`);
      },
      { passive: true }
    );
  });
}

/* ------------------------------------------------------------------ *
 * Section-aware nav highlighting
 * ------------------------------------------------------------------ */
function initSectionNav() {
  const links = $$<HTMLAnchorElement>('[data-nav-link]');
  if (!links.length) return;

  const map = new Map<string, HTMLAnchorElement>();
  const sections: HTMLElement[] = [];

  links.forEach((link) => {
    const id = link.getAttribute('href')?.replace('#', '');
    if (!id) return;
    const section = document.getElementById(id);
    if (!section) return;
    map.set(id, link);
    sections.push(section);
  });

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const link = map.get(entry.target.id);
        if (!link) continue;
        link.classList.toggle('text-fog', entry.isIntersecting);
        link.classList.toggle('bg-white/5', entry.isIntersecting);
      }
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((s) => io.observe(s));
}

/* ------------------------------------------------------------------ *
 * Language preference.
 *
 * The locale itself is decided at the edge from the viewer's country
 * (see the CloudFront function in template.yaml). This only records an
 * explicit choice, as a cookie, so the edge can stop overriding it.
 * ------------------------------------------------------------------ */
function initLangMemory() {
  $$<HTMLAnchorElement>('[data-lang-link]').forEach((link) => {
    link.addEventListener('click', () => {
      const lang = link.dataset.langLink === 'pt' ? 'pt' : 'en';
      document.cookie = `fluxghg-lang=${lang}; path=/; max-age=31536000; samesite=lax`;
    });
  });
}

/* ------------------------------------------------------------------ *
 * Contact form → the existing /contact Lambda
 * ------------------------------------------------------------------ */
function initContactForm() {
  const form = $<HTMLFormElement>('#contact-form');
  if (!form) return;

  const status = $('#form-status');
  const button = $<HTMLButtonElement>('#form-submit');
  const buttonLabel = $('#form-submit-label');
  const strings = JSON.parse(form.dataset.strings ?? '{}') as Record<string, string>;
  const originalLabel = buttonLabel?.textContent ?? '';

  const setStatus = (message: string, kind: 'error' | 'success' | 'idle') => {
    if (!status) return;
    status.textContent = message;
    status.dataset.kind = kind;
    status.classList.toggle('hidden', kind === 'idle');
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    // Honeypot: bots fill everything, humans never see this field.
    if ((data.get('website') as string)?.trim()) return;

    const name = (data.get('name') as string)?.trim() ?? '';
    const email = (data.get('email') as string)?.trim() ?? '';
    const org = (data.get('org') as string)?.trim() ?? '';
    const body = (data.get('message') as string)?.trim() ?? '';

    if (!name || !email || !body) {
      setStatus(strings.errorFields ?? 'Please fill in all required fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus(strings.errorEmail ?? 'Please enter a valid email address.', 'error');
      return;
    }

    if (button && buttonLabel) {
      button.disabled = true;
      button.dataset.loading = 'true';
      buttonLabel.textContent = strings.sending ?? 'Sending…';
    }
    setStatus('', 'idle');

    // The Lambda contract is {name, email, message} — fold the optional
    // organisation and page language into the message body.
    const message = [
      body,
      '',
      '---',
      org ? `Empresa/Instituição: ${org}` : null,
      `Página: ${window.location.href}`,
    ]
      .filter((line) => line !== null)
      .join('\n');

    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      form.reset();
      setStatus(strings.success ?? 'Message sent.', 'success');
    } catch (error) {
      console.error('contact form:', error);
      setStatus(strings.errorSend ?? 'Something went wrong. Please try again.', 'error');
    } finally {
      if (button && buttonLabel) {
        button.disabled = false;
        delete button.dataset.loading;
        buttonLabel.textContent = strings.send ?? originalLabel;
      }
    }
  });

  // Float labels without :placeholder-shown edge cases on textareas.
  $$<HTMLInputElement | HTMLTextAreaElement>('input, textarea', form).forEach((field) => {
    const sync = () => field.toggleAttribute('data-filled', field.value.trim() !== '');
    field.addEventListener('input', sync);
    field.addEventListener('blur', sync);
    sync();
  });
}

/* ------------------------------------------------------------------ *
 * Diagrams play when they scroll into view, not on page load — otherwise
 * the entrance animation is over before anyone has reached the section.
 * ------------------------------------------------------------------ */
function initDiagrams() {
  const diagrams = $$('[data-model-diagram], [data-eddy-diagram]');
  if (!diagrams.length) return;

  if (!('IntersectionObserver' in window)) {
    diagrams.forEach((el) => el.classList.add('is-live'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-live');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.2 }
  );

  diagrams.forEach((el) => io.observe(el));
}

/* ------------------------------------------------------------------ *
 * Hero canvases
 * ------------------------------------------------------------------ */
function initCanvases() {
  const field = $<HTMLCanvasElement>('[data-flux-field]');
  if (field) initFluxField(field);

  const trace = $<HTMLCanvasElement>('[data-flux-trace]');
  if (trace) initFluxTrace(trace);
}

/* ------------------------------------------------------------------ */
const boot = () => {
  initHeader();
  initMenu();
  initReveal();
  initSpotlight();
  initSectionNav();
  initLangMemory();
  initContactForm();
  initDiagrams();
  initCanvases();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
