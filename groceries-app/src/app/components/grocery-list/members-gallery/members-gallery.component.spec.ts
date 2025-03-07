import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersGalleryComponent } from './members-gallery.component';

describe('MembersGalleryComponent', () => {
  let component: MembersGalleryComponent;
  let fixture: ComponentFixture<MembersGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembersGalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
