# Private Icon Font — `icongen`

Génère **ttf/woff/woff2**, un **CSS** et un **demo.html** à partir de `src/icons/*.svg`.
Les **codepoints** sont **stables** (persistés) et de **nouveaux** sont attribués automatiquement.

## Installation

```bash
npm i
```

## Nom du projet / préfixe CSS

Modifie dans `package.json > config` :

* `iconFontName`: **nom de la font** (ex: `icongen`)
* `iconCssPrefix`: **préfixe CSS** (ex: `icg`)
* `fontsUrl`: URL utilisée dans le CSS pour `@font-face` (ex: `./` ou `/static/fonts/`)

Tu peux aussi surcharger via env :

```bash
FONT_NAME=icongen CSS_PREFIX=icg FONTS_URL=/assets/fonts npm run build
```

## Ajouter des icônes

Dépose tes SVG **monochromes** dans `src/icons/`
*(un fichier = une icône ; le **nom du fichier** = **nom de la classe**)*.

Ex: `src/icons/heart.svg` → classe `.icg-heart`

## Build

```bash
npm run build
```

* Nettoie les SVG avec **SVGO**
* Met à jour/persiste les **codepoints** (`meta/codepoints.json`)
* Génère **fonts**, **CSS**, **demo.html** dans `dist/`
* Synchronise le mapping final

## Utilisation (CSS)

Dans ta page/app :

```html
<link rel="stylesheet" href="/path/to/dist/icongen.css" />
<i class="icg icg-heart" aria-hidden="true"></i>
```

Tu peux aussi héberger les polices ailleurs (voir `fontsUrl`).

## Codepoints stables

* Le fichier `meta/codepoints.json` conserve les attributions.
* `npm run update:codepoints` attribue de **nouveaux** codepoints aux **nouvelles** icônes
  sans toucher aux anciennes.

## Demo

Ouvre `dist/demo.html` après build.

## Release & Changelog

* **CI** build à chaque commit.
* **Changelog auto** (Conventional Commits) sur `push` : `CHANGELOG.md` se met à jour et est
  commité par la CI.
* **Release GitHub** à chaque tag `v*` : upload `ttf/woff/woff2`, `css`, `demo.html` et un **zip**.

### Créer une release

```bash
# Mets à jour le changelog en local si tu veux
npm run changelog
git commit -am "chore(changelog): update"

# Tag + push
npm version patch --no-git-tag-version
git add .
git commit -m "chore: bump version to 0.1.1"
git tag v0.1.1
git push --follow-tags
```

La CI créera la release avec les assets.

## Maintenance

* **Renommer** une icône = **nouvelle** entrée (nouveau codepoint).
* Supprimer une icône ne supprime pas la ligne du mapping (on garde l’historique).
* **SVGO** est configuré pour rester **safe** (conserve `viewBox`, supprime dimensions, attrs
  `fill`/`stroke` pour laisser `currentColor` faire le job).

## License

Privé / `UNLICENSED`.
