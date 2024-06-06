import {Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {AuthFacade} from "../../../facades";

@Component({
  selector: 'alte-my-profile',
  standalone: true,
    imports: [
        AsyncPipe
    ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {
  authFacade = inject(AuthFacade)

  user$ = this.authFacade.getUser()
}
