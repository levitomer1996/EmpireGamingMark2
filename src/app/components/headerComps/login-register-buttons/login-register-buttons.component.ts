import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-login-register-buttons",
  templateUrl: "./login-register-buttons.component.html",
  styleUrls: ["./login-register-buttons.component.css"]
})
export class LoginRegisterButtonsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  moveToRegister() {
    this.router.navigate(["./register"]);
  }
}
