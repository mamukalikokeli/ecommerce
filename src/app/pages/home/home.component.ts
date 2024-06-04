import { Component } from '@angular/core';
import {HeroBannerComponent} from "../../components/hero-banner/hero-banner.component";
import {FeatureCardComponent} from "../../components/feature-card/feature-card.component";
import {FEATURES} from "../../data/features";

@Component({
  selector: 'alte-home',
  standalone: true,
  imports: [
    HeroBannerComponent,
    FeatureCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  features = FEATURES;
}