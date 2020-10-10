import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(
    private service:QuizService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onSignout(){
    localStorage.clear();
    clearInterval(this.service.timer);
    this.router.navigate(['/register']);
  }

}
