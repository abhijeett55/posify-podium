import { Component, signal } from '@angular/core';
import { Login } from './_components/login/login';
// import { Register } from './_components/register/register';

@Component({
  selector: 'app-root',
  imports: [ Login ], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Posify-Podium');
}
