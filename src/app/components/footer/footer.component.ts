import { Component } from '@angular/core';
import { FooterLinkItemComponent } from "./footer-link-item/footer-link-item.component";
import { FOOTER_MENU } from '../../data/footer-menu';

@Component({
    selector: 'alte-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    imports: [FooterLinkItemComponent]
})
export class FooterComponent {
  footerMenu=FOOTER_MENU;
}
