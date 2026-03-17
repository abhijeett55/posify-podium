import { Component, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  userEmail: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      this.userEmail = localStorage.getItem('userEmail') || '';
    }

  }

}
