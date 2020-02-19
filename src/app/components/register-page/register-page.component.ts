import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormControl, Validators, FormBuilder } from "@angular/forms";
import { registerForm } from "../../models/registerForm";
import { RegisterService } from "../../services/registerService/register.service";
import { Router } from "@angular/router";
import { promise } from "protractor";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.css"]
})
export class RegisterPageComponent implements OnInit {
  @Output() newUser: EventEmitter<any> = new EventEmitter();

  //Validators
  email = new FormControl("", [Validators.required, Validators.email]);
  form;

  constructor(
    private rs: RegisterService,
    private registerForm: FormBuilder,
    private router: Router
  ) {
    this.form = this.registerForm.group({
      email: "",
      password: "",
      fname: "",
      lname: "",
      city: "",
      adress: ""
    });
  }

  ngOnInit() {}
  getErrorMessage() {
    return this.email.hasError("required")
      ? "You must enter a value"
      : this.email.hasError("email")
      ? "Not a valid email"
      : "";
  }

  postUser(user) {
    return new Promise((reso, rej) => {
      this.rs.addUser(user).subscribe(data => {
        reso(data);
      });
    });
  }

  async handSubmit(val) {
    try {
      let pending = await this.postUser(val);
      console.log(pending);
      if (pending.status == 200) {
        this.router.navigate(["./"]);
      } else if (pending.status == 500) {
        alert(pending.message);
      }
    } catch (err) {}
  }
}
