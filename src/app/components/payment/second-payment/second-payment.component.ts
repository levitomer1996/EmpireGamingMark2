import { Component, OnInit } from "@angular/core";
import { TempoState, CartState, LogState } from "../../../app.state";

import { Store, select } from "@ngrx/store";
import { TempoOrder } from "src/app/models/tempo.model";
import { data } from "../../headerComps/modal/modal.component";
import { CartService } from "../../../services/CartSerice/cart.service";
import { Router } from "@angular/router";
import * as cartActions from "../../../actions/cart.actions";
import { Observable } from "rxjs";
import { isLogged } from "src/app/models/isLogged.mode";
import { Set_Logged } from "src/app/actions/isLogged.actions";
@Component({
  selector: "app-second-payment",
  templateUrl: "./second-payment.component.html",
  styleUrls: ["./second-payment.component.css"]
})
export class SecondPaymentComponent implements OnInit {
  tempo: TempoOrder;
  products: [];
  response;
  isLogged;
  // isConfirmed: boolean = false;
  constructor(
    private store: Store<TempoState>,
    private logStore: Store<LogState>,
    private cs: CartService,
    private router: Router,
    private cartStore: Store<CartState>
  ) {
    logStore.select("isLogged").subscribe(data => {
      this.isLogged = data;
    });
    store.select("tempo").subscribe((data: TempoOrder) => {
      this.tempo = data;
    });
    this.products = this.tempo.products;
    setTimeout(() => {
      console.log(this.isLogged);
    }, 3000);
  }

  ngOnInit(): void {}
  handleSumbit(newOrder) {
    this.cs.deleteCart({ userName: this.isLogged.userName });
    this.cartStore.dispatch(new cartActions.RemoveAll());
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
