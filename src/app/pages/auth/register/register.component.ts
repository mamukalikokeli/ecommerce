import {Component, inject, OnDestroy} from '@angular/core';
import {AuthHeadComponent} from "../auth-head/auth-head.component";
import {ButtonComponent} from "../../../ui/button/button.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputComponent} from "../../../components/input/input.component";
import {AuthService} from "../../../services/auth.service";
import {AuthPayload} from "../../../core/interfaces/auth-payload";
import {catchError, Subject, takeUntil, throwError} from "rxjs";
import {AuthFacade} from "../../../facades";
import {Router} from "@angular/router";
import {AlertComponent} from "../../../components/alert/alert.component";

@Component({
  selector: 'alte-register',
  standalone: true,
  imports: [
    AuthHeadComponent,
    ButtonComponent,
    FormsModule,
    InputComponent,
    ReactiveFormsModule,
    AlertComponent
  ],
  templateUrl: './register.component.html',
  styleUrls: ['../auth.style.scss', './register.component.scss']
})
export class RegisterComponent implements OnDestroy{
  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required),
  })

  authFacade = inject(AuthFacade)
  router = inject(Router)

  errorMessage: string | null = null
  successMessage: string | null = null

  sub$ = new Subject()

  submit() {
    console.log(this.form)
    this.form.markAllAsTouched()

    if (this.form.invalid) {
      return
    }
    this.errorMessage = null
    this.successMessage = null

    const {email, password} = this.form.value as { email: string, password: string }

    email.trim()
    password.trim()

    const payload: AuthPayload = {
      email,
      password
    }

    this.authFacade.register(payload)
      .pipe(
        takeUntil(this.sub$),
        catchError(({error}) => {
          this.errorMessage = error.error.message
          return throwError(() => error.error.message)
        })
      )
      .subscribe(res => {
        if (res) {
          this.successMessage = 'You are registered successfully! Redirecting to login page...';
          setTimeout(() => {
            this.router.navigate(['/'])
          }, 2000)
        }
      })
  }


  ngOnDestroy() {
    this.sub$.next(null)
    this.sub$.complete()
  }
}