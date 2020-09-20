import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
  ]
})
export class RegistrationComponent implements OnInit {

  constructor(
    public service: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.service.registerUser().subscribe((res: any) => {
      if (res.succeded) {
        this.service.formModel.reset();
        this.toastr.success("Registe Successful", "User Registration");
      } else {
        (res.errors as any[]).forEach(ele => {
          switch (ele.code) {
            case 'DuplicateUserName':
              this.toastr.error("Username is already taken.", "User Registration.");
              break;
            default:
              this.toastr.error("Registration failed.", "User Registration.");
              break;
          }
        });
      }

    },
      err => {
        console.info(err);
      });
  }

}
