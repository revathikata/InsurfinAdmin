import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { ApproveDocPopupComponent } from './admin-dashboard/approve-doc-popup/approve-doc-popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewDocPopupComponent } from './admin-dashboard/view-doc-popup/view-doc-popup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminServiceService } from './Services/admin-service.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { PdfReportDownloadPopupComponent } from './pdf-report-download-popup/pdf-report-download-popup.component';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { DatePickerPopupComponent } from './date-picker-popup/date-picker-popup.component';
import { AuthGuard } from './Services/auth.guard';
import { ReviewDistributorApplicationsComponent } from './review-distributor-applications/review-distributor-applications.component';
import { AdminProfileComponent } from './sidenav/admin-profile/admin-profile.component';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
// import {MatChipsModule} from '@angular/material/chips';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { DistributorPendingDetailsPopupComponent } from './admin-dashboard/distributor-pending-details-popup/distributor-pending-details-popup.component';
import { RejectedPopupComponent } from './admin-dashboard/distributor-pending-details-popup/rejected-popup/rejected-popup.component';
import { AllProposalsComponent } from './all-proposals/all-proposals.component';
import { ProposalPopupComponent } from './proposal-popup/proposal-popup.component';
import { ProposalApproveRejectComponent } from './proposal-popup/proposal-approve-reject/proposal-approve-reject.component';
import { FilterSortingComponent } from './filter-sorting/filter-sorting.component';
import { AuthInterceptor } from './auth.interceptor';
import { RefundPopupComponent } from './all-proposals/refund-popup/refund-popup.component';
import { CanselRefundPopupComponent } from './all-proposals/refund-popup/cansel-refund-popup/cansel-refund-popup.component';
import { PleaseConfirmPopupComponent } from './all-proposals/please-confirm-popup/please-confirm-popup.component';
// import { MatDateRangePickerModule } from '@angular/material/datepicker';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    SidenavComponent,
    ToolbarComponent,
    ApproveDocPopupComponent,
    AdminSettingsComponent,
    ViewDocPopupComponent,
    AdminHomePageComponent,
    PdfReportDownloadPopupComponent,
    DatePickerPopupComponent,
    ReviewDistributorApplicationsComponent,
    AdminProfileComponent,
    DistributorPendingDetailsPopupComponent,
    RejectedPopupComponent,
    AllProposalsComponent,
    ProposalPopupComponent,
    ProposalApproveRejectComponent,
    FilterSortingComponent,
    RefundPopupComponent,
    CanselRefundPopupComponent,
    PleaseConfirmPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSelectModule,
    MatAutocompleteModule,
    NgSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCheckboxModule,
    FormsModule,
    NgxOtpInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    MatTabsModule,
    // MatChipsModule,
    MatButtonToggleModule

  ],
  providers: [AdminServiceService,DatePipe,AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
