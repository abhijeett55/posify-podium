import { Component, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { Auth, User } from '../../_services/auth';
import { EmailService } from '../../_services/email-service';


export interface EmailModel {
  id?: string | number;
  sender: string;
  subject: string;
  body: string;
  time: string;
  tags: string[];
  folder: string;
}

@Component({
  selector: 'app-emails',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './emails.html',
  styleUrl: './emails.css',
})
export class Emails {
  currentFolder: string = 'inbox';
  user: User | null = null;
  allEmails : EmailModel[] = [];
  filteredEmails: EmailModel[] = []
  selectedMail: EmailModel | null = null;
  searchTerm: string = '';

  constructor(private authService: Auth,
    private router: Router,
    private emailService: EmailService,
    @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {

    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });

    if (!isPlatformBrowser(this.platformId)) return;

    this.loadEmailsFromServer();
  }
  selectMail(mail: EmailModel) {
    this.selectedMail = mail;

  }

  selectFolder(folder: string) {
    this.currentFolder = folder;
    this.selectedMail = null;
    this.filterEmailsByFolder();
  }
  
  sendReply(replyText: string) {
    if (!this.selectedMail || !replyText.trim()) return;

    if (!this.user?.email) {
      console.error('User not logged in. Cannot send reply.');
      return;
    }


    const sentEmail: EmailModel = {
      id: undefined,
      sender: this.user?.email,
      subject: `Re: ${this.selectedMail.subject}`,
      body: replyText,
      time: new Date().toISOString(),
      tags: ['sent'],
      folder: 'sent'
    };

    this.emailService.createEmail(sentEmail).subscribe({
      next: (newEmail) => {
        this.allEmails.push(newEmail);
        this.filterEmailsByFolder();
        const textarea = document.querySelector('.reply-box textarea') as HTMLTextAreaElement;
        if (textarea) textarea.value = '';
        console.log('Reply sent successfully');
      },
      error: (err) => console.error('Failed to send reply', err)
    });
  }


  filterEmailsByFolder() {
    let filtered = this.allEmails.filter(email => email.folder === this.currentFolder);
    if (this.searchTerm) {
      filtered = filtered.filter(email =>
        email.subject.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        email.sender.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        email.body.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.filteredEmails = filtered;
  }

  loadEmailsFromServer() {
    this.emailService.getAllEmails().subscribe({
      next: (emails) => {
        this.allEmails = emails;
        this.filterEmailsByFolder();
      },
      error: (err) => {
        console.error('Failed to load emails', err);
        
      }
    });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.filterEmailsByFolder();
  }

  getFolderDisplayName(folder: string): string {
    const names: { [key: string]: string } = {
      inbox: 'Inbox',
      draft: 'Drafts',
      sent: 'Sent',
      trash: 'Trash',
      junk: 'Junk',
      archive: 'Archive',
      social: 'Social',
      updates: 'Updates',
      forum: 'Forum'
    };
    return names[folder] || 'Inbox';
  }

}
