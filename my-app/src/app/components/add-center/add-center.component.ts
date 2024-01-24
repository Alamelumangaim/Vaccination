import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-add-center',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,NgIf],
  templateUrl: './add-center.component.html',
  styleUrl: './add-center.component.css'
})
export class AddCenterComponent {
  centerForm=this.fb.group({
    name:['',Validators.required],
    location:['',Validators.required]
  })
  constructor(private fb: FormBuilder,private http: HttpClient,public dialogRef: MatDialogRef<AddCenterComponent>, @Inject(MAT_DIALOG_DATA) public data: any){}
  SubmitForm(){
    console.log(this.centerForm.value)
    let postData = {
      "name":this.centerForm.value.name,
      "location":this.centerForm.value.location
    }
    this.http.post("http://localhost:8080/api/v1/vaccine/center",postData).subscribe(
      (response)=>console.log(response)
    );
  }
  close(){
    this.dialogRef.close();
  }
}
