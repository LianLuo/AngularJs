import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BankService } from "../services/bank.service";
import { BankAccountService } from "../services/bank-account.service";
import { BankAccount } from '../models/bank-account.model';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  bankAccountForms:FormArray = this.fb.array([]);
  bankList=[];

  constructor(
    private fb:FormBuilder,
    private bankService:BankService,
    private service:BankAccountService
    ) { }

  ngOnInit(): void {
    this.refreshList();
    this.bankService.getBankList().subscribe(res=>{
      this.bankList = res as [];
    });
  }

  addBackAccountForm(form?:NgForm){
    this.bankAccountForms.push(this.fb.group({
      BankAccountID:[0],
      AccountNumber:['', Validators.required],
      AccountHolder:['',Validators.required],
      BankID:[0,Validators.min(1)],
      Remark:['',Validators.required]
    }));
    
  }

  refreshList(){
    this.service.fetchBankAccounts().subscribe(result=>{
      (result as BankAccount[]).forEach(f=>{
        this.bankAccountForms.push(this.fb.group({
          BankAccountID:[f.BankAccountID],
          AccountNumber:[f.AccountNumber, Validators.required],
          AccountHolder:[f.AccountHolder,Validators.required],
          BankID:[f.BankID,Validators.min(1)],
          Remark:[f.Remark,Validators.required]
        }));
      });
    });
  }

  onSubmit(fg:FormGroup){
    const bankAccount = fg.value as BankAccount;
    if(bankAccount != null && bankAccount.BankAccountID != 0)
    {
      this.service.updateBankAccount(bankAccount).subscribe(res=>{
        this.refreshList();
      });
    }
    else{
      this.service.createBankAccount(bankAccount).subscribe((f:any)=>{
        fg.patchValue({BankAccountID:f.BankAccountID});
      });
    }
    
  }

  onDelete(fg:FormGroup,i:number){
    this.service.deleteBankAccount(fg.value).subscribe(res=>{
      this.bankAccountForms.removeAt(i);
    });
  }

}
