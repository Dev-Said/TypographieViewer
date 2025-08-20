# Typographie Viewer

Une application React pour visualiser et tester des polices de caractères.

## 🚀 Installation et lancement

### 1. Installer les dépendances
```bash
npm install
```

### 2. Ajouter vos polices
Placez vos fichiers de polices (`.ttf`, `.otf`, `.woff`, `.woff2`, `.eot`) dans le dossier `/public/fonts/`.

**💡 Organisation flexible :**
- **Fichiers directement** : `/public/fonts/ma-police.ttf`
- **Sous-dossiers** : `/public/fonts/Montserrat/Montserrat-Regular.ttf`
- **Structure mixte** : Vous pouvez combiner les deux approches

### 3. Générer le fichier fonts.json
```bash
php generate-fonts.php
```

### 4. Lancer l'application
```bash
npm start
```

L'application sera disponible sur http://localhost:3000

## 📁 Structure du projet

```
TypographieViewer/
├── public/
│   ├── fonts/              # Vos polices (.ttf, .otf, .woff, .woff2, .eot)
│   ├── fonts.json          # Généré automatiquement par le script PHP
│   └── index.html
├── src/
│   ├── FontGallery.jsx     # Composant principal
│   ├── App.js
│   ├── index.js
│   └── index.css
├── generate-fonts.php      # Script pour générer fonts.json
├── package.json
└── README.md
```

## 🔧 Utilisation

1. **Ajouter des polices** : Copiez vos fichiers de polices dans `/public/fonts/`
2. **Générer l'index** : Exécutez `php generate-fonts.php`
3. **Visualiser** : L'application affiche automatiquement toutes vos polices
4. **Tester** : Modifiez le texte de démonstration pour tester vos polices

## ✨ Fonctionnalités

### 🖼️ Vue Galerie
- ✅ **Aperçu rapide** : Toutes les polices affichées en grille
- ✅ **Vue détaillée** : Cliquez sur "🔍 Détail" pour analyser une police en profondeur
- ✅ **Interface responsive** (3 colonnes sur desktop, 1 colonne sur mobile)
- ✅ **Texte personnalisable** avec suggestions prédéfinies

### 🔍 Vue Comparaison (NOUVEAU !)
- ✅ **Liste interactive** : Toutes les polices dans une sidebar à gauche
- ✅ **Prévisualisation en temps réel** : Zone d'affichage grande à droite
- ✅ **Navigation clavier** : Utilisez ↑↓ pour parcourir les polices
- ✅ **Contrôles de taille** : Boutons +/- et slider (8px à 120px)
- ✅ **Texte entièrement personnalisable** avec suggestions
- ✅ **Focus automatique** sur la police sélectionnée

### 🛠️ Fonctionnalités communes
- ✅ **Scan récursif** : Détecte les polices dans tous les sous-dossiers
- ✅ **Organisation flexible** : Fichiers directement ou dans des dossiers
- ✅ **Noms intelligents** : Les polices dans des sous-dossiers sont préfixées (ex: `Montserrat-Regular`)
- ✅ **Support complet** : TTF, OTF, WOFF, WOFF2, EOT
- ✅ **Interface moderne** avec TailwindCSS et système d'onglets
- ✅ **Chargement optimisé** des polices avec @font-face

## 📂 Exemples d'organisation

### Structure simple (fichiers directs)
```
public/fonts/
├── Montserrat-Regular.ttf
├── Montserrat-Bold.ttf
├── Roboto-Light.woff2
└── OpenSans-Regular.otf
```

### Structure organisée (par famille)
```
public/fonts/
├── Montserrat/
│   ├── Montserrat-Regular.ttf
│   ├── Montserrat-Bold.ttf
│   └── Montserrat-Italic.ttf
├── Roboto/
│   ├── Roboto-Regular.woff2
│   └── Roboto-Bold.woff2
└── OpenSans/
    └── OpenSans-Regular.otf
```

### Structure mixte
```
public/fonts/
├── ma-police-speciale.ttf     # Police isolée
├── Montserrat/                # Famille complète
│   ├── Regular.ttf
│   └── Bold.ttf
└── Google-Fonts/              # Collection
    ├── Roboto-Regular.woff2
    └── Lato-Regular.woff2
```

