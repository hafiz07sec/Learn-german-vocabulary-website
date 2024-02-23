import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
        ButtonModule,
        RouterLink,
        CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

   

  constructor(
    private router: Router,
    private authService: AuthService
    
    ) { }

    isLoggedIn(): boolean {
      return this.authService.isLoggedIn();
    }
  
    signIn(): void {
      console.log("SignIn")
      this.authService.signIn();
    }
  
    signOut(): void {
     
      this.authService.signOut();
    }



}
