import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { Auth } from '../../_services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, FormsModule , RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  constructor(private router: Router, private authService: Auth) { }
    
  registerWithGoogle() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }


  
  loginWithGithub() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/github';
  }

  onRegister(form: NgForm) {
    if(form.invalid) return;

    const { name, email, password, confirmPassword } = form.value;

    if(password !== confirmPassword) {
      console.error('Password do not match');
      return;
    }


    this.authService.register(name, email, password).subscribe({
      next: (res) => {
        console.log('Registration success', res);
        this.authService.saveUserData(res.token , res.user);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Registration failed', err);
      }
    });
  }
}
