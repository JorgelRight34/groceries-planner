import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroceryFormComponent } from './add-grocery-form.component';

describe('AddGroceryFormComponent', () => {
  let component: AddGroceryFormComponent;
  let fixture: ComponentFixture<AddGroceryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGroceryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGroceryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
