import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import { ProductsComponent } from "./components/products/products.component";
import { CheckOutComponent } from "./components/check-out/check-out.component";
import { PaymentComponent } from "./components/payment/payment.component";
import { CofirmedPageComponent } from "./components/payment/cofirmed-page/cofirmed-page.component";
import { ShoppingPageComponent } from "./components/shopping-page/shopping-page.component";
import { UserPageComponent } from "./components/user-page/user-page.component";
import { MyOrdersComponent } from "./components/user-page/my-orders/my-orders.component";

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "register", component: RegisterPageComponent },
  { path: "products", component: ProductsComponent },
  { path: "payment", component: PaymentComponent },
  { path: "shopping", component: ShoppingPageComponent },
  { path: "order/:id", component: CofirmedPageComponent },
  { path: "userpage/:id", component: UserPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
