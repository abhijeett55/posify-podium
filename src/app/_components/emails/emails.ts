import { Component, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { Auth, User } from '../../_services/auth';

export interface EmailModel {
  id: string;
  sender: string;
  subject: string;
  body: string;
  time: string;
  tags: string[];
}

@Component({
  selector: 'app-emails',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './emails.html',
  styleUrl: './emails.css',
})
export class Emails {
  user: User | null = null;

  emails : EmailModel[] = [];

  selectedMail: EmailModel | null = null;

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

  selectMail(mail: EmailModel) {
    this.selectedMail = mail;
  }
  
  sendReply() {
    console.log("Reply sent");
  }

}
