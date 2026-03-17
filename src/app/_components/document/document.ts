import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DocumentService } from '../../_services/document.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


export interface Document {
  id: string;
  dateCreated: string;
  assignedTo: string;
  name: string;
  description: string;
  selected?: boolean;
}

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterModule ],
  templateUrl: './document.html',
  styleUrl: './document.css',
})
export class DocumentComponent {
  constructor(private documentService: DocumentService,  @Inject(PLATFORM_ID) private platformId: Object) {}

  allDocuments: Document[] = [];


  filterText = '';
  rowsPerPage = 50;
  currentPage = 1;
  rowsPerPageOptions = [10, 20, 50];

  onFileSelected(event: Event, type: string) {

    if (!isPlatformBrowser(this.platformId)) return;

    const element = event.currentTarget as HTMLInputElement;
    const fileList = element.files;

    if (fileList && fileList.length > 0) {

      const file = fileList[0];

      const email = localStorage.getItem("userEmail") || "";

      this.documentService
        .uploadFile(file, email, type)
        .subscribe({
          next: () => {
            this.loadDocuments();
          },
          error: err => console.error(err)
        });
    }
  }

  ngOnInit() {
    this.loadDocuments();
  }

  loadDocuments() {

  if (!isPlatformBrowser(this.platformId)) {
    return;
  }

    const email = localStorage.getItem("userEmail") || "";
    console.log("Fetching documents for:", email);
    this.documentService.getUserDocuments(email)
      .subscribe((docs: any) => {
        console.log("API response:", docs);
        this.allDocuments = docs.map((d: any) => ({
          id: d.id,
          dateCreated: d.dateCreated,
          assignedTo: d.userEmail,
          name: d.fileName,
          description: d.description,
          selected: false
        }));

      });

  }


  
  get filteredDocuments(): Document[] {
    if (!this.filterText.trim()) {
      return this.allDocuments;
    }
    const lowerFilter = this.filterText.toLowerCase();
    return this.allDocuments.filter(doc =>
      doc.dateCreated.toLowerCase().includes(lowerFilter) ||
      doc.assignedTo.toLowerCase().includes(lowerFilter) ||
      doc.name.toLowerCase().includes(lowerFilter) ||
      doc.description.toLowerCase().includes(lowerFilter)
    );
  }

  
  get paginatedDocuments(): Document[] {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    return this.filteredDocuments.slice(start, end);
  }

  
  get totalPages(): number {
    return Math.ceil(this.filteredDocuments.length / this.rowsPerPage) || 0;
  }

  
  get selectedCount(): number {
    return this.filteredDocuments.filter(doc => doc.selected).length;
  }

  
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  
  onRowsPerPageChange(value: string) {
    this.rowsPerPage = Number(value);
    this.currentPage = 1; // reset to first page
  }

  
  toggleAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.paginatedDocuments.forEach(doc => (doc.selected = checked));
  }

  
  areAllVisibleSelected(): boolean {
    return this.paginatedDocuments.length > 0 &&
           this.paginatedDocuments.every(doc => doc.selected);
  }

  
  isIndeterminate(): boolean {
    const selectedVisible = this.paginatedDocuments.filter(doc => doc.selected).length;
    return selectedVisible > 0 && selectedVisible < this.paginatedDocuments.length;
  }
}
