import { Component } from '@angular/core';
import { AuthHeadComponent } from "../auth-head/auth-head.component";

@Component({
    selector: 'alte-recovery',
    standalone: true,
    templateUrl: './recovery.component.html',
    styleUrls:  [
        '../auth.style.scss',
        './recovery.component.scss'
    ],
    imports: [AuthHeadComponent]
})
export class RecoveryComponent {

}
