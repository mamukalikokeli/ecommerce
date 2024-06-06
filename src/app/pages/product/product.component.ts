import {Component, inject, OnDestroy, OnInit, Sanitizer} from '@angular/core';
import {from, map, mergeMap, Observable, of, share, shareReplay, Subject, switchMap, takeUntil} from "rxjs";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, ActivationEnd, Router} from "@angular/router";
import {AsyncPipe, CurrencyPipe, JsonPipe, NgIf} from "@angular/common";
import {CategoryService} from "../../services/category.service";
import {ProductFacade} from "../../facades/product.facade";
import {CategoryFacade} from "../../facades/category.facade";
import {ColorFacade} from "../../facades/color.facade";
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {ReviewComponent} from "../../components/review/review.component";
import {StockCheckComponent} from "../../components/stock-check/stock-check.component";
import {ColorItemComponent} from "../../components/color-item/color-item.component";
import {Color} from "../../core/interfaces/color";
import {SizeItemComponent} from "../../components/size-item/size-item.component";
import {Product} from "../../core/interfaces/product";
import {QuantityInputComponent} from "../../components/quantity-input/quantity-input.component";
import {ButtonComponent} from "../../ui/button/button.component";
import {DomSanitizer} from "@angular/platform-browser";
import {ProductItemComponent} from "../../components/product-item/product-item.component";
import {CartFacade} from "../../facades/cart.facade";
import {WishlistFacade} from "../../facades/wishlist.facade";
import {AuthFacade} from "../../facades";

@Component({
  selector: 'alte-product',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    BreadcrumbComponent,
    ReviewComponent,
    NgIf,
    StockCheckComponent,
    CurrencyPipe,
    ColorItemComponent,
    SizeItemComponent,
    QuantityInputComponent,
    ButtonComponent,
    ProductItemComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit, OnDestroy{

  route = inject(ActivatedRoute);
  productFacade = inject(ProductFacade);
  categoryFacade = inject(CategoryFacade);
  colorFacade = inject(ColorFacade);
  cartFacade = inject(CartFacade);
  wishlistFacade = inject(WishlistFacade);
  sanitazer = inject(DomSanitizer);

  get insertScritp() {
    return this.sanitazer.bypassSecurityTrustHtml(`
      <script>
        console.log('Hello world')
      </script>
    `)
  }

  selectedColor?: string
  quantity: number = 1

  sub$ = new Subject()

  product$: Observable<Product> = this.route.params.pipe(
    switchMap((params: any) => this.productFacade.getProduct(params['id'])
      .pipe(
        map(product => {
          let cover
          if (product.images && product.images.length) {
            cover = product.images[0]
          }
          return {
            ...product,
            cover
          }
        }),
        mergeMap(product => this.categoryFacade.getCategoryById(product.categoryId)
          .pipe(
            map(category => ({...product, category}))
          )
        ),
        mergeMap(productWithCategory => this.colorFacade.getColorById(productWithCategory.colorId)
          .pipe(
            map(color => ({...productWithCategory, color}))
          )
        ),
      )
    )
  );

  relatedProducts$: Observable<Product[]> = this.product$.pipe(
    switchMap(product => this.productFacade.getRelatedProducts(product.categoryId, product.id))
  );

  ngOnInit() {
    // this.route.params
    //   .subscribe((params: any) => {
    //     this.productFacade.getProduct(params['id'])
    //       .subscribe(product => {
    //         this.categoryFacade.getCategoryById(product.categoryId)
    //           .subscribe(category => {
    //             this.colorFacade.getColorById(product.colorId)
    //               .subscribe(color => {
    //                 this.product$ = { ...product, category, color };
    //               });
    //           });
    //       });
    //   });
  }

  addToCart(product: Product) {



    this.cartFacade.addToCart(product, this.quantity)

  }

  addToWishlist(product: Product) {
    this.wishlistFacade.addWishlist(product)
      .pipe(
        takeUntil(this.sub$)
      )
      .subscribe((res) => {
        console.log(res)
        alert('Product added to wishlist')
      })
  }

  ngOnDestroy() {
    this.sub$.next(null)
    this.sub$.complete()
  }
}
