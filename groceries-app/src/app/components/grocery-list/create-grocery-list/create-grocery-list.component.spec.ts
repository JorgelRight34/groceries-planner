import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroceryListComponent } from './create-grocery-list.component';

describe('CreateGroceryListComponent', () => {
  let component: CreateGroceryListComponent;
  let fixture: ComponentFixture<CreateGroceryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGroceryListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGroceryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
