import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-price-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price-overview.component.html',
  styleUrl: './price-overview.component.scss'
})
export class PriceOverviewComponent {
 // Encabezado y texto de introducción
 sectionTitle = 'Precio';
 sectionIntro = `
   El costo total de transporte de vehículos depende del tipo de auto que quieras enviar, 
   de dónde se debe recoger y entregar, de la condición del vehículo, 
   si tiene modificaciones, de la distancia de transporte, 
   del tipo de transporte (abierto o cerrado) y, finalmente, 
   de la temporada del año en que se realice el envío.
 `;

 // Factores que influyen en el precio
 factors = [
   {
     number: '01',
     title: 'Tamaño y peso del vehículo',
     description: `
       Vehículos más grandes o pesados requieren alojamiento especial 
       y, por lo tanto, el precio puede variar para cubrir esas necesidades.
     `
   },
   {
     number: '02',
     title: 'La condición del vehículo',
     description: `
       El envío de vehículos inoperables suele costar más 
       debido a que requiere equipo adicional y más mano de obra 
       para acomodar la carga de forma segura.
     `
   },
   {
     number: '03',
     title: 'El tipo de transporte',
     description: `
       El transporte abierto es el estándar y más económico. 
       El transporte cerrado brinda mayor protección al vehículo, 
       aunque su costo suele ser más alto.
     `
   }
 ];
}
