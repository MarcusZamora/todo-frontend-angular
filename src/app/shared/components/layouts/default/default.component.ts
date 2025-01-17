import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {

}
