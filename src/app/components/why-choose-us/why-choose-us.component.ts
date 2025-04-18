import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './why-choose-us.component.html',
  styleUrl: './why-choose-us.component.scss'
})
export class WhyChooseUsComponent {
  // Definición de los beneficios que se mostrarán con claves de traducción
  features = [
    {
      icon: 'fa-headset',
      title: 'WHY_CHOOSE_US.FEATURES.CUSTOM_ADVICE.TITLE',
      description: 'WHY_CHOOSE_US.FEATURES.CUSTOM_ADVICE.DESCRIPTION'
    },
    {
      icon: 'fa-dollar-sign',
      title: 'WHY_CHOOSE_US.FEATURES.NO_ADVANCE.TITLE',
      description: 'WHY_CHOOSE_US.FEATURES.NO_ADVANCE.DESCRIPTION'
    },
    {
      icon: 'fa-shield',
      title: 'WHY_CHOOSE_US.FEATURES.INSURANCE.TITLE',
      description: 'WHY_CHOOSE_US.FEATURES.INSURANCE.DESCRIPTION'
    },
    {
      icon: 'fa-user-check',
      title: 'WHY_CHOOSE_US.FEATURES.EXPERT_SUPPORT.TITLE',
      description: 'WHY_CHOOSE_US.FEATURES.EXPERT_SUPPORT.DESCRIPTION'
    }
  ];
}
