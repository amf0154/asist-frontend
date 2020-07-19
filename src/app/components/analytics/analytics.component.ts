import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { Employee } from 'src/app/interfaces/employee';
import { HttpService } from 'src/app/services/http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  employeeNames: String[]= new Array(0);
  public barChartLabels = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public employeeList: Array<Employee>;
  public listOfYears: Array<String>
  public listOfMonths: Array<String>
  yearForm: FormGroup;
  monthForm: FormGroup;
  workHours: Array<Number> = new Array(0);
  sickHours: Array<Number>= new Array(0);
  vacationHours: Array<Number>= new Array(0);
  public barChartData = [
    { data: [], label: 'Work' },
    { data: [], label: 'Vacation' },
    { data: [], label: 'Sick' }
  ];

  constructor(private httpService: HttpService,private fb: FormBuilder) { }

  ngOnInit() {
    this.loadEmployee();
    this.initForms();
  }

  public loadEmployee(){
    this.httpService.get('employee')
    .subscribe((employee: Array<Employee>)=>{
      this.listOfYears = this.getListOfYears(this.employeeList = employee);
      this.setYearForm();
      console.log(this.employeeList)
      console.log(this.listOfYears)
    });
  }
  
  setYearForm(){
    this.yearForm.setValue({
      value: this.listOfYears[0],
    });
    this.yearForm.valueChanges.subscribe(res=>this.getListOfMonths(res.value));
    this.getListOfMonths(this.listOfYears[0]);
    
    this.monthForm.valueChanges.subscribe(res=>{
      if(res.value)
      this.findDataForChart(res.value)
    });
  }
  
  initForms() {
    this.yearForm = this.fb.group({
      value: ['', [Validators.required]],
    });
    this.monthForm = this.fb.group({
      value: ['', [Validators.required]],
    });
  }

  findDataForChart(month){
    const searchDate = this.yearForm.controls['value'].value + '-' + this.monthForm.controls['value'].value;
    const emplListBySelectedDate = this.employeeList.filter((res: any)=> res.date.includes(searchDate));
    this.barChartData[0].data = this.workHours = (emplListBySelectedDate.reduce((a,obj) =>{
        a.push(obj.workingHours)
      return [...new Set(a)]
    },[]))
    this.barChartData[2].data = this.sickHours = (emplListBySelectedDate.reduce((a,obj) =>{
      a.push(obj.sickHours)
    return [...new Set(a)]
  },[]))
  this.barChartData[1].data = this.vacationHours = (emplListBySelectedDate.reduce((a,obj) =>{
    a.push(obj.vacationHours)
  return [...new Set(a)]
},[]))
  this.barChartLabels = this.employeeNames = (emplListBySelectedDate.reduce((a,obj) =>{
    a.push(obj.name)
  return [...new Set(a)]
  },[]));
  }

  getListOfMonths(month){
    this.monthForm.reset();
  this.listOfMonths =  this.employeeList.reduce((a,obj) =>{
      if(obj.date.split("-")[0] == month)
        a.push(obj.date.split("-")[1])
      return [...new Set(a)]
    },[]);
    setTimeout(()=>{
      this.monthForm.setValue({
        value: this.listOfMonths[0]
      })
    },100)

  }

  getListOfYears(data){
    return data.reduce((a,obj) =>{
      a.push(obj.date.split("-")[0])
      return [...new Set(a)]
    },[])
  }

}
