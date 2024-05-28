import { Component, inject } from '@angular/core';
import { AuthHeadComponent } from "../auth-head/auth-head.component";
import { InputComponent } from "../../../components/input/input.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthFacade } from '../../../facades';
import { AuthPayload } from '../../../core/interfaces/auth-payload';
import { catchError, from, throwError } from 'rxjs';
import { AlertComponent } from '../../../components/alert/alert.component';
import { Router } from '@angular/router';




@Component({
    selector: 'alte-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: [
        '../auth.style.scss',
        './login.component.scss'
    ],
    imports: [AuthHeadComponent, InputComponent, ReactiveFormsModule, JsonPipe, RouterModule, AlertComponent]
})
export class LoginComponent {
    form = new FormGroup({
        email: new FormControl(Validators.required, Validators.email),
        password: new FormControl(Validators.required),
    });

    authFacade=inject(AuthFacade)
    router=inject(Router)
    
    

    errorMessage: string|null=null
    successMessage: string|null=null

    submit(){
        
        this.form.markAllAsTouched();

        if(this.form.invalid){
            return
        }

        this.errorMessage=null
        this.successMessage=null

        const {email, password}=this.form.value as {email:any, password:any}

        email.trim()
        password.trim()

        const payload: AuthPayload={
            email,
            password
        }

        this.authFacade.login(payload)
           .pipe(
              catchError(({error})=>{
                this.errorMessage=error.error.message
                return throwError(()=>error.error.message)
              })
           )
           .subscribe(res=>{
            console.log(res)
            if(res){
                this.successMessage='login succeessful';
                setTimeout(()=>{
                    this.router.navigate(['/'])
                }, 1500)
            }

           })
    }

    
}
