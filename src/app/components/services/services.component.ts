import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  constructor(public translate: TranslateService) {}

  services = [
    {
      titleKey: 'SERVICES.ENCLOSED_TITLE',
      descriptionKey: 'SERVICES.ENCLOSED_DESC',
      backgroundImage: 'assets/AutoTransportService3.PNG',
    },
    {
      titleKey: 'SERVICES.OPEN_TITLE',
      descriptionKey: 'SERVICES.OPEN_DESC',
      backgroundImage: 'assets/AutoTransportService2.png',
    },
    {
      titleKey: 'SERVICES.LOCAL_TITLE',
      descriptionKey: 'SERVICES.LOCAL_DESC',
      backgroundImage: 'assets/AutoTransportService4.PNG',
    },
  ];

  openWhatsApp(): void {
    window.open('https://wa.me/17046994001', '_blank');
  }
}
