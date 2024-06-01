import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import { environment } from '../../environments/environment';
import { AuthResponce, AuthPayload } from '../core/interfaces/auth-payload';
import { Observable } from 'rxjs';
import { User } from '../core/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  resetPassword(oobCode: string, newPassword: string) {
      return this.post(`accounts:resetPassword?key=${this.apiKey}`, {
        oobCode,
        newPassword
      });
  }

  override apiUrl=environment.firebaseAuthUrl;
  apiKey=environment.firebaseApiKey

  register(params: AuthPayload): Observable<AuthResponce>{
      return this.post<AuthResponce>(`accounts:signUp?key=${this.apiKey}`, params)
  }

  login(payload: AuthPayload): Observable<AuthResponce>{
    return this.post<AuthResponce>(`accounts:signInWithPassword?key=${this.apiKey}`, {
      ...payload,
      returnSecureToken: true
    })

  }

  sendOobCode(email:string):Observable<any>{
    return this.post(`accounts.sendOobCode?key=${this.apiKey}`,{
      requestType: 'PASSWORD_RESET',
      email
    })
  }
  
  lookup(idToken: string){
    return this.post<{
      users: User[]
    }>(`accounts:lookup?key=${this.apiKey}`,{
      idToken
    })
   
  }

}
