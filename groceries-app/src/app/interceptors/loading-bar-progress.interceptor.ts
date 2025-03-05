import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingBarProgressService } from '../services/loading-bar-progress.service';

export const loadingBarProgressInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingBarService = inject(LoadingBarProgressService);
  let requests = 0;

  loadingBarService.show();
  requests += 1;

  return next(req).pipe(
    finalize(() => {
      requests -= 1;
      if (requests === 0) {
        loadingBarService.hide();
      }
    })
  )
};
