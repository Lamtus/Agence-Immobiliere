import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupérer le token depuis localStorage
    const token = localStorage.getItem('token');
    console.log('Intercepteur - URL:', request.url);
    console.log('Intercepteur - Token présent:', !!token);
    
    if (token) {
      // Cloner la requête et ajouter le token
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Intercepteur - Token ajouté à la requête');
    }

    // Continuer avec la requête modifiée
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Intercepteur - Erreur HTTP:', error.status, error.message);
        
        // Ne PAS supprimer le token en cas d'erreur
        // Laisser le composant gérer cela
        
        if ((error.status === 401 || error.status === 403) && !request.url.includes('auth/login')) {
          // Rediriger vers la page de connexion uniquement si ce n'est pas déjà une requête de connexion
          console.log('Intercepteur - Redirection vers la page de connexion');
          this.router.navigate(['/signin']);
        }
        
        return throwError(() => error);
      })
    );
  }
}
