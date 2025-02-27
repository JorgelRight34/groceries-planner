import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportGroceryListComponent } from './export-grocery-list.component';

describe('ExportGroceryListComponent', () => {
  let component: ExportGroceryListComponent;
  let fixture: ComponentFixture<ExportGroceryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportGroceryListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportGroceryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
