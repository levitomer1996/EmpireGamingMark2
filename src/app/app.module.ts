import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SearchComponent } from "./components/headerComps/search/search.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//bootstrap
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

//Material
// import { MatIconModule } from "@angular/material/icon";
// import { MatFormFieldModule } from "@angular/material/form-field";

import { A11yModule } from "@angular/cdk/a11y";

import { DragDropModule } from "@angular/cdk/drag-drop";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { MatFormFieldModule } from "@angular/material/form-field";

import { HomepageComponent } from "./components/homepage/homepage.component";
import { CarousalesComponent } from "./components/homeComps/carousales/carousales.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";

//redux
import { StoreModule } from "@ngrx/store";
import { productReducer } from "./reducers/products.reducers";
import { isLoggedReducer } from "./reducers/isLogged.reducers";
import { cartReducer } from "./reducers/Cart.reducers";
import { orderReducer } from "./reducers/Order.reducers";
import { TempoReducer } from "./reducers/Tempo.recuers";

//Credit Card
import { NgXCreditCardsModule } from "ngx-credit-cards";

import { LoginContainerComponent } from "./components/headerComps/login-container/login-container.component";
import { LoginRegisterButtonsComponent } from "./components/headerComps/login-register-buttons/login-register-buttons.component";
import { CardsLayoutComponent } from "./components/homeComps/cards-layout/cards-layout.component";
import { PlatformNavComponent } from "./components/headerComps/platform-nav/platform-nav.component";
import { ProductsComponent } from "./components/products/products.component";
import { Top5Component } from "./components/homeComps/top5/top5.component";
import {
  NgbdModalComponent,
  NgbdModalContent
} from "./components/headerComps/modal/modal.component";
import { CheckOutComponent } from "./components/check-out/check-out.component";
import { PaymentComponent } from "./components/payment/payment.component";
import { SecondPaymentComponent } from "./components/payment/second-payment/second-payment.component";
import { CofirmedPageComponent } from "./components/payment/cofirmed-page/cofirmed-page.component";
import { ShoppingPageComponent } from "./components/shopping-page/shopping-page.component";
import { CartSideNavComponent } from "./components/shopping-page/cart-side-nav/cart-side-nav.component";
import { ShoppingProdcutHolderComponent } from "./components/shopping-page/shopping-prodcut-holder/shopping-prodcut-holder.component";
import { UserPageComponent } from "./components/user-page/user-page.component";
import { MyOrdersComponent } from "./components/user-page/my-orders/my-orders.component";
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import { AdminPageComponent } from "./components/admin-page/admin-page.component";
import { AddProductComponent } from "./components/admin-page/add-product/add-product.component";
import { EditProductComponent } from "./components/admin-page/edit-product/edit-product.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    HomepageComponent,
    CarousalesComponent,
    LoginPageComponent,
    LoginContainerComponent,
    LoginRegisterButtonsComponent,
    CardsLayoutComponent,
    PlatformNavComponent,
    ProductsComponent,
    Top5Component,
    NgbdModalComponent,
    NgbdModalContent,
    CheckOutComponent,
    PaymentComponent,
    SecondPaymentComponent,
    CofirmedPageComponent,
    ShoppingPageComponent,
    CartSideNavComponent,
    ShoppingProdcutHolderComponent,
    UserPageComponent,
    MyOrdersComponent,
    RegisterPageComponent,
    AdminPageComponent,
    AddProductComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatCardModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,
    MatListModule,
    MatSidenavModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    CdkTableModule,
    MatTabsModule,
    A11yModule,
    DragDropModule,
    MatMenuModule,
    PortalModule,
    ScrollingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatStepperModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot({
      product: productReducer,
      isLogged: isLoggedReducer,
      cart: cartReducer,
      order: orderReducer,
      tempo: TempoReducer
    })
  ],
  exports: [NgbdModalComponent],
  providers: [],
  bootstrap: [AppComponent, NgbdModalComponent],
  entryComponents: [NgbdModalContent]
})
export class AppModule {}
