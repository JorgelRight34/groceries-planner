import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSmComponent } from './navbar-sm.component';

describe('NavbarSmComponent', () => {
  let component: NavbarSmComponent;
  let fixture: ComponentFixture<NavbarSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarSmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
