import { Component } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CenterService } from '../../services/center.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,MatFormFieldModule,MatInputModule,MatSelectModule,ReactiveFormsModule,NgIf,ToastModule,HttpClientModule,RouterLink,RouterLinkActive],
  providers:[MessageService,HttpClient],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private api_url = "http://localhost:8080/api/v1/vaccine/login"
  loginForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  })
  constructor(private fb: FormBuilder,private messageService: MessageService,private router: Router,
    private centerService: CenterService,private http: HttpClient){
      sessionStorage.clear();
    }
  SubmitForm(){
    console.log(this.loginForm.value);
    let postData={
      "email":this.loginForm.value.email,
      "password":this.loginForm.value.password
    }
    /* this.http.post(`${this.api_url}`,postData).subscribe(
      (resultData: any)=>{
        if(resultData.message == "Success"){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logged In Successfully' });
          (<any>this.router).navigate(['']);
        }
        else if(resultData.message=="Failed"){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Log In Failed' });
        }
        else if(resultData.message=="Password Mismatched"){
          this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Password not matched' });
        }
        else if(resultData.message=="User not exists"){
          this.messageService.add({severity:'error',summary:'Error',detail:'User not exists'})
        }
      }
    ) */
    this.centerService.login(postData).subscribe(
      (resultData: any)=>{
        if(resultData.message == "Success"){
          console.log(resultData);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logged In Successfully' });
          (<any>this.router).navigate(['']);
          sessionStorage.setItem('email',resultData.email);
          sessionStorage.setItem('role',resultData.role);
          this.router.navigate(['']);
        }
        else if(resultData.message=="Failed"){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Log In Failed' });
        }
        else if(resultData.message=="Password Mismatched"){
          this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Password not matched' });
        }
        else if(resultData.message=="User not exists"){
          this.messageService.add({severity:'error',summary:'Error',detail:'User not exists'})
        }
      }
    )
  }
 
}
