import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { loginForm } from "../../models/loginForm";
import { token } from "../../models/handleHeaderOnit";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private http: HttpClient) {}

  userLogin(user: loginForm): Observable<loginForm> {
    return this.http.post<loginForm>(
      `http://localhost:3000/users/login`,
      user,
      httpOptions
    );
  }

  handleUserOnit() {
    return this.http.get(`http://localhost:3000/users/oninit`, {
      withCredentials: true
    });
  }
}
