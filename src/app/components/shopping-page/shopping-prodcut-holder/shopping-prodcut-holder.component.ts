import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/products.model";
import { ProductsService } from "src/app/services/products.service";
import { CartService } from "src/app/services/CartSerice/cart.service";
import { Store } from "@ngrx/store";
import { LogState, CartState } from "src/app/app.state";
import { Observable } from "rxjs";
import { interiorProduct } from "src/app/models/cartProduct.model";
import * as cartActions from "../../../actions/cart.actions";
import { promise } from "protractor";

@Component({
  selector: "app-shopping-prodcut-holder",
  templateUrl: "./shopping-prodcut-holder.component.html",
  styleUrls: ["./shopping-prodcut-holder.component.css"]
})
export class ShoppingProdcutHolderComponent implements OnInit {
  products: Product[];
  array = [];
  cartProds: Observable<interiorProduct[]>;
  logState: any;
  constructor(
    private ps: ProductsService,
    private cs: CartService,
    private logStore: Store<LogState>,
    private cartStore: Store<CartState>
  ) {
    this.cartProds = this.cartStore.select("cart");
    logStore
      .select("isLogged")
      .subscribe((data: LogState) => (this.logState = data));
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
    });
  }

  AddToCartChecker(cart) {
    new Promise((reso, rej) => {
      this.cs.getUserCart({ userName: cart.userOwner }).subscribe(data => {
        if (data.prod.some(p => p._id === cart.product)) {
          rej(`${cart.product} is already inside.`);
        } else {
          this.cs.handleCart(cart).subscribe(data => console.log(data));
          this.cs
            .getProdcut({ id: cart.product })
            .subscribe((data: interiorProduct) => {
              console.log(data);
              this.cartStore.dispatch(new cartActions.GetCart(data[0]));
            });
          console.log(cart.product);

          reso(true);
        }
      });
    });
  }
  async addToCart(id: any) {
    try {
      if (this.logState.userName) {
        let cart = { product: id, userOwner: this.logState.userName };
        let pending = await this.AddToCartChecker(cart);
        console.log(pending);
      } else {
        alert("Must be logged in!");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
