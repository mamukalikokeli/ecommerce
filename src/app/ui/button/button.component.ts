import {booleanAttribute, Component, Input} from '@angular/core';

@Component({
  selector: 'button[alte-button], a[alte-button]',
  standalone: true,
  imports: [],
  template: `
    <ng-content/>
  `,
  host: {
    class: 'alte-button',
    '[class.alte-button--default]': 'size === "default"',
    '[class.alte-button--small]': 'size === "small"',
    '[class.alte-button--extra-small]': 'size === "extra-small"',
    '[class.alte-button--primary]': 'theme === "primary"',
    '[class.alte-button--outline]': 'theme === "outline"',
    '[class.alte-button--icon]': 'theme === "icon"',
    '[class.alte-button--outline-icon]': 'theme === "outline-icon"',
    '[class.alte-button--outline-black]': 'theme === "outline-black"',
    '[class.alte-button--link]': 'theme === "link"',
    '[class.alte-button--block]': 'block',

  }
})
export class ButtonComponent {
  @Input() size: 'default' | 'small' | 'extra-small' = 'default'
  @Input() theme: 'primary' | 'outline' | 'link' | 'icon' | 'outline-icon' = 'primary'
  @Input({
    transform: booleanAttribute
  }) block: boolean = false
}