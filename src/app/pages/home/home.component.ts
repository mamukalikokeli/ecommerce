import {Component, inject} from '@angular/core';
import {HeroBannerComponent} from "../../components/hero-banner/hero-banner.component";
import {FeatureCardComponent} from "../../components/feature-card/feature-card.component";
import {FEATURES} from "../../data/features";
import {CategoryFacade} from "../../facades/category.facade";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {ProductItemComponent} from "../../components/product-item/product-item.component";
import {Observable, switchMap} from "rxjs";
import {Product} from "../../core/interfaces/product";
import {ProductFacade} from "../../facades/product.facade";
import {ButtonComponent} from "../../ui/button/button.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'alte-home',
  standalone: true,
  imports: [
    HeroBannerComponent,
    FeatureCardComponent,
    AsyncPipe,
    JsonPipe,
    ProductItemComponent,
    ButtonComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  features = FEATURES;

  categoryFacade = inject(CategoryFacade)
  productFacade = inject(ProductFacade)

  categories$ = this.categoryFacade.getCategories()

  latestProducts$: Observable<Product[]> = this.productFacade.getBestSelling()
}