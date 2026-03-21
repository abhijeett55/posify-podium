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
  spaceName = '';
  spaceKey = '';
  type = 'software';

    types = [
    { label: 'Jira - software spaces', value: 'software' },
    { label: 'Jira - business spaces', value: 'business' },
    { label: 'Jira Service Management', value: 'service' },
    { label: 'Product Discovery', value: 'product' }
  ];

    createSpace() {
    const payload = {
      name: this.spaceName,
      key: this.spaceKey,
      type: this.type
    };

  }
}
