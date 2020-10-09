import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styles: [
  ]
})
export class ResultComponent implements OnInit {

  constructor(
    public service:QuizService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.service.getAnswers().subscribe(res=>{
      this.service.correctAnswerCount = 0;
      this.service.qns.forEach((e,i)=>{
        if(e.Answer == res[i].Answer)
        {
          this.service.correctAnswerCount++;
        }
        e.Correct = res[i].Answer;
      });
    });
  }

  onSubmit(){
    this.service.submitScore().subscribe(res=>{
      this.restart();
    });
  }

  restart(){
    localStorage.setItem('qnProgress','0');
    localStorage.setItem('qns','');
    localStorage.setItem('seconds','0');
    this.router.navigate(['/quiz']);
  }

}
