import { Component, OnDestroy, inject, input } from '@angular/core';
import { AuthHeadComponent } from "../auth-head/auth-head.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { InputComponent } from '../../../components/input/input.component';
import { AuthService } from '../../../services/auth.service';
import { registerPayload } from '../../../core/interfaces/auth-payload';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'alte-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrls:  [
        '../auth.style.scss',
        './register.component.scss'
    ],
    imports: [AuthHeadComponent, InputComponent, ReactiveFormsModule, FormsModule, InputComponent]
})
export class RegisterComponent implements OnDestroy {
   

    form = new FormGroup({
        email: new FormControl<string>("", [Validators.required, Validators.email]),
        password: new FormControl<string>("", Validators.required),
    });

    authService=inject(AuthService);
    sub$=new Subject()

    submit(){
        console.log(this.form.value);
        this.form.markAllAsTouched();

        if (this.form.invalid){
            return
        }

        const{email, password}=this.form.value as{email:string, password:string}

        email.trim()
        password.trim()

        const payload: registerPayload={
            email,
            password
        }

        this.authService.register(payload)
        .pipe(
            takeUntil(this.sub$)
        )
        .subscribe(res=>{
            console.log(res)              
        })
    }

   ngOnDestroy(): void{
    this.sub$.next(null)
    this.sub$.complete()
   }

}
