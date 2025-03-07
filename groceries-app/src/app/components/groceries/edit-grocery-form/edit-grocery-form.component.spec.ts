import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroceryFormComponent } from './edit-grocery-form.component';

describe('EditGroceryFormComponent', () => {
  let component: EditGroceryFormComponent;
  let fixture: ComponentFixture<EditGroceryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditGroceryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGroceryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
