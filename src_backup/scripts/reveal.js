/**
 * OurOrigin — Scroll Reveal System
 * 
 * A lightweight, zero-dependency scroll reveal using IntersectionObserver.
 * Elements with [data-reveal] animate in when they enter the viewport.
 * 
 * Usage: Add data-reveal to any element. Optional modifiers:
 *   data-reveal="up"     — slides up (default)
 *   data-reveal="fade"   — fade only
 *   data-reveal="stagger" — staggers children
 *   data-delay="100"     — delay in ms
 */

const OBSERVED = new WeakSet();

function createObserver() {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || '0', 10);
          
          if (el.dataset.reveal === 'stagger') {
            // Stagger each direct child
            const children = el.children;
            Array.from(children).forEach((child, i) => {
              setTimeout(() => {
                child.classList.add('is-revealed');
              }, delay + i * 80);
            });
            el.classList.add('is-revealed');
          } else {
            setTimeout(() => {
              el.classList.add('is-revealed');
            }, delay);
          }
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    }
  );
}

export function initReveal() {
  const observer = createObserver();
  
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    if (OBSERVED.has(el)) return;
    OBSERVED.add(el);
    observer.observe(el);
  });
}

// Auto-init on DOM ready and on Astro page transitions
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initReveal);
  document.addEventListener('astro:page-load', initReveal);
}
