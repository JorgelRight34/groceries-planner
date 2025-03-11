import { NgModule } from "@angular/core";
import { GoogleLoginButtonComponent } from "./google-login-button/google-login-button.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { NavbarSmComponent } from "./navbar-sm/navbar-sm.component";
import { HeaderComponent } from "./header/header.component";
import { ModalComponent } from "./modal/modal.component";

@NgModule({
    imports: [HeaderComponent, NavbarComponent, NavbarSmComponent, ModalComponent, GoogleLoginButtonComponent],
    exports: [HeaderComponent, NavbarComponent, NavbarSmComponent, ModalComponent, GoogleLoginButtonComponent]
})
export class SharedModule { }