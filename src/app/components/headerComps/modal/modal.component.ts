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
  isOpenedOnce = false;
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
    console.log(this.isOpenedOnce);
    if (!this.isOpenedOnce) {
      let user = { userName: this.cartData.userName };
      this.cs.getUserCart(user).subscribe(data => {
        data.forEach(p => this.cartStore.dispatch(new cartActions.GetCart(p)));
      });
    }
    this.isOpenedOnce = true;
  }

  removeFromCart(id) {
    let product = { userOwner: this.cartData.userName, product: id };
    this.cs.revmoveFromCart(product).subscribe(data => {
      console.log(data);
    });
    const index = this.products.indexOf(id);
    console.log(index);
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
