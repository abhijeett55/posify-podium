import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule} from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [ CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerWithGoogle() {
    console.log("Registered");
  }

  onRegister(form: NgForm) {
    if(form.valid) {
      console.log("Login Date: ", form.value);
    }
  }
}
