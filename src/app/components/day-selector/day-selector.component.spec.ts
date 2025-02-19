import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaySelectorComponent } from './day-selector.component';

describe('DaySelectorComponent', () => {
  let component: DaySelectorComponent;
  let fixture: ComponentFixture<DaySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaySelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