## 🎛️ Guide des deux vues

### 🖼️ Vue Galerie
**Parfaite pour** : Aperçu rapide de toutes vos polices

**Comment l'utiliser** :
1. **Parcourir** : Toutes les polices sont affichées en grille
2. **Tester** : Modifiez le texte de démonstration global
3. **Analyser** : Cliquez sur "🔍 Détail" pour une analyse complète
4. **Fermer la vue détaillée** : Bouton "×", `Échap`, ou clic en dehors

### 🔍 Vue Comparaison (NOUVEAU !)
**Parfaite pour** : Comparaison et sélection précise de polices

**Comment l'utiliser** :
1. **Naviguer** : 
   - Cliquez sur une police dans la liste de gauche
   - Ou utilisez les flèches ↑↓ du clavier
2. **Personnaliser** : 
   - Tapez votre texte dans le champ "Texte à prévisualiser"
   - Ou cliquez sur une suggestion prédéfinie
3. **Ajuster la taille** :
   - Boutons +/- pour ajustements fins
   - Slider pour changements rapides
   - Plage : 8px à 120px
4. **Prévisualiser** : Le texte s'affiche instantanément en grand format

### 🔍 Vue détaillée (depuis la Galerie)
**Parfaite pour** : Analyse typographique complète

**Contenu** :
- **Aperçu principal** : Texte personnalisé en 60px
- **6 tailles différentes** : De 14px à 60px avec labels
- **Textes d'exemple** : Pangrammes, alphabets, chiffres, symboles
- **Caractères spéciaux** : Accents français et ligatures
- **Informations techniques** : Format et chemin du fichier

## 🔄 Workflow typique

### 📥 Ajout de polices
```bash
# 1. Ajouter une nouvelle police (méthode au choix)
cp ma-nouvelle-police.ttf public/fonts/
# OU
cp ma-police.ttf public/fonts/MaFamille/

# 2. Régénérer l'index
php generate-fonts.php

# 3. Rafraîchir l'application (si elle est déjà lancée)
# L'application se recharge automatiquement
```

### 🎯 Utilisation optimale
1. **Exploration rapide** : Vue Galerie → Parcourir toutes les polices en un coup d'œil
2. **Sélection précise** : Vue Comparaison → Tester avec votre texte spécifique
3. **Analyse complète** : Vue détaillée → Vérifier tous les caractères et tailles

### 🚀 Cas d'usage recommandés
- **Sélection pour un projet** : Vue Comparaison avec votre texte
- **Audit de collection** : Vue Galerie pour voir l'ensemble
- **Test typographique** : Vue détaillée pour l'analyse complète
- **Comparaison rapide** : Vue Comparaison + navigation clavier

## 🛠️ Technologies utilisées

- **React 18** - Framework JavaScript
- **TailwindCSS** - Framework CSS utilitaire
- **PHP** - Script de génération d'index
- **@font-face** - Chargement dynamique des polices

## 🎨 Personnalisation

Le texte de démonstration par défaut est un pangramme français : 
> "Portez ce vieux whisky au juge blond qui fume"

Vous pouvez le modifier directement dans l'interface ou utiliser les suggestions prédéfinies.

## 📝 Format du fichier fonts.json

Le script PHP génère automatiquement un fichier JSON avec cette structure :

```json
[
  {
    "name": "Montserrat-Regular",
    "file": "/fonts/Montserrat-Regular.ttf"
  },
  {
    "name": "Roboto-Bold", 
    "file": "/fonts/Roboto-Bold.woff2"
  }
]
```

## 🐛 Dépannage

### Aucune police n'apparaît
- Vérifiez que vos polices sont dans `/public/fonts/`
- Exécutez `php generate-fonts.php`
- Vérifiez que le fichier `fonts.json` a été créé dans `/public/`

### Erreur "Impossible de charger fonts.json"
- Assurez-vous que l'application React est lancée (`npm start`)
- Vérifiez que le fichier `/public/fonts.json` existe

### Police ne s'affiche pas correctement
- Vérifiez que le fichier de police n'est pas corrompu
- Certaines polices peuvent avoir des restrictions de licence
