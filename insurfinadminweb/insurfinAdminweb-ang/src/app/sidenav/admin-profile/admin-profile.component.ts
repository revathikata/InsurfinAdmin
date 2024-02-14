import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent {
  adminProfile = true
  ownerProfile = false
  isEdit = true
  isProfileEdit = false
  constructor() { }

  ngOnInit(): void {

  }
  ownerAdminProfile() {
    this.adminProfile = false
    this.ownerProfile = true
  }
  editAdminProfile() {
    this.isEdit = false
    this.isProfileEdit = true
  }
  editPassword(){
    this.isProfileEdit = false
  }
}
