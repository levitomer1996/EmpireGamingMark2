import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { registerForm } from "../../models/registerForm";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  addUser(user: registerForm): Observable<registerForm> {
    return this.http.post<registerForm>(
      `http://localhost:3000/users/register`,
      user,
      httpOptions
    );
  }
}
