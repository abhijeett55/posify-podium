import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export interface Document {
  id: number;
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

  allDocuments: Document[] = [];


  filterText = '';
  rowsPerPage = 50;
  currentPage = 1;
  rowsPerPageOptions = [10, 20, 50];

  onFileSelected(event: Event, type: string) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      console.log(`Uploading ${type}:`, file.name);

      const newDoc: Document = {
        id: Date.now(),
        dateCreated: new Date().toLocaleDateString(),
        assignedTo: 'User',
        name: file.name,
        description: type + ' file',
        selected: false
      };

      this.allDocuments.push(newDoc);
    }
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
