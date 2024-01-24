import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { response } from 'express';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatSelectModule,ReactiveFormsModule,RouterOutlet,RouterLink,RouterLinkActive,HttpClientModule,NgIf,
            ToastModule],
  providers:[MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{
  private api_url ="http://localhost:8080/api/v1/vaccine/register"
  registerForm = this.fb.group(
    {
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
    }
  )
  constructor(private http: HttpClient,private fb: FormBuilder,private messageService: MessageService){}
  SubmitForm(){
    console.log(this.registerForm.value);
    
    let postData=
      {
      "name":this.registerForm.value.name,
      "email":this.registerForm.value.email,
      "password":this.registerForm.value.password
      }
    
    this.http.post(`${this.api_url}`,postData).subscribe(
      (resultData: any)=>{
        console.log(resultData.message);
        if(resultData.message=="Registered successfully"){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered Successfully' });
        }
        else if(resultData.message=="User with the email already exists"){
          this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'User with the email already exists' });
        }
      }
    );
  }
  
  

}
