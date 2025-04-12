import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactService } from './contact.service';
import { ServicesComponent } from './services/services.component';
import { WhyChooseUsComponent } from './why-choose-us/why-choose-us.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { PriceOverviewComponent } from './price-overview/price-overview.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, ServicesComponent, WhyChooseUsComponent, ReviewsComponent, PriceOverviewComponent ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  currentYear = new Date().getFullYear();
  quoteForm!: FormGroup;
  message: string = '';
  messageColor: string = '';

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
}
