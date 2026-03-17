import { Component, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Auth, User } from '../../_services/auth';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ CommonModule, RouterModule ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  user: User | null = null ;

  constructor(private authService: Auth,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) { 
  }

  ngOnInit() {

    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });

    if (isPlatformBrowser(this.platformId) && !this.user) {

      const email = localStorage.getItem('userEmail');
      const name = localStorage.getItem('userName');
      if(email) {
        this.user = {
        email: email,
        name: name || 'User'
        };
      }
      
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
