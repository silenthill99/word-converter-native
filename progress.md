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

### 🔧 En cours : Redirection après déconnexion
**Ce qui fonctionne :**
- ✅ API backend `/logout` accessible et fonctionnelle
- ✅ Méthode `logout()` dans `apiService.ts` correcte (appelle l'API + supprime le token local)
- ✅ Token correctement supprimé après déconnexion
- ✅ État `isAuthenticated` passe bien à `false` dans le contexte
- ✅ Navigation conditionnelle implémentée dans `app/_layout.tsx` avec `useSegments`

**Ce qui ne fonctionne pas :**
- ❌ Redirection vers la landing page après déconnexion
- L'utilisateur reste bloqué dans `(tabs)` même après déconnexion

**Fichiers modifiés pendant cette session :**
- `config/api.ts` : ajout de l'endpoint LOGOUT
- `services/apiService.ts` : méthode `logout()` complète
- `app/(tabs)/account.tsx` : bouton de déconnexion avec effet hover
- `app/_layout.tsx` : navigation conditionnelle avec `useSegments` et `RootLayoutNav`
- `app/index.tsx` : suppression du useEffect de redirection (géré par _layout maintenant)
- `app/(tabs)/_layout.tsx` : nettoyé (plus de useEffect de redirection)

## 📋 À faire demain :
- **Résoudre le problème de redirection après déconnexion**
  - Le token est bien supprimé
  - L'état `isAuthenticated` est bien mis à jour
  - Mais la navigation vers `/` ne fonctionne pas depuis `(tabs)`
  - Peut-être essayer une approche différente (Redirect component, navigation guards, etc.)