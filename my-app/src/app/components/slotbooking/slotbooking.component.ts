import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Date } from '../../interfaces/dates';
import { CenterService } from '../../services/center.service';
import { response } from 'express';
import { NgFor } from '@angular/common';
import { Center } from '../../interfaces/center';
import { Time } from '../../interfaces/time';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-slotbooking',
  standalone: true,
  imports: [HeaderComponent,NgFor,RouterOutlet,RouterLink,RouterLinkActive,MatButtonToggleModule,ToastModule],
  providers:[MessageService],
  templateUrl: './slotbooking.component.html',
  styleUrl: './slotbooking.component.css'
})
export class SlotbookingComponent implements OnInit{
[x: string]: any;
  public dates: Date[]=[]
  public centers: Center[] = []
  public timeslots: Time[] = []
  public date: string | undefined;
  constructor(private service: CenterService,private messageService: MessageService){}
  ngOnInit(): void {
      this.service.getDates().subscribe(
        (response)=>{
            this.dates=response;
        }
      )
      this.service.getCenters().subscribe(
        (response)=>{
          this.centers=response;
        }
      )
      this.service.getTime().subscribe(
        (response)=>{
          this.timeslots=response;
        }
      )
  }
  dateSelector(date: any){
   this.date = date;
   console.log(date)
  }
  invoke(date: any){
    console.log(date);
    if(date==undefined){
      console.log(date);
      this.messageService.add({ severity: 'warn', summary: 'warn', detail: 'Date should be selected' });
    }
  }

}
