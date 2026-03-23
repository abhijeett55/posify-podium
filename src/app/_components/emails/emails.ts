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
    this.loadSampleEmails();
  }

  selectMail(mail: EmailModel) {
    this.selectedMail = mail;

  }

  selectFolder(folder: string) {
    this.currentFolder = folder;
    this.selectedMail = null; // Clear selection when changing folder
    this.filterEmailsByFolder();
  }
  
  sendReply() {
    console.log("Reply sent", this.selectedMail);
  }

    loadSampleEmails() {
    this.allEmails = [
      {
        id: '1',
        folder: 'inbox',
        sender: 'john.doe@example.com',
        subject: 'Meeting tomorrow',
        body: 'Hi, let\'s discuss the project tomorrow at 10 AM.',
        time: '10:30 AM',
        tags: ['work', 'meeting']
      },
      {
        id: '2',
        folder: 'inbox',
        sender: 'newsletter@tech.com',
        subject: 'Weekly Tech Digest',
        body: 'Top stories: Angular 18 released, ...',
        time: '9:15 AM',
        tags: ['tech']
      },
      {
        id: '3',
        folder: 'sent',
        sender: 'me',
        subject: 'Re: Project update',
        body: 'I\'ve completed the task, please review.',
        time: 'Yesterday',
        tags: ['work']
      },
      {
        id: '4',
        folder: 'draft',
        sender: 'me',
        subject: 'Draft: Proposal',
        body: 'This is a draft email about the proposal...',
        time: 'Draft saved 2 days ago',
        tags: ['draft']
      },
      {
        id: '5',
        folder: 'social',
        sender: 'facebook@notifications.com',
        subject: 'Someone commented on your post',
        body: 'John commented: "Great photo!"',
        time: '3:45 PM',
        tags: ['social']
      }
      // Add more emails with different folders as needed
    ];
    this.filterEmailsByFolder();
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
