import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
// export class SignupComponent {
//   registerForm: FormGroup;
//   showPassword = false;
//   showConfirmPassword = false;

//   constructor(private fb: FormBuilder, private authService: AuthService) {
//     this.registerForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       confirmPassword: ['', Validators.required],
//     });
//   }

//   togglePasswordVisibility() {
//     this.showPassword = !this.showPassword;
//   }

//   toggleConfirmPasswordVisibility() {
//     this.showConfirmPassword = !this.showConfirmPassword;
//   }

//   onSubmit(): void {
//     if (this.registerForm.invalid) {
//       alert('Please fill out the form correctly');
//       return;
//     }

//     const { password, confirmPassword } = this.registerForm.value;

//     if (password !== confirmPassword) {
//       alert('Passwords does not match');
//       return;
//     }

//     this.authService.register(this.registerForm.value).subscribe({
//       next: (response) => {
//         console.log('Registration successful:', response);
//         this.registerForm.reset();
//         alert('Signup successful! You can now log in.');
//       },
//       error: (err) => {
//         console.error('Registration failed:', err);
//         alert('Registration failed! Please try again later.');
//       },
//     });
//   }
// }
export class SignupComponent {
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],  // New Role Selection
      specialty: ['']  // Specialty (Required only for Doctors)
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  // Handle Role Change
  onRoleChange(event: Event): void {
    const selectedRole = (event.target as HTMLSelectElement).value;
    if (selectedRole === 'Doctor') {
      this.registerForm.addControl('specialty', this.fb.control('', Validators.required));
    } else {
      this.registerForm.removeControl('specialty');
    }
  }
  onSubmit(): void {
    if (this.registerForm.invalid) {
      alert('Please fill out the form correctly');
      return;
    }
    const { password, confirmPassword, role, specialty } = this.registerForm.value;
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (role === 'Doctor' && !specialty) {
      alert('Doctors must enter a specialty.');
      return;
    }
    
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.registerForm.reset();
        alert('Signup successful! You can now log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        alert('Registration failed! Please try again later.');
      },
    });
  }
}

