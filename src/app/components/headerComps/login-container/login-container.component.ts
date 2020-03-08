import { Component, OnInit, Input } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { LogState } from "../../../app.state";
import * as loggedActions from "../../../actions/isLogged.actions";

@Component({
  selector: "app-login-container",
  templateUrl: "./login-container.component.html",
  styleUrls: ["./login-container.component.css"]
})
export class LoginContainerComponent implements OnInit {
  loggedUser;
  @Input() userName;
  constructor(private store: Store<LogState>) {
    store.select("isLogged").subscribe(data => (this.loggedUser = data));
  }

  ngOnInit() {
    console.log(this.userName);
  }
  logout() {
    this.store.dispatch(
      new loggedActions.Set_Logged({
        logged: false,
        userName: "",
        isModalOpened: false
      })
    );
    sessionStorage.removeItem("token");
  }
}
