import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiService {

  getProducts(): Observable<any>{
     return this.get(`products.json`)
  }

  getProduct(id: string):Observable<any>{
    return this.get(`products/${id}.json`)
  }
}
