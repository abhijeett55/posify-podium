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

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

    createSpace() {
    const payload = {
      name: this.spaceName,
      key: this.spaceKey,
      type: this.type
    };
    console.log('Done');
    this.closeModal();
  }
}
