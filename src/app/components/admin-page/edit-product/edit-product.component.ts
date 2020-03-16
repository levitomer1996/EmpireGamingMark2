import { Component, OnInit } from "@angular/core";
import { isLogged } from "src/app/models/isLogged.mode";
import { Store } from "@ngrx/store";
import { LogState } from "src/app/app.state";

import { FormControl, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { ProductsService } from "src/app/services/products.service";
import { Product } from "src/app/models/products.model";

@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.css"]
})
export class EditProductComponent implements OnInit {
  loggedUser: isLogged;
  //Handles Searching product form
  search = new FormControl("", [Validators.required]);
  searchForm;
  products: string[] = [];
  productsList: Array<Product> = [];
  filteredProducts: Observable<string[]>;
  selectedProduct: Product;

  //Handle Editing form
  editForm;
  showEditForm: boolean = false;
  name = new FormControl("", [Validators.required]);
  category = new FormControl("", [Validators.required]);
  platform = new FormControl("", [Validators.required]);
  price = new FormControl("", [Validators.required]);
  img = new FormControl("", [Validators.required]);
  showError: boolean = false;
  errorString: string = "";
  response: string = "";

  platformList = [
    { name: "Playstation 4", value: "Playstation 4" },
    { name: "Xbox One", value: "xboxone" },
    { name: "PC", value: "PC" }
  ];

  constructor(
    private store: Store<LogState>,
    private ps: ProductsService,
    private form: FormBuilder
  ) {
    store.select("isLogged").subscribe(data => (this.loggedUser = data));

    this.searchForm = this.form.group({
      searchInput: this.search
    });

    this.editForm = this.form.group({
      name: this.name,
      category: this.category,
      platform: this.platform,
      price: this.price,
      img: this.img
    });
  }

  ngOnInit(): void {
    this.ps.getProducts().subscribe((res: Array<Product>) => {
      res.forEach(prod => {
        this.productsList.push(prod);
        this.products.push(prod.name);
      });
      console.log(this.productsList);
      console.log(this.products);
    });

    this.filteredProducts = this.search.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.products.filter(street =>
      this._normalizeValue(street).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, "");
  }

  selectProduct(val: value) {
    if (this.search.hasError("required")) {
      this.errorString = "Please choose a product you would like to edit.";
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
        this.errorString = "";
      }, 3000);
    } else if (!this.productsList.some(obj => obj.name === val.searchInput)) {
      this.errorString = "Please choose product that is exist in your system.";
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
        this.errorString = "";
      }, 3000);
    } else {
      let product = this.productsList.filter(
        obj => obj.name === val.searchInput
      );
      this.selectedProduct = product[0];
      console.log(this.selectedProduct);
      this.showEditForm = true;
    }
  }
  saveProductEdits(val) {
    if (this.handleErrors()) {
      return;
    } else {
      this.showEditForm = true;
      let productToEdit: Product = {
        _id: this.selectedProduct._id,
        name: val.name,
        category: val.category,
        platform: val.platform,
        price: val.price,
        img: val.img,
        time_purchase: this.selectedProduct.time_purchase
      };
      this.ps.editProduct(productToEdit).subscribe((data: Res) => {
        this.response = data.msg;
      });
    }
  }

  //Handle errors

  handleErrors() {
    if (this.name.hasError("required")) {
      this.errorString = "Please insert name value.";
      this.showError = true;

      setTimeout(() => {
        this.showError = false;
      }, 3500);
      return true;
    } else if (this.category.hasError("required")) {
      this.errorString = "Please insert category value.";
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 3500);
      return true;
    } else if (this.platform.hasError("required")) {
      this.errorString = "Please insert platform value.";
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 3500);
      return true;
    } else if (this.price.hasError("required")) {
      this.errorString = "Please insert price value..";
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 3500);
      return true;
    } else if (this.img.hasError("required")) {
      this.errorString = "Please insert IMG link.";
      this.showError = true;
      setTimeout(() => {
        this.showError = false;
      }, 3500);
      return true;
    }
  }
}
export interface value {
  searchInput: string;
}
export interface Res {
  msg: string;
}
