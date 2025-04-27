import { Utilisateur } from "./utilisateur";

export const UTILISATEURS: Utilisateur[] = [
    new Utilisateur(1, 'Admin', 'admin@example.com', 'admin123', 'Administrateur'),
    new Utilisateur(2, 'Client1', 'client1@example.com', 'password', 'Client')
  ];