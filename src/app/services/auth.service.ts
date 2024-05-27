import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import { environment } from '../../environments/environment';
import { RegisterResponce, registerPayload } from '../core/interfaces/auth-payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  override apiUrl=environment.firebaseAuthUrl;
  apiKey=environment.firebaseApiKey

  register(params: registerPayload): Observable<RegisterResponce>{
      return this.post<RegisterResponce>(`accounts:signUp?key=${this.apiKey}`, params)
  }

}
