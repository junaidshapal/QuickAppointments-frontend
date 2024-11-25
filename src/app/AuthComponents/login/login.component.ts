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


login():void {
  this.authService.login(this.loginData).subscribe({
    next: (response) => {
      if (this.authService.isAuthenticated()) {
        this.router.navigate(['dashboard']);
      }
    },
    error: (err) => {
      console.log('Login failed:', err);
    },
    complete: () => {
      console.log('Login request completed.');
    }
  });
}



//Method to show password
togglePasswordVisibility(){
  this.showPassword = !this.showPassword;
}

}



