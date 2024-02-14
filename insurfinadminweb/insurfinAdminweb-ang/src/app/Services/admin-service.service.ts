import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  userurl = environment.url;
  dashboardBaseUrl = environment.dashboardBaseUrl
  constructor(private http: HttpClient) { }

  public getHeader() {
    const accessToken = JSON.parse(sessionStorage.getItem('loginDetails') ?? '');
    const headers = {
      'Authorization': 'Bearer ' + accessToken
    }
    return headers;
  }
  public distributerList(): Observable<any> {
    let params1 = new HttpParams().set('distributorId', '2')
    return this.http.get<any>(this.userurl + 'distributor?distributorId', { params: params1 });
  }
  public distributerStatus() {
    let params2 = new HttpParams().set('approvalStatus', 'PENDING')
    return this.http.get<any>(this.userurl + 'distributor/getAllDistributorsLeadInfoStatus?approvalStatus', { headers: this.getHeader(), params: params2 });
  }
  public distributer(data: any) {
    return this.http.post<any>(this.userurl + 'distributor', data);
  }
  // http://65.0.58.72:8085/api/distributor/updateStatus/6409ebe9497c030df9e2128a
  public changeStatus(action: any, distributorId: any) {
    return this.http.put<any>(this.userurl + `distributor/changeDistributorStatus/${distributorId}?status=${action}`, '', { headers: this.getHeader() });
  }
  // http://65.0.58.72:8085/api/distributor/changeDistributorStatus/640ee8f731f7830509d429fd?status=INACTIVE

  // AdminDashboard Data
  // http://65.1.142.222:8085/api/admin/getDistributorsCount?fromDate=2023-06-29&toDate=2023-07-11

  // getDistributorCount
  getDistributorCount(start: any, end: any) {
    return this.http.get(`${this.dashboardBaseUrl}getDistributorsCount?fromDate=${start}&toDate=${end}`, { headers: this.getHeader() })
  }
  // getDistributorsData
  getDistributorsData(fromDate, toDate, status) {
    return this.http.get(`${this.dashboardBaseUrl}getDistributorsData?fromDate=${fromDate}&toDate=${toDate}&status=${status}`, { headers: this.getHeader() })
  }
  getAllDistributorStatus(fromDate,toDate,approvalStatus) {
    return this.http.get(`${this.userurl}getAllDistributorsOnBoardingStatus?fromDate=${fromDate}&toDate=${toDate}&approvalStatus=${approvalStatus}`, { headers: this.getHeader() })
  }
  getTotalProposal(fromDate,toDate,status){
    return this.http.get(`${this.dashboardBaseUrl}getTotalProposals?fromDate=${fromDate}&toDate=${toDate}&status=${status}`,{headers: this.getHeader()}) 
  }
  gettotalproposalscount(fromDate,toDate,status) {
    return this.http.get(`${this.dashboardBaseUrl}getTotalProposalsCount?fromDate=${fromDate}&toDate=${toDate}&status=${status}`,{headers: this.getHeader()})
  }
  gettotalCustomerData(fromDate,toDate,status) {
    return this.http.get(`${this.dashboardBaseUrl}getCustomersData?fromDate=${fromDate}&toDate=${toDate}&status=${status}`,{headers: this.getHeader()})
  }
  getTotalLoanData(fromDate,toDate,status) {
    return this.http.get(`${this.dashboardBaseUrl}getLoansData?fromDate=${fromDate}&toDate=${toDate}&status=${status}`,{headers: this.getHeader()})
  }
  public update(uuid, body) {
    // let params3 = new HttpParams().set('distributorId','distributorId')
    // const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar','Content-Type': 'application/json' };
    return this.http.put<any>(this.userurl + `distributorStatusUpdate/${uuid}`, body, { headers: this.getHeader() });
  }
  public adminproposalStatus(status, poposalId) {
    return this.http.put<any>(this.dashboardBaseUrl + `adminApprovalStatus?status=${status}&proposalId=${poposalId}`,'', { headers: this.getHeader() });
  }
}
