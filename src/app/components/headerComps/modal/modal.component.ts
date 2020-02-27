import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CartService } from "../../../services/CartSerice/cart.service";
import { LogState } from "../../../app.state";
import { Store, select } from "@ngrx/store";
import { Product } from "../../../models/products.model";
import { CartState } from "../../../app.state";
import { interiorProduct } from "src/app/models/cartProduct.model";
import { Observable } from "rxjs";
import * as cartActions from "../../../actions/cart.actions";
import { Set_Logged } from "../../../actions/isLogged.actions";
@Component({
  selector: "ngbd-modal-content",
  templateUrl: "./content.html",
  styleUrls: ["./modal.component.css"]
})
export class NgbdModalContent {
  cartData;
  products: Product[];
  total;
  cartProds: Observable<interiorProduct[]>;

  constructor(
    public activeModal: NgbActiveModal,
    private cs: CartService,
    private store: Store<LogState>,
    private cartStore: Store<CartState>
  ) {
    store
      .select("isLogged")
      .subscribe((data: LogState) => (this.cartData = data));
    this.cartProds = this.cartStore.select("cart");
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
        isModalOpened: true
      })
    );
  }
  removeAllProds() {
    this.cartStore.dispatch(new cartActions.RemoveAll());
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
