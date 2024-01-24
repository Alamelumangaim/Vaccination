import { Component, OnInit, ViewChild } from '@angular/core';
import { History } from '../../interfaces/history';
import { HttpClient } from '@angular/common/http';
import { CenterService } from '../../services/center.service';
import { response } from 'express';
import { NgFor } from '@angular/common';
import { AdminheaderComponent } from '../adminheader/adminheader.component';
import { MatTableModule,MatTableDataSource } from '@angular/material/table';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { Booking } from '../../interfaces/bookinghistory';
@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [NgFor,AdminheaderComponent,MatTableModule,RouterOutlet,RouterLink,RouterLinkActive,MatPaginatorModule],
  templateUrl: './booking-history.component.html',
  styleUrl: './booking-history.component.css'
})
export class BookingHistoryComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator
  ngAfterViewInit(){

  }
Bookings: Booking[] = []
dataSource: any;
constructor(private http: HttpClient,private service: CenterService){}
ngOnInit(): void {
    this.service.getSlots().subscribe(
      (response)=>{this.Bookings=response;
      this.dataSource=new MatTableDataSource(this.Bookings);
      this.dataSource.paginator = this.paginator;
      }
    );
}


displayedColumns: string[] = ['id', 'username', 'phonenumber','date','time','name','aadhaarnumber','email'];
}
