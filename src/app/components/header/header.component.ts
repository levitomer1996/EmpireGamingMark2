import { Component, OnInit, Input } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { isLogged } from "../../models/isLogged.mode";
import { LogState } from "../../app.state";
import { LoginService } from "../../services/LoginService/login.service";
import { Set_Logged } from "../../actions/isLogged.actions";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  showUserButtons: boolean = true;
  userLogged;
  token;

  constructor(
    private store: Store<LogState>,
    private ls: LoginService,
    private router: Router
  ) {
    store
      .select("isLogged")
      .subscribe((data: LogState) => (this.userLogged = data));
  }

  ngOnInit(): void {}
  goToShop() {
    this.router.navigate(["./shopping"]);
  }
}
