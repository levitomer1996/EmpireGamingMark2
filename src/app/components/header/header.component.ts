import { Component, OnInit, Input } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { isLogged } from "../../models/isLogged.mode";
import { LogState } from "../../app.state";
import { LoginService } from "../../services/LoginService/login.service";
import { Set_Logged } from "../../actions/isLogged.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  showUserButtons: boolean = true;
  userLogged;
  token;

  constructor(private store: Store<LogState>, private ls: LoginService) {
    store
      .select("isLogged")
      .subscribe((data: LogState) => (this.userLogged = data));
  }

  ngOnInit(): void {
    this.ls
      .handleUserOnit({ token: sessionStorage.getItem("token") })
      .subscribe(data => (this.token = data));
    if (this.token.error.message) {
      this.store.dispatch(new Set_Logged({ logged: false, userName: "" }));
    } else {
      this.store.dispatch(
        new Set_Logged({
          logged: true,
          userName: this.token.email
        })
      );
    }
  }
}
