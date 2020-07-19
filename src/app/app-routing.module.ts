import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';


const routes: Routes = [
  { path: '',   redirectTo: '/employee', pathMatch: 'full' },
  { path: 'employee', component: EmployeeListComponent },
  { path: 'new', component: NewEmployeeComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
