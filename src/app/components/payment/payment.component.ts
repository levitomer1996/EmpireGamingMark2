import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { stringify } from "querystring";

interface Month {
  name: string;
  num: number;
}
@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"]
})
export class PaymentComponent implements OnInit {
  selectedValue: string;
  monthes: Month[] = [
    { name: "Jan", num: 1 },
    { name: "Feb", num: 2 },
    { name: "Mar", num: 3 },
    { name: "Apr", num: 4 },
    { name: "May", num: 5 },
    { name: "Jun", num: 6 },
    { name: "Jul", num: 7 },
    { name: "Aug", num: 8 },
    { name: "Sep", num: 9 },
    { name: "Oct", num: 10 },
    { name: "Nov", num: 11 },
    { name: "Dec", num: 12 }
  ];

  yearsList = [
    2020,
    2021,
    2022,
    2023,
    2024,
    2025,
    2026,
    2027,
    2028,
    2029,
    2030
  ];
  form;
  number = new FormControl("", [Validators.required, Validators.minLength(16)]);
  constructor(private paymentForm: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.paymentForm.group({
      number: this.number,
      expMonth: String,
      expYear: Number,
      ownerF_name: String,
      ownerL_name: String
    });
  }
  getErrorMessage() {
    return this.number.hasError("required")
      ? "You must enter a value"
      : this.number.hasError("email")
      ? "Not a valid email"
      : "";
  }
}
