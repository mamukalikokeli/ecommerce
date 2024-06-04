import {Component, inject} from '@angular/core';
import {AuthFacade} from "../../facades";
import {AsyncPipe} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AuthHeadComponent} from "../auth/auth-head/auth-head.component";

@Component({
  selector: 'alte-profile',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterOutlet,
    AuthHeadComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {



}