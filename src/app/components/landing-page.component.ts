import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, ServicesComponent, WhyChooseUsComponent, ReviewsComponent, PriceOverviewComponent, QuoteFormComponent ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  currentYear = new Date().getFullYear();
  quoteForm!: FormGroup;
  message: string = '';
  messageColor: string = '';
  menuOpen = false;

  constructor(private fb: FormBuilder, private contactService: ContactService) {}

  ngOnInit(): void {
    this.quoteForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      message: ['']
    });
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
    window.open('https://wa.me/1234567890', '_blank');
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
