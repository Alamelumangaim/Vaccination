import { Component, OnInit } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { History } from '../../interfaces/history';
import { HttpClient } from '@angular/common/http';
import { CenterService } from '../../services/center.service';
import { response } from 'express';
import { NgFor } from '@angular/common';
import { Center } from '../../interfaces/center';
import { AdminheaderComponent } from '../adminheader/adminheader.component';
import { CenterComponent } from '../center/center.component';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,MatButtonModule,MatMenuModule,NgFor,RouterLink,RouterLinkActive,AdminheaderComponent,CenterComponent],
  providers:[CenterService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  histories: History[]=[];
  centers: Center[]=[]
  constructor(private http: HttpClient,private centerService: CenterService){}
  ngOnInit(): void {
      this.centerService.getHistory().subscribe(
        (response)=>this.histories=response
      );
      this.centerService.getCenters().subscribe(
        (response)=>this.centers=response
      );
  }
}
