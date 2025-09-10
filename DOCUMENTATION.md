# Documentation YTS-Streaming

## Architecture de l'application

YTS-Streaming est une application de streaming de films basée sur Electron, React et WebTorrent. L'application permet de parcourir, rechercher et regarder des films en streaming via des torrents, avec une interface utilisateur moderne et intuitive.

### Architecture générale

L'application suit une architecture hybride avec deux composants principaux :

1. **Frontend (React)** : Interface utilisateur développée avec React, gérant l'affichage des films, la recherche, le filtrage et les détails des films.

2. **Backend (Electron)** : Gère la logique de l'application, le streaming des torrents via WebTorrent, et l'intégration avec le système d'exploitation.

### Diagramme d'architecture

```
+-------------------------------------+
|             Application             |
+-------------------------------------+
|                                     |
|  +-------------+   +--------------+ |
|  |             |   |              | |
|  |   Frontend  |<->|   Backend    | |
|  |   (React)   |   |  (Electron)  | |
|  |             |   |              | |
|  +------^------+   +-------^------+ |
|         |                  |        |
+---------|------------------|--------+
          |                  |
          v                  v
+------------------+  +------------------+
|                  |  |                  |
|    YTS API       |  |    WebTorrent    |
| (Données films)  |  | (Streaming)      |
|                  |  |                  |
+------------------+  +------------------+
```

## Structure des dossiers et fichiers

```
/YTS-Streaming/
├── .CaptionConf                  # Configuration des sous-titres
├── .eslintrc.json                # Configuration ESLint
├── .gitattributes                # Configuration Git
├── .github/                      # Configuration GitHub
├── .gitignore                    # Fichiers ignorés par Git
├── .prettierrc.json              # Configuration Prettier
├── README.md                     # Documentation principale
├── DOCUMENTATION.md              # Documentation détaillée (ce fichier)
├── builder_assets/               # Ressources pour la construction
│   ├── 256x256.png               # Icône 256x256
│   ├── LargeIcon.png             # Grande icône
│   ├── icon.icns                 # Icône macOS
│   ├── icon.ico                  # Icône Windows
│   ├── icon.png                  # Icône générique
│   └── installerMacro.nsh        # Script pour l'installateur
├── docs/                         # Documentation supplémentaire
│   └── images/                   # Images pour la documentation
├── electron/                     # Code source Electron (backend)
│   ├── assets/                   # Ressources pour Electron
│   │   ├── bootstrap/            # Fichiers Bootstrap
│   │   ├── icons/                # Icônes
│   │   ├── react_cdn/            # Fichiers React pour le CDN
│   │   └── video_player/         # Lecteur vidéo (Plyr)
│   ├── components/               # Composants Electron
│   │   ├── DownloaderWindow.ts   # Fenêtre de téléchargement
│   │   ├── MainWindow.ts         # Fenêtre principale
│   │   ├── VideoPlayerWindow.ts  # Fenêtre du lecteur vidéo
│   │   └── preload.cts           # Script de préchargement
│   ├── configs.ts                # Configuration Electron
│   ├── electron.interface.ts     # Interfaces TypeScript
│   ├── electron.ts               # Point d'entrée Electron
│   ├── srt2vtt.d.ts              # Définitions pour srt2vtt
│   ├── tsconfig.json             # Configuration TypeScript
│   └── views/                    # Vues HTML
│       ├── download_jsx/         # JSX pour la fenêtre de téléchargement
│       └── html/                 # Fichiers HTML
├── index.html                    # Page HTML principale
├── package-lock.json             # Verrouillage des dépendances
├── package.json                  # Configuration du projet et dépendances
├── public/                       # Fichiers publics
│   └── assets/                   # Ressources publiques
├── src/                          # Code source React (frontend)
│   ├── App.scss                  # Styles SCSS de l'application
│   ├── App.tsx                   # Composant principal React
│   ├── components/               # Composants React
│   │   ├── ErrorHandling/        # Gestion des erreurs
│   │   ├── backdrop/             # Arrière-plan
│   │   ├── footer/               # Pied de page
│   │   ├── header/               # En-tête
│   │   ├── movieScreenshot/      # Captures d'écran de films
│   │   ├── movieSynopsisAndTrailer/ # Synopsis et bande-annonce
│   │   ├── moviecard/            # Carte de film
│   │   ├── movieintro/           # Introduction de film
│   │   ├── movielist/            # Liste de films
│   │   ├── search/               # Recherche
│   │   └── spinner/              # Indicateur de chargement
│   ├── main.tsx                  # Point d'entrée React
│   ├── pages/                    # Pages React
│   │   ├── EntryPage.tsx         # Page d'accueil
│   │   └── MovieDetails.tsx      # Page de détails du film
│   ├── store/                    # Gestion d'état
│   │   └── AppContextProvider.tsx # Fournisseur de contexte
│   └── vite-env.d.ts             # Définitions pour Vite
├── tsconfig.json                 # Configuration TypeScript principale
├── tsconfig.node.json            # Configuration TypeScript pour Node
└── vite.config.ts                # Configuration Vite
```

## Technologies et bibliothèques

### Principales technologies

- **Electron** (v29.4.6) : Framework pour créer des applications de bureau multi-plateformes avec des technologies web
- **React** (v18.2.0) : Bibliothèque JavaScript pour construire des interfaces utilisateur
- **TypeScript** (v4.8.0) : Superset typé de JavaScript
- **Vite** (v3.2.3) : Outil de build moderne pour le développement web
- **WebTorrent** (v2.1.36) : Client torrent pour le web et Node.js

### Dépendances principales

#### Production

