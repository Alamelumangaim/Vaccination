import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ButtonGroupAlignment, PickerInteractionMode } from 'igniteui-angular';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { HeaderComponent } from '../header/header.component';
import { NgFor } from '@angular/common';
import { 
	IgxTimePickerModule,
	IgxInputGroupModule,
	IgxIconModule
 } from "igniteui-angular";
 import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { Subscription } from 'rxjs';
import { CenterService } from '../../services/center.service';
import { Center } from '../../interfaces/center';
import { NgxSpinnerModule } from 'ngx-spinner';
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [RouterOutlet,IgxIconModule,IgxInputGroupModule,IgxTimePickerModule,ReactiveFormsModule
            ,MatFormFieldModule,MatInputModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule,HeaderComponent,NgFor,
          NgxSpinnerModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent{
  count=0;
  aftercount: any
  public mode: PickerInteractionMode = PickerInteractionMode.DropDown;
    public format = 'hh:mm tt';
    public date: Date = new Date();
    data: any;
    private routeSub: Subscription | undefined;
    private api = "http://localhost:8080/api/v1/vaccine/getCenterById"
    centers: any = []
    center_name: any;
    centername: any;
    center: any;
   bookForm=this.fb.group({
      name:['',Validators.required],
      phonenumber:['',Validators.required],
      date:['',Validators.required],
      time:['',Validators.required],
     
    })
    constructor(private fb: FormBuilder,private http: HttpClient,private route: ActivatedRoute,private centerService: CenterService){}
    SubmitForm(){
      
      this.routeSub = this.route.params.subscribe(params => {
        console.log(params) //log the entire params object
        console.log(params['name']) //log the value of id
        this.centername= params['name'];
        
      });
      let postData={
        "name":this.bookForm.value.name,
        "date":this.convert(this.bookForm.value.date),
        "phonenumber":this.bookForm.value.phonenumber,
        "time":this.bookForm.value.time,
        
      }
      console.log(this.centername)
      this.http.post(`http://localhost:8080/api/v1/vaccine/bookAppointment/${this.centername}`,postData).subscribe(
        (response)=>console.log(response)
      )
      this.routeSub = this.route.params.subscribe(params => {
        console.log(params) //log the entire params object
        console.log(params['id']) //log the value of id
        this.data= params['id'];
        
      });
      
      
      
    }
    /* getName(){
      this.http.get<any[]>(`${this.api}/${this.data}`).subscribe(
     
        (response: any)=>{
          this.centers=response;
          this.centers=Array.of(this.centers)
          console.log(this.centers[0].name);
          this.center_name=this.centers[0].name;
        }
        
        
       
      );
      
    } */
    convert(str: any){
   
      var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
   return [date.getFullYear(), mnth, day].join("-");
    }
    countAdd(): any{
      console.log(this.count);
      if(this.count>10){
        console.log(this.count);
        this.aftercount=this.count;
      }
      this.count++;
      console.log("clicked"+ this.count + "times");
      this.aftercount=this.count;
    }
}
