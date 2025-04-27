import { Component, EventEmitter, Inject, Input, Output, OnInit } from '@angular/core';
import { Annonce } from '../shared/annonce';
import { AnnonceService } from '../services/annonce.service';
import { ImageService } from '../services/image.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-annonce-details',
  templateUrl: './annonce-details.component.html',
  styleUrls: ['./annonce-details.component.css']
})
export class AnnonceDetailsComponent implements OnInit {

  @Input() annonce!: Annonce;
  @Input() isAuthenticated = false;
  isLoading = false;
  @Output() annonceDeleted = new EventEmitter<number>();
  imageUrl: SafeUrl | null = null;

  constructor(
    private annonceService: AnnonceService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    @Inject('BaseURL') public baseUrl: string,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.annonce?.photos?.length > 0) {
      this.loadImage(this.annonce.photos[0]);
    }
  }

  loadImage(photoName: string): void {
    this.imageService.getImage(photoName).subscribe({
      next: (blob: Blob) => {
        const objectUrl = URL.createObjectURL(blob);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'image:', error);
      } 
    });
  }

  Ondelete(id: number): void {
    if (!id) return;
    
    if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      this.isLoading = true;
      
      this.annonceService.deleteAnnonce(id).subscribe({
        next: () => {
          this.isLoading = false;
          console.log('Annonce supprimée avec succès, id:', id);
          this.annonceDeleted.emit(id);
        },
        error: (error: Error) => {
          this.isLoading = false;
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression de l\'annonce');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  getViewLink(): string[] {
    return this.annonce?.id ? ['/annonces/view', this.annonce.id.toString()] : ['/annonces'];
  }
}
