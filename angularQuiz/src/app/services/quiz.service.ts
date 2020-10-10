import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  qns:Question[];
  seconds:number;
  timer;
  qnProgress:number;
  correctAnswerCount:number;


  private readonly rootUrl = "api";

  constructor(
    private http:HttpClient
  ) { }

  insertParticipant(name:string, email:string){
    var body = {
      Name:name,
      Email:email
    };

    //return this.http.post(this.rootUrl+"",body);
    return of([]);
  }

  getQuestions(){
    return this.http.get(this.rootUrl+'/qns');
  }

  displayTimeElapsed(){
    return Math.floor(this.seconds/3600)+":"+Math.floor(this.seconds/60)+":"+Math.floor(this.seconds%60);
  }

  getAnswers(){
    //var body = this.qns.map(x=>x.QnID);
    return this.http.get(this.rootUrl+'/answer');
  }

  getParticipantName(){
    var participant = JSON.parse(localStorage.getItem('participant'));
    return participant.Name;
  }

  submitScore(){
    var body = JSON.parse(localStorage.getItem('participant'));
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return this.http.post(this.rootUrl+'/UpdateOutput',body);
  }
}
