import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(
    private service:QuizService,
    private route:Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(name:string,email:string){
    this.service.insertParticipant(name,email).subscribe(res=>{
      localStorage.clear();
      var obj = {Name:'Hello',Score:null,TimeSpent:null};
      localStorage.setItem("participant",JSON.stringify(obj));
      this.route.navigate(['/quiz']);
    });
  }

}
