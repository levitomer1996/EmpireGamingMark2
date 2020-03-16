import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CartService } from "../../../services/CartSerice/cart.service";
import { LogState, TempoState } from "../../../app.state";
import { OrderState } from "../../../app.state";

import { Store, select } from "@ngrx/store";
import { Product } from "../../../models/products.model";
import { CartState } from "../../../app.state";
import { interiorProduct } from "src/app/models/cartProduct.model";
import { Observable, from } from "rxjs";
//Actions
import * as cartActions from "../../../actions/cart.actions";
import * as orderActions from "../../../actions/orders.actions";
import * as TempoActions from "../../../actions/tempoOrder.actions";
import { Set_Logged } from "../../../actions/isLogged.actions";

import { Router, Data } from "@angular/router";
import { Order } from "src/app/models/order.model";
import { TempoOrder } from "../../../models/tempo.model";

//User Response Model
export class data {
  user: Object;
}

@Component({
  selector: "ngbd-modal-content",
  templateUrl: "./content.html",
  styleUrls: ["./modal.component.css"]
})
export class NgbdModalContent {
  cartData;
  userReponse;
  order: Observable<TempoOrder>;
  products: Product[];
  total;
  cartProds: Observable<interiorProduct[]>;
  prodList;
  constructor(
    public activeModal: NgbActiveModal,
    private cs: CartService,
    private store: Store<LogState>,
    private cartStore: Store<CartState>,
    private orderStore: Store<TempoState>,
    private router: Router
  ) {
    store
      .select("isLogged")
      .subscribe((data: LogState) => (this.cartData = data));
    cartStore.select("cart").subscribe(data => (this.prodList = data));
    this.cartProds = this.cartStore.select("cart");
    this.order = this.orderStore.select("tempo");
  }
  ngOnInit() {
    let user = { userName: this.cartData.userName };
    this.cs.getUserCart(user).subscribe(data => {
      this.total = data.total;
      data.prod.forEach(p => {
        this.cartStore.dispatch(new cartActions.GetCart(p));
      });
    });

    this.store.dispatch(
      new Set_Logged({
        logged: true,
        userName: this.cartData.userName,
        isModalOpened: true,
        isAdmin: this.cartData.isAdmin
      })
    );
  }
  removeAllProds() {
    this.cartStore.dispatch(new cartActions.RemoveAll());
  }

  procces(email) {
    return new Promise(reso => {
      this.cs.getUser(email).subscribe((data: Data) => {
        reso(data.user);
      });
    });
  }
  async checkOut() {
    try {
      var pend = await this.procces({ email: this.cartData.userName });
      this.userReponse = pend;
      console.log(this.userReponse);
      this.orderStore.dispatch(
        new TempoActions.AddTempo({
          products: this.prodList,
          name: this.userReponse.fname + " " + this.userReponse.lname,
          total: this.total,
          city: this.userReponse.city,
          adress: this.userReponse.adress,
          email: this.userReponse.email,
          fourDigit: 1111
        })
      );

      this.router.navigate(["./payment"]);
    } catch (error) {}
  }

  removeFromCart(obj, index) {
    this.cartStore.dispatch(new cartActions.RemoveSpecific(index));
    this.total = this.total - obj.price;
    let product = { userOwner: this.cartData.userName, product: obj._id };
    this.cs.revmoveFromCart(product).subscribe(data => {
      console.log(data);
    });
  }
}

@Component({
  selector: "ngbd-modal-component",
  templateUrl: "./modal.component.html"
})
export class NgbdModalComponent {
  constructor(private modalService: NgbModal) {}
  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.userName = "World";
  }
}
