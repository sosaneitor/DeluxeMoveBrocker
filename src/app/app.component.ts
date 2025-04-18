import { Component } from '@angular/core';
import { LandingPageComponent } from './components/landing-page.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingPageComponent],
  template: `<app-landing-page />`,
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    // Detecta idioma del navegador (solo en /en o /es)
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|es/) ? browserLang : 'es');
  }

  changeLang(lang: 'en' | 'es') {
    this.translate.use(lang);
  }
}
