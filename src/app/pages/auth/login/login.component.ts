import { Component } from '@angular/core';
import { AuthHeadComponent } from "../auth-head/auth-head.component";
import { InputComponent } from "../../../components/input/input.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
    selector: 'alte-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: [
        '../auth.style.scss',
        './login.component.scss'
    ],
    imports: [AuthHeadComponent, InputComponent, ReactiveFormsModule, JsonPipe, RouterModule]
})
export class LoginComponent {
    form = new FormGroup({
        email: new FormControl(Validators.required, Validators.email),
        password: new FormControl(Validators.required),
    });

    submit(){
        console.log(this.form.value);
        this.form.markAllAsTouched();
    }
}
