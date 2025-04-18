import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, TranslateModule],
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss']
})
export class QuoteFormComponent implements OnInit {

  currentYear = new Date().getFullYear();
  quoteForm!: FormGroup;
  message: string = '';
  messageColor: string = '';

  // Arreglos para sugerencias de autocompletar
  fromSuggestions: any[] = [];
  toSuggestions: any[] = [];
  // Variables para controlar el despliegue de las sugerencias
  showFromSuggestions: boolean = false;
  showToSuggestions: boolean = false;

  contactOptions = [
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'phone', label: 'Teléfono' },
    { value: 'email', label: 'Correo electrónico' },
  ];
  showContactDropdown: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.quoteForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      is_enclosed: [false],
      description: [''],
      date: [],
      preferred_contact: [[], Validators.required],
    });

    // Autocompletado para "from"
    this.quoteForm.get('from')?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((value: string) => {
        if (value && value.length > 2) {
          return this.fetchLocationSuggestions(value);
        }
        return of([]);
      })
    ).subscribe((results: any[]) => {
      this.fromSuggestions = results;
      this.showFromSuggestions = results.length > 0;
    });

    // Autocompletado para "to"
    this.quoteForm.get('to')?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((value: string) => {
        if (value && value.length > 2) {
          return this.fetchLocationSuggestions(value);
        }
        return of([]);
      })
    ).subscribe((results: any[]) => {
      this.toSuggestions = results;
      this.showToSuggestions = results.length > 0;
    });
  }

  // Consulta la API de Nominatim para obtener lugares en EE.UU.
  fetchLocationSuggestions(query: string) {
    const url = `https://nominatim.openstreetmap.org/search?countrycodes=us&format=json&q=${encodeURIComponent(query)}`;
    return this.http.get<any[]>(url).pipe(
      catchError(err => {
        console.error(err);
        return of([]);
      })
    );
  }

  // Seleccionar sugerencia para "from"
  selectFromSuggestion(suggestion: any): void {
    this.quoteForm.patchValue({ from: suggestion.display_name });
    this.fromSuggestions = [];
    this.showFromSuggestions = false;
  }

  // Seleccionar sugerencia para "to"
  selectToSuggestion(suggestion: any): void {
    this.quoteForm.patchValue({ to: suggestion.display_name });
    this.toSuggestions = [];
    this.showToSuggestions = false;
  }

  // Evita que el dropdown se cierre inmediatamente al perder el foco
  hideFromSuggestions(): void {
    setTimeout(() => {
      this.showFromSuggestions = false;
    }, 200);
  }

  hideToSuggestions(): void {
    setTimeout(() => {
      this.showToSuggestions = false;
    }, 200);
  }

  clearFromField(): void {
    this.quoteForm.patchValue({ from: '' });
    this.fromSuggestions = [];
    this.showFromSuggestions = false;
  }

  clearToField(): void {
    this.quoteForm.patchValue({ to: '' });
    this.toSuggestions = [];
    this.showToSuggestions = false;
  }

  toggleContactDropdown(): void {
    this.showContactDropdown = !this.showContactDropdown;
  }

  toggleContactOption(value: string): void {
    const selected = this.quoteForm.get('preferred_contact')?.value || [];
    if (selected.includes(value)) {
      this.quoteForm.patchValue({
        preferred_contact: selected.filter((option: string) => option !== value),
      });
    } else {
      this.quoteForm.patchValue({
        preferred_contact: [...selected, value],
      });
    }
  }

  isContactSelected(value: string): boolean {
    return this.quoteForm.get('preferred_contact')?.value.includes(value);
  }

  getSelectedContacts(): string {
    const selected = this.quoteForm.get('preferred_contact')?.value || [];
    return selected
      .map((value: string) => this.contactOptions.find(option => option.value === value)?.label)
      .join(', ');
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
