import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ProductsService } from "../../../services/products.service";
import { Product } from "../../../models/products.model";
import { CartProduct } from "../../../models/cartProduct.model";
import { CartService } from "../../../services/CartSerice/cart.service";
import { LogState } from "../../../app.state";
import { Store, select } from "@ngrx/store";

@Component({
  selector: "app-top5",
  templateUrl: "./top5.component.html",
  styleUrls: ["./top5.component.css"]
})
export class Top5Component implements OnInit {
  products: Product[];
  array = [];
  arrayProducts = [];
  userName;
  constructor(
    private ps: ProductsService,
    private cs: CartService,
    private store: Store<LogState>
  ) {
    store
      .select("isLogged")
      .subscribe((data: LogState) => (this.userName = data));
  }

  ngOnInit(): void {
    this.ps.getProducts().subscribe(data => {
      this.products = data;
      this.products.forEach(obj => {
        this.array.push({
          id: obj._id,
          name: obj.name,
          category: obj.category,
          platform: obj.platform,
          price: obj.price,
          img: obj.img,
          time_purchase: obj.time_purchase
        });
      });
      console.log(this.array);
      this.array.sort(function(a, b) {
        return b.time_purchase - a.time_purchase;
      });
      for (let i = 0; i < 4; i++) {
        this.arrayProducts.push(this.array[i]);
      }
      console.log(this.arrayProducts);
    });
  }
  addToCart(id: any) {
    if (this.userName.logged) {
      let cart = { product: id, userOwner: this.userName.userName };
      console.log(cart);
      this.cs.handleCart(cart).subscribe(data => console.log(data));
    } else {
      alert("Must be logged in!");
    }
  }
}
