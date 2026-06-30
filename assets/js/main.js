/* =========================================================
   Awais Ali — Portfolio interactions (vanilla JS, no deps)
   ========================================================= */
(function () {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Theme (persisted) ---- */
  const root = document.documentElement;
  const themeBtn = $("#themeToggle");
  const stored = localStorage.getItem("theme");
  if (stored) root.setAttribute("data-theme", stored);
  themeBtn?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  /* ---- Sticky nav shadow + reading progress ---- */
  const nav = $("#nav");
  const progressBar = $("#progressBar");
  const onScroll = () => {
    const de = document.documentElement;
    nav.classList.toggle("scrolled", window.scrollY > 16);
    toTop.classList.toggle("show", window.scrollY > 600);
    if (progressBar) {
      const max = de.scrollHeight - window.innerHeight;
      const y = window.scrollY || window.pageYOffset || de.scrollTop || 0;
      progressBar.style.width = (max > 0 ? Math.min(1, y / max) * 100 : 0) + "%";
    }
  };

  /* ---- Mobile menu ---- */
  const menuBtn = $("#menuBtn");
  const navLinks = $("#navLinks");
  const toggleMenu = (open) => {
    const isOpen = open ?? !navLinks.classList.contains("open");
    navLinks.classList.toggle("open", isOpen);
    menuBtn.classList.toggle("open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  };
  menuBtn?.addEventListener("click", () => toggleMenu());
  $$("#navLinks a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggleMenu(false); });

  /* ---- Back to top ---- */
  const toTop = $("#toTop");
  toTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Footer year ---- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Scroll reveal (gentle stagger by sibling index) ---- */
  const revealEls = $$("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("in"));
  } else {
    revealEls.forEach((el) => {
      const sibs = Array.from(el.parentElement.children).filter((c) => c.hasAttribute("data-reveal"));
      const idx = Math.max(0, sibs.indexOf(el));
      el.style.transitionDelay = Math.min(idx, 8) * 55 + "ms";
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---- Work filtering (lets recruiters focus on one area) ---- */
  const grid = $("#workGrid");
  const filterBar = $("#workFilters");
  if (grid && filterBar) {
    // Map each card to one or more focus areas by its title keyword.
    const RULES = [
      ["SocialRocket", ["saas", "ai"]],
      ["TrackPilot", ["saas"]],
      ["DSR", ["saas"]],
      ["PACX", ["coaching", "ai"]],
      ["ProAdvisor Drivers", ["coaching", "apis"]],
      ["ProAdvisor Coach", ["coaching", "saas"]],
      ["MindScan", ["coaching"]],
      ["WOW", ["coaching"]],
      ["Bizee", ["saas"]],
      ["Snap The City", ["apis"]],
      ["CorpCareConnect", ["apis"]],
      ["Build Delivery", ["saas", "apis"]],
      ["ShortlistMe", ["saas"]],
      ["PathFinder", ["saas", "ai"]],
      ["Mazuzee", ["saas"]],
      ["Vital", ["saas"]],
      ["HRM", ["saas"]],
    ];
    const cards = $$(".work-card", grid);
    cards.forEach((card) => {
      const title = (card.querySelector("h3")?.textContent || "").replace(/ /g, " ");
      const rule = RULES.find((r) => title.includes(r[0]));
      card.dataset.cat = (rule ? rule[1] : []).join(" ");
    });

    // Fill chip counts.
    $$(".filter-chip", filterBar).forEach((chip) => {
      const f = chip.dataset.filter;
      const n = f === "all" ? cards.length : cards.filter((c) => c.dataset.cat.split(" ").includes(f)).length;
      const span = chip.querySelector(".chip-count");
      if (span) span.textContent = n;
    });

    filterBar.addEventListener("click", (e) => {
      const chip = e.target.closest(".filter-chip");
      if (!chip) return;
      const f = chip.dataset.filter;
      $$(".filter-chip", filterBar).forEach((c) => {
        const on = c === chip;
        c.classList.toggle("active", on);
        c.setAttribute("aria-selected", String(on));
      });
      let visible = 0;
      cards.forEach((card) => {
        const show = f === "all" || card.dataset.cat.split(" ").includes(f);
        card.classList.toggle("hide", !show);
        card.classList.remove("filter-in");
        if (show && !reduceMotion) {
          card.style.animationDelay = Math.min(visible, 8) * 45 + "ms";
          // force reflow so the animation restarts each filter
          void card.offsetWidth;
          card.classList.add("filter-in");
        }
        if (show) visible++;
      });
    });
  }

  /* ---- Count-up stats ---- */
  const counters = $$("[data-count]");
  if (counters.length && "IntersectionObserver" in window && !reduceMotion) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        let cur = 0;
        const step = Math.max(1, Math.round(target / 28));
        const tick = () => {
          cur = Math.min(target, cur + step);
          el.textContent = cur + suffix;
          if (cur < target) requestAnimationFrame(tick);
        };
        tick();
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => cio.observe(el));
  }

  /* ---- Active nav link on scroll ---- */
  const sections = $$("main section[id]");
  const linkFor = (id) => $(`#navLinks a[href="#${id}"]`);
  if (sections.length && "IntersectionObserver" in window) {
    const sio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $$("#navLinks a").forEach((a) => a.removeAttribute("aria-current"));
          linkFor(entry.target.id)?.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => sio.observe(s));
  }

  /* ---- Subtle 3D tilt on cards (pointer, desktop only) ---- */
  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    $$("[data-tilt]").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${y * -4}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }
})();
