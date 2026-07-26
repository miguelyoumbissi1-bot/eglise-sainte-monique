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

## Comment ça marche (SPA)

- Chaque « page » (`Accueil`, `La Paroisse`, `Horaires`...) est une `<section class="view">`
  dans `index.html`, identifiée par un `id` (`view-home`, `view-galerie`, etc.).
- Les liens du menu pointent vers des ancres (`#horaires`, `#galerie`...).
- `js/app.js` écoute l'évènement `hashchange` : à chaque changement, il masque
  toutes les sections et n'affiche que celle qui correspond au hash — **aucune
  requête réseau, aucun rechargement de page**.
- Il n'y a plus de page ni de formulaire de contact, ni de dépendance PHP :
  le site est entièrement statique et peut s'ouvrir directement en local
  (double-clic sur `index.html`) ou être déposé tel quel sur n'importe quel
  hébergement web classique.

## Diaporama (page d'accueil)

Un diaporama a été ajouté juste sous le titre d'accueil, avec défilement
automatique et flèches/points de navigation.

Pour insérer tes propres photos :

1. Crée un dossier `image/` à la racine du projet (à côté de `index.html`),
   s'il n'existe pas déjà.
2. Place tes photos dedans en les nommant `diaporama-1.jpg`, `diaporama-2.jpg`,
   `diaporama-3.jpg`, `diaporama-4.jpg` (ou adapte les noms directement dans
   `index.html`, section `<!-- Diaporama -->`).
3. Pour ajouter ou retirer une photo, ajoute/supprime simplement un bloc :
   ```html
   <div class="slide">
     <img src="image/diaporama-5.jpg" alt="Description de la photo">
   </div>
   ```
   dans `index.html` (le diaporama et les points de navigation
   s'adaptent automatiquement en JS).

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
