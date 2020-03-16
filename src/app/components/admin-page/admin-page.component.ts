import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { LogState } from "src/app/app.state";
import { isLogged } from "src/app/models/isLogged.mode";

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.css"]
})
export class AdminPageComponent implements OnInit {
  loggedUser: isLogged;
  isAdmin: boolean;
  constructor(private store: Store<LogState>) {
    store.select("isLogged").subscribe(data => (this.loggedUser = data));
  }

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.loggedUser);
    }, 2000);
  }
}
