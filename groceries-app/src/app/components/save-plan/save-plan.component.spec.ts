import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePlanComponent } from './save-plan.component';

describe('SavePlanComponent', () => {
  let component: SavePlanComponent;
  let fixture: ComponentFixture<SavePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavePlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
