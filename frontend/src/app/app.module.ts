import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AnnoncesComponent } from './annonces/annonces.component';
import { AnnonceDetailsComponent } from './annonce-details/annonce-details.component';
import { SigninComponent } from './signin/signin.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BaseURL } from './shared/baseURL';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditAnnonceComponent } from './edit-annonce/edit-annonce.component';
import { AnnonceViewComponent } from './annonce-view/annonce-view.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/AuthInterceptor';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    AnnoncesComponent,
    AnnonceDetailsComponent,
    SigninComponent,
    FooterComponent,
    NavbarComponent,
    EditAnnonceComponent,
    AnnonceViewComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: 'BaseURL', useValue: BaseURL },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
