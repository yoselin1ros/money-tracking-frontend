import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { LoginApiResponse, LoginResponse } from "../models/login.model";
import moment from "moment";
import { apiUrl } from "../shared/global";
import { UserRequest } from "../models/user.model";
import { ApiResponse } from "../models/api-response.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post<LoginApiResponse>(apiUrl + '/auth/login', { email, password })
      .pipe(
        tap((response: LoginApiResponse) => {
          if (response.data?.accessToken) {
            this.setSession(response.data!)
          }
        })
      );
  }

  private setSession(authResult: LoginResponse): void {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.accessToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem("user", JSON.stringify(authResult.user));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user");
  }

  register(user: UserRequest) {
    return this.http.post<ApiResponse<null>>(apiUrl + '/auth/register', user)
      .pipe(
        tap((response: ApiResponse<null>) => {
          if (response.success) {
            console.log('User registered successfully');
          }
        })
      );
  }

  public isLoggedIn() {
    return !!this.getToken();
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getToken(): string | null {
    return localStorage.getItem("id_token");
  }

  getUser(): any {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  // TODO: remove???
  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }
}