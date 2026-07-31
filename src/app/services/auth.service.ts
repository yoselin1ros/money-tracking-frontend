import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { ApiResponse, LoginResponse } from "../models/login.model";
import moment from "moment";
import { apiUrl } from "../shared/global";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post<ApiResponse>(apiUrl + '/auth/login', { email, password })
      .pipe(
        tap((response: ApiResponse) => {
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
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
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

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }
}