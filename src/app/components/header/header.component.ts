import {Component, inject} from '@angular/core';
import {ButtonComponent} from "../../ui/button/button.component";
import {RouterLink} from "@angular/router";
import {AuthFacade} from "../../facades";

@Component({
  selector: 'alte-header',
  standalone: true,
  imports: [
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  authFacade = inject(AuthFacade)

  get user() {
    return this.authFacade.user
  }

  get isAuthenticated() {
    return this.authFacade.isAuthenticated
  }

  logout() {
    this.authFacade.logout()
  }
}