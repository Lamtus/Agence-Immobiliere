import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { authGuard } from './guards/auth.guard';
import { Annonce } from './shared/annonce';
import { AnnoncesComponent } from './annonces/annonces.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditAnnonceComponent } from './edit-annonce/edit-annonce.component';
import { AnnonceViewComponent } from './annonce-view/annonce-view.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'signin',component:SigninComponent},
  {path:'about',component:AboutComponent},
  {path:'annonces',component:AnnoncesComponent},
  {path:'annonces/edit/:id',component:EditAnnonceComponent, canActivate: [authGuard]},
  {path:'annonces/new',component:EditAnnonceComponent, canActivate: [authGuard]},
  {path:'annonces/view/:id',component:AnnonceViewComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
