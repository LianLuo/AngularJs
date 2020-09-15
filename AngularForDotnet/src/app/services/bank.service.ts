import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment"
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http:HttpClient) { }

  getBankList(){
    return this.http.get(environment.apiBaseUrl+"bank");
  }
}
