import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { Auth } from '../../_services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private authService: Auth, private router: Router ) { }

  onLogin(form: NgForm) {
    if(form.invalid) return;

    const { email , password} = form.value;
    this.authService.login(email, password).subscribe({
      next: (res) => {
        console.log('Login success', res);
        this.authService.saveUserData(res.token, res.user);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }


  loginWithGithub() {
    console.log("Github Authenticated");
  }

  loginWithGoogle() {
    console.log("Google Authenticated");
  }
}
