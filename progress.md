# Progress - Liaison Backend/Frontend

## Ce qui a été fait :

### ✅ Configuration API
- Créé `config/api.ts` avec la configuration des URLs
- BASE_URL : développement (localhost) vs production (https://devflorian.cornillet.com)
- Endpoints : /register et /login

### ✅ Service API centralisé
- Créé `services/apiService.ts`
- Classe ApiService avec méthodes login() et register()
- Gestion centralisée des erreurs
- Interface TypeScript pour les données

### ✅ Gestion des tokens implémentée
- AsyncStorage installé et configuré
- ApiService étendu avec méthodes de gestion des tokens (saveToken, getToken, removeToken)
- Interfaces TypeScript ajoutées (AuthResponse) pour éviter les erreurs IDE
- Méthodes login/register mises à jour pour sauvegarder automatiquement les tokens
- Support JSON au lieu de form-data
- Méthodes logout() et isAuthenticated() ajoutées

### ✅ Contexte d'authentification (AuthContext)
- Créé `contexts/AuthContext.tsx` avec état global d'authentification
- Hook useAuth() pour accéder au contexte
- Intégration avec ApiService
- Gestion de isAuthenticated, isLoading, user
- Méthodes login(), register(), logout() centralisées
- Vérification automatique de l'authentification au démarrage

### ✅ Intégration du AuthContext
- AuthProvider wrappé dans app/_layout.tsx
- Contexte accessible dans toute l'application

### ✅ LoginForm mis à jour avec useAuth()
- Utilise le hook useAuth() au lieu d'ApiService direct
- Gestion du loading centralisée via isLoading du contexte
- Bouton désactivé pendant le chargement

### ✅ RegisterForm mis à jour avec useAuth()
- Utilise le hook useAuth() au lieu d'ApiService direct
- Suppression des états locaux inutiles (setRegister, setRegisterLoading)
- Nettoyage du useEffect inutile (fetch sans traitement)
- Bouton désactivé pendant le chargement

### ✅ Navigation conditionnelle (TESTÉE ET VALIDÉE)
- **Architecture fonctionnelle** :
  - `app/index.tsx` = Landing page (login/register) pour utilisateurs NON connectés
  - `app/(tabs)/` = Application principale pour utilisateurs CONNECTÉS
- **Logique implémentée et testée** :
  - `app/index.tsx` : vérifie `isAuthenticated` au chargement
    - Si `true` → redirection automatique vers `(tabs)` (return null pendant la redirection)
    - Si `false` → affiche la landing page
    - Pendant le chargement → affiche "Chargement..."
  - `LoginForm` et `RegisterForm` : après succès → navigation vers `(tabs)` avec `router.replace()`
  - Optimisation UX : pas de flash de la landing page pendant la redirection

### ✅ Tests complets effectués
- ✅ Créer un compte → redirige correctement vers (tabs)
- ✅ Se connecter → redirige correctement vers (tabs)
- ✅ Redémarrer l'app → reste connecté (token persistant fonctionne)
- ✅ Backend retourne bien les tokens
- ✅ Navigation fluide sans flash visuel

## 🎉 LIAISON BACKEND/FRONTEND COMPLÈTE ET FONCTIONNELLE

## Fichiers modifiés :
- `config/api.ts` (créé)
- `services/apiService.ts` (créé et étendu avec gestion des tokens)
- `contexts/AuthContext.tsx` (créé)
- `app/_layout.tsx` (intégration AuthProvider)
- `app/index.tsx` (navigation conditionnelle + écran de chargement)
- `components/LoginForm.tsx` (mis à jour avec useAuth + navigation)
- `components/RegisterForm.tsx` (mis à jour avec useAuth + navigation)

## Backend SlimPHP requis :
- Headers CORS configurés ✅
- Endpoints /login et /register fonctionnels ✅
- Réponses JSON avec format { success: boolean, token?: string, message?: string }
- Support du Content-Type: application/json pour les requêtes

### ✅ Système de déconnexion (logout)
- **Backend** : Route `POST /logout` créée dans `app/routes.php` (ligne 103-110)
  - Détruit la session et les cookies côté serveur
  - Retourne `{"success": "Déconnexion réussie"}`
- **Frontend** :
  - Endpoint `/logout` ajouté dans `config/api.ts`
  - Méthode `logout()` implémentée dans `services/apiService.ts` (ligne 140-157)

#### Explications de la structure de logout() :
1. **`try/catch/finally`** :
   - `try` : Appel de l'API backend pour déconnecter côté serveur
   - `catch` : Si l'appel échoue (pas de réseau, serveur down), on log l'erreur mais on ne bloque pas
   - `finally` : Qu'importe le résultat (succès/échec), on supprime **toujours** le token local

2. **Pourquoi supprimer le token même si l'API échoue ?**
   - Scénario 1 : L'utilisateur n'a plus internet → l'API ne répond pas, mais il doit quand même être déconnecté localement
   - Scénario 2 : Le serveur est temporairement down → même chose, on déconnecte localement
   - UX : Quand l'utilisateur clique sur "Déconnexion", il s'attend à être déconnecté, peu importe l'état du serveur

3. **Vérification `if (token)`** :
   - On vérifie d'abord que le token existe avant d'appeler l'API
   - Évite une requête inutile si l'utilisateur est déjà déconnecté

### ✅ Bouton de déconnexion créé
- Bouton créé dans `app/(tabs)/account.tsx` avec effet de survol
- Utilise `Pressable` avec `onHoverIn`/`onHoverOut` pour l'effet de soulignement au survol
- Appelle `logout()` du contexte d'authentification
- Style : texte rouge qui se souligne au survol

### ✅ Redirection après déconnexion (CORRIGÉ)
**Système de déconnexion complet et fonctionnel :**
- ✅ API backend `/logout` accessible et fonctionnelle
- ✅ Méthode `logout()` dans `apiService.ts` correcte (appelle l'API + supprime le token local)
- ✅ Token correctement supprimé après déconnexion
- ✅ État `isAuthenticated` passe bien à `false` dans le contexte
- ✅ Navigation conditionnelle implémentée dans `app/_layout.tsx` avec `useSegments`
- ✅ **Redirection vers la landing page après déconnexion fonctionnelle**

**Fichiers modifiés pendant cette session :**
- `config/api.ts` : ajout de l'endpoint LOGOUT
- `services/apiService.ts` : méthode `logout()` complète
- `app/(tabs)/account.tsx` : bouton de déconnexion avec effet hover
- `app/_layout.tsx` : navigation conditionnelle avec `useSegments` et `RootLayoutNav`
- `app/index.tsx` : suppression du useEffect de redirection (géré par _layout maintenant)
- `app/(tabs)/_layout.tsx` : nettoyé (plus de useEffect de redirection)

### ✅ Système de scroll implémenté dans PageLayout
- **PageLayout.tsx** rendu scrollable :
  - `ScrollView` ajouté pour englober le header et l'ImageBackground (ligne 15-26)
  - Modification du style `main` : `flex: 1` → `minHeight: '100%'` (ligne 45)
  - Ajout de `imageStyle={{height: '100%'}}` sur ImageBackground pour étirer correctement l'image de fond (ligne 23)
  - Import de `ScrollView` depuis `react-native` (ligne 3)

- **home.tsx** mis à jour :
  - Style `height` ajouté au PageLayout (ligne 8) pour définir la hauteur scrollable
  - Style `position: "absolute"` ajouté au titre (ligne 40) pour le positionnement

**Résultat** :
- ✅ Les pages utilisant PageLayout sont maintenant scrollables
- ✅ Le contenu peut dépasser la hauteur de l'écran
- ✅ Le ScrollView fonctionne correctement avec des hauteurs définies

**Fichiers modifiés** :
- `layouts/PageLayout.tsx` (ajout ScrollView + modification styles)
- `app/(tabs)/home.tsx` (ajout style height)

## 🎉 Système d'authentification et navigation complètement fonctionnels
- ✅ Login/Register avec gestion des tokens
- ✅ Persistance de session avec AsyncStorage
- ✅ Navigation conditionnelle entre landing page et app
- ✅ Déconnexion avec redirection automatique vers la landing page
- ✅ ScrollView implémenté dans PageLayout pour contenu défilable

### ✅ Composant NewParcel créé
- **NewParcel.tsx** : Formulaire de création de parcelle (ligne 1-104)
  - Gestion d'état avec `useState` pour les champs (nom, surface_in_ha, description)
  - Méthode `handleSubmit()` qui :
    - Récupère le token avec `ApiService.getToken()`
    - Envoie une requête POST vers `/parcelle` avec Authorization Bearer token
    - Utilise `Content-Type: application/json`
  - Formulaire avec 3 champs :
    - Nom (TextInput)
    - Surface en hectares (TextInput avec keyboardType="numeric")
    - Description (TextInput multiline avec hauteur 293px)
  - Bouton "Valider" avec style noir
  - Styles : input avec bordure arrondie, ombre, padding

**Fichier créé** :
- `components/NewParcel.tsx`

### ✅ Composant Circle (icône SVG) créé
- **Circle.tsx** : Icône cercle SVG (ligne 1-30)
  - Utilise `react-native-svg` (Svg, Circle, G, Defs)
  - Cercle gris (#dddddd) de 94.19mm x 94.19mm
  - ViewBox "0 0 94.191666 94.191666"
  - Rayon de 47.095833mm

**Fichier créé** :
- `components/icons/Circle.tsx`
- `assets/images/cercle.svg` (asset SVG source)

### ✅ Page Account mise à jour avec icône Circle
- **account.tsx** mis à jour (ligne 1-52) :
  - Import et affichage du composant `Circle` dans la page
  - Layout avec `flexDirection: "row"` :
    - Colonne gauche (flex: 1) : bouton de déconnexion avec bordure droite
    - Colonne droite (flex: 5) : affichage du cercle SVG avec padding
  - Style `mainView` avec fond blanc et flexDirection row

**Fichier modifié** :
- `app/(tabs)/account.tsx` (ajout du composant Circle + restructuration layout)

## 🎉 Fonctionnalités complètes
- ✅ Système d'authentification complet (login/register/logout)
- ✅ Gestion des tokens et persistance de session
- ✅ Navigation conditionnelle automatique
- ✅ Formulaire de création de parcelle avec authentification
- ✅ Page Account avec icône SVG et bouton de déconnexion

---

## Session : Résolution problème d'insertion des parcelles

### ❌ Problème initial : Les parcelles ne s'insèrent pas en base de données
- Erreur CORS : `Access-Control-Allow-Origin` manquant
- Token JWT invalide lors de la validation
- Données JSON non parsées correctement côté backend
- Header `Authorization` non passé au script PHP

### ✅ Solution 1 : Configuration CORS dans .htaccess (Backend)
**Fichier modifié** : `C:\Users\User\Code\tuto-slimphp\public\.htaccess`
- Ajout des en-têtes CORS (lignes 7-13) :
  ```apache
  <IfModule mod_headers.c>
      Header always set Access-Control-Allow-Origin "*"
      Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, PATCH, OPTIONS"
      Header always set Access-Control-Allow-Headers "X-Requested-With, Content-Type, Accept, Origin, Authorization"
      Header always set Access-Control-Allow-Credentials "true"
  </IfModule>
  ```
- Gestion des requêtes OPTIONS (preflight CORS) avec RewriteCond (lignes 18-20)

### ✅ Solution 2 : Passage du header Authorization (Backend)
**Fichier modifié** : `C:\Users\User\Code\tuto-slimphp\app\routes.php` (lignes 112-129)
- Parsing du JSON : `$data = $request->getParsedBody(); $_POST = $data ?? [];`
- Passage explicite du header Authorization à `$_SERVER['HTTP_AUTHORIZATION']`
- Permet au script `store.php` d'accéder au token JWT

### ✅ Solution 3 : Clé secrète JWT hardcodée (Backend)
**Fichier modifié** : `C:\Users\User\Code\tuto-slimphp\app\auth\JwtManager.php` (lignes 15-20)
- **Problème** : La clé secrète était différente entre la génération du token (login) et la validation (création parcelle)
  - Login : utilisait `$_ENV['JWT_SECRET']` (non défini → clé par défaut)
  - Création parcelle : utilisait aussi `$_ENV['JWT_SECRET']` mais avec une valeur potentiellement différente
- **Solution** : Hardcoder la clé secrète pour garantir la cohérence
  ```php
  $this->secretKey = 'my-super-secret-jwt-key-2024-florian';
  ```
- **Important** : Nécessite de se déconnecter/reconnecter pour obtenir un nouveau token généré avec la nouvelle clé

### ✅ Solution 4 : Chargement des variables d'environnement (Backend)
**Fichier modifié** : `C:\Users\User\Code\tuto-slimphp\public\index.php` (lignes 15-16)
- Ajout de `require __DIR__ . '/../config/env.php';`
- Permet de charger les variables d'environnement au démarrage (même si non utilisées actuellement)

### ✅ Solution 5 : Amélioration du logging et debug (Backend)
**Fichier modifié** : `C:\Users\User\Code\tuto-slimphp\app\parcelle\store.php`
- Ajout de logs détaillés :
  - `error_log("POST data: " . print_r($_POST, true));` (ligne 10)
  - `error_log("Authorization header: " . $authHeader);` (ligne 23)
  - Logs lors de la validation du token (succès/échec)
  - `error_log("Parcelle créée avec succès - ID: " . $parcelId);` (ligne 65)
- Messages d'erreur plus détaillés avec `debug_post` et `debug_server`
- Retour de l'ID de la parcelle créée dans la réponse JSON

**Fichier modifié** : `C:\Users\User\Code\tuto-slimphp\app\auth\JwtManager.php`
- Logs détaillés lors de la validation du token (lignes 39-51) :
  - Clé secrète utilisée (premiers 10 caractères)
  - Messages d'erreur spécifiques (token expiré, signature invalide, autre erreur)

### ✅ Solution 6 : Amélioration du logging côté Frontend
**Fichier modifié** : `C:\Users\User\Desktop\Stage\word-converter\components\NewParcel.tsx` (lignes 14-49)
- Logs détaillés :
  - Données envoyées : `console.log("Données envoyées:", JSON.stringify(value, null, 2));`
  - Token reçu : `console.log("Token reçu:", token);`
  - Status et headers de la réponse
  - Réponse brute avant parsing JSON
  - Réponse parsée
- Gestion des erreurs de parsing JSON avec try/catch
- Affichage d'alertes pour informer l'utilisateur (succès/échec)

### 📋 Fichiers modifiés (Backend - à déployer sur https://devflorian.cornillet.com)
1. `public/.htaccess` - Configuration CORS
2. `public/index.php` - Chargement des variables d'environnement
3. `app/routes.php` - Parsing JSON + passage du header Authorization
4. `app/parcelle/store.php` - Logs détaillés + messages d'erreur améliorés
5. `app/auth/JwtManager.php` - Clé secrète hardcodée + logs de validation

### 📋 Fichiers modifiés (Frontend)
1. `components/NewParcel.tsx` - Logs détaillés + gestion d'erreurs améliorée

### 🎉 RÉSULTAT : Insertion de parcelles fonctionnelle !
- ✅ CORS configuré et fonctionnel
- ✅ Données JSON correctement parsées côté backend
- ✅ Header Authorization passé et utilisé pour valider le token
- ✅ Token JWT validé avec succès
- ✅ Parcelles insérées dans la base de données
- ✅ Logs détaillés pour faciliter le debug

### ⚠️ Points importants
- **Token JWT** : Expire après 24 heures → nécessite de se reconnecter
- **Clé secrète JWT** : Hardcodée à `'my-super-secret-jwt-key-2024-florian'`
- **Reconnexion obligatoire** : Après changement de la clé secrète JWT, il faut se déconnecter/reconnecter pour obtenir un nouveau token valide