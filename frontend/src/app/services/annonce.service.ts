import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Annonce } from '../shared/annonce';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Ne pas mettre le token ici, il sera ajouté par l'intercepteur
    })
  };
  constructor(private http: HttpClient,@Inject('BaseURL')private baseUrl:string) {}

  // Fonction pour mapper les données du backend vers notre modèle frontend
  private mapToAnnonce(data: any): Annonce {
    return new Annonce(
      data.id,
      data.titre || 'Sans titre',
      data.description || 'Pas de description',
      data.superficie || 0,
      data.nombre_de_pieces || 0,
      data.localisation || 'Non spécifié',
      data.prix || 0,
      data.photos || [],
      data.contact || 'Non spécifié',
      data.typeBien || 'Non spécifié',
      data.categorie || 'Non spécifié'
    );
  }

  getAnnonces(): Observable<Annonce[]> {
    return this.http.get<any[]>(`${this.baseUrl}annonces`).pipe(
      map(data => data.map(item => this.backendToFrontend(item)))
    );
  }

  getAnnonceById(id: number): Observable<Annonce> {
    return this.http.get<any>(`${this.baseUrl}annonces/${id}`).pipe(
      map(data => this.backendToFrontend(data))
    );
  }

  addAnnonce(annonce: Annonce): Observable<Annonce> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Conversion manuelle pour le backend
    const backendData = this.frontendToBackend(annonce);
    
    // Suppression de l'ID pour la création
    if (annonce.id === 0) {
      const { id, ...dataWithoutId } = backendData;
      
      console.log('Données envoyées au backend:', dataWithoutId);
      
      return this.http.post<any>(`${this.baseUrl}annonces`, dataWithoutId, httpOptions).pipe(
        map(response => this.backendToFrontend(response)),
        catchError(error => {
          console.error('Erreur HTTP dans addAnnonce:', error);
          return throwError(() => error);
        })
      );
    } else {
      console.log('Données envoyées au backend:', backendData);
      
      return this.http.post<any>(`${this.baseUrl}annonces`, backendData, httpOptions).pipe(
        map(response => this.backendToFrontend(response)),
        catchError(error => {
          console.error('Erreur HTTP dans addAnnonce:', error);
          return throwError(() => error);
        })
      );
    }
  }

  updateAnnonce(id: number, annonce: Annonce): Observable<Annonce> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // Conversion manuelle pour le backend
    const backendData = this.frontendToBackend(annonce);
    console.log('Données de mise à jour envoyées au backend:', backendData);
    
    return this.http.put<any>(`${this.baseUrl}annonces/${id}`, backendData, httpOptions).pipe(
      map(response => this.backendToFrontend(response)),
      catchError(error => {
        console.error('Erreur HTTP dans updateAnnonce:', error);
        return throwError(() => error);
      })
    );
  }

  deleteAnnonce(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}annonces/${id}`).pipe(
      catchError(error => {
        console.error('Erreur HTTP dans deleteAnnonce:', error);
        return throwError(() => error);
      })
    );
  }

  searchAnnonces(params: {
    prixMax?: number,
    nombrePieces?: number,
    surfaceMin?: number,
    localisation?: string
  }): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(`${this.baseUrl}annonces/recherche`, {
      params: { ...params }
    });
  }

  // Méthode pour convertir du format frontend vers backend
  private frontendToBackend(annonce: Annonce): any {
    return {
      id: annonce.id,
      titre: annonce.titre,
      description: annonce.description,
      superficie: annonce.superficie,
      nombre_de_pieces: annonce.pieces, // Conversion du nom du champ
      localisation: annonce.localisation,
      prix: annonce.prix,
      photos: annonce.photos,
      contact: annonce.contact,
      typeBien: annonce.typeBien,
      categorie: annonce.categorie
    };
  }

  // Méthode pour convertir du format backend vers frontend
  private backendToFrontend(data: any): Annonce {
    return new Annonce(
      data.id || 0,
      data.titre || '',
      data.description || '',
      data.superficie || 0,
      data.nombre_de_pieces || 0, // Conversion du champ
      data.localisation || '',
      data.prix || 0,
      data.photos || [],
      data.contact || '',
      data.typeBien || '',
      data.categorie || ''
    );
  }
}
