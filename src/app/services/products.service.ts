import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "../models/products.model";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/products/get`);
  }

  editProduct(product: Product) {
    return this.http.post(
      "http://localhost:3000/products/editproduct",
      product,
      httpOptions
    );
  }

  addProd(product) {
    return this.http.post(
      "http://localhost:3000/products/newproduct",
      product,
      httpOptions
    );
  }
}
