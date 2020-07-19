import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {
public showStatus: boolean = false;
public statusMessage: string = "";

public form = new FormGroup({
  name: new FormControl(''),
  date: new FormControl(''),
  workingHours: new FormControl(''),
  sickHours: new FormControl(''),
  vacationHours: new FormControl(''),
});

constructor(private readonly router: Router,private httpService: HttpService) {}

ngOnInit(): void {}

public submit() {
  console.log(this.form.value);
  this.httpService.post('employee',this.form.value).subscribe(res=>{
    this.showInformStatus(true);
  },()=>this.showInformStatus(false));
}

public showInformStatus(status: boolean){
  this.showStatus = true;
  this.statusMessage = status ? 'Employee has just added successfully!' : "Error";
  setTimeout(()=>{
    this.statusMessage = "";
    this.showStatus = false;
    this.form.reset();
  },2000)
}

}
