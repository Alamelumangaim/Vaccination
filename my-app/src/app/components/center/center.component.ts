import { Component, OnInit } from '@angular/core';
import { CenterService } from '../../services/center.service';
import { response } from 'express';
import { Center } from '../../interfaces/center';
import { NgFor } from '@angular/common';
import { AdminheaderComponent } from '../adminheader/adminheader.component';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { AfterViewInit,ViewChild } from '@angular/core';
import { MatSort,Sort,MatSortModule } from '@angular/material/sort';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { UpdatecenterComponent } from '../updatecenter/updatecenter.component';
import { AddCenterComponent } from '../add-center/add-center.component';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-center',
  standalone: true,
  imports: [NgFor,AdminheaderComponent,MatTableModule,MatButtonModule,MatPaginatorModule,MatSortModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './center.component.html',
  styleUrl: './center.component.css'
})

export class CenterComponent implements OnInit{
  centers: Center[]=[];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
ngAfterViewInit(): void {

}
  constructor(private service: CenterService,private dialog: MatDialog){}
  ngOnInit(): void {
      this.service.getCenters().subscribe(
        (response)=>{
          this.centers=response;
          this.dataSource= new MatTableDataSource(this.centers);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort=this.sort;
        }
      );
  }
  displayedColumns: string[] = ['center id', 'name', 'location','update'];
 UpdateCenter(id: any){
  this.dialog.open(UpdatecenterComponent,{
    enterAnimationDuration:'1000ms',
    exitAnimationDuration:'500ms',
    width:'50%',
    data:{
      centerid: id
    }
  })
 }
 addCenter(){
  this.dialog.open(AddCenterComponent,{
    enterAnimationDuration:'1000ms',
    exitAnimationDuration:'500ms',
    width:'50%',
  })
 }
}
