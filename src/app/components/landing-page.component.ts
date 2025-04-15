import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactService } from './contact.service';
import { ServicesComponent } from './services/services.component';
import { WhyChooseUsComponent } from './why-choose-us/why-choose-us.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { PriceOverviewComponent } from './price-overview/price-overview.component';
import { QuoteFormComponent } from './quote-form/quote-form.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, ServicesComponent, WhyChooseUsComponent, PriceOverviewComponent, QuoteFormComponent ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  currentYear = new Date().getFullYear();
  quoteForm!: FormGroup;
  message: string = '';
  messageColor: string = '';
  menuOpen = false;
  carouselImages = [
    'assets/carousel/background1.PNG',
    'assets/carousel/background2.PNG',
    'assets/carousel/background3.PNG',
    'assets/carousel/background5.PNG',
  ]; 
  activeSlide = 0;
  private carouselInterval!: any;

  constructor(
    private fb: FormBuilder, 
    private contactService: ContactService, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.quoteForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      message: ['']
    });
    if (isPlatformBrowser(this.platformId)) {
      this.startCarousel();
    }
  }

  startCarousel(): void {
    this.carouselInterval = setInterval(() => {
      this.activeSlide = (this.activeSlide + 1) % this.carouselImages.length;
    }, 5000); // Cambia cada 5 segundos
  }

  ngOnDestroy(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  onSubmit(): void {
    if (this.quoteForm.invalid) return;

    this.contactService.sendQuote(this.quoteForm.value)
      .subscribe({
        next: (res) => {
          this.message = '¡Cotización enviada exitosamente!';
          this.messageColor = 'green';
          this.quoteForm.reset();
        },
        error: (err) => {
          console.error(err);
          this.message = 'Error al enviar la cotización. Intenta más tarde.';
          this.messageColor = 'red';
        }
      });
  }

  // Abre WhatsApp con el número configurado (reemplaza el número según necesites)
  openWhatsApp(): void {
    window.open('https://wa.me/17862667459', '_blank');
  }

  openCall(): void {
    window.open('tel:+17862667459', '_self');
  }

  // Desplaza la vista a la sección indicada por su ID
  scrollTo(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
