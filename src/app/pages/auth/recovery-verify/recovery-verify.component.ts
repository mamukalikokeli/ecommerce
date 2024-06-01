import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthHeadComponent } from "../auth-head/auth-head.component";
import { InputComponent } from "../../../components/input/input.component";
import { FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { AuthFacade } from '../../../facades';
import { ActivatedRoute } from '@angular/router';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { Router } from 'express';
import { AlertComponent } from "../../../components/alert/alert.component";

@Component({
    selector: 'alte-recovery',
    standalone: true,
    templateUrl: './recovery-verify.component.html',
    styleUrls: [
        '../auth.style.scss',
        './recovery-verify.component.scss'
    ],
    imports: [AuthHeadComponent, InputComponent, ReactiveFormsModule, AlertComponent]
})
export class RecoveryVerifyComponent implements OnInit, OnDestroy {
  
    form=new FormGroup({
      oobCode: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required)
    })

    authFacade=inject(AuthFacade)
    route=inject(ActivatedRoute)
    router=inject(Router)

    sub$=new Subject()

    errorMessage: string|null=null
    successMessage: string|null=null

    

    ngOnInit(): void {
        this.route.queryParams
        .pipe(
            takeUntil(this.sub$)
        )
        .subscribe(params=>{
            if(params['oobCode']){
                
                this.form.patchValue({
                  oobCode: params['oobCode']})
            }
        })
    }

    resetPassword(){
        this.form.markAllAsTouched()
        if(this.form.invalid){
            return
        }

        const{oobCode, newPassword}=this.form.value as{oobCode:string, newPassword:string}

        this.authFacade.resetPassword(oobCode, newPassword)
        .pipe(
          takeUntil(this.sub$),
          catchError(({error})=>{
            this.errorMessage=error.error.message
            return throwError(()=>error.error.message)
          })
       )
        .subscribe((res: any)=>{
          this.successMessage='Password reset successfuly, redirect to login page';
          setTimeout(()=>{
              this.router.navigate([`/auth`])
          }, 1500)
        })
    }

    ngOnDestroy(): void {
        this.sub$.next(null)
        this.sub$.complete()
    }

}




