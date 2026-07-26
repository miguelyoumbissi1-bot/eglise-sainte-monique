# Maquette — Site Paroisse Sainte Monique (Makepe)

Prototype fonctionnel en **Single Page Application** (HTML/CSS/JS vanilla,
100% statique — aucun serveur, aucune base de données, aucun PHP).

## Arborescence

```
parish-site/
├── index.html          → une seule page HTML, contient toutes les "vues"
├── css/
│   └── styles.css      → design tokens (couleurs, typo), layout, responsive
├── js/
│   └── app.js          → routeur SPA (hash), menu mobile, diaporama, galerie
└── image/
    └── ...              → tes photos (voir section Diaporama ci-dessous)
```



## Lancer le projet en local

Le site fonctionne même en ouvrant `index.html` directement dans le
navigateur (double-clic). Un petit serveur local reste utile pour éviter
certains blocages de sécurité du navigateur avec les images :

```bash
cd parish-site
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000/index.html`.

## Pistes pour aller plus loin

- Remplacer les vignettes de la galerie (`#galerie`) par de vraies photos.
- Si un jour un formulaire de contact redevient nécessaire, on pourra
  utiliser un service tiers (Formspree, Web3Forms...) sans avoir besoin
  de gérer un serveur PHP ou une base de données.
