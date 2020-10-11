import { Injectable } from '@angular/core';
import { Employee } from "../models/employee.model";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  formData: Employee;

  constructor(
    private firebase: AngularFirestore
  ) { }

  getEmployees() {
    return this.firebase.collection("employees").snapshotChanges();
  }

  deleteEmployee(id: string) {
    this.firebase.doc("employees/" + id).delete();
  }
}
