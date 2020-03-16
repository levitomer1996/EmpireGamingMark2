import { Component, OnInit } from "@angular/core";
import { isLogged } from "src/app/models/isLogged.mode";
import { LogState } from "src/app/app.state";
import { Store } from "@ngrx/store";

//Form
import { FormControl, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { ProductsService } from "src/app/services/products.service";
import { Product } from "src/app/models/products.model";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent implements OnInit {
  platformList = [
    { name: "Playstation 4", value: "Playstation 4" },
    { name: "Xbox One", value: "xboxone" },
    { name: "PC", value: "PC" }
  ];
  addForm;
  name = new FormControl("", [Validators.required]);
  category = new FormControl("", [Validators.required]);
  platform = new FormControl("", [Validators.required]);
  price = new FormControl("", [Validators.required]);
  img = new FormControl("", [Validators.required]);
  alertType = "success";
  ShowSuccess: boolean = false;
  msg: string;
  loggedUser: isLogged;
  constructor(
    private store: Store<LogState>,
    private ps: ProductsService,
    private form: FormBuilder
  ) {
    store.select("isLogged").subscribe(data => (this.loggedUser = data));
    this.addForm = this.form.group({
      name: this.name,
      category: this.category,
      platform: this.platform,
      price: this.price,
      img: this.img
    });
  }

  ngOnInit(): void {}
  addProduct(val) {
    console.log(val);
    this.ps.addProd(val).subscribe((response: response) => {
      this.msg = response.msg;
      this.ShowSuccess = true;
    });
  }
}
export interface response {
  msg: string;
}
interface Alert {
  type: string;
  message: string;
}
