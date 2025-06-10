**Objectif :**
Concevoir une architecture robuste et claire pour un SDK client-side (TypeScript) agnostique (compatible React, Angular, Vue, ou vanilla JS) facilitant l'intégration des fonctionnalités avancées d'un moteur cryptographique existant (`vaultic-crypto-engine`, développé en Rust/WASM). L'accent est mis sur :

* **Facilité d'utilisation** : abstraction élevée tout en gardant la flexibilité.
* **Simplicité et Clarté** : DX (Developer Experience) exemplaire, typesafety intégrale.
* **Extensibilité** : couvrir un maximum d'edge cases E2EE (End-to-End Encryption).
* **Identité & gestion des clés** : Enregistrement, vérification d'identités, et gestion des status clairement définis.
* **Réutilisabilité** : SDK facilement utilisable sans back-end immédiat (API plugable ultérieurement).

---

## 📌 Contexte

### 🔗 Vaultic Crypto Engine (Rust/WASM)

Tu as accès à un crypto-engine en Rust (compilé en WASM) exposant ces fonctionnalités :

* RSA (2048) & ECC (ECDSA P-256, K-256) : Génération keypair, signature/vérification.
* ECDH (P-256, K-256) : Shared secret derivation.
* Hybrid encryption (RSA + AES-GCM auto-switch selon taille du message).
* Chiffrement AES-GCM via clé dérivée (HKDF, PBKDF2).
* Protection/déprotection clés & messages (AES-GCM avec passphrase).
* WebAssembly compatible JS/TS via `@vaultic/crypto-engine`.

\[Voir README du crypto-engine pour références détaillées]

---

## 🧩 Besoin précis (Architecture SDK)

### 🔹 Objectifs SDK :

* Fournir aux développeurs frontend une interface claire (`VaulticClient`) permettant l'intégration facile et sécurisée du chiffrement E2EE.
* Gérer l'ensemble du cycle de vie cryptographique des utilisateurs finaux :

  * Enregistrement et vérification des identités utilisateur.
  * Génération, stockage local sécurisé, récupération des clés.
  * Signature, chiffrement, déchiffrement (RSA & ECC).
  * Dérivation et gestion de secrets partagés (ECDH).
* Statuts d’identité clairs (`IDENTITY_REGISTRATION_NEEDED`, `IDENTITY_VERIFICATION_NEEDED`, `READY`, etc.).
* Prévoir une gestion simple des groupes pour chiffrement partagé (équivalent à `createGroup`, `updateGroupMembers`, etc.).

---

## 📦 Stack Technique (Typesafe & Universelle) :

* **Language** : TypeScript.
* **Bundler & Build Tool** : Vite ou Rollup (recommandé).
* **Packaging** : export ESM & CommonJS.
* **State management** : Agnostique (hooks ou context utilisables simplement via wrappers).
* **Local Storage Sécurisé** : IndexedDB (via wrappers type `Dexie.js`) recommandé pour stockage sécurisé des clés.
* **Libs** : `zod` pour schema validation, `fp-ts` (optionnel) pour gestion clean des erreurs & typesafety.

---

## 📌 Exemple d'usage minimal désiré :

```ts
import { VaulticClient, VaulticIdentityStatus } from '@vaultic/sdk';

const vaultic = new VaulticClient({
  appId: 'vaultic-app-id',
  apiUrl: 'https://api.vaultic.app', // facultatif pour mocks
});

// Connexion utilisateur
const identity = await vaultic.start(userId);

// Gestion du statut de l'identité
switch (identity.status) {
  case VaulticIdentityStatus.IDENTITY_REGISTRATION_NEEDED:
    await vaultic.registerIdentity({ passphrase: userPassphrase });
    break;

  case VaulticIdentityStatus.IDENTITY_VERIFICATION_NEEDED:
    await vaultic.verifyIdentity({ passphrase: userPassphrase });
    break;

  case VaulticIdentityStatus.READY:
    console.log("Prêt à chiffrer/déchiffrer !");
    break;
}

// Chiffrement / Déchiffrement
const encrypted = await vaultic.encrypt("mon message", recipientPublicKey);
const decrypted = await vaultic.decrypt(encrypted);

// Gestion groupes (facultatif)
const groupId = await vaultic.createGroup([userId, otherUserId]);
await vaultic.addUserToGroup(groupId, newUserId);
```

---

## 📂 Structure recommandée du SDK :

```
@vaultic/sdk
│
├── src
│   ├── core                    # VaulticClient, gestion lifecycle, etc.
│   ├── crypto                  # Wrappers propres crypto engine WASM
│   ├── identity                # Gestion des identités utilisateurs
│   ├── group                   # Gestion groupes et partage de clés
│   ├── storage                 # Abstraction IndexedDB stockage clés
│   ├── types                   # Interfaces, enums, schemas Zod
│   └── utils                   # Helpers (validation, error handling, ...)
├── index.ts                    # Exports principaux
├── tests                       # Tests unitaires / intégration
├── package.json
└── README.md                   # Documentation SDK claire
```

---

## 🚦 Spécifications de l'architecture attendue de ta part :

* **Clarté et Simplicité d'usage** :

  * Minimalisme et explicité des méthodes exposées.
  * Messages d'erreur précis, typesafety stricte (interfaces/types).

* **Robustesse & Sécurité** :

  * Zéro gestion de clés non sécurisée (tout via IndexedDB encryptée).
  * Gestion claire & robuste des erreurs cryptographiques & réseau.

* **Extensibilité** :

  * Système simple d'ajout de nouveaux algorithmes crypto (future-proof).
  * Mécanisme de "plugin API" pour remplacer facilement les mocks API.

* **Testabilité** :

  * 100% test coverage avec Jest ou Vitest.
  * Mocking simple des fonctions crypto et API.

* **State Management Agnostic** :

  * Wrappers/hooks additionnels pour React/Vue facultatifs en surcouche.

---

## 📌 Exemples à prendre en compte (inspiration Tanker SDK)

Les extraits de code (React & TS) qui utilisent Tanker illustrent bien le workflow attendu par un développeur frontend. Nous souhaitons :

* Faciliter les cas courants (registration, chiffrement simple et en groupe).
* Fournir une approche plus complète (multi-curve ECC, protection clés/messages).

Tu dois aller **plus loin** que Tanker, en :

* Fournissant une intégration native IndexedDB sécurisée.
* Offrant une abstraction plus simple et complète (sans sacrifier puissance).

---

## 💡 Note pour Claude :

Sois exhaustif, très clair et pragmatique. Ce SDK doit être utilisable immédiatement par des développeurs frontend (débutants comme avancés) sans avoir à comprendre le détail cryptographique sous-jacent. L'objectif final est une intégration rapide, sécurisée, et typesafe, permettant à Vaultic de se positionner comme solution E2EE leader auprès des développeurs.

## TOUT LE CODE DOIT ETRE EN ANGLAIS
## TOUT LES COMMENTAIRES DOIVENT ETRE EN ANGLAIS
## TOUT LES NOMS DE VARIABLES DOIVENT ETRE EN ANGLAIS
## TOUT LES FONCTIONS DOIVENT ETRE EN ANGLAIS
## TOUT LES ENSEMBLES DOIVENT ETRE EN ANGLAIS
## TOUT LES TYPES DOIVENT ETRE EN ANGLAIS
## TOUT LES ENUMS DOIVENT ETRE EN ANGLAIS
## TOUT LES MESSAGES D'ERREUR DOIVENT ETRE EN ANGLAIS
## TOUT LES MESSAGES DE LOG DOIVENT ETRE EN ANGLAIS