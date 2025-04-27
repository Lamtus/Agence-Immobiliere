# Agence Immobilière

Application web de gestion d'annonces immobilières.

## Technologies utilisées

### Backend
- Java 11
- Spring Boot 2.7.x
- Spring Security
- JWT
- PostgreSQL

### Frontend
- Angular 15+
- Bootstrap

## Installation

### Backend

1. Assurez-vous d'avoir Java 11+ et Maven installés
2. Configurez la base de données PostgreSQL
3. Modifiez le fichier `backend/src/main/resources/application.properties` avec vos informations de connexion à la base de données
4. Exécutez :
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend

1. Assurez-vous d'avoir Node.js et npm installés
2. Installez Angular CLI : `npm install -g @angular/cli`
3. Exécutez :
```bash
cd frontend
npm install
ng serve
```

## Fonctionnalités

- Authentification des utilisateurs
- Gestion des annonces immobilières (CRUD)
- Upload d'images
- Recherche et filtrage des annonces


