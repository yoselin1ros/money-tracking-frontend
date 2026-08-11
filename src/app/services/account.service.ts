import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AccountsApiResponse } from "../models/account.model";
import { apiUrl } from "../shared/global";
import { tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) {
  }

  getAccounts() {
    return this.http.get<AccountsApiResponse>(apiUrl + '/accounts')
      .pipe(
        tap((response: AccountsApiResponse) => {
          if (response.success) {
            console.log('Accounts retrieved successfully');
          }
        })
      );
  }
}