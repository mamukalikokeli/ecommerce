import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonComponent} from "../../ui/button/button.component";
import {CurrencyPipe, DatePipe, NgOptimizedImage} from "@angular/common";
import {QuantityInputComponent} from "../quantity-input/quantity-input.component";
import {Product} from "../../core/interfaces/product";
import {Order} from "../../core/interfaces/order";

@Component({
  selector: 'alte-order-item',
  standalone: true,
  imports: [
    ButtonComponent,
    CurrencyPipe,
    NgOptimizedImage,
    QuantityInputComponent,
    DatePipe
  ],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss'
})
export class OrderItemComponent {
  @Input() product: Product = {} as Product
}
