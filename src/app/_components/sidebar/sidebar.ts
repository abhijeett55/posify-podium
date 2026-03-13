import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    private router: Router) { 
    this.authService.currentUser$.subscribe(user => this.user = user);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
