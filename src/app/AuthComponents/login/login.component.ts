import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword = false;

  

  ngOnInit(): void {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    if (this.loginForm.invalid) {
      alert('Please provide valid credentials');
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Login failed! Please check your credentials.');
      },
    });
  }
}
