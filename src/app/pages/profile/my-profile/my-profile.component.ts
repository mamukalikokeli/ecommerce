import { Component, inject } from '@angular/core';
import { AuthFacade } from '../../../facades/auth.facade';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'alte-my-profile',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {

  authFacade=inject(AuthFacade)

  user$=this.authFacade.getUser()

}
