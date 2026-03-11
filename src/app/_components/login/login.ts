import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginWithGithub() {
    console.log("Github Authenticated");
  }

  loginWithGoogle() {
    console.log("Google Authenticated");
  }

  onLogin(form: NgForm) {
    if(form.valid) {
      console.log("Login Date: ", form.value);
    }
  }
}
