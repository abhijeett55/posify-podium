import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-space',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './space.html',
  styleUrl: './space.css',
})
export class Space {
  spaces: any[] = [];
  showModal: boolean = false;
  spaceName = '';
  spaceKey = '';
  type = 'software';
  types = [
    { label: 'Software spaces', value: 'software' },
    { label: 'Business spaces', value: 'business' },
    { label: 'Service Management', value: 'service' },
    { label: 'Product Discovery', value: 'product' }
  ];

  ngOnInit() {
    const data = localStorage.getItem('spaces');
    if (data) {
      this.spaces = JSON.parse(data);
    }
  }


  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  getImage(type: string): string {
    switch (type) {
      case 'software': return 'assets/software.jpg';
      case 'business': return 'assets/business.jpg';
      case 'service': return 'assets/service.jpg';
      case 'product': return 'assets/product.jpg';
      default: return 'assets/default.jpg';
    }
  }

  createSpace() {
    if (!this.spaceName || !this.spaceKey) {
      alert('Please fill all fields');
      return;
    }
    const newSpace = {
      name: this.spaceName,
      key: this.spaceKey,
      type: this.type
    };

    this.spaces.push(newSpace);
    this.spaceName = '';
    this.spaceKey = '';
    this.type = 'software';
    

    this.closeModal();
  }
}
