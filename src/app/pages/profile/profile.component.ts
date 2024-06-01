import { Component, inject } from '@angular/core';
import { AuthFacade } from '../../facades';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthHeadComponent } from "../auth/auth-head/auth-head.component";



@Component({
    selector: 'alte-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    imports: [
        AsyncPipe,
        RouterOutlet,
        AuthHeadComponent
    ]
})
export class ProfileComponent {
  
  
}


