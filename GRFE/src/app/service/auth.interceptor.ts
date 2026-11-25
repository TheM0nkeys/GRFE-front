import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { API_BASE_URL } from './api.config';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthService).obterToken();
  const isLoginRequest = request.url === `${API_BASE_URL}/auth/login`;
  const isApiRequest = request.url === API_BASE_URL || request.url.startsWith(`${API_BASE_URL}/`);

  if (!token || !isApiRequest || isLoginRequest) {
    return next(request);
  }

  return next(
    request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    })
  );
};
