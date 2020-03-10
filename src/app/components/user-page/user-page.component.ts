import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user-service/user.service";

@Component({
  selector: "app-user-page",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.css"]
})
export class UserPageComponent implements OnInit {
  showOrderPage: boolean;
  constructor(private us: UserService) {}

  ngOnInit(): void {}

  showMyOrder() {
    this.showOrderPage = true;
  }
}
