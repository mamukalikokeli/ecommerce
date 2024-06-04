import { Injectable } from '@angular/core';
import { ApiService } from '../core/services';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService {

  getCategories(){
    return this.get('categories.json')
  }

  getCategoryById(id:string){
    return this.get(`categories/${id}.json`)
  }

}
