import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceriesComponent } from './groceries.component';

describe('GroceriesComponent', () => {
  let component: GroceriesComponent;
  let fixture: ComponentFixture<GroceriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroceriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroceriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
