import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Auth/auth.service'; 
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup | undefined;
//variables for show password toggle
showPassword = false;
  
  loginData = { UserName: '', Password: '' };

constructor(
  private formBuilder:FormBuilder,
  private authService: AuthService, private router: Router) {}
  
ngOnInit(): void {
  this.loginForm = this.formBuilder.group({
    userName:['', Validators.required],
    password:['', Validators.required]
  })
}


login(): void {
  if (this.loginForm?.invalid) {
    alert('Please provide valid credentials');
    return;
  }

  this.authService.login(this.loginData).subscribe({
    next: (response) => {
      localStorage.setItem('jwtToken', response.token); // Store JWT token
      alert('Login successful!');
      this.router.navigate(['/dashboard']); // Redirect to dashboard
    },
    error: (err) => {
      console.error('Login failed:', err);
      alert('Invalid login credentials!');
    },
  });
}



//Method to show password
togglePasswordVisibility(){
  this.showPassword = !this.showPassword;
}

}



