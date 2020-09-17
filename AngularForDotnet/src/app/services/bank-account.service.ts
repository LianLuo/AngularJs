import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BankAccount } from "../models/bank-account.model";

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  private bankAccountUrl = `${environment.apiBaseUrl}bankaccount`;
  constructor(
    private http:HttpClient
  ) { }

  createBankAccount(bankAccount:BankAccount){
    return this.http.post(this.bankAccountUrl,bankAccount);
  }

  updateBankAccount(bankAccount:BankAccount){
    return this.http.put(this.bankAccountUrl+'/'+bankAccount.BankAccountID,bankAccount);
  }

  deleteBankAccount(bankAccount:BankAccount|number){
    const id = typeof(bankAccount) == "number"?bankAccount:bankAccount.BankAccountID;
    return this.http.delete(this.bankAccountUrl+"/"+id);
  }

  getBankAccount(id:number){
    return this.http.get(this.bankAccountUrl+"/"+id);
  }

  fetchBankAccounts(){
    return this.http.get(this.bankAccountUrl);
  }
}
