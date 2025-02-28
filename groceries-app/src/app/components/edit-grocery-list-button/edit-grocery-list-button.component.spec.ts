import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroceryListButtonComponent } from './edit-grocery-list-button.component';

describe('EditGroceryListButtonComponent', () => {
  let component: EditGroceryListButtonComponent;
  let fixture: ComponentFixture<EditGroceryListButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditGroceryListButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGroceryListButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
