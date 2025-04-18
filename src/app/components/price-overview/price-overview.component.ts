import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-price-overview',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './price-overview.component.html',
  styleUrl: './price-overview.component.scss'
})
export class PriceOverviewComponent {
  sectionTitle = 'PRICE_OVERVIEW.TITLE';
  sectionIntro = 'PRICE_OVERVIEW.INTRO';

  factors = [
    {
      number: '01',
      title: 'PRICE_OVERVIEW.FACTORS.SIZE_WEIGHT.TITLE',
      description: 'PRICE_OVERVIEW.FACTORS.SIZE_WEIGHT.DESCRIPTION'
    },
    {
      number: '02',
      title: 'PRICE_OVERVIEW.FACTORS.CONDITION.TITLE',
      description: 'PRICE_OVERVIEW.FACTORS.CONDITION.DESCRIPTION'
    },
    {
      number: '03',
      title: 'PRICE_OVERVIEW.FACTORS.TRANSPORT_TYPE.TITLE',
      description: 'PRICE_OVERVIEW.FACTORS.TRANSPORT_TYPE.DESCRIPTION'
    }
  ];
}
