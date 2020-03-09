import { Component, OnInit } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";
import { Product } from "src/app/models/products.model";

@Component({
  selector: "app-shopping-page",
  templateUrl: "./shopping-page.component.html",
  styleUrls: ["./shopping-page.component.css"]
})
export class ShoppingPageComponent implements OnInit {
  products: Product[];
  array = [];
  constructor(private ps: ProductsService) {}

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
}
