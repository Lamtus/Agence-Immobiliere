import { Annonce } from "./annonce";
import { Categorie } from "./categorie";
import { TypeBien } from "./type-bien";

export const ANNONCES: Annonce[] = [
    new Annonce(1, 'Villa de luxe', 'Belle villa avec piscine', 250, 5, 'Tunis', 500000,
      ['villa1.jpg', 'villa2.jpg'], 'agent1@example.com', 'Maison', 'Vente'),
    new Annonce(2, 'Terrain agricole', 'Grand terrain idéal pour agriculture', 10000, 0, 'Bizerte', 150000,
      ['terrain1.jpg'], 'agent2@example.com', 'Terrain', 'Vente'),
    new Annonce(3, 'Appartement meublé', 'Appartement moderne bien équipé', 100, 3, 'Sousse', 1200,
      ['appart1.jpg', 'appart2.jpg'], 'agent3@example.com', 'Maison', 'Location')
  ];