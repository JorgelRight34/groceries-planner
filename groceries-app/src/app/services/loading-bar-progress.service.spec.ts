import { TestBed } from '@angular/core/testing';

import { LoadingBarProgressService } from './loading-bar-progress.service';

describe('LoadingBarProgressService', () => {
  let service: LoadingBarProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingBarProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
