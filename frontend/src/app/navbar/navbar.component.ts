import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isAuth : boolean = false;

  constructor(private authservice : AuthService, private router: Router){}
  ngOnInit(): void {
    this.authservice.authState$.subscribe(
      (isauth:boolean)=>{this.isAuth=isauth}
    );
  }
  signOut(){
    this.authservice.signOut().subscribe({
      next: () => {
        this.router.navigate(['/signin']);
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion:', error);
      }
    });
  }

  onLogout() {
    this.signOut();
  }

}
