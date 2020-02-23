import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Product } from "../../models/products.model";
import { Actions, GetProducts } from "../../actions/products.actions";
import { AppState } from "../../app.state";
import { ProductsService } from "../../services/products.service";
import { Action } from "rxjs/internal/scheduler/Action";
import { platform } from "os";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products: Observable<Product[]>;
  constructor(private store: Store<AppState>, private ps: ProductsService) {
    this.products = store.select("product");
  }

  addProduct(id, name, category, platform, price, img, time_purchase) {
    this.store.dispatch(
      new GetProducts({
        _id: id,
        name: name,
        category: category,
        platform: platform,
        price: price,
        img: img,
        time_purchase: time_purchase
      })
    );
  }

  ngOnInit(): void {
    this.ps
      .getProducts()
      .subscribe(data =>
        data.forEach(product => this.store.dispatch(new GetProducts(product)))
      );
  }
}
