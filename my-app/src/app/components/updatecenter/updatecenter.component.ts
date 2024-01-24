import { Component,Inject } from '@angular/core';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
@Component({
  selector: 'app-updatecenter',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,ReactiveFormsModule,NgIf],
  templateUrl: './updatecenter.component.html',
  styleUrl: './updatecenter.component.css'
})
export class UpdatecenterComponent {
  updateForm = this.fb.group({
    name:['',Validators.required],
    location:['',Validators.required]
  })
  constructor(private fb: FormBuilder,private dialogRef: DialogRef<UpdatecenterComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private http: HttpClient) {}
  SubmitForm(){
    let postData = {
      "id":this.data.centerid,
      "name":this.updateForm.value.name,
      "location":this.updateForm.value.location,
      "imageUrl":""
    }
    console.log(this.data.centerid)
    console.log(postData);
    this.http.put("http://localhost:8080/api/v1/vaccine/updateCenter",postData).subscribe(
      (response)=>console.log(response)
    );
  }
}
