import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { stringify } from "querystring";
import { CartService } from "../../services/CartSerice/cart.service";
import { interiorProduct } from "src/app/models/cartProduct.model";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { CartState } from "../../app.state";
import { LogState } from "../../app.state";
import { OrderState } from "../../app.state";
import { TempoState } from "../../app.state";
import { resolve } from "dns";
import { rejects } from "assert";
import { Order } from "src/app/models/order.model";
import { checkCC } from "./modules";

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
  //Rendering Controls.
  showSpinner: boolean = false;
  userLogged;
  showForm: boolean;
  showSecondPage: boolean;
  Tempo;
  cartProds: interiorProduct[];
  order;
  response;
  error: string;
  showAlert = false;
  checked = false;
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
  number = new FormControl("", [
    Validators.required,
    Validators.minLength(16),
    Validators.maxLength(16)
  ]);
  constructor(
    private paymentForm: FormBuilder,
    private cs: CartService,
    private store: Store<CartState>,
    private isLogged: Store<LogState>,
    private orderState: Store<OrderState>,
    private TempoState: Store<TempoState>,
    private router: Router
  ) {
    store.select("cart").subscribe(data => {
      this.cartProds = data;
    });
    isLogged
      .select("isLogged")
      .subscribe((data: LogState) => (this.userLogged = data));

    orderState.select("order").subscribe(data => (this.order = data));
    TempoState.select("Tempo").subscribe(data => {
      this.Tempo = data;
    });
    console.log(this.Tempo);
    this.showForm = this.userLogged.logged;
  }

  ngOnInit(): void {
    this.checked = true;
    this.form = this.paymentForm.group({
      number: "",
      expMonth: String,
      expYear: Number,
      ownerF_name: String,
      ownerL_name: String,
      cvv: Number
    });
    console.log(this.cartProds);
  }

  getErrorMessage() {
    return this.number.hasError("required")
      ? "You must enter a value of 16 digit number"
      : this.number.hasError("minlength")
      ? "Number is too short, please enter 16 digital numbers."
      : "";
  }
  //Handle Submit.
  //Check if Credit card is valid.
  checkCC(details) {
    return new Promise((resolve, reject) => {
      this.cs.checkCreditCard(details).subscribe(data => {
        this.response = data;
        if (this.response.err) {
          this.error = this.response.err;
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 3000);
          this.showForm = this.userLogged.logged;
          this.showSpinner = false;
          reject();
        } else {
          resolve();
        }
      });
    });
  }
  //Create Temporary Order in MongoDB.
  createDataBaseOrder(order) {
    this.cs.CreateOrder(order).subscribe(data => console.log(data));
  }

  async handleSubmit(details) {
    try {
      this.showForm = false;
      this.showSpinner = true;
      await this.checkCC(details);
      let orderObj = {
        total: this.order.total,
        products: this.cartProds,
        userOwner: this.order.userOwner,
        lastFour: details.number.substring(12)
      };
      await this.createDataBaseOrder(orderObj);
      alert("work");
      this.showSpinner = false;
      this.showForm = false;
      this.showSecondPage = true;
      console.log(this.showSecondPage);
    } catch (error) {}
  }
}
