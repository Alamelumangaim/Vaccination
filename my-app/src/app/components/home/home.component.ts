import { Component, OnInit, inject } from '@angular/core';
import { CenterService } from '../../services/center.service';
import { Center } from '../../interfaces/center';
import { NgFor } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet,RouterLink,RouterLinkActive, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { NgIf } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,FooterComponent,RouterOutlet,RouterLink,RouterLinkActive,HeaderComponent,NgIf,NgxSpinnerModule],
  providers:[CenterService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  centers: Center[] = [];
  loader=true;
  loaded=false;
  constructor(private centerService: CenterService,private spinner: NgxSpinnerService,private router: Router){}
  ngOnInit(): void {
      this.centerService.getCenters().subscribe(
        (vaccine)=>this.centers=vaccine
      )
      
  }
  openSpinner(){
        this.router.navigate(['/slot'])
        this.spinner.show();
        setTimeout(
          ()=>{
            this.spinner.hide();
          },5000
        )
  }
}
