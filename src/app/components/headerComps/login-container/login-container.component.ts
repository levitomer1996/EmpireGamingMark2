import { Component, OnInit, Input } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { LogState, CartState } from "../../../app.state";
import * as loggedActions from "../../../actions/isLogged.actions";
import * as cartActions from "../../../actions/cart.actions";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-container",
  templateUrl: "./login-container.component.html",
  styleUrls: ["./login-container.component.css"]
})
export class LoginContainerComponent implements OnInit {
  loggedUser;
  isAdmin: boolean;
  @Input() userName;
  hrefLink;
  adminHref: string;

  constructor(
    private store: Store<LogState>,
    private cartStore: Store<CartState>,
    private router: Router
  ) {
    store.select("isLogged").subscribe(data => (this.loggedUser = data));
  }

  async ngOnInit() {
    try {
      this.adminHref = `adminpanel/${this.userName}`;

      this.hrefLink = `userpage/${this.userName}`;
      await this.adminHref;
      await this.hrefLink;
      await this.loggedUser;
      this.isAdmin = this.loggedUser.isAdmin;
    } catch (error) {}
  }
  logout() {
    this.cartStore.dispatch(new cartActions.RemoveAll());
    this.store.dispatch(
      new loggedActions.Set_Logged({
        logged: false,
        userName: "",
        isModalOpened: false,
        isAdmin: false
      })
    );
    this.cartStore.dispatch(new cartActions.RemoveAll());
    sessionStorage.removeItem("token");
  }
  goToUser() {
    this.router.navigate([`${this.hrefLink}`]);
  }
  goToAdmin() {
    this.router.navigate([`${this.adminHref}`]);
  }
}
