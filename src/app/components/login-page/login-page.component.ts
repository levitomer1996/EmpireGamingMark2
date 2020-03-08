import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "../../services/LoginService/login.service";
import { response } from "../../models/response";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { isLogged } from "../../models/isLogged.mode";
import { Set_Logged } from "../../actions/isLogged.actions";
import { LogState } from "../../app.state";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  email = new FormControl("", [Validators.required, Validators.email]);
  hide = true;
  form;
  response;
  showError = false;
  error: string;
  email$;
  isLogged: Observable<isLogged>;
  render;
  userLogged;

  constructor(
    private registerForm: FormBuilder,
    private router: Router,
    private ls: LoginService,
    private store: Store<LogState>
  ) {
    this.isLogged = store.select("isLogged");
    store
      .select("isLogged")
      .subscribe((data: LogState) => (this.userLogged = data));
    this.form = this.registerForm.group({
      email: "",
      password: ""
    });
  }

  ngOnInit() {
    console.log(this.userLogged);
  }
  getErrorMessage() {
    return this.email.hasError("required")
      ? "You must enter a value"
      : this.email.hasError("email")
      ? "Not a valid email"
      : "";
  }

  postUser(user) {
    return new Promise((reso, rej) => {
      this.ls.userLogin(user).subscribe(data => reso(data));
    });
  }

  async handSubmit(val) {
    try {
      let pending = await this.postUser(val);
      this.response = pending;

      if (this.response.status == 200) {
        sessionStorage.setItem("token", this.response.token);

        this.store.dispatch(
          new Set_Logged({
            logged: true,
            userName: val.email,
            isModalOpened: false
          })
        );

        this.router.navigate(["./"]);
      } else {
        this.showError = true;
        this.error = this.response.message;
        setTimeout(() => {
          this.showError = false;
        }, 3000);
      }
    } catch (error) {}
  }
}
