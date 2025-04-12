import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-choose-us.component.html',
  styleUrl: './why-choose-us.component.scss'
})
export class WhyChooseUsComponent {
  // Definición de los beneficios que se mostrarán
  features = [
    {
      icon: 'fa-headset', // Atención personalizada
      title: 'Atención personalizada',
      description: 'En Safe Auto Transport trabajamos contigo en cada paso para completar el transporte de tu vehículo. Disfruta de un envío sin complicaciones al elegirnos.'
    },
    {
      icon: 'fa-dollar-sign', // Pago inicial $0
      title: 'Pago inicial $0',
      description: '¡Así es! No cobramos nada por adelantado. Solo te cobramos cuando el vehículo ha sido entregado por nuestro transportista.'
    },
    {
      icon: 'fa-shield', // Cobertura de seguro
      title: 'Cobertura de seguro',
      description: 'Tu envío está cubierto por el seguro incluido en la cotización. Todos nuestros camiones cumplen con los estándares exigidos.'
    },
    {
      icon: 'fa-user-check', // Asesores dedicados
      title: 'Asesores dedicados',
      description: 'Nuestros asesores te ayudarán a encontrar la mejor solución para transportar tu vehículo. Hacemos seguimiento constante del envío.'
    }
  ];
}
