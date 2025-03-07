import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryFormComponent } from './grocery-form.component';

describe('GroceryFormComponent', () => {
  let component: GroceryFormComponent;
  let fixture: ComponentFixture<GroceryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroceryFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GroceryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
