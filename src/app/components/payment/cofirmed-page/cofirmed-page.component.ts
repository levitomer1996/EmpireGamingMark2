import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CartService } from "src/app/services/CartSerice/cart.service";
import { data } from "../../headerComps/modal/modal.component";
import { OrderConfirmedModel } from "src/app/models/confirmedOrder.model";
import { async } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { CartState, LogState } from "src/app/app.state";
import { Observable } from "rxjs";
import { isLogged } from "src/app/models/isLogged.mode";
import * as cartActions from "../../../actions/cart.actions";
import { interiorProduct } from "src/app/models/cartProduct.model";
@Component({
  selector: "app-cofirmed-page",
  templateUrl: "./cofirmed-page.component.html",
  styleUrls: ["./cofirmed-page.component.css"]
})
export class CofirmedPageComponent implements OnInit {
  orderStr: string;
  confirmedOrder: OrderConfirmedModel;

  isLogged;
  href: string;
  constructor(
    private logStore: Store<LogState>,
    private cartStore: Store<CartState>,
    private ar: ActivatedRoute,
    private cs: CartService,
    private router: Router
  ) {
    logStore.select("isLogged").subscribe(data => {
      this.isLogged = data;
    });

    this.href = this.isLogged.userName;
  }

  ngOnInit(): void {
    console.log(this.isLogged);
    this.orderStr = this.ar.snapshot.paramMap.get("id");
    this.loadOrder();
    this.cartStore.dispatch(new cartActions.RemoveAll());

    this.cs.removeCart({ userName: this.href }).subscribe(response => {
      console.log(response);
    });
  }

  getOrder(id) {
    return new Promise(reso => {
      this.cs.getOrder(id).subscribe((data: OrderConfirmedModel) => {
        this.confirmedOrder = data;
        reso(data);
      });
    });
  }
  async loadOrder() {
    try {
      let pending = await this.getOrder(this.ar.snapshot.paramMap.get("id"));
    } catch (error) {}
  }
}
