// MISHME JEWELLERY & GIFTS — JAVASCRIPT CONTROLLER
document.addEventListener('DOMContentLoaded', () => {
  // 1. MANDATORY GLIDE ANIMATION INTERSECTION OBSERVER
  const glideElements = document.querySelectorAll('.glide-in');
  if ('IntersectionObserver' in window) {
    const glideObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    glideElements.forEach((el, index) => {
      if (!el.style.transitionDelay) {
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
      }
      glideObserver.observe(el);
    });
  } else {
    glideElements.forEach(el => el.classList.add('in-view'));
  }

  // 2. DYNAMIC TYPEWRITER HEADLINE
  const typewriterEl = document.querySelector('.dynamic-typewriter');
  if (typewriterEl) {
    const phrases = [
      "18K Gold Plated Anti-Tarnish & Waterproof Jewellery in Hazra, Kolkata.",
      "Korean Minimalist Layered Chains, Huggies & Waterproof Stacking Rings.",
      "Curated Luxury Gift Hampers for Bridesmaids, Birthdays & Milestones.",
      "Sweat-Proof, Perfume-Proof & Hypoallergenic Stainless Steel Craft."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 55;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 30;
      } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 65;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
      }

      setTimeout(type, typeSpeed);
    }
    setTimeout(type, 800);
  }

  // 3. ANIMATED TELEMETRY NUMBER COUNTERS
  const counters = document.querySelectorAll('.stat-counter');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target') || '0');
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const isFloat = target % 1 !== 0;
          let current = 0;
          const duration = 1800;
          const steps = 40;
          const increment = target / steps;
          const stepTime = duration / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
          }, stepTime);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(c => counterObserver.observe(c));
  }

  // 4. VIDEO PAUSE / PLAY TOGGLE BUTTON
  const videoBtn = document.querySelector('.video-control-btn');
  const videoEl = document.querySelector('.hero-video-bg');
  if (videoBtn && videoEl) {
    videoBtn.addEventListener('click', () => {
      if (videoEl.paused) {
        videoEl.play();
        videoBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
        videoBtn.setAttribute('aria-label', 'Pause Hero Video');
      } else {
        videoEl.pause();
        videoBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
        videoBtn.setAttribute('aria-label', 'Play Hero Video');
      }
    });
  }

  // 5. MOBILE HAMBURGER DRAWER TOGGLE
  const hamburger = document.querySelector('.hamburger-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.innerHTML = isOpen
        ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>`
        : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12h18M3 6h18M3 18h18"/></svg>`;
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12h18M3 6h18M3 18h18"/></svg>`;
      });
    });
  }

  // 6. GALLERY CATEGORY FILTER RAIL
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter') || 'all';

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category') || '';
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // 7. INTERACTIVE STYLE FINDER & GIFT BOX BUILDER WIDGET
  const occasionSelect = document.getElementById('calcOccasion');
  const aestheticSelect = document.getElementById('calcAesthetic');
  const packSelect = document.getElementById('calcPack');
  const calcResultValue = document.getElementById('calcResultValue');
  const calcResultBreakdown = document.getElementById('calcResultBreakdown');
  const btnCalcWa = document.getElementById('btnCalcWa');

  function updateStyleRecommendation() {
    if (!occasionSelect || !aestheticSelect || !calcResultValue) return;

    const occasion = occasionSelect.value;
    const aesthetic = aestheticSelect.value;
    const pack = packSelect ? packSelect.value : 'Velvet Drawer Box';

    let title = '';
    let description = '';

    if (aesthetic.includes('Anti-Tarnish')) {
      title = '18K PVD Anti-Tarnish Daily Luxe Trio';
      description = `Waterproof herringbone chain, stackable baguette ring, and waterproof huggie hoops. Finished in luxury ${pack} with care card.`;
    } else if (aesthetic.includes('Korean')) {
      title = 'Korean Minimalist Chic Stacking Set';
      description = `Delicate paperclip chain, dainty pearl drop earrings, and micro-pave adjustable bands in satin ${pack}.`;
    } else if (aesthetic.includes('Bridal')) {
      title = 'Royal Kundan & Polki Statement Suite';
      description = `Handcrafted Meenakari choker, matching jhumkas, and maang tikka in royal velvet keepsake chest.`;
    } else {
      title = 'Bespoke Curated Milestone Gift Box';
      description = `Hand-selected necklace, luxury scented soy candle, personalized wax-sealed wax card, and velvet jewelry roll in ribbon hamper box.`;
    }

    calcResultValue.textContent = title;
    calcResultBreakdown.innerHTML = `<strong>Curated Set:</strong> ${description}<br><strong>Occasion:</strong> ${occasion}`;

    if (btnCalcWa) {
      const waMsg = `Namaste Mishme!%0A%0AI used your website Style Finder:%0A*Occasion:* ${occasion}%0A*Style Preference:* ${aesthetic}%0A*Recommended Suite:* ${title}%0A*Packaging:* ${pack}%0A%0APlease share availability, real photos, and pricing!`;
      btnCalcWa.href = `https://wa.me/917980983461?text=${waMsg}`;
    }
  }

  if (occasionSelect && aestheticSelect) {
    occasionSelect.addEventListener('change', updateStyleRecommendation);
    aestheticSelect.addEventListener('change', updateStyleRecommendation);
    if (packSelect) packSelect.addEventListener('change', updateStyleRecommendation);
    updateStyleRecommendation();
  }
});
