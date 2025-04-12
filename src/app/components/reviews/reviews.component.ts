import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  reviews = [
    {
      author: 'John Hoekstra',
      text: 'Safe Auto Transport es una estrella en la industria del transporte de vehículos. Se esfuerzan al máximo para ofrecer una experiencia de envío sin complicaciones. ¡Altamente recomendado!',
      rating: 5
    },
    {
      author: 'Scott McCool',
      text: 'Este equipo es de primera. El conductor llegó a tiempo y el proceso fue muy sencillo. Sin duda volvería a contratar su servicio.',
      rating: 5
    },
    {
      author: 'Marilyn Smith',
      text: 'Me encantó la experiencia: todo fue fácil y el personal siempre fue amable. Mi familia y yo quedamos muy satisfechos con la transparencia y el cuidado de nuestro auto.',
      rating: 5
    },
    {
      author: 'Chris Donnelly',
      text: 'Justin llevó mi auto desde Texas hasta California, y el proceso fue excelente. Definitivamente recomiendo su servicio: rápido y con una atención al cliente maravillosa.',
      rating: 5
    }
  ];
}
