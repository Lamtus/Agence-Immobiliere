import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from '../services/annonce.service';
import { Annonce } from '../shared/annonce';
import { AuthService } from '../services/auth.service';
import { ImageService } from '../services/image.service';
import { SafeUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-annonce-view',
  templateUrl: './annonce-view.component.html',
  styleUrls: ['./annonce-view.component.css']
})
export class AnnonceViewComponent implements OnInit {
  annonce: Annonce | null = null;
  isLoading = true;
  errorMessage = '';
  images: SafeUrl[] = [];
  currentImageIndex: number = 0;
  isAuthenticated: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private annonceService: AnnonceService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Vérification de l'état d'authentification
    this.authService.authState$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });

    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id && !isNaN(id)) {
        this.loadAnnonce(id);
      } else {
        this.errorMessage = 'ID d\'annonce invalide';
        this.isLoading = false;
      }
    });
  }

  loadAnnonce(id: number): void {
    this.annonceService.getAnnonceById(id).subscribe({
      next: (annonce) => {
        this.annonce = annonce;
        if (annonce.photos?.length) {
          this.loadImages(annonce.photos);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur:', error);
        this.errorMessage = 'Impossible de charger l\'annonce';
        this.isLoading = false;
      }
    });
  }

  loadImages(photos: string[]): void {
    photos.forEach(photo => {
      this.imageService.getImage(photo).subscribe({
        next: (blob: Blob) => {
          const objectUrl = URL.createObjectURL(blob);
          this.images.push(this.sanitizer.bypassSecurityTrustUrl(objectUrl));
        },
        error: (error) => {
          console.error('Erreur lors du chargement de l\'image:', error);
        }
      });
    });
  }

  nextImage() {
    if (this.annonce && this.annonce.photos && this.annonce.photos.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.annonce.photos.length;
    }
  }

  previousImage() {
    if (this.annonce && this.annonce.photos && this.annonce.photos.length > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.annonce.photos.length) % this.annonce.photos.length;
    }
  }

  editAnnonce() {
    if (this.annonce) {
      this.router.navigate(['/annonces/edit', this.annonce.id]);
    }
  }

  deleteAnnonce() {
    if (this.annonce && confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      this.annonceService.deleteAnnonce(this.annonce.id).subscribe({
        next: () => {
          this.router.navigate(['/annonces']);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de l\'annonce:', error);
          this.errorMessage = 'Impossible de supprimer l\'annonce';
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/annonces']);
  }
}
