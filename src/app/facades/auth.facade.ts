import { Inject, Injectable, inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Observable, map, tap } from "rxjs";
import { AuthResponce, AuthPayload } from "../core/interfaces/auth-payload";
import { StorageService } from "../core/services/storage.service";
import { Router } from "@angular/router"
import { User } from "../core/interfaces";


@Injectable({
    providedIn: 'root'
})

export class AuthFacade{
    authService=inject(AuthService)
    storageService=inject(StorageService)
    router=Inject(Router)


    get isAuthenticated(){
        return !!this.storageService.getItem(`token`)
    }

    get token(){
        return this.storageService.getItem('token')
    }

    get refreshToken(){
        return this.storageService.getItem('refreshToken')
    }

    get user(){
        return this.storageService.getItem('user')
    }

    register(payload:AuthPayload):Observable<AuthResponce>{
        return this.authService.register(payload)
        .pipe(
            tap(res=>{
               this.storageService.setItem('token', res.idtoken)
               this.storageService.setItem('refreshToken', res.refreshToken)
               this.storageService.setItem('user', {
                email: res.email,
                id: res.localId
               })
            })
        )
    }

    login(payload:AuthPayload):Observable<AuthResponce>{
        return this.authService.login(payload)
        .pipe(
            tap(res=>{
               this.storageService.setItem('token', res.idtoken)
               this.storageService.setItem('refreshToken', res.refreshToken)
               this.storageService.setItem('user', {
                email: res.email,
                id: res.localId
               })
            })
        )
    }

    sendOobCode(email: string): Observable<any>{
        return this.authService.sendOobCode(email)
    }

    resetPassword(oobCode:string, newPassword:string){
        return this.authService.resetPassword(oobCode, newPassword)
    }

    logout(){
        this.storageService.clear();
        this.router.navigate(['/'])
    }

    getUser(){
        return this.authService.lookup(this.token)
        .pipe(
            map(res=>{
                if(res.users.length){
                    return res.users[0]
                }
                return {} as User
            })
        )
    }

}