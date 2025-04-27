import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  nom_agence = "Chez moi"
  testimonials = [
    {
      name: 'Jean Dupont',
      message: 'Un excellent service ! L\'agence m\'a trouvé la maison de mes rêves.',
      image: './../../assets/images/tem1.jpeg'
    },
    {
      name: 'Marie Martin',
      message: 'Une équipe très professionnelle et à l\'écoute. Je recommande vivement !',
      image: './../../assets/images/tem3.jpeg'
    },
    {
      name: 'Paul Durand',
      message: 'Rapide et efficace, je suis entièrement satisfait de mon expérience avec cette agence.',
      image: './../../assets/images/tem2.jpeg'
    }
  ];
}
