import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validators: this.comparePasswords })
  });

  private httpUrl = `${environment.baseUrl}applicationuser/login`;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  comparePasswords(fg: FormGroup) {
    let confirmPwdControl = fg.get('ConfirmPassword')
    if (confirmPwdControl.errors == null || 'passwordMismatch' in confirmPwdControl.errors) {
      if (fg.get('Password').value != fg.get('ConfirmPassword').value) {
        confirmPwdControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPwdControl.setErrors(null);
      }
    }

  }

  registerUser():Observable<any>{

    var data = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password,
    };
    console.group(data);
    // return this.http.post("",data);
    // return of({
    //   succeded:false,
    //   errors:[{
    //     code:'DuplicateUserName'
    //   }]
    // });
    return of({
      succeded:true,
      errors:[]
    });
  }

  login(formData){
    return this.http.post(this.httpUrl,formData);
  }

  getUserProfile(){
    var tokenHeader = new HttpHeaders({
      'Authorization':"Bearer "+localStorage.getItem('token')
    });
    return this.http.get(environment.baseUrl+'UserProfile', {headers:tokenHeader});
  }
}
