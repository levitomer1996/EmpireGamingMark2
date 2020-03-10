import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user-service/user.service";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.css"]
})
export class MyOrdersComponent implements OnInit {
  orders: any[];
  prodList: any[];
  constructor(private us: UserService) {}

  ngOnInit(): void {
    this.us
      .getUserOrder({ token: sessionStorage.getItem("token") })
      .subscribe((data: any) => {
        console.log(data);
        this.orders = data.orders;
      });
  }
}
