import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { interiorProduct } from "src/app/models/cartProduct.model";
import { Store } from "@ngrx/store";
import { CartState, LogState } from "src/app/app.state";
import * as cartActions from "../../../actions/cart.actions";
import { CartService } from "src/app/services/CartSerice/cart.service";
import { isLogged } from "src/app/models/isLogged.mode";

@Component({
  selector: "app-cart-side-nav",
  templateUrl: "./cart-side-nav.component.html",
  styleUrls: ["./cart-side-nav.component.css"]
})
export class CartSideNavComponent implements OnInit {
  showFiller: boolean = false;
  logState: any;
  total: number;
  cartProds: Observable<interiorProduct[]>;
  constructor(
    private cartStore: Store<CartState>,
    private cs: CartService,
    private logStore: Store<LogState>
  ) {
    this.cartProds = this.cartStore.select("cart");
    logStore
      .select("isLogged")
      .subscribe((data: LogState) => (this.logState = data));
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.cs
        .getUserCart({ userName: this.logState.userName })
        .subscribe(data => {
          this.total = data.total;
          data.prod.forEach(p => {
            this.cartStore.dispatch(new cartActions.GetCart(p));
          });
        });
    }, 100);
  }
}
