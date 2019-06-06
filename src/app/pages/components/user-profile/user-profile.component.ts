import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userDetails;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.userService.currentUser) {
      this.userDetails = this.userService.currentUser;
    }
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
