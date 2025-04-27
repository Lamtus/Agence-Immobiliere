import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncesComponent } from './annonces.component';

describe('AnnoncesComponent', () => {
  let component: AnnoncesComponent;
  let fixture: ComponentFixture<AnnoncesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnoncesComponent]
    });
    fixture = TestBed.createComponent(AnnoncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
