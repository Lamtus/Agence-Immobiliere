import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(
    private http: HttpClient,
    @Inject('BaseURL') private baseUrl: string
  ) {}

  // Upload des images pour une annonce spécifique
  uploadImagesForAnnonce(annonceId: number, files: File[]): Observable<any> {
    console.log(`Uploading ${files.length} images for annonce ID ${annonceId}`);
    
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    
    return this.http.post(`${this.baseUrl}images/annonce/${annonceId}`, formData).pipe(
      catchError(error => {
        console.error(`Error uploading images for annonce ${annonceId}:`, error);
        return throwError(() => error);
      })
    );
  }

  // Upload d'une seule image (sans lien avec une annonce)
  uploadImage(file: File): Observable<any> {
    console.log(`Uploading single image: ${file.name}`);
    
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post(`${this.baseUrl}images/upload`, formData).pipe(
      catchError(error => {
        console.error('Error uploading image:', error);
        return throwError(() => error);
      })
    );
  }

  // Cette méthode n'est pas nécessaire si vous utilisez uniquement uploadImagesForAnnonce
  // Mais je la laisse au cas où vous en auriez besoin
  uploadMultipleImages(files: File[]): Observable<any> {
    console.log(`Uploading multiple images (${files.length})`);
    
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    
    return this.http.post(`${this.baseUrl}images/upload-multiple`, formData).pipe(
      catchError(error => {
        console.error('Error uploading multiple images:', error);
        return throwError(() => error);
      })
    );
  }

  getImage(filename: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}images/${filename}`, {
      responseType: 'blob'
    }).pipe(
      catchError(error => {
        console.error(`Error getting image ${filename}:`, error);
        return throwError(() => error);
      })
    );
  }

  getImageUrl(filename: string): string {
    return `${this.baseUrl}images/${filename}`;
  }

  deleteImage(filename: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}images/${filename}`).pipe(
      catchError(error => {
        console.error(`Error deleting image ${filename}:`, error);
        return throwError(() => error);
      })
    );
  }
}
