import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { registerForm } from "../../models/registerForm";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

export class checkExistance {
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root"
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  checkCheckExistance(user: checkExistance): Observable<checkExistance> {
    return this.http.post<checkExistance>(
      `http://localhost:3000/users/checkuser`,
      user,
      httpOptions
    );
  }
  newUser(user) {
    return this.http.post(
      `http://localhost:3000/users/newuser`,
      user,
      httpOptions
    );
  }
}
