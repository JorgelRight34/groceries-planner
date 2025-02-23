import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageComponent } from './coverage.component';

describe('CoverageComponent', () => {
  let component: CoverageComponent;
  let fixture: ComponentFixture<CoverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoverageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
