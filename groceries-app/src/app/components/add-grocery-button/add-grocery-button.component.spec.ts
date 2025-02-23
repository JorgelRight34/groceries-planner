import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroceryButtonComponent } from './add-grocery-button.component';

describe('AddGroceryButtonComponent', () => {
  let component: AddGroceryButtonComponent;
  let fixture: ComponentFixture<AddGroceryButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGroceryButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGroceryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
