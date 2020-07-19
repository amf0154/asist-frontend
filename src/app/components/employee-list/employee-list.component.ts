import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AgGridAngular } from 'ag-grid-angular';
import { Employee } from '../../interfaces/employee';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  public employeeList: Array<Employee>;
  constructor(private httpService: HttpService) { }
  @ViewChild('agGrid') agGrid: AgGridAngular;
  private numberFilter = {
    filter: 'agNumberColumnFilter',
    filterParams: {
        includeBlanksInEquals: false,
        includeBlanksInLessThan: false,
        includeBlanksInGreaterThan: false
    }
  }
  public defaultColDef = {
    flex: 1,
    minWidth: 110,
    editable: true,
    resizable: true,
  };
  public columnDefs = [
    {headerName: 'Name', field: 'name', filter: true},
    {headerName: 'Date', field: 'date', editable: false},
    {headerName: 'Sick hours', field: 'sickHours', ...this.numberFilter},
    {headerName: 'Vacation hours', field: 'vacationHours', ...this.numberFilter},
    {headerName: 'Real work', field: 'workingHours', ...this.numberFilter}
  ];

  ngOnInit() {
    this.loadEmployee();
  }

  public loadEmployee(){
    this.httpService.get('employee')
    .subscribe((employee: Array<Employee>)=>this.employeeList = employee.map((el: Employee)=>Object.assign({}, el, {date: el.date? el.date.split("T")[0]: ''})));
  }

  onCellValueChanged(event: {data: Employee}){
    this.httpService.put(`employee/${event.data.id}`,event.data).subscribe(res=>console.log(res));
  }
 
}
