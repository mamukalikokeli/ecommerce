import { Injectable, inject } from "@angular/core";
import { CategoryService } from "../services/category.service";

@Injectable({
    providedIn: 'root'
})

export class categoryFacade{
    categoryService=inject(CategoryService)

    
}