import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CartProduct } from "../../models/cartProduct.model";
import { Order } from "../../models/order.model";
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
  revmoveFromCart(id: any) {
    return this.http.post<any>(
      `http://localhost:3000/cart/remove`,
      id,
      httpOptions
    );
  }

  removeCart(user) {
    return this.http.post<any>(
      `http://localhost:3000/cart/removecart`,
      user,
      httpOptions
    );
  }

  checkCreditCard(details) {
    return this.http.post<any>(
      `http://localhost:3000/cart/checkcc`,
      details,
      httpOptions
    );
  }
  CreateOrder(order) {
    return this.http.post(
      `http://localhost:3000/cart/createorder`,
      order,
      httpOptions
    );
  }
  getUser(email) {
    return this.http.post(
      `http://localhost:3000/cart/temporaryorder`,
      email,
      httpOptions
    );
  }
  getOrder(id) {
    return this.http.get(`http://localhost:3000/cart/getorder/${id}`);
  }

  deleteCart(user) {
    return this.http.post(
      `http://localhost:3000/cart/deletecart`,
      user,
      httpOptions
    );
  }

  getProdcut(prod) {
    return this.http.post(
      `http://localhost:3000/cart/getprod`,
      prod,
      httpOptions
    );
  }
}
