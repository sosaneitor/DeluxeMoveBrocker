import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.scss'
})
export class QuoteFormComponent implements OnInit {
  
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
