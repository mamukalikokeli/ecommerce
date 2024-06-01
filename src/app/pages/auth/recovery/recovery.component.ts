import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthHeadComponent } from "../auth-head/auth-head.component";
import { InputComponent } from "../../../components/input/input.component";
import { FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { AuthFacade } from '../../../facades';
import { ActivatedRoute } from '@angular/router';
import { Subject, catchError, pipe, takeUntil, throwError } from 'rxjs';
import { AlertComponent } from "../../../components/alert/alert.component";

@Component({
    selector: 'alte-recovery',
    standalone: true,
    templateUrl: './recovery.component.html',
    styleUrls: [
        '../auth.style.scss',
        './recovery.component.scss'
    ],
    imports: [AuthHeadComponent, InputComponent, ReactiveFormsModule, AlertComponent]
})
export class RecoveryComponent implements OnDestroy {
  
    form=new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email])
    })

    authFacade=inject(AuthFacade)

    sub$=new Subject()

    errorMessage: string|null=null
    successMessage: string|null=null
  

    sendLink():void{
        this.form.markAllAsTouched()
        if(this.form.invalid){
            return
        }
        this.authFacade.sendOobCode(this.form.value as string)
        .pipe(
            takeUntil(this.sub$),
            catchError(({error})=>{
                this.errorMessage=error.error.message
                return throwError(()=>error.error.message)
              })
        )
        .subscribe((res: void)=>{
            console.log('Email sent', res);
            this.successMessage=`Email sent, Check your inbox`;
        })
    }

    ngOnDestroy(): void {
        this.sub$.next(null)
        this.sub$.complete()
    }

}



