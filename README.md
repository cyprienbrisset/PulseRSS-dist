# Pulse — site de présentation / landing page

Site statique bilingue (FR/EN) présentant l'application **Pulse**.
Aucune dépendance, aucun build : du HTML/CSS/JS pur.

## Aperçu local

```bash
cd website
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

(Ouvrir `index.html` directement via `file://` fonctionne aussi, sauf que
certains navigateurs bloquent alors les requêtes — préférez le serveur local.)

## Structure

```
website/
├── index.html        # toutes les sections (hero, features, aperçu, onboarding, download)
├── styles.css        # thème Liquid Glass (sombre, blooms, verre dépoli)
├── app.js            # bascule de langue FR/EN, reveal au scroll, copie de la source SideStore
└── assets/
    ├── logo.png          # logo Pulse
    ├── appicon.png       # icône de l'app (favicon)
    └── shots/            # captures d'écran réelles (macOS 26)
        ├── reader.png        # lecteur + dock contextuel (hero)
        ├── list.png          # liste des articles
        ├── icononly.png      # barre latérale en rail d'icônes
        └── onboarding.png    # écran de prise en main
```

## Internationalisation

Chaque texte traduisible porte `data-fr` et `data-en`. `app.js` échange le
contenu selon la langue (FR par défaut, mémorisée dans `localStorage`, repli sur
la langue du navigateur). Tous les contenus sont statiques et maîtrisés.

## Liens de téléchargement

Les boutons pointent vers le dépôt public de distribution
`cyprienbrisset/PulseRSS-dist` (release `v1.0.0`) :

- **macOS** : `PulseRSS-macOS.zip` (non notarisé → 1ᵉʳ lancement : clic droit → Ouvrir)
- **iOS** : source SideStore `apps.json` + IPA direct

Pour publier une nouvelle version, ré-uploadez les artefacts sur la release puis,
si besoin, mettez à jour le numéro de version dans `index.html`.

## Déploiement

N'importe quel hébergement statique convient (GitHub Pages, Netlify, Cloudflare
Pages, un bucket…). Déployez le contenu du dossier `website/` tel quel.
```bash
# Exemple : GitHub Pages depuis ce dossier
#   Settings → Pages → source = /website (sur une branche dédiée)
```
