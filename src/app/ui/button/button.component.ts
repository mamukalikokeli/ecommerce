import { Component, Host, Input, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'alte-button',
  standalone: true,
  imports: [],
  template: `
  <ng-content/>
  `,
  host:{
    class: 'alte-button',
    '[class.alte-button--default]': 'size=="default"',
    '[class.alte-button--small]': 'size==="small"',
    '[class.alte-button--primery]': 'theme==="primery"',
    '[class.alte-button--outline]': 'theme==="outline"',
    '[class.alte-button--outline-black]': 'theme==="outline-black"',
    '[class.alte-button--link]': 'theme==="link"',
    '[class.alte-button--block]': 'block',

  }
})
export class ButtonComponent {
    @Input() theme: 'primery'|'outline'|'outline-black'|'link'='primery'
    @Input() size: 'default'|'small'='default'
    @Input() disabled: boolean=false
    @Input({
      transform: booleanAttribute
    }) block:boolean=false
}
