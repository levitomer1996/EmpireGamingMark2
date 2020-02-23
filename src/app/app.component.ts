import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { LogState } from "./app.state";
import { LoginService } from "./services/LoginService/login.service";
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
    this.ls.handleUserOnit().subscribe(data => {
      console.log(data);
    });
  }
}
