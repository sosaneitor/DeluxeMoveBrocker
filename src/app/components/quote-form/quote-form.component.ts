// quote-form.component.ts
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ContactService } from '../contact.service';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError
} from 'rxjs/operators';
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
  yearOptions: number[] = [];
  makeOptions: string[] = [
    'Toyota',
    'Ford',
    'BMW',
    'Honda',
    'Mercedes',
    'Chevrolet',
    'Nissan',
    'Jeep',
    'Hyundai',
    'Kia',
    'Subaru',
    'Volkswagen',
    'GMC',
    'Dodge',
    'Ram'
  ];
  
  modelOptions: string[] = [];
  allModels: { [make: string]: string[] } = {
    Toyota: [
      'Corolla', 'Camry', 'Prius', 'Avalon', 'Yaris', '86', 'Supra', 'C-HR', 'RAV4', 'Highlander',
      '4Runner', 'Sequoia', 'Land Cruiser', 'Sienna', 'Tacoma', 'Tundra', 'Venza', 'Matrix', 'FJ Cruiser',
      'Echo', 'Solara', 'Celica', 'Previa', 'MR2', 'Tercel', 'Starlet', 'Cressida', 'Crown', 'Mark X',
      'Alphard', 'Harrier', 'Raize', 'Passo', 'Aqua', 'Wish', 'Estima', 'Noah', 'TownAce', 'Probox',
      'LiteAce', 'Ractis', 'Succeed', 'Spade', 'Ist', 'Vitz', 'Urban Cruiser', 'Hilux', 'Innova', 'Rush'
    ],
    Ford: [
      'F‑150', 'Mustang', 'Explorer', 'Edge', 'Escape', 'Expedition', 'Fusion', 'Focus', 'Taurus', 'Ranger',
      'Bronco', 'Maverick', 'Ecosport', 'Flex', 'Transit', 'Transit Connect', 'C-Max', 'Five Hundred',
      'Freestyle', 'Contour', 'Crown Victoria', 'Windstar', 'Freestar', 'Thunderbird', 'Excursion',
      'Tempo', 'Escort', 'ZX2', 'Probe', 'GT', 'Sable', 'Aerostar', 'Festiva', 'Courier', 'Granada',
      'F-250', 'F-350', 'F-450', 'F-550', 'F-650', 'E-150', 'E-250', 'E-350', 'Explorer Sport Trac',
      'Bronco II', 'Pinto', 'Fairlane', 'Falcon', 'Galaxie'
    ],
    Chevrolet: [
      'Silverado', 'Malibu', 'Equinox', 'Traverse', 'Camaro', 'Tahoe', 'Suburban', 'Colorado', 'Impala',
      'Trailblazer', 'Blazer', 'Spark', 'Sonic', 'Cruze', 'Bolt EV', 'Volt', 'Avalanche', 'Cobalt',
      'HHR', 'Caprice', 'SS', 'Monte Carlo', 'Nova', 'Lumina', 'Cavalier', 'Beretta', 'Celebrity',
      'Corsica', 'Astro', 'Venture', 'Uplander', 'Express', 'Tracker', 'Trax', 'Prizm', 'Orlando',
      'Optra', 'Aveo', 'Metro', 'Nomad', 'El Camino', 'Corvair', 'Bel Air', 'Caprice Classic', 'K5 Blazer',
      'Chevette', 'Vega', 'Monza', 'Citation', 'Corvette'
    ],
    Honda: [
      'Civic', 'Accord', 'CR‑V', 'Pilot', 'Odyssey', 'Ridgeline', 'Fit', 'Insight', 'HR‑V', 'Element',
      'Passport', 'Prelude', 'S2000', 'CR-Z', 'Clarity', 'Crosstour', 'Del Sol', 'Integra', 'Legend',
      'NSX', 'Beat', 'City', 'Jazz', 'Stream', 'Airwave', 'Ascot', 'Avancier', 'Ballade', 'Brio',
      'Capella', 'Capa', 'Concerto', 'Domani', 'Edix', 'Elysion', 'Freed', 'Inspire', 'Lagreat',
      'Life', 'Logo', 'Mobilio', 'Orthia', 'Partner', 'Rafaga', 'Saber', 'Spike', 'Stepwgn', 'That’s',
      'Vamos', 'Zest'
    ],
    Nissan: [
      'Altima', 'Sentra', 'Maxima', 'Rogue', 'Murano', 'Pathfinder', 'Frontier', 'Titan', 'Versa', 'Juke',
      'Leaf', 'GT-R', '370Z', '350Z', 'Kicks', 'Xterra', 'Armada', 'Cube', 'Quest', 'Pulsar', 'Rogue Sport',
      'NV200', 'NV3500', 'Ariya', 'Murano CrossCabriolet', 'Stagea', 'Bluebird', 'Cedric', 'Gloria',
      'Laurel', 'Teana', 'Silvia', 'Skyline', 'Almera', 'March', 'Note', 'Tiida', 'Qashqai', 'Terrano',
      'Navara', 'Serena', 'Elgrand', 'Tino', 'Wingroad', 'X-Trail', 'Primera', 'Sunny', '240SX', '200SX'
    ],
    BMW: [
      '3 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'X6', 'Z4', 'Z3', 'i3', 'i4', 'i8', 'M2', 'M3',
      'M4', 'M5', 'M6', 'X7', 'X4', 'X2', '8 Series', '6 Series', '1 Series', '2 Series', 'Gran Coupe',
      'Active Tourer', 'Touring', 'Alpina B7', 'CSL', 'E30', 'E36', 'E46', 'E60', 'E90', 'F10', 'F30',
      'F80', 'G20', 'G30', 'Isetta', '325i', '330i', '335i', '428i', '430i', '535i', '550i', '650i',
      '750Li', '760Li'
    ],
    Mercedes: [
      'C‑Class', 'E‑Class', 'GLA', 'GLC', 'GLE', 'GLS', 'A‑Class', 'B‑Class', 'S‑Class', 'SLK', 'SL',
      'CLA', 'CLS', 'AMG GT', 'M‑Class', 'R‑Class', 'GLK', 'GLB', 'EQB', 'EQS', 'EQE', 'Sprinter',
      'Vito', 'Maybach', '190E', '240D', '300E', '500E', '560SEL', '600SEL', '300SL', '450SL', '380SL',
      '280SE', '260E', '300TD', 'ML350', 'GL450', 'GL550', 'G500', 'G55', 'G63 AMG', 'SLS AMG',
      'C63 AMG', 'E63 AMG', 'A45 AMG', 'CLA45 AMG', 'GLA45 AMG', 'S500', 'S550', 'S600'
    ],
    Hyundai: [
      'Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona', 'Palisade', 'Accent', 'Venue', 'Ioniq 5',
      'Ioniq 6', 'Veloster', 'Azera', 'Genesis', 'Entourage', 'Equus', 'Veracruz', 'XG350', 'Tiburon',
      'Stellar', 'Excel', 'Getz', 'i10', 'i20', 'i30', 'Creta', 'Bayon', 'Casper', 'Galloper', 'H-1',
      'Matrix', 'Terracan', 'Trajet', 'Scoupe', 'Pony', 'Atos', 'Click', 'Santamo', 'Porter', 'Grandeur',
      'Lafesta', 'Mistra', 'Aslan', 'Encino', 'Venue N Line', 'Santa Cruz', 'Nexo', 'IONIQ', 'IONIQ Hybrid'
    ],
    Kia: [
      'Soul', 'Seltos', 'Sportage', 'Sorento', 'Telluride', 'Niro', 'Stinger', 'Forte', 'Rio', 'Optima',
      'Cadenza', 'K5', 'K900', 'Sedona', 'Carnival', 'EV6', 'EV9', 'Mohave', 'Borrego', 'Picanto',
      'Stonic', 'Ceed', 'Cerato', 'Spectra', 'Rondo', 'Amanti', 'Avella', 'Carens', 'Opirus', 'Retona',
      'Shuma', 'Mentor', 'Elan', 'Enterprise', 'Ray', 'Towner', 'Visto', 'Xceed', 'Pegas', 'Seltos GT-Line',
      'Sportage Hybrid', 'Niro EV', 'EV6 GT', 'Telluride SX', 'Carnival Hi-Limousine', 'Quoris', 'K7',
      'K3', 'Clarus'
    ],
    Jeep: [
      'Wrangler', 'Grand Cherokee', 'Cherokee', 'Compass', 'Renegade', 'Gladiator', 'Patriot', 'Liberty',
      'Commander', 'Wagoneer', 'Grand Wagoneer', 'CJ5', 'CJ7', 'Comanche', 'Scrambler', 'J10', 'J20',
      'DJ', 'Forward Control', 'Willys', 'FC-150', 'FC-170', 'Jeepster', 'TJ', 'YJ', 'XJ', 'ZJ', 'WK',
      'KL', 'KK', 'KJ', 'SJ', 'MJ', 'VJ', 'DJ5', 'CJ6', 'CJ8', 'WJ', 'WK2', 'ZX', 'Avenger', 'Laredo',
      'Latitude', 'Trailhawk', 'Sahara', 'Rubicon', 'Overland', 'High Altitude'
    ],
    Subaru: [
      'Impreza', 'WRX', 'Outback', 'Forester', 'Crosstrek', 'Legacy', 'BRZ', 'Ascent', 'Baja', 'Tribeca',
      'SVX', 'Justy', 'XT', 'GL', 'Loyale', 'Alcyone', 'Levorg', 'Pleo', 'Rex', 'Sambar', 'Vivio',
      'Domingo', 'Dias Wagon', 'Stella', 'Trezia', 'R1', 'R2', 'Lucra', 'Exiga', 'Traviq', 'Dex',
      'Sambar Dias', 'Rex Kombi', 'B11S', 'Impreza Sport', 'Legacy B4', 'WRX STI', 'Forester Wilderness',
      'Outback Wilderness', 'Solterra', 'Legacy Touring XT', 'Impreza RS', 'BRZ tS', 'Crosstrek Hybrid',
      'WRX GT', 'Impreza 5-door', 'Levorg STI', 'Legacy GT'
    ],
    Tesla: [
      'Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck', 'Roadster', 'Model S Plaid', 'Model X Plaid',
      'Model 3 Performance', 'Model Y Performance', 'Semi', 'Model 3 Highland', 'Model 3 Long Range',
      'Model Y Long Range', 'Model S Long Range', 'Model X Long Range', 'Model Y RWD', 'Model 3 RWD',
      'Model 3 AWD', 'Cybertruck AWD', 'Cybertruck RWD', 'Cybertruck Foundation', 'Model S Dual Motor',
      'Model X Dual Motor', 'Model Y Dual Motor', 'Model 3 Standard Range+', 'Model 3 SR+', 'Model X 100D',
      'Model S 100D', 'Model S 90D', 'Model S 85', 'Model X 75D', 'Model 3 Mid Range', 'Model S 70D',
      'Model S 60D', 'Model S 40', 'Model S P100D', 'Model S P85D', 'Model S P90D', 'Model X P100D',
      'Model X P90D', 'Model X P85D', 'Model 3 LR AWD', 'Model 3 LR RWD', 'Model Y LR AWD',
      'Model Y Performance AWD', 'Model S Performance', 'Model X Performance'
    ],
    Dodge: [
      'Charger', 'Challenger', 'Durango', 'Journey', 'Grand Caravan', 'Neon', 'Dart', 'Avenger', 'Nitro',
      'Caliber', 'Viper', 'Intrepid', 'Stratus', 'Magnum', 'Aspen', 'Ram 1500', 'Ram 2500', 'Ram 3500',
      'Dakota', 'Omni', 'Shadow', 'Spirit', 'Dynasty', 'Monaco', 'Lancer', 'Polara', 'Coronet', 'St. Regis',
      'Royal', 'Custom 880', 'Matador', 'Super Bee', 'Demon', 'Swinger', 'Challenger SRT', 'Charger SRT',
      'Durango SRT', 'Rampage', 'Raider', 'Verna', 'Phoenix', 'Wayfarer', 'Kingsway', 'Diplomat',
      'Aries', 'Aspen Hybrid'
    ],
    Volkswagen: [
      'Jetta', 'Passat', 'Tiguan', 'Golf', 'GTI', 'Arteon', 'Beetle', 'ID.4', 'Atlas', 'Taos', 'CC',
      'Touareg', 'Eos', 'Rabbit', 'Phaeton', 'Cabrio', 'New Beetle', 'R32', 'Scirocco', 'Corrado',
      'Fox', 'Quantum', 'Dasher', 'Thing', 'Karmann Ghia', 'Type 3', 'Type 4', 'Transporter', 'Vanagon',
      'Eurovan', 'Routan', 'ID.Buzz', 'ID.3', 'ID.7', 'T-Cross', 'T-Roc', 'Up!', 'Polo', 'Lupo',
      'Bora', 'Sharan', 'Touran', 'Multivan', 'Amarok', 'Caddy', 'Saveiro', 'Virtus', 'Vento'
    ]
  };

  currentStep = 1;
  quoteForm!: FormGroup;
  message: string = '';
  messageColor: string = '';

  fromSuggestions: any[] = [];
  toSuggestions: any[] = [];
  showFromSuggestions = false;
  showToSuggestions = false;

  contactOptions = [
    { value: 'whatsapp', translationKey: 'Whatsapp' },
    { value: 'phone',    translationKey: 'QUOTE_FORM.PHONE_LABEL'    },
    { value: 'email',    translationKey: 'QUOTE_FORM.EMAIL_LABEL'    }
  ];
  showContactDropdown = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Llenamos años (últimos 30)
    this.yearOptions = Array.from({ length: 30 }, (_, i) => this.currentYear - i);

    // Creamos el form con los nuevos controles
    this.quoteForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      vehicleYear: [null, Validators.required],
      vehicleMake: [null, Validators.required],
      vehicleModel: [null, Validators.required],
      is_enclosed: [false],
      is_operable: [false],
      description: [''],
      date: [null, Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      preferred_contact: [[], Validators.required]
    });

    // Cuando cambie la marca, actualizamos modelos
    this.quoteForm.get('vehicleMake')!.valueChanges.subscribe(make => {
      this.modelOptions = this.allModels[make] || [];
      this.quoteForm.patchValue({ vehicleModel: null });
    });

    // Autocomplete "from"
    this.quoteForm.get('from')!.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => val.length > 2 ? this.fetchLocationSuggestions(val) : of([]))
    ).subscribe(results => {
      this.fromSuggestions = results;
      this.showFromSuggestions = results.length > 0;
    });

    // Autocomplete "to"
    this.quoteForm.get('to')!.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => val.length > 2 ? this.fetchLocationSuggestions(val) : of([]))
    ).subscribe(results => {
      this.toSuggestions = results;
      this.showToSuggestions = results.length > 0;
    });
  }

  fetchLocationSuggestions(query: string) {
    const url = `https://nominatim.openstreetmap.org/search?countrycodes=us&format=json&q=${encodeURIComponent(query)}`;
    return this.http.get<any[]>(url).pipe(
      catchError(err => {
        console.error(err);
        return of([]);
      })
    );
  }

  selectFromSuggestion(s: any) {
    this.quoteForm.patchValue({ from: s.display_name });
    this.fromSuggestions = [];
    this.showFromSuggestions = false;
  }

  selectToSuggestion(s: any) {
    this.quoteForm.patchValue({ to: s.display_name });
    this.toSuggestions = [];
    this.showToSuggestions = false;
  }

  hideFromSuggestions() { setTimeout(() => (this.showFromSuggestions = false), 200); }
  hideToSuggestions()   { setTimeout(() => (this.showToSuggestions = false), 200); }
  clearFromField()      { this.quoteForm.patchValue({ from: '' }); this.fromSuggestions = []; this.showFromSuggestions = false; }
  clearToField()        { this.quoteForm.patchValue({ to: '' });   this.toSuggestions   = []; this.showToSuggestions   = false; }

  toggleContactDropdown() { this.showContactDropdown = !this.showContactDropdown; }
  toggleContactOption(val: string) {
    const sel: string[] = this.quoteForm.get('preferred_contact')!.value;
    const updated = sel.includes(val) ? sel.filter(v => v !== val) : [...sel, val];
    this.quoteForm.patchValue({ preferred_contact: updated });
  }
  isContactSelected(val: string) { return this.quoteForm.get('preferred_contact')!.value.includes(val); }
  getSelectedValues(): string[] {
    return (this.quoteForm.get('preferred_contact')!.value as string[]) || [];
  }
  getTranslationKey(value: string): string {
    const option = this.contactOptions.find(opt => opt.value === value);
    return option ? option.translationKey : '';
  }

  nextStep() { if (this.currentStep < 3 && this.isStepValid()) this.currentStep++; }
  prevStep() { if (this.currentStep > 1) this.currentStep--; }
  isStepValid(): boolean {
    switch (this.currentStep) {
      case 1: return this.quoteForm.get('from')!.valid && this.quoteForm.get('to')!.valid;
      case 2: return this.quoteForm.get('vehicleYear')!.valid
                    && this.quoteForm.get('vehicleMake')!.valid
                    && this.quoteForm.get('vehicleModel')!.valid;
      case 3:
        return this.quoteForm.get('date')!.valid
          && this.quoteForm.get('name')!.valid
          && this.quoteForm.get('email')!.valid
          && this.quoteForm.get('phone')!.valid
          && this.quoteForm.get('preferred_contact')!.valid;
      default: return false;
    }
  }

  onSubmit(): void {
    if (this.quoteForm.invalid) return;
    this.contactService.sendQuote(this.quoteForm.value).subscribe({
      next: () => {
        this.message = 'QUOTE_FORM.SUCCESFUL_MESSAGE';
        this.messageColor = 'green';
        this.quoteForm.reset();
        this.currentStep = 1;
      },
      error: () => {
        this.message = 'QUOTE_FORM.ERROR_MESSAGE';
        this.messageColor = 'red';
      }
    });
  }
}
