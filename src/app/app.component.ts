import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { LogState } from "./app.state";
import { LoginService } from "./services/LoginService/login.service";
import * as loggedActions from "./actions/isLogged.actions";

class OninitRes {
  token: any;
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "EmpireGaming";
  loggedUser;

  constructor(private store: Store<LogState>, private ls: LoginService) {
    store.select("isLogged").subscribe(data => (this.loggedUser = data));
  }

  ngOnInit() {
    this.ls
      .handleUserOnit({ token: sessionStorage.getItem("token") })
      .subscribe((data: OninitRes) => {
        if (!data.token) {
          console.log("User not logged in.");
        } else {
          this.store.dispatch(
            new loggedActions.Set_Logged({
              logged: true,
              userName: data.token.email,
              isModalOpened: false
            })
          );
        }
      });
  }
}
