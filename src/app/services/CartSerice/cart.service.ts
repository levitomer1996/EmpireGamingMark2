import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CartProduct } from "../../models/cartProduct.model";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class CartService {
  constructor(private http: HttpClient) {}
  handleCart(cart: CartProduct): Observable<CartProduct> {
    return this.http.post<CartProduct>(
      `http://localhost:3000/cart/carthandle`,
      cart,
      httpOptions
    );
  }
  getUserCart(user: any) {
    return this.http.post<any>(
      `http://localhost:3000/cart/getusercart`,
      user,
      httpOptions
    );
  }
}
