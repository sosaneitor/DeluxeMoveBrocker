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
      title: 'Asesoría personalizada',
      description: 'En Deluxe Move Broker LLC te acompañamos en todo el proceso para que el transporte de tu vehículo sea ágil y sin contratiempos. Tu tranquilidad es nuestra prioridad.'
    },
    {
      icon: 'fa-dollar-sign', // Pago inicial $0
      title: 'Sin pago anticipado',
      description: '¡Así es! No cobramos nada por adelantado. Solo realizas el pago cuando tu vehículo ha sido entregado de forma segura.'
    },
    {
      icon: 'fa-shield', // Cobertura de seguro
      title: 'Protección asegurada',
      description: 'Cada envío incluye cobertura de seguro según tu cotización. Nuestros transportistas cumplen con los más altos estándares de calidad y seguridad.'
    },
    {
      icon: 'fa-user-check', // Asesores dedicados
      title: 'Atención experta',
      description: 'Nuestro equipo de expertos te ayudará a elegir la mejor opción para tu traslado. Hacemos seguimiento constante para mantenerte informado en todo momento.'
    }
  ];
  
}