- **electron-is-dev** (v3.0.1) : Détecte si Electron est en mode développement
- **electron-window-state** (v5.0.3) : Gère et restaure l'état des fenêtres
- **express** (v4.19.2) : Framework web pour Node.js
- **srt2vtt** (v1.3.1) : Convertit les sous-titres SRT en format VTT
- **webtorrent** (v2.1.36) : Client torrent pour le streaming

#### Développement

- **@types/express** (v4.17.14) : Types TypeScript pour Express
- **@types/node** (v20.11.23) : Types TypeScript pour Node.js
- **@types/react** (v18.0.24) : Types TypeScript pour React
- **@types/react-dom** (v18.0.8) : Types TypeScript pour React DOM
- **@types/webtorrent** (v0.109.8) : Types TypeScript pour WebTorrent
- **@typescript-eslint/eslint-plugin** (v5.43.0) : Plugin ESLint pour TypeScript
- **@vitejs/plugin-react** (v2.2.0) : Plugin Vite pour React
- **concurrently** (v8.2.2) : Exécute plusieurs commandes simultanément
- **electron** (v29.4.6) : Framework Electron
- **electron-builder** (v24.13.3) : Outil pour empaqueter des applications Electron
- **eslint** (v8.27.0) : Linter JavaScript/TypeScript
- **prettier** (v2.7.1) : Formateur de code
- **react-router-dom** (v6.4.3) : Routage pour React
- **sass** (v1.56.1) : Préprocesseur CSS
- **shx** (v0.3.4) : Commandes shell portables

## Fonctionnement de l'application

### Processus principal (Electron)

Le fichier `electron/electron.ts` est le point d'entrée du processus principal Electron. Il gère :

- La création des fenêtres (principale, lecteur vidéo, téléchargement)
- Le serveur de streaming via WebTorrent
- La communication IPC entre le processus principal et le processus de rendu
- Les événements du cycle de vie de l'application

### Interface utilisateur (React)

Le frontend React est organisé en composants et pages :

- **Pages** : EntryPage (accueil) et MovieDetails (détails du film)
- **Composants** : Éléments d'interface réutilisables (cartes de films, recherche, etc.)
- **Store** : Gestion de l'état global via Context API

### API YTS

L'application utilise l'API YTS (https://yts.mx/api/v2/) pour obtenir les informations sur les films :

- **Liste des films** : Utilisée pour afficher les films sur la page d'accueil
- **Détails des films** : Utilisée pour afficher les informations détaillées d'un film
- **Suggestions de films** : Utilisée pour recommander des films similaires

Exemple d'URL API utilisée : `https://yts.mx/api/v2/movie_details.json`

### Communication

La communication entre le frontend (React) et le backend (Electron) se fait via IPC (Inter-Process Communication) :

- Le frontend envoie des requêtes au backend pour le streaming, l'ouverture de liens, etc.
- Le backend répond avec les données demandées ou effectue les actions requises

### Streaming de torrents

L'application utilise WebTorrent pour le streaming de torrents :

1. L'utilisateur sélectionne un film
2. WebTorrent télécharge le torrent et commence à streamer le contenu
3. Le lecteur vidéo (Plyr) affiche la vidéo en streaming
4. Les sous-titres sont convertis de SRT à VTT si nécessaire

### Flux de données et interactions utilisateur

1. **Démarrage de l'application** :

   - Electron crée la fenêtre principale
   - React charge l'interface utilisateur
   - L'application se connecte à l'API YTS pour récupérer les films

2. **Navigation et recherche** :

   - L'utilisateur peut parcourir les films sur la page d'accueil
   - L'utilisateur peut filtrer par qualité, genre, note et trier les résultats
   - La recherche est effectuée via l'API YTS

3. **Affichage des détails d'un film** :

   - L'utilisateur clique sur un film
   - L'application récupère les détails du film via l'API YTS
   - Les informations sont affichées (synopsis, captures d'écran, bande-annonce)

4. **Lecture d'un film** :
   - L'utilisateur clique sur un bouton de lecture
   - Electron crée une fenêtre de lecteur vidéo
   - WebTorrent commence à télécharger et streamer le torrent
   - Le lecteur vidéo Plyr affiche la vidéo
   - Les sous-titres sont chargés si disponibles

## Compilation et déploiement

L'application peut être compilée pour Windows, Linux et macOS à l'aide d'electron-builder :

```bash
npm run electron-pack
```

Cette commande crée des packages d'installation pour les plateformes spécifiées dans le fichier `package.json` :

- Windows : Installateur NSIS (.exe)
- Linux : AppImage (.AppImage)
- macOS : Image disque (.dmg)

## Configuration

La configuration de l'application est définie dans plusieurs fichiers :

- **package.json** : Configuration du projet, dépendances et options de build
- **electron/configs.ts** : Chemins et paramètres pour Electron
- **tsconfig.json** et **tsconfig.node.json** : Configuration TypeScript
- **vite.config.ts** : Configuration de l'outil de build Vite

## Bonnes pratiques de développement

### Style de code

L'application utilise ESLint et Prettier pour maintenir un style de code cohérent :

- **ESLint** : Vérifie la qualité du code et les erreurs potentielles
- **Prettier** : Formate automatiquement le code selon des règles prédéfinies

Pour formater le code, utilisez :

```bash
npm run format
```

Pour vérifier les erreurs de linting :

```bash
npm run lint
```

### TypeScript

L'application utilise TypeScript pour améliorer la robustesse du code :

- Définissez des interfaces pour les structures de données
- Utilisez des types pour les props des composants React
- Évitez l'utilisation de `any` autant que possible

### Contributions

Pour contribuer au projet :

1. Forkez le dépôt
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout de ma fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvrez une Pull Request

Assurez-vous que votre code passe les vérifications ESLint et que les tests fonctionnent correctement.
