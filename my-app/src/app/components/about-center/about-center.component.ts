import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { Center } from '../../interfaces/center';
import { NgFor } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-about-center',
  standalone: true,
  imports: [HeaderComponent,NgFor,FooterComponent,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './about-center.component.html',
  styleUrl: './about-center.component.css'
})
export class AboutCenterComponent implements OnInit{
  private routeSub: Subscription | undefined;
  id: any;
  name: any;
  centers: any;
  api_url="http://localhost:8080/api/v1/vaccine"
  constructor(private route: ActivatedRoute,private http: HttpClient){}
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.id= params['id'];
      
    });
    
    this.http.get(`${this.api_url}/getCenterById/${this.id}`).subscribe(
      (response: any)=>{
          this.centers=response;
          this.centers=Array.of(this.centers)
          console.log(this.centers);
      }
    )
  }
  
}
