import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnnonceService } from '../services/annonce.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Annonce } from '../shared/annonce';
import { ImageService } from '../services/image.service';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-annonce',
  templateUrl: './edit-annonce.component.html',
  styleUrls: ['./edit-annonce.component.css']
})
export class EditAnnonceComponent implements OnInit {
  annonce!: Annonce;
  bienForm: FormGroup;
  isLoading = false;
  selectedFiles: File[] = [];
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private annonceService: AnnonceService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.bienForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      superficie: [0, [Validators.required, Validators.min(0)]],
      pieces: [0, [Validators.required, Validators.min(0)]],
      localisation: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(0)]],
      contact: ['', Validators.required],
      typeBien: ['', Validators.required],
      categorie: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/signin']);
      return;
    }

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && id !== "-1") {
        this.loadAnnonce(+id);
      } else {
        this.initNewAnnonce();
      }
    });
  }
  private initNewAnnonce(): void {
    this.annonce = {
      id: 0,
      titre: '',
      description: '',
      superficie: 0,
      toBackendObject: () => ({
        id: this.annonce.id,
        titre: this.annonce.titre,
        description: this.annonce.description,
        superficie: this.annonce.superficie,
        pieces: this.annonce.pieces,
        localisation: this.annonce.localisation,
        prix: this.annonce.prix,
        photos: this.annonce.photos,
        contact: this.annonce.contact,
        typeBien: this.annonce.typeBien,
        categorie: this.annonce.categorie
      }),
      pieces: 0,
      localisation: '',
      prix: 0,
      photos: [],
      contact: '',
      typeBien: '',
      categorie: ''
    };
  }

  private loadAnnonce(id: number): void {
    this.isLoading = true;
    this.annonceService.getAnnonceById(id).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (annonce) => {
        this.annonce = annonce;
        this.bienForm.patchValue(annonce);
      },
      error: (error) => {
        console.error('Erreur lors du chargement de l\'annonce:', error);
        this.errorMessage = 'Erreur lors du chargement de l\'annonce';
      }
    });
  }

  onFileChange(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSubmit(): void {
    if (this.bienForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
      return;
    }

    // Vérification du token
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Vous devez être connecté pour soumettre une annonce';
      setTimeout(() => this.router.navigate(['/signin']), 2000);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Création d'une instance de la classe Annonce avec les valeurs du formulaire
    const formValues = this.bienForm.value;
    const annonceToSave = new Annonce(
      this.annonce.id,
      formValues.titre,
      formValues.description,
      formValues.superficie,
      formValues.pieces,
      formValues.localisation,
      formValues.prix,
      this.annonce.photos || [], // Garder les photos existantes pour l'instant
      formValues.contact,
      formValues.typeBien,
      formValues.categorie
    );

    console.log('Données de l\'annonce à envoyer:', annonceToSave);

    // Créer d'abord l'annonce, puis uploader les images si nécessaire
    this.saveAnnonce(annonceToSave);
  }

  private saveAnnonce(annonceToSave: Annonce): void {
    // Création ou mise à jour selon l'ID
    const observable = this.annonce.id === 0 
      ? this.annonceService.addAnnonce(annonceToSave)
      : this.annonceService.updateAnnonce(this.annonce.id, annonceToSave);

    observable.subscribe({
      next: (response) => {
        console.log('Annonce sauvegardée avec succès:', response);
        
        // Si des fichiers sont sélectionnés, uploader les images maintenant
        if (this.selectedFiles.length > 0) {
          const annonceId = response.id; // Utiliser l'ID de l'annonce créée/mise à jour
          this.uploadImages(annonceId);
        } else {
          // Si pas d'images à uploader, terminer le processus
          this.isLoading = false;
          this.errorMessage = 'Annonce sauvegardée avec succès';
          setTimeout(() => this.router.navigate(['/annonces']), 1500);
        }
      },
      error: (error) => {
        console.error('Erreur lors de la sauvegarde:', error);
        this.isLoading = false;
        if (error.status === 403) {
          this.errorMessage = 'Session expirée. Veuillez vous reconnecter.';
          setTimeout(() => this.router.navigate(['/signin']), 2000);
        } else {
          this.errorMessage = 'Erreur lors de la sauvegarde de l\'annonce';
        }
      }
    });
  }

  private uploadImages(annonceId: number): void {
    console.log(`Upload d'images pour l'annonce ID: ${annonceId}`);
    
    this.imageService.uploadImagesForAnnonce(annonceId, this.selectedFiles).subscribe({
      next: (response) => {
        console.log('Images uploadées avec succès:', response);
        this.isLoading = false;
        this.errorMessage = 'Annonce et images sauvegardées avec succès';
        setTimeout(() => this.router.navigate(['/annonces']), 1500);
      },
      error: (error) => {
        console.error('Erreur lors de l\'upload des images:', error);
        this.isLoading = false;
        // L'annonce est déjà sauvegardée, informer l'utilisateur sur le problème avec les images
        this.errorMessage = 'Annonce sauvegardée, mais erreur lors de l\'upload des images';
        setTimeout(() => this.router.navigate(['/annonces']), 3000);
      }
    });
  }
}
