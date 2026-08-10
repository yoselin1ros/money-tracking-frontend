import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, throwError } from "rxjs";

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';

      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        // Server-side error
        switch (error.status) {
          case 400:
            errorMessage = 'Bad Request.';
            break;
          case 401:
            errorMessage = 'Unauthorized. Please log in again.';
            // Optional: Redirect to login or trigger a refresh token flow
            break;
          case 403:
            errorMessage = 'Forbidden. You do not have permission.';
            break;
          case 404:
            errorMessage = 'Resource not found.';
            break;
          case 500:
            errorMessage = 'Internal Server Error.';
            break;
          default:
            errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.error.message}`;
        }
      }

      // Log the error to the console or an external logging service
      console.error(errorMessage);

      // Show error message in snackbar
      snackBar.open(errorMessage, 'Close', { 
        duration: 5000, 
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar'] // Optional custom CSS styling
      });

      // Pass the error along to the component that initiated the request
      return throwError(() => new Error(errorMessage));
    })
  );
};