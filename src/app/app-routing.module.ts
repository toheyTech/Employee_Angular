import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent} from './shared/dashboard/dashboard.component';

// parent routing [ Main Routing]
const routes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  //{path: '**', component: PageNotFoundCompnent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { 


}
