import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CartService } from "src/app/services/CartSerice/cart.service";
import { data } from "../../headerComps/modal/modal.component";
import { OrderConfirmedModel } from "src/app/models/confirmedOrder.model";
import { async } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { CartState } from "src/app/app.state";
@Component({
  selector: "app-cofirmed-page",
  templateUrl: "./cofirmed-page.component.html",
  styleUrls: ["./cofirmed-page.component.css"]
})
export class CofirmedPageComponent implements OnInit {
  orderStr: string;
  confirmedOrder: OrderConfirmedModel;
  constructor(private ar: ActivatedRoute, private cs: CartService) {}

  ngOnInit(): void {
    this.orderStr = this.ar.snapshot.paramMap.get("id");
    this.loadOrder();
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
      console.log(this.confirmedOrder);
    } catch (error) {}
  }
}
