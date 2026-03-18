import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface LeadModal {
  expectedClose: string;
  lastUpdate: string;
  assignedTo: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  status: string;
}

@Component({
  selector: 'app-lead',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lead.html',
  styleUrl: './lead.css',
})
export class Lead {
  constructor(private http: HttpClient) {}
  searchText = '';
  showModal = false;
  
  leadForm: any = {
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    assignedTo: ''
  };
  leads: LeadModal[] = [];


  filteredLeads(): LeadModal[] {
    return this.leads.filter(l =>
      l.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      l.company.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }



  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  loadLeads() {
  this.http.get<any[]>('http://localhost:8080/api/leads')
    .subscribe(data => {
      this.leads = data.map(l => ({
        expectedClose: '',
        lastUpdate: new Date().toISOString(),
        assignedTo: l.assignedTo,
        company: l.company,
        name: l.firstName + ' ' + l.lastName,
        email: l.email,
        phone: l.phone,
        status: l.status
      }));
    });
}
createLead() {
  this.http.post('http://localhost:8080/api/leads', this.leadForm)
    .subscribe({
      next: () => {
        this.loadLeads();   
        this.closeModal();

        // reset form
        this.leadForm = {
          firstName: '',
          lastName: '',
          company: '',
          email: '',
          phone: '',
          assignedTo: '',
          status: 'New'
        };
      },
      error: (err) => console.error(err)
    });
}
}