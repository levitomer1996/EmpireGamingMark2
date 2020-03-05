import { Component, OnInit } from "@angular/core";
import { TempoState } from "../../../app.state";

import { Store, select } from "@ngrx/store";
import { TempoOrder } from "src/app/models/tempo.model";
import { data } from "../../headerComps/modal/modal.component";
import { CartService } from "../../../services/CartSerice/cart.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-second-payment",
  templateUrl: "./second-payment.component.html",
  styleUrls: ["./second-payment.component.css"]
})
export class SecondPaymentComponent implements OnInit {
  tempo: TempoOrder;
  products: [];
  response;
  // isConfirmed: boolean = false;
  constructor(
    private store: Store<TempoState>,
    private cs: CartService,
    private router: Router
  ) {
    store.select("tempo").subscribe((data: TempoOrder) => {
      this.tempo = data;
    });
    this.products = this.tempo.products;
    console.log(this.products);
    console.log(this.tempo);
  }

  ngOnInit(): void {}
  handleSumbit(newOrder) {
    let obj = {
      email: newOrder.email,
      products: newOrder.products,
      lastFour: newOrder.fourDigit,
      total: newOrder.total
    };
    this.cs
      .CreateOrder(obj)
      .subscribe(data => this.router.navigate([`./order/${data}`]));
  }
}
