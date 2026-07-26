/**
 * app.js
 * ------------------------------------------------------------------
 * Petite Single Page Application "maison" :
 *  - Le routage se fait via le hash de l'URL (#accueil, #contact, ...)
 *  - Un seul fichier index.html contient toutes les <section class="view">
 *  - On affiche/masque les sections en JS, sans jamais recharger la page
 *  - Chaque changement de route met à jour : la section visible,
 *    le lien actif du menu, et le <title> de l'onglet.
 * ------------------------------------------------------------------
 */

(function () {
  "use strict";

  /* -----------------------------------------------------------------
   * 1) Configuration des routes
   *    Clé = valeur du hash (sans le #), valeur = id de la <section>
   * --------------------------------------------------------------- */
  const routes = {
    home: "view-home",
    paroisse: "view-paroisse",
    horaires: "view-horaires",
    sacrements: "view-sacrements",
    groupes: "view-groupes",
    galerie: "view-galerie",
    mentions: "view-mentions",
  };
  const DEFAULT_ROUTE = "home";
  const SITE_NAME = "Paroisse Sainte Monique";

  const app = document.getElementById("app");
  const navLinks = document.querySelectorAll('[data-route-link] a, a[data-route-link]');

  /* -----------------------------------------------------------------
   * 2) Fonction centrale : afficher la bonne vue pour un hash donné
   * --------------------------------------------------------------- */
  function renderRoute() {
    const hash = (window.location.hash || "#" + DEFAULT_ROUTE).replace("#", "");
    const routeKey = routes[hash] ? hash : DEFAULT_ROUTE;
    const targetId = routes[routeKey];

    // Masquer toutes les vues, puis activer uniquement la bonne
    document.querySelectorAll(".view").forEach((section) => {
      section.classList.toggle("view--active", section.id === targetId);
    });

    // Mettre à jour le lien actif dans la navigation
    document.querySelectorAll(".primary-nav a").forEach((link) => {
      const linkRoute = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", linkRoute === routeKey);
    });

    // Mettre à jour le titre de l'onglet à partir de data-title de la vue
    const activeSection = document.getElementById(targetId);
    const pageTitle = activeSection ? activeSection.dataset.title : "";
    document.title = pageTitle ? `${pageTitle} · ${SITE_NAME}` : SITE_NAME;

    // Remonter en haut de la page à chaque changement de "page"
    window.scrollTo({ top: 0, behavior: "instant" in window.scrollTo ? "instant" : "auto" });

    // Fermer le menu mobile si ouvert
    closeMobileNav();
  }

  // On écoute les changements de hash (clic sur un lien, bouton précédent/suivant du navigateur...)
  window.addEventListener("hashchange", renderRoute);
  // Et on affiche la bonne route dès le chargement de la page
  window.addEventListener("DOMContentLoaded", renderRoute);

  /* -----------------------------------------------------------------
   * 3) Menu mobile (burger)
   * --------------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const primaryNav = document.getElementById("primaryNav");

  function closeMobileNav() {
    primaryNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  /* -----------------------------------------------------------------
   * 4) (Rosace décorative retirée — plus d'élément à générer ici)
   * --------------------------------------------------------------- */

  /* -----------------------------------------------------------------
   * 5) Galerie : petite interaction au clic (à remplacer plus tard
   *    par une vraie visionneuse si besoin)
   * --------------------------------------------------------------- */
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const caption = item.dataset.caption || "Photo";
      // Ici, en vrai projet : ouverture d'une modale / lightbox.
      alert(caption);
    });
  });

  /* -----------------------------------------------------------------
   * 6) Diaporama de la page d'accueil : défilement automatique +
   *    navigation manuelle (flèches et points), 100% côté client.
   * --------------------------------------------------------------- */
  const diaporama = document.getElementById("diaporama");
  const track = document.getElementById("diaporamaTrack");
  const prevBtn = document.getElementById("diaporamaPrev");
  const nextBtn = document.getElementById("diaporamaNext");
  const dotsWrap = document.getElementById("diaporamaDots");

  if (diaporama && track) {
    const slides = Array.from(track.children);
    let current = 0;
    let timer = null;
    const AUTOPLAY_DELAY = 5000;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Génère un point de navigation par slide
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "diaporama-dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Aller à la photo ${index + 1}`);
      dot.addEventListener("click", () => goTo(index));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function update() {
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((dot, index) => dot.classList.toggle("is-active", index === current));
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      update();
      restartAutoplay();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAutoplay() {
      if (prefersReducedMotion || slides.length < 2) return;
      timer = window.setInterval(next, AUTOPLAY_DELAY);
    }
    function stopAutoplay() {
      if (timer) window.clearInterval(timer);
    }
    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);

    // Pause au survol / focus, pratique pendant qu'on regarde les photos
    diaporama.addEventListener("mouseenter", stopAutoplay);
    diaporama.addEventListener("mouseleave", startAutoplay);
    diaporama.addEventListener("focusin", stopAutoplay);
    diaporama.addEventListener("focusout", startAutoplay);

    update();
    startAutoplay();
  }
})();
