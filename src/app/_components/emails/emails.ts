import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  emails : EmailModel[] = [];

  selectedMail: EmailModel | null = null;

  selectMail(mail: EmailModel) {
    this.selectedMail = mail;
  }
  
  sendReply() {
    console.log("Reply sent");
  }

}
