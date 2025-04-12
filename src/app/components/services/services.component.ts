import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {

  services = [
    {
      title: 'Enclosed Trailers',
      description: 'Transporta vehículos clásicos, exóticos y de carrera en remolques cerrados.',
      backgroundImage: 'assets/AutoTransportService3.PNG'
    },
    {
      title: 'Open Trailers',
      description: 'Transporta todo tipo de vehículos con el mejor equipo abierto y seguro.',
      backgroundImage: 'assets/AutoTransportService2.png'
    },
    {
      title: 'Transporte Local y Almacenamiento',
      description: 'Recogida y entrega garantizadas en California del Norte & almacenamiento seguro y asequible.',
      backgroundImage: 'assets/AutoTransportService4.PNG'
    }
  ];
}
