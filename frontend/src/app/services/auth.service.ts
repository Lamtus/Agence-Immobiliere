import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private authSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public authState$ = this.authSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject('BaseURL') private baseUrl: string
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}auth/login`, { email, mot_de_passe: password })
      .pipe(
        tap(response => {
          console.log('Réponse de connexion:', response);
          
          if (response && response.token) {
            // Stocker le token avec une durée de vie explicite pour éviter les expirations inattendues
            const expirationDate = new Date().getTime() + (60 * 60 * 1000); // 1 heure
            const tokenData = {
              value: response.token,
              expires: expirationDate
            };
            
            // Stocker le token et sa date d'expiration
            localStorage.setItem('token', response.token);
            localStorage.setItem('token_expires', expirationDate.toString());
            
            // Mettre à jour l'état d'authentification
            this.authSubject.next(true);
            
            console.log('Token stocké avec expiration:', new Date(expirationDate).toLocaleString());
          } else {
            console.error('Pas de token dans la réponse');
          }
        })
      );
  }

  signOut(): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.authSubject.next(false);
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const expiresStr = localStorage.getItem('token_expires');
    
    if (!token) return false;
    
    // Si nous avons une date d'expiration, vérifions-la
    if (expiresStr) {
      const expires = parseInt(expiresStr);
      const now = new Date().getTime();
      
      // Si le token est expiré, supprimons-le et retournons false
      if (now > expires) {
        console.log('Token expiré, suppression');
        localStorage.removeItem('token');
        localStorage.removeItem('token_expires');
        this.authSubject.next(false);
        return false;
      }
    }
    
    return true;
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  private hasValidToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
