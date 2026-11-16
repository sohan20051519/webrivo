import { gsap, ScrollTrigger, SplitText, Observer } from './gsap';

const EASE = 'webrivo';
const FINE_POINTER = '(hover: hover) and (pointer: fine)';

/**
 * Every animation on the site lives here: one GSAP context, one cleanup.
 * Plugins in use: ScrollTrigger, SplitText, CustomEase, Observer,
 * ScrollToPlugin, DrawSVGPlugin, ScrambleTextPlugin.
 */
export default function initMotion() {
  const cleanups = [];
  let disposed = false;
  const reduce =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ctx = gsap.context(() => {
    /* ---------------------------------------------------------- progress */
    const progressBar = document.querySelector('.progress__bar');
    if (progressBar) {
      gsap.set(progressBar, { width: '0%' });
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          progressBar.style.width = `${(self.progress * 100).toFixed(2)}%`;
        },
      });
    }

    if (reduce) {
      gsap.set(
        '.reveal, .hero h1 .line > span, .hero .lead, .hero .btn, .poster, .poster__word',
        { clearProps: 'all' }
      );
      return;
    }

    /* ------------------------------------------------------- hero intro
       Five pieces, one timeline: the two headline lines, the lead, the
       button and the panel. Nothing else is on screen to animate. */
    if (document.querySelector('.hero')) {
      /* set the start state explicitly, then animate to a known end state:
         `from()` would capture whatever inline transform is present if the
         effect ever re-runs (StrictMode), leaving the panel parked mid-tween */
      gsap.set('.hero h1 .line > span', { yPercent: 118 });
      gsap.set('.hero .lead', { y: 14, opacity: 0 });
      gsap.set('.hero .btn', { y: 14, opacity: 0 });
      gsap.set('.poster', { y: 40, opacity: 0, scale: 0.97 });
      gsap.set('.poster__word', { yPercent: 118 });

      const tl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.1 });

      tl.to('.hero h1 .line > span', { yPercent: 0, duration: 1.2, stagger: 0.09 }, 0)
        .to('.hero .lead', { y: 0, opacity: 1, duration: 0.9 }, 0.3)
        .to('.hero .btn', { y: 0, opacity: 1, duration: 0.85 }, 0.42)
        .to('.poster', { y: 0, opacity: 1, scale: 1, duration: 1.4 }, 0.12)
        .to('.poster__word', { yPercent: 0, duration: 1.15 }, 0.55);
    }

    /* --------------------------------------------------- scroll reveals */
    gsap.utils.toArray('.reveal').forEach((el) => {
      const delay = Math.min(0.4, (parseFloat(el.dataset.delay) || 0) * 0.09);
      const to = { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.95, ease: EASE, delay, clearProps: 'transform' };
      const from = { opacity: 0, x: 0, y: 0, scale: 1 };

      if (el.classList.contains('reveal--left')) from.x = -38;
      else if (el.classList.contains('reveal--right')) from.x = 38;
      else if (el.classList.contains('reveal--scale')) {
        from.scale = 0.94;
        from.y = 22;
      } else from.y = 32;

      gsap.fromTo(el, from, {
        ...to,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });

    /* -------------------------------------------- split line headings */
    const splitTargets = gsap.utils.toArray('.section-head h2, .contact__big, .footer__word');

    const splitHeadings = () => {
      if (disposed) return;

      splitTargets.forEach((el) => {
        const split = new SplitText(el, { type: 'lines', mask: 'lines' });

        gsap.fromTo(
          split.lines,
          { yPercent: 112, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.05,
            ease: EASE,
            stagger: 0.075,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
      });

      ScrollTrigger.refresh();
    };

    /* line breaks are only correct once the webfont is in */
    if (document.fonts && document.fonts.status !== 'loaded') {
      document.fonts.ready.then(splitHeadings).catch(() => {});
    } else {
      splitHeadings();
    }

    /* --------------------------------------------------------- parallax */
    const poster = document.querySelector('.poster');
    if (poster) {
      gsap.to(poster, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
    }

    const footerWord = document.querySelector('.footer__word');
    if (footerWord) {
      gsap.fromTo(
        footerWord,
        { yPercent: 12 },
        {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true },
        }
      );
    }

    /* ------------------------------------------------ marquee + velocity */
    const track = document.querySelector('.marquee__track');
    if (track) {
      const loop = gsap.to(track, { xPercent: -50, duration: 32, ease: 'none', repeat: -1 });
      const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.45, ease: 'power2.out' });

      ScrollTrigger.create({
        onUpdate: (self) => {
          skewTo(gsap.utils.clamp(-7, 7, self.getVelocity() / 320));
        },
      });

      const zone = track.closest('.marquee');
      if (zone) {
        const slow = () => gsap.to(loop, { timeScale: 0.2, duration: 0.35, overwrite: true });
        const fast = () => gsap.to(loop, { timeScale: 1, duration: 0.6, overwrite: true });
        zone.addEventListener('pointerenter', slow);
        zone.addEventListener('pointerleave', fast);
        cleanups.push(() => {
          zone.removeEventListener('pointerenter', slow);
          zone.removeEventListener('pointerleave', fast);
        });
      }
    }

    /* ------------------------------------- drawSVG process progress line */
    gsap.utils.toArray('.process__step').forEach((step) => {
      const fill = step.querySelector('.progress-line__fill');
      if (!fill) return;

      gsap.fromTo(
        fill,
        { drawSVG: '0%' },
        {
          drawSVG: '100%',
          ease: 'none',
          scrollTrigger: { trigger: step, start: 'top 72%', end: 'bottom 44%', scrub: 0.5 },
        }
      );
    });

    /* ------------------------------------------- nav hide on scroll down */
    const nav = document.querySelector('.nav');
    if (nav) {
      const navY = gsap.quickTo(nav, 'yPercent', { duration: 0.45, ease: 'power3.out' });
      const observer = Observer.create({
        target: window,
        type: 'wheel,touch,scroll',
        tolerance: 6,
        onChangeY: (self) => {
          /* never hide the bar while the mobile sheet is open */
          if (document.body.style.overflow === 'hidden') {
            navY(0);
            return;
          }
          if (self.deltaY > 0 && window.scrollY > 420) navY(-110);
          else navY(0);
        },
      });
      cleanups.push(() => observer.kill());
    }

    /* ----------------------------------------------- magnetic buttons */
    if (window.matchMedia(FINE_POINTER).matches) {
      gsap.utils.toArray('.btn').forEach((btn) => {
        const xTo = gsap.quickTo(btn, 'x', { duration: 0.45, ease: 'power3' });
        const yTo = gsap.quickTo(btn, 'y', { duration: 0.45, ease: 'power3' });

        const move = (event) => {
          const rect = btn.getBoundingClientRect();
          xTo((event.clientX - (rect.left + rect.width / 2)) * 0.14);
          yTo((event.clientY - (rect.top + rect.height / 2)) * 0.22);
        };
        const reset = () => {
          xTo(0);
          yTo(0);
        };

        btn.addEventListener('pointermove', move);
        btn.addEventListener('pointerleave', reset);
        cleanups.push(() => {
          btn.removeEventListener('pointermove', move);
          btn.removeEventListener('pointerleave', reset);
        });
      });
    }

    /* ------------------------------------------------ smooth anchor jumps */
    const onClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = event.target.closest('a[href^="#"]');
      if (!link) return;

      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();

      const run = () => {
        const top =
          hash === '#top'
            ? 0
            : Math.max(0, target.getBoundingClientRect().top + window.scrollY - 80);

        gsap.to(window, {
          duration: 0.95,
          ease: EASE,
          overwrite: true,
          scrollTo: top,
        });
      };

      if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = '';
        window.setTimeout(run, 40);
      } else {
        run();
      }

      if (window.history.replaceState) window.history.replaceState(null, '', hash);
    };

    document.addEventListener('click', onClick);
    cleanups.push(() => document.removeEventListener('click', onClick));

  });

  const refresh = () => {
    if (!disposed) ScrollTrigger.refresh();
  };

  if (document.fonts) document.fonts.ready.then(refresh).catch(() => {});
  window.addEventListener('load', refresh);
  cleanups.push(() => window.removeEventListener('load', refresh));

  return () => {
    disposed = true;
    cleanups.forEach((fn) => fn());
    ctx.revert();
  };
}
