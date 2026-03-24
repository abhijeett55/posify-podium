import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpaceService } from '../../_services/space.service';

export interface SpaceModal {
  id?: string;
  name: string;
  key: string;
  type: string;
}

@Component({
  selector: 'app-space',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './space.html',
  styleUrl: './space.css',
})
export class Space implements OnInit {

  spaces: SpaceModal[] = [];

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

  constructor(private spaceService: SpaceService) {}

  
  ngOnInit() {
    this.loadSpaces();
  }

  
  loadSpaces() {
    this.spaceService.getSpaces().subscribe(data => {
      this.spaces = data;
    });
  }

  
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  
  createSpace() {
    if (!this.spaceName || !this.spaceKey) {
      alert('Please fill all fields');
      return;
    }

    const payload = {
      name: this.spaceName,
      key: this.spaceKey,
      type: this.type
    };

    this.spaceService.createSpace(payload).subscribe(() => {
      this.loadSpaces();

      this.spaceName = '';
      this.spaceKey = '';
      this.type = 'software';

      this.closeModal();
    });
  }

  
  deleteSpace(id: string, event: Event) {
    event.stopPropagation();

    this.spaceService.deleteSpace(id).subscribe(() => {
      this.loadSpaces();
    });
  }
}
