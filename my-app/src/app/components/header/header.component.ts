import { Component } from '@angular/core';
import { DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { CenterService } from '../../services/center.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf,RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements DoCheck{
  ismenuRequired = false;
  isadminRequired=false;
  constructor(private router: Router,private service: CenterService){}
  currenturl = this.router.url
  ngDoCheck(): void {
    if(this.currenturl=='/login' || this.currenturl=='/register'){
      this.ismenuRequired=false;
    }
    else{
      this.ismenuRequired=true;
    }
    if(this.service.GetUserrole()==='admin'){
      this.isadminRequired=true;
    }
    else{
      this.isadminRequired=false;
    }
  }

}
