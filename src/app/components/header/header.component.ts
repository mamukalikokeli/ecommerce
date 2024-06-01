import { Component, inject } from '@angular/core';
import { ButtonComponent } from "../../ui/button/button.component";
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../../facades';

@Component({
    selector: 'alte-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [
        ButtonComponent,
        RouterLink
    ]
})
export class HeaderComponent {

  authfacade=inject(AuthFacade)

  get user(){
    return this.authfacade.user
  }

  get isAuthenticated(){
    return this.authfacade.isAuthenticated
  }

logout() {

}

}
