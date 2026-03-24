import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth, User } from '../../_services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  user: User | null = null ;

  constructor(private authService: Auth,
    private router: Router) { 
    this.authService.currentUser$.subscribe(user => this.user = user);
  }

  

  ngOnInit() {
    this.authService.currentUser$.subscribe((user: User|  null) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
