import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { interiorProduct } from "src/app/models/cartProduct.model";
import { Store } from "@ngrx/store";
import { CartState, LogState, TempoState } from "src/app/app.state";
import * as cartActions from "../../../actions/cart.actions";
import * as TempoActions from "../../../actions/tempoOrder.actions";
import { CartService } from "src/app/services/CartSerice/cart.service";
import { isLogged } from "src/app/models/isLogged.mode";
import { Router } from "@angular/router";

export class userData {
  user: Object;
}
@Component({
  selector: "app-cart-side-nav",
  templateUrl: "./cart-side-nav.component.html",
  styleUrls: ["./cart-side-nav.component.css"]
})
export class CartSideNavComponent implements OnInit {
  showFiller: boolean = false;
  userResponse;
  logState: any;
  total: number;
  cartProds: Observable<interiorProduct[]>;
  constructor(
    private cartStore: Store<CartState>,
    private cs: CartService,
    private logStore: Store<LogState>,
    private orderStore: Store<TempoState>,
    private router: Router
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

  procces(email) {
    return new Promise(reso => {
      this.cs.getUser(email).subscribe((data: userData) => {
        reso(data.user);
      });
    });
  }

  async checkOut() {
    try {
      var pend = await this.procces({ email: this.logState.userName });
      this.userResponse = pend;
      console.log(this.userResponse);
      this.orderStore.dispatch(
        new TempoActions.AddTempo({
          products: this.cartProds,
          name: this.userResponse.fname + " " + this.userResponse.lname,
          total: this.total,
          city: this.userResponse.city,
          adress: this.userResponse.adress,
          email: this.userResponse.email,
          fourDigit: 1111
        })
      );
      this.router.navigate(["./payment"]);
    } catch (error) {}
  }
}
