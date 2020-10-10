import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styles: [
  ]
})
export class QuizComponent implements OnInit {

  constructor(
    public service: QuizService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if (parseInt(localStorage.getItem("seconds")) > 0) {
      this.service.seconds = parseInt(localStorage.getItem("seconds"));
      this.service.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.service.qns = JSON.parse(localStorage.getItem('qns'));
      if (this.service.qnProgress == 10) {
        this.router.navigate(['/result']);
      } else {
        this.startTimer();
      }
    } else {
      this.service.qnProgress = 0;
      this.service.seconds = 0;
      this.service.getQuestions().subscribe((res: any) => {
        this.service.qns = res;
        this.startTimer();
      });
    }
  }



  startTimer() {
    this.service.timer = setInterval(() => {
      this.service.seconds++;
      localStorage.setItem("seconds", this.service.seconds.toString());
    }, 1000);
  }

  onAnswer(qnID: number, choice: number) {
    this.service.qns[this.service.qnProgress].Answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.service.qns));
    this.service.qnProgress++;
    localStorage.setItem('qnProgress', this.service.qnProgress.toString());
    if (this.service.qnProgress == 10) {
      clearInterval(this.service.timer);
      this.router.navigate(['/result']);
    }
  }

}
