import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "../models/products.model";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/products/get`);
  }
}
