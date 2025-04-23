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
    'Acura',
    'Alfa Romeo',
    'Audi',
    'BMW',
    'Bentley',
    'Buick',
    'Cadillac',
    'Chevrolet',
    'Chrysler',
    'Dodge',
    'Ferrari',
    'Fiat',
    'Ford',
    'GMC',
    'Genesis',
    'Honda',
    'Hyundai',
    'INFINITI',
    'Jaguar',
    'Jeep',
    'Kia',
    'Lamborghini',
    'Land Rover',
    'Lexus',
    'Lincoln',
    'Lucid',
    'Maserati',
    'Mazda',
    'McLaren',
    'Mercedes-Benz',
    'MINI',
    'Mitsubishi',
    'Nissan',
    'Polestar',
    'Porsche',
    'Ram',
    'Rivian',
    'Rolls-Royce',
    'Subaru',
    'Tesla',
    'Toyota',
    'Volkswagen',
    'Volvo'
  ];
  
  modelOptions: string[] = [];
  allModels: { [make: string]: string[] } = {
    Acura: [
      'ADX',
      'ILX',
      'Integra',
      'MDX',
      'NSX',
      'RDX',
      'RL',
      'RLX',
      'TL',
      'TLX',
      'TSX',
    ],
    'Alfa Romeo': [
      'Giulia',
      'Stelvio',
      'Tonale',
    ],
    Audi: [
      'A3',
      'A4',
      'A5',
      'A6',
      'A7',
      'A8',
      'e-tron GT',
      'Q3',
      'Q4 e-tron',
      'Q5',
      'Q7',
      'Q8',
      'Q8 e-tron',
      'R8',
      'RS 3',
      'RS 5',
      'RS 6',
      'RS 7',
      'RS e-tron GT',
      'S3',
      'S4',
      'S5',
      'S6',
      'S7',
      'S8',
      'SQ5',
      'SQ7',
      'SQ8',
      'TT',
    ],
    BMW: [
      '1 Series',
      '2 Series',
      '3 Series',
      '4 Series',
      '5 Series',
      '6 Series',
      '7 Series',
      '8 Series',
      'Active Tourer',
      'Alpina B7',
      'CSL',
      'E30',
      'E36',
      'E46',
      'E60',
      'E90',
      'F10',
      'F30',
      'F80',
      'G20',
      'G30',
      'Gran Coupe',
      'i3',
      'i4',
      'i5',
      'i7',
      'i8',
      'Isetta',
      'M2',
      'M3',
      'M4',
      'M5',
      'M6',
      'Touring',
      'X1',
      'X2',
      'X3',
      'X4',
      'X5',
      'X6',
      'X7',
      'XM',
      'Z3',
      'Z4',
      'Z8',
    ],
    Bentley: [
      'Bentayga',
      'Continental GT',
      'Continental GTC',
      'Flying Spur',
      'Mulsanne',
    ],
    Buick: [
      'Cascada',
      'Enclave',
      'Encore',
      'Encore GX',
      'Envision',
      'LaCrosse',
      'Regal',
      'Verano',
    ],
    Cadillac: [
      'AT4',
      'ATS',
      'CT4',
      'CT5',
      'CT6',
      'CTS',
      'DTS',
      'Escalade',
      'Lyriq',
      'XT4',
      'XT5',
      'XT6',
      'XTS',
    ],
    Chevrolet: [
      'Astro',
      'Avalanche',
      'Aveo',
      'Bel Air',
      'Beretta',
      'Blazer',
      'Bolt EV',
      'Bolt EUV',
      'Camaro',
      'Caprice',
      'Caprice Classic',
      'Cavalier',
      'Celebrity',
      'Chevette',
      'Citation',
      'Cobalt',
      'Colorado',
      'Corvair',
      'Corvette',
      'Corsica',
      'Cruze',
      'El Camino',
      'Equinox',
      'Express',
      'HHR',
      'Impala',
      'K5 Blazer',
      'Lumina',
      'Malibu',
      'Metro',
      'Monte Carlo',
      'Monza',
      'Nomad',
      'Nova',
      'Optra',
      'Orlando',
      'Prizm',
      'Silverado',
      'Sonic',
      'Spark',
      'SS',
      'Suburban',
      'Tahoe',
      'Tempo',
      'Tercel',
      'Tracker',
      'Trailblazer',
      'Transit',
      'Traverse',
      'Trax',
      'Uplander',
      'Vega',
      'Venture',
      'Volt',
    ],
    Chrysler: [
      '200',
      '300',
      'Aspen',
      'Cirrus',
      'Concorde',
      'Cordoba',
      'Crossfire',
      'Imperial',
      'LeBaron',
      'Neon',
      'New Yorker',
      'Pacifica',
      'PT Cruiser',
      'Sebring',
      'Town & Country',
      'Voyager',
    ],
    Dodge: [
      'Avenger',
      'Caliber',
      'Challenger',
      'Charger',
      'Dakota',
      'Dart',
      'Demon',
      'Durango',
      'Grand Caravan',
      'Intrepid',
      'Journey',
      'Magnum',
      'Neon',
      'Nitro',
      'Omni',
      'Ram Van',
      'Ram Wagon',
      'Shadow',
      'Spirit',
      'Stratus',
      'Swinger',
      'Viper',
    ],
    Ferrari: [
      '296 GTB',
      '296 GTS',
      '458 Italia',
      '458 Spider',
      '488 GTB',
      '488 Pista',
      '488 Spider',
      '812 GTS',
      '812 Superfast',
      'California',
      'California T',
      'Daytona SP3',
      'F12berlinetta',
      'F8 Tributo',
      'F8 Spider',
      'GTC4Lusso',
      'LaFerrari',
      'Portofino',
      'Portofino M',
      'Purosangue',
      'Roma',
      'SF90 Stradale',
      'SF90 Spider',
    ],
    Fiat: [
      '124 Spider',
      '500',
      '500e',
      '500L',
      '500X',
    ],
    Ford: [
      'Bronco',
      'Bronco II',
      'Bronco Sport',
      'C-Max',
      'Contour',
      'Courier',
      'Crown Victoria',
      'E-150',
      'E-250',
      'E-350',
      'EcoSport',
      'Edge',
      'Escape',
      'Escort',
      'Excursion',
      'Expedition',
      'Explorer',
      'Explorer Sport Trac',
      'F-150',
      'F-250',
      'F-350',
      'F-450',
      'F-550',
      'F-650',
      'Fairlane',
      'Falcon',
      'Festiva',
      'Five Hundred',
      'Flex',
      'Focus',
      'Freestar',
      'Freestyle',
      'Fusion',
      'Galaxie',
      'Granada',
      'GT',
      'Maverick',
      'Mustang',
      'Pinto',
      'Probe',
      'Ranger',
      'Sable',
      'Aerostar',
      'Taurus',
      'Tempo',
      'Thunderbird',
      'Transit',
      'Transit Connect',
      'Windstar',
      'ZX2',
    ],
    GMC: [
      'Acadia',
      'Canyon',
      'Envoy',
      'Hummer EV',
      'Savana',
      'Sierra 1500',
      'Sierra 2500HD',
      'Sierra 3500HD',
      'Terrain',
      'Yukon',
      'Yukon XL',
    ],
    Genesis: [
      'G70',
      'G80',
      'G90',
      'GV60',
      'GV70',
      'GV80',
    ],
    Honda: [
      'Accord',
      'Civic',
      'Clarity',
      'CR-V',
      'CR-Z',
      'Crosstour',
      'Del Sol',
      'Element',
      'Fit',
      'HR-V',
      'Insight',
      'Integra',
      'Odyssey',
      'Passport',
      'Pilot',
      'Prelude',
      'Ridgeline',
      'S2000',
    ],
    Hyundai: [
      'Accent',
      'Azera',
      'Elantra',
      'Equus',
      'IONIQ',
      'Ioniq 5',
      'Ioniq 6',
      'Kona',
      'Nexo',
      'Palisade',
      'Santa Cruz',
      'Santa Fe',
      'Sonata',
      'Tiburon',
      'Tucson',
      'Veloster',
      'Venue',
      'Veracruz',
      'XG350',
    ],
    INFINITI: [
      'Q50',
      'Q60',
      'Q70',
      'QX30',
      'QX50',
      'QX55',
      'QX60',
      'QX80',
    ],
    Jaguar: [
      'E-PACE',
      'F-PACE',
      'F-TYPE',
      'I-PACE',
      'XE',
      'XF',
      'XJ',
      'XK',
    ],
    Jeep: [
      'Cherokee',
      'CJ',
      'Commander',
      'Compass',
      'Gladiator',
      'Grand Cherokee',
      'Grand Wagoneer',
      'Jeepster',
      'Liberty',
      'Patriot',
      'Renegade',
      'Wagoneer',
      'Wrangler',
      'XJ',
    ],
    Kia: [
      'Amanti',
      'Cadenza',
      'Carnival',
      'Ceed',
      'Cerato',
      'EV6',
      'EV9',
      'Forte',
      'K5',
      'K900',
      'Niro',
      'Optima',
      'Picanto',
      'Rio',
      'Rondo',
      'Sedona',
      'Seltos',
      'Soluto',
      'Sonet',
      'Sorento',
      'Soul',
      'Spectra',
      'Sportage',
      'Stinger',
      'Stonic',
      'Telluride',
    ],
    Lamborghini: [
      'Aventador',
      'Gallardo',
      'Huracán',
      'Murciélago',
      'Urus',
      'Revuelto',
    ],
    'Land Rover': [
      'Defender',
      'Discovery',
      'Discovery Sport',
      'Range Rover',
      'Range Rover Evoque',
      'Range Rover Sport',
      'Range Rover Velar',
    ],
    Lexus: [
      'CT',
      'ES',
      'GS',
      'GX',
      'HS',
      'IS',
      'LC',
      'LFA',
      'LS',
      'LX',
      'NX',
      'RC',
      'RX',
      'RZ',
      'SC',
      'TX',
      'UX',
    ],
    Lincoln: [
      'Aviator',
      'Continental',
      'Corsair',
      'MKC',
      'MKS',
      'MKT',
      'MKX',
      'MKZ',
      'Nautilus',
      'Navigator',
      'Town Car',
    ],
    Lucid: [
      'Air',
      'Gravity',
    ],
    Maserati: [
      'Ghibli',
      'GranCabrio',
      'GranTurismo',
      'Grecale',
      'Levante',
      'MC20',
      'Quattroporte',
    ],
    Mazda: [
      '3',
      '5',
      '6',
      'CX-3',
      'CX-30',
      'CX-5',
      'CX-50',
      'CX-70',
      'CX-9',
      'CX-90',
      'Mazda2',
      'MazdaSpeed3',
      'MazdaSpeed6',
      'Miata MX-5',
      'MPV',
      'MX-30',
      'Protege',
      'RX-7',
      'RX-8',
      'Tribute',
    ],
    McLaren: [
      '570S',
      '600LT',
      '650S',
      '720S',
      '750S',
      'Artura',
      'GT',
      'GTS',
      'MP4-12C',
      'Senna',
    ],
    'Mercedes-Benz': [
      'A-Class',
      'AMG GT',
      'B-Class',
      'C-Class',
      'CLA',
      'CLE',
      'CLS',
      'E-Class',
      'EQB',
      'EQC',
      'EQE',
      'EQS',
      'G-Class',
      'GLA',
      'GLB',
      'GLC',
      'GLE',
      'GLK',
      'GLS',
      'M-Class',
      'R-Class',
      'S-Class',
      'SL',
      'SLC',
      'SLK',
      'SLS AMG',
      'Sprinter',
    ],
    MINI: [
      'Clubman',
      'Cooper',
      'Countryman',
      'Hardtop 2 Door',
      'Hardtop 4 Door',
      'John Cooper Works',
      'Roadster',
    ],
    Mitsubishi: [
      'Eclipse',
      'Eclipse Cross',
      'Endeavor',
      'Lancer',
      'Mirage',
      'Outlander',
      'Outlander Sport',
      'Outlander PHEV',
      'Talon',
      'Tundra',
    ],
    Nissan: [
      '350Z',
      '370Z',
      'Altima',
      'Armada',
      'Ariya',
      'Cube',
      'Frontier',
      'GT-R',
      'Juke',
      'Kicks',
      'Leaf',
      'Maxima',
      'Murano',
      'NV200',
      'NV3500',
      'Pathfinder',
      'Pulsar',
      'Quest',
      'Rogue',
      'Rogue Sport',
      'Sentra',
      'Titan',
      'Versa',
      'Xterra',
    ],
    Polestar: [
      'Polestar 1',
      'Polestar 2',
      'Polestar 3',
      'Polestar 4',
    ],
    Porsche: [
      '718 Boxster',
      '718 Cayman',
      '911',
      '918 Spyder',
      'Carrera GT',
      'Cayenne',
      'Cayenne Coupe',
      'Macan',
      'Panamera',
      'Taycan',
    ],
    Ram: [
      '1500',
      '2500',
      '3500',
      'Promaster',
      'Promaster City',
    ],
    Rivian: [
      'R1S',
      'R1T',
      'R2',
      'R3',
    ],
    'Rolls-Royce': [
      'Cullinan',
      'Ghost',
      'Phantom',
      'Spectre',
      'Wraith',
    ],
    Subaru: [
      'Ascent',
      'Baja',
      'BRZ',
      'Crosstrek',
      'Forester',
      'Impreza',
      'Justy',
      'Legacy',
      'Outback',
      'Solterra',
      'SVX',
      'Tribeca',
      'WRX',
      'XT',
    ],
    Tesla: [
      'Cybertruck',
      'Model 3',
      'Model S',
      'Model X',
      'Model Y',
      'Roadster',
      'Semi',
    ],
    Toyota: [
      '4Runner',
      '86',
      'Avalon',
      'C-HR',
      'Camry',
      'Celica',
      'Corolla',
      'Cressida',
      'Crown',
      'Echo',
      'FJ Cruiser',
      'GR Corolla',
      'GR86',
      'Grand Highlander',
      'Highlander',
      'Land Cruiser',
      'Matrix',
      'Mirai',
      'MR2',
      'Prius',
      'Prius C',
      'Prius Prime',
      'Prius V',
      'RAV4',
      'Sequoia',
      'Sienna',
      'Solara',
      'Supra',
      'Tacoma',
      'Tercel',
      'Tundra',
      'Venza',
      'Yaris',
    ],
    Volkswagen: [
      'Arteon',
      'Atlas',
      'Atlas Cross Sport',
      'Beetle',
      'Cabrio',
      'CC',
      'Corrado',
      'Dasher',
      'Eos',
      'Eurovan',
      'Fox',
      'Golf',
      'GTI',
      'ID.4',
      'ID.7',
      'Jetta',
      'Karmann Ghia',
      'New Beetle',
      'Passat',
      'Phaeton',
      'Quantum',
      'Rabbit',
      'Routan',
      'R32',
      'Scirocco',
      'Taos',
      'Thing',
      'Tiguan',
      'Touareg',
      'Type 3',
      'Type 4',
      'Vanagon',
    ],
    Volvo: [
      'C40 Recharge',
      'S60',
      'S90',
      'V60',
      'V90',
      'XC40',
      'XC40 Recharge',
      'XC60',
      'XC90',
      'EX30',
      'EX90',
    ],
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
    this.yearOptions = Array.from({ length: 50 }, (_, i) => (this.currentYear + 2) - i);

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
