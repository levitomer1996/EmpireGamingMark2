import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

export class Token {
  token: string;
}
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserOrder(token: Token) {
    return this.http.post(
      `http://localhost:3000/users/userorders`,
      token,
      httpOptions
    );
  }
}
