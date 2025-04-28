import { Component, OnInit } from '@angular/core';
import { Annonce } from '../shared/annonce';
import { AnnonceService } from '../services/annonce.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css'],
})
export class AnnoncesComponent implements OnInit {
  errMsg!: string;
  isWaiting: boolean = true;
  isAuthenticated: boolean = false;

  // Variables pour stocker les filtres
  search = {
    place: '',        // Recherche par lieu
    categorie: '',    // Filtre par catégorie
    typeBien: '',     // Filtre par type de bien
  };

  // Déclaration des variables pour les annonces
  annonces!: Annonce[];
  annoncesFiltrees: Annonce[] = [];

  categories: string[] = ['TOUTES', 'MAISON', 'APPARTEMENT', 'VILLA','TERRAIN']; // Exemple de catégories
  typesBien: string[] = ['TOUS', 'VENTE', 'LOCATION']; // Exemple de types de bien

  constructor(
    private annoncesservice: AnnonceService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Vérification de l'état d'authentification
    this.authService.authState$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });

    // Chargement des annonces à partir du service
    this.annoncesservice.getAnnonces().subscribe({
      next: (annonces) => {
        console.log('Annonces chargées:', annonces);
        this.annonces = annonces;
        this.isWaiting = false;
        this.annoncesFiltrees = [...this.annonces];
      },
      error: (errMsg) => {
        this.errMsg = errMsg;
        this.isWaiting = false;
      }
    });
  }

  // Fonction de filtrage des annonces selon les critères
  filtrerAnnonces(): void {
    console.log('Filtrage avec:', this.search);
    this.annoncesFiltrees = this.annonces.filter(
      (annonce) => {
        const matchLocation = this.search.place === '' ||
          annonce.localisation.toLowerCase().includes(this.search.place.toLowerCase());
        
        const matchCategorie = this.search.categorie === '' || 
          this.search.categorie === 'TOUTES' || 
          annonce.categorie === this.search.categorie;
        
        const matchTypeBien = this.search.typeBien === '' || 
          this.search.typeBien === 'TOUS' || 
          annonce.typeBien === this.search.typeBien;
        
        console.log(`Annonce ${annonce.id}: location=${matchLocation}, categorie=${matchCategorie}, typeBien=${matchTypeBien}`);
        return matchLocation && matchCategorie && matchTypeBien;
      }
    );
    console.log('Résultat du filtrage:', this.annoncesFiltrees.length);
  }

  // Fonction qui supprime une annonce
  OnAnnonceDeleted(id: number) {
    console.log('Suppression de l\'annonce avec ID:', id);
    // Mettre à jour à la fois les tableaux annonces et annoncesFiltrees
    this.annonces = this.annonces.filter(annonce => annonce.id !== id);
    this.annoncesFiltrees = this.annoncesFiltrees.filter(annonce => annonce.id !== id);
  }

  AddAnnonce(){
    this.router.navigateByUrl('/annonces/edit/-1')
  }
}
