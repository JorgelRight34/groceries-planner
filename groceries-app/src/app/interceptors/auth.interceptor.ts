import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const reqWithHeaders = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    return next(reqWithHeaders);
  }

  return next(req);
};
