import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RefItemsApiResponse } from "../models/ref-item.model";
import { apiUrl } from "../shared/global";

@Injectable({
  providedIn: 'root'
})
export class RefItemService {
  constructor(private http: HttpClient) {
  }

  getItems(categoryId: number) {
    return this.http.get<RefItemsApiResponse>(`${apiUrl}/ref-items/${categoryId}`);
  }
}
