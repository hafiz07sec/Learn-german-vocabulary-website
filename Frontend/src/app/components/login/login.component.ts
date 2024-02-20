import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router: Router,
    private messageService: MessageService
    ){

  }

  get email(){
    return this.loginForm.controls['email'];
  }
  get password(){
    return this.loginForm.controls['password'];
  }

  loginUser(){
    const { email, password } = this.loginForm.value;
    this.authService.getUserByEmaul(email as string).subscribe(
      response => {
        if(response.length > 0 && response[0].password === password){
          sessionStorage.setItem('email', email as string);
            this.router.navigate(['/home']);
        }
        else
        {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email or Password is wrong' });
         
        }
      },
      error =>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went Wrong' });
        
      }
    )
  }

}
