import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { HeaderComponent } from '../header/header.component';
import { NgFor,NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { response } from 'express';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-booking-slot',
  standalone: true,
  imports: [MatDatepickerModule,MatFormFieldModule,MatInputModule,MatNativeDateModule,MatSelectModule,HeaderComponent,NgFor,ReactiveFormsModule,NgIf
  ,ToastModule],
  providers:[MessageService],
  templateUrl: './booking-slot.component.html',
  styleUrl: './booking-slot.component.css'
})
export class BookingSlotComponent {
  private routeSub: Subscription | undefined;
  private api = "http://localhost:8080/api/v1/vaccine"
  name: any;
  date:any;
  time:any
  bookingForm=this.fb.group({
    username:['',Validators.required],
    phonenumber:['',Validators.required],
    aadhaarnumber:['',Validators.required],
    email:['',[Validators.required,Validators.email]]
  })
  constructor(private fb: FormBuilder,private route: ActivatedRoute,private http: HttpClient,private messageService: MessageService){}
  SubmitForm(){
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['name']) //log the value of id
      this.name= params['name'];
      
    });
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['date']) //log the value of id
      this.date= params['date'];
      
    });
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['timeslot']) //log the value of id
      this.time= params['timeslot'];
      
    });
    console.log(this.bookingForm.value)
    console.log(this.name);
    console.log(this.date);
    console.log(this.time);

    let postData={
      "username":this.bookingForm.value.username,
      "phonenumber":this.bookingForm.value.phonenumber,
      "aadhaarnumber":this.bookingForm.value.aadhaarnumber,
      "email":this.bookingForm.value.email,
    }
    this.http.post(`${this.api}/bookslot/${this.name}/${this.date}/${this.time}`,postData).subscribe(
      (resultData: any)=>{
        if(resultData.message=="Bookings were closed"){
          this.messageService.add({ severity: 'error', summary: 'error', detail: 'Bookings closed for today' });
        }
        else if(resultData.message=="Saved your booking"){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your appointment has been booked' });
        }
      }
    )
  }
}
