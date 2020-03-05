import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CartService } from "src/app/services/CartSerice/cart.service";
import { data } from "../../headerComps/modal/modal.component";
@Component({
  selector: "app-cofirmed-page",
  templateUrl: "./cofirmed-page.component.html",
  styleUrls: ["./cofirmed-page.component.css"]
})
export class CofirmedPageComponent implements OnInit {
  orderStr: string;
  constructor(private ar: ActivatedRoute, private cs: CartService) {}

  ngOnInit(): void {
    this.orderStr = this.ar.snapshot.paramMap.get("id");
    this.cs
      .getOrder(this.ar.snapshot.paramMap.get("id"))
      .subscribe(data => console.log(data));
  }
}
