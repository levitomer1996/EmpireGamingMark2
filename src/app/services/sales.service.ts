import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Sale } from "../models/sale";

@Injectable({
  providedIn: "root"
})
export class SalesService {
  salesURL: string = "http://localhost:3000/sales";
  constructor(private http: HttpClient) {}
  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.salesURL}`);
  }
}
