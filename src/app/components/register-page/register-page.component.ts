import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormBuilder
} from "@angular/forms";
import { RegisterService } from "src/app/services/registerService/register.service";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { ThrowStmt } from "@angular/compiler";
import { Router } from "@angular/router";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.css"]
})
export class RegisterPageComponent implements OnInit {
  cityList: SelectCity[] = [
    {
      name: "Tel-Aviv"
    },
    {
      name: "Jerusalem"
    },
    { name: "Haifa" },
    { name: "Holon" },
    { name: "Beer-Sheva" },
    { name: "Kiryan - Malachi" }
  ];
  isLinear = false;
  showResponseError: boolean = false;
  generalError: boolean = false;
  showSpinner: boolean = false;
  showStepper: boolean = true;
  showDonePage: boolean = false;

  error: string;
  registerForm;
  registerFormDetails;
  detailsForm;
  showError: boolean = false;
  //Email validator.
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  //Password validtor
  passValidator = new FormControl("", [
    Validators.required,
    Validators.minLength(6)
  ]);
  ConfirmPassValidator = new FormControl("", [Validators.required]);

  firstName = new FormControl("", [Validators.required]);
  lastName = new FormControl("", [Validators.required]);
  adress = new FormControl("", [Validators.required]);
  city = new FormControl("", [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    private Rs: RegisterService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: this.emailFormControl,
      password: this.passValidator,
      confirmPass: this.ConfirmPassValidator
    });

    this.detailsForm = this.formBuilder.group({
      f_name: this.firstName,
      l_name: this.lastName,
      adress: this.adress,
      city: this.city
    });
  }

  ngOnInit(): void {}

  getPasswordError() {
    if (this.passValidator.hasError("required")) {
      return "Password is required";
    } else if (this.passValidator.hasError("minLength")) {
      return "Password must be 6 characters or more.";
    } else if (this.registerForm.password !== this.registerForm.confirmPass) {
      this.showError = true;
    }
  }

  handleSignUp(val: object) {
    if (this.generalError) {
      this.showResponseError = true;
      setTimeout(() => {
        this.showResponseError = false;
      }, 5000);
    } else {
      this.showSpinner = true;
      this.showStepper = false;
      let newUser = { ...val, ...this.registerFormDetails };
      this.Rs.newUser(newUser).subscribe((data: ResponseRegister) => {
        if (data.next) {
          this.showSpinner = false;
          this.router.navigate(["/"]);
        } else {
          this.showStepper = true;
        }
      });
    }
  }

  handSubmit(form) {
    let userToCheck = {
      email: form.email,
      password: form.password
    };
    this.Rs.checkCheckExistance(userToCheck).subscribe(
      (response: ResponseCheckedUser) => {
        if (response.nextForm) {
          this.isLinear = false;
          this.registerFormDetails = {
            email: response.email,
            password: response.password
          };
        } else {
          this.isLinear = true;
          this.error = response.message;
          this.showResponseError = true;
          this.generalError = true;
          setTimeout(() => {
            this.showResponseError = false;
          }, 12000);
        }
      }
    );
  }
}

//Models
export class ResponseCheckedUser {
  nextForm: boolean;
  message: string;
  email: string;
  password: string;
}

export class SelectCity {
  name: string;
}

export class ResponseRegister {
  message: string;
  next: boolean;
}
