import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Question } from "../models/question.model";

@Injectable({
  providedIn: 'root'
})
export class MockDataService implements InMemoryDbService {

  createDb() {
    const qns = this.generateQuestions();
    const answer = this.generateAnwser();
    return { qns,answer };
  }
  constructor() { }

  private generateQuestions() {
    let qns: Question[] = [
      {
        QnID: 1,
        Qn: "In Java, a method is a container that holds classes",
        ImageName: null,
        Answer: null,
        Correct:0,
        Options: [
          { Opt: 'True' },
          { Opt: 'False' }
        ]
      },
      {
        QnID: 2,
        Qn: 'The SQL keyword(s)____ is used with wildcards',
        ImageName: null,
        Answer: null,
        Correct:1,
        Options: [
          { Opt: 'LIKE only' },
          { Opt: 'IN only' },
          { Opt: "NOT IN only" },
          { Opt: "IN and NOT IN" }
        ]
      },
      {
        QnID: 3,
        Qn: 'The external Java Script file must contain the <script> tag.',
        ImageName: null,
        Answer: null,
        Correct:0,
        Options: [
          { Opt: 'True' },
          { Opt: 'False' },
        ]
      },
      {
        QnID: 4,
        Qn: 'What does HTML stand for?',
        ImageName: null,
        Answer: null,
        Correct:2,
        Options: [
          { Opt: 'Hyper Trainer Marking Language' },
          { Opt: 'Hyper Text Marketing Language' },
          { Opt: "Hyper Text Markup Language" },
          { Opt: "Hyper Text Markup Leveler" }
        ]
      },
      {
        QnID: 5,
        Qn: 'How can you add a comment in a JavaScript?',
        ImageName: null,
        Answer: null,
        Correct:2,
        Options: [
          { Opt: 'This is a comment' },
          { Opt: '<!-- This is a comment -->' },
          { Opt: "// This is a comment" }
        ]
      },
      {
        QnID: 6,
        Qn: 'Who invented this first computer?',
        ImageName: null,
        Answer: null,
        Correct:1,
        Options: [
          { Opt: 'Charles Babbage' },
          { Opt: 'Linus Torvalds' },
          { Opt: "Dennis Ritchie" },
          { Opt: "James Gosling" }
        ]
      },
      {
        QnID: 7,
        Qn: 'The Binary system uses powers of',
        ImageName: null,
        Answer: null,
        Correct:0,
        Options: [
          { Opt: '2' },
          { Opt: '10' },
          { Opt: "8" },
          { Opt: "16" }
        ]
      },
      {
        QnID: 8,
        Qn: 'Which of the following computer language is used for artificial intelligence?',
        ImageName: null,
        Answer: null,
        Correct:2,
        Options: [
          { Opt: 'FORTRAN' },
          { Opt: 'PROLOG' },
          { Opt: "C" },
          { Opt: "COBOL" }
        ]
      },
      {
        QnID: 9,
        Qn: 'Which of the following computer language is used for artificial intelligence?',
        ImageName: null,
        Answer: null,
        Correct:2,
        Options: [
          { Opt: 'FORTRAN' },
          { Opt: 'PROLOG' },
          { Opt: "C" },
          { Opt: "COBOL" }
        ]
      },
      {
        QnID: 10,
        Qn: 'Which of the following language is more suited to a structured program?',
        ImageName: null,
        Answer: null,
        Correct:1,
        Options: [
          { Opt: 'PORTRAN' },
          { Opt: 'BASIC' },
          { Opt: "PASCAL" },
          { Opt: "PL/1" }
        ]
      }
    ];
    return qns;
  }

  private generateAnwser(){
    const questions = this.generateQuestions();
    let answers = [];
    questions.forEach((e,i)=>{
      answers.push({
        QnID:e.QnID,
        Answer:e.Correct
      });
    });
    return answers;
  }
}
