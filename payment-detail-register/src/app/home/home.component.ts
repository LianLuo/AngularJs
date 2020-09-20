import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  userDetail;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private service: UserService
  ) { }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetail = res;
      },
      err => {
        console.log(err);
      });
  }

  onLogout() {
    localStorage.removeItem("token");
    this.router.navigate(["/user/login"]);
    //this.toastr.info("Logout!", "JWT Auth System.");
  }
}
