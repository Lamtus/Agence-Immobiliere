
---

## Installation et lancement

### Backend (Spring Boot)

1. **Prérequis** : Java 17+, Maven, une base de données (H2, MySQL, etc.)
2. **Configuration** : Modifier `application.properties` selon votre environnement (DB, JWT secret, etc.)
3. **Installation** :
   ```bash
   cd backend
   mvn clean install
   ```
4. **Lancement** :
   ```bash
   mvn spring-boot:run
   ```
   L’API sera disponible sur `http://localhost:8080/`.

### Frontend (Angular)

1. **Prérequis** : Node.js, npm
2. **Installation** :
   ```bash
   cd frontend
   npm install
   ```
3. **Lancement** :
   ```bash
   ng serve
   ```
   L’application sera accessible sur `http://localhost:4200/`.

---

## Principaux modules et composants

### Backend

- **web/controller/** : Contrôleurs REST (`AnnonceController`, `ImageController`, `AdminController`, `AuthenticationController`)
- **dao/models/** : Entités JPA (`Annonce`, `Admin`, `Categorie`, `TypeBien`)
- **dao/repositories/** : Interfaces JPA pour accès aux données
- **security/** : Gestion JWT, filtres de sécurité, service utilisateur personnalisé
- **config/SecurityConfig.java** : Configuration centrale de la sécurité (routes publiques/protégées, CORS, etc.)

### Frontend

- **annonces/** : Liste et recherche d’annonces
- **annonce-details/** : Détail d’une annonce
- **annonce-view/** : Galerie d’images, navigation
- **edit-annonce/** : Formulaire d’ajout/édition
- **services/** : Services pour l’API, l’authentification, la gestion des images
- **guards/** : Protection des routes réservées aux admins

---

## Sécurité

- Authentification basée sur JWT (JSON Web Token)
- Filtres pour protéger les routes sensibles côté backend
- Chiffrement des mots de passe avec BCrypt
- CORS configuré pour autoriser le frontend Angular

---

## API REST

- **/api/auth/** : Authentification (login, logout)
- **/api/annonces/** : CRUD sur les annonces
- **/api/images/** : Téléversement et récupération d’images
- **/api/admins/** : Gestion des administrateurs

---

## Auteurs

- Projet réalisé par Lamti Ahmed

---
