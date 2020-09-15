import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { BankService } from "../services/bank.service";

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
    private bankService:BankService) { }

  ngOnInit(): void {
    this.addBackAccountForm();
    this.bankService.getBankList().subscribe(bs => this.bankList = bs as []);
  }

  addBackAccountForm(){
    this.bankAccountForms.push(this.fb.group({
      bankAccountID:[0],
      accountNumber:['', Validators.required],
      accountHolder:['',Validators.required],
      bankID:[0,Validators.min(1)],
      remark:['',Validators.required]
    }));
  }

}
