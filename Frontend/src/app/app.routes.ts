import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { QuestionComponent } from './components/question/question.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path:'', redirectTo:'welcome',pathMatch:"full"
    },
    {
        path:"welcome", 
        component:WelcomeComponent
    },
    {
        path:"question", 
        component:QuestionComponent,
        canActivate:[authGuard]
    },
    {
        path:"login", 
        component:LoginComponent
    },
    {
        path:"register", 
        component:RegisterComponent
    }

];
  