import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CartService } from "../../../services/CartSerice/cart.service";
import { LogState } from "../../../app.state";
import { Store, select } from "@ngrx/store";
import { Product } from "../../../models/products.model";

@Component({
  selector: "ngbd-modal-content",
  templateUrl: "./content.html",
  styleUrls: ["./modal.component.css"]
})
export class NgbdModalContent {
  cartData;
  products = [];
  sum: number = 0;
  constructor(
    public activeModal: NgbActiveModal,
    private cs: CartService,
    private store: Store<LogState>
  ) {
    store
      .select("isLogged")
      .subscribe((data: LogState) => (this.cartData = data));
  }
  ngOnInit() {
    let user = { userName: this.cartData.userName };
    this.cs.getUserCart(user).subscribe(data => {
      this.products = data;
    });
    for (let i = 0; i < this.products.length; i++) {
      console.log(this.products[i]);
    }
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
