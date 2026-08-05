import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const idToken = authService.getToken();

  if (idToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${idToken}`
      }
    });
  }
  return next(req);
}