import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { LoginComponent } from './login/login.component';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AuthGuard } from './Services/auth.guard';
import { ReviewDistributorApplicationsComponent } from './review-distributor-applications/review-distributor-applications.component';
import { AdminProfileComponent } from './sidenav/admin-profile/admin-profile.component';
import { AllProposalsComponent } from './all-proposals/all-proposals.component';
import { ProposalPopupComponent } from './proposal-popup/proposal-popup.component';
import { FilterSortingComponent } from './filter-sorting/filter-sorting.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'home', component:AdminHomePageComponent,canActivate: [AuthGuard]},
  {path:'dashboard', component:AdminDashboardComponent,canActivate: [AuthGuard]},
  {path:'settings', component:AdminSettingsComponent,canActivate: [AuthGuard]},
  {path:'review-distributor', component:ReviewDistributorApplicationsComponent,canActivate: [AuthGuard]},
  {path:'admin-profile', component:AdminProfileComponent,canActivate: [AuthGuard]},
  {path:'all-proposals',component:AllProposalsComponent,canActivate:[AuthGuard]},
  {path:'proposal-popup',component:ProposalPopupComponent,canActivate:[AuthGuard]},
  {path:'filter-sorting',component:FilterSortingComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
