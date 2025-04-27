import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup;
  isAuth: boolean = false;
  errorMessage: string = '';
  showWelcomePopup = false;
  adminName = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.authService.authState$.subscribe({
      next: (authStatus: boolean) => {
        this.isAuth = authStatus;
      }
    });

    if (this.authService.isAuthenticated()) {
      this.authService.signOut().subscribe();
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    console.log('Tentative de connexion avec:', email);

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Connexion réussie');
        console.log('Token reçu:', response.token ? (response.token.substring(0, 10) + '...') : 'aucun token');
        
        // Stocker manuellement le token pour s'assurer qu'il est correctement enregistré
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          console.log('Token stocké, vérification:', localStorage.getItem('token') ? 'présent' : 'absent');
        }
        
        this.adminName = 'Admin';
        this.showWelcomePopup = true;
        
        setTimeout(() => {
          this.showWelcomePopup = false;
          this.router.navigate(['/annonces']);
        }, 2000);
      },
      error: (err) => {
        console.error('Erreur de connexion:', err);
        this.errorMessage = 'Identifiants invalides.';
      }
    });
  }

  onSignOut(): void {
    this.authService.signOut().subscribe({
      next: () => {
        console.log('Déconnexion réussie');
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion:', error);
      }
    });
  }
}