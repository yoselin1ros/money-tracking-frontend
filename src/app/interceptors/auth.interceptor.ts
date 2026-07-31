import { HttpInterceptorFn } from "@angular/common/http";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const idToken = localStorage.getItem("id_token");
  if (idToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${idToken}`
      }
    });
  }
  return next(req);
}