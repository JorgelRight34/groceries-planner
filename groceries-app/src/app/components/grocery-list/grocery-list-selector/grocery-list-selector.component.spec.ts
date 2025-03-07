import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryListSelectorComponent } from './grocery-list-selector.component';

describe('GroceryListSelectorComponent', () => {
  let component: GroceryListSelectorComponent;
  let fixture: ComponentFixture<GroceryListSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroceryListSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroceryListSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
