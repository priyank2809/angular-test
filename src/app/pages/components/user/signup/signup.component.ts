import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  fullName: any;
  email: any;
  password: any;

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage: boolean;
  serverErrorMessage: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(form : NgForm) {
    this.userService
      .postUser(form.value)
      .subscribe(
        res => {
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false
          }, 3000);
          this.resetForm(form);
        },
        err => {
          if (err.status === 422) {
            this.serverErrorMessage = err.error.join('<br />');
          } else {
            this.serverErrorMessage = 'Something went wrong. Please contact admin.'
          }
        }
      );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessage = '';
  }

}
