import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Center } from '../interfaces/center';
import { History } from '../interfaces/history';
import { Date } from '../interfaces/dates';
import { Time } from '../interfaces/time';
import { Booking } from '../interfaces/bookinghistory';
@Injectable({
  providedIn: 'root'
})
export class CenterService {
  private api_url = "http://localhost:8080/api/v1/vaccine";
  constructor(private http: HttpClient) { 
  }
  getCenters(): Observable<Center[]>{
    return this.http.get<Center[]>(`${this.api_url}/getCenter`);
  }
  getCenterById(center: Center):Observable<Center>{
    return this.http.get<Center>(`${this.api_url}/getCenterById/${center.id}`)
  }
  login(postData: any){
    return this.http.post(`${this.api_url}/login`,postData);
  }
  IsLoggedIn(){
    return sessionStorage.getItem('email')!=null;
  }
  getHistory(): Observable<History[]>{
    return this.http.get<History[]>(`${this.api_url}/getHistory`)
  }
  GetUserrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  getDates(): Observable<Date[]>{
    return this.http.get<Date[]>(`${this.api_url}/getDates`);
  }
  getTime(): Observable<Time[]>{
    return this.http.get<Time[]>(`${this.api_url}/getTime`);
  }
  getSlots():Observable<Booking[]>{
    return this.http.get<Booking[]>(`${this.api_url}/getSlots`);
  }
  
}
