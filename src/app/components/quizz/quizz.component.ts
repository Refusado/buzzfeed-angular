import { Component, OnInit } from '@angular/core';
import QUESTIONS from "../../../assets/data/quizz-questions.json";

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title: string = "";
  questions: any;
  currentQuestion: any;

  answers: string[] = [];
  selectedAnswer: string = "";

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (QUESTIONS) {
      this.finished = false;
      this.title = QUESTIONS.title;

      this.questions = QUESTIONS.questions;
      this.currentQuestion = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  selectAnswer(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex++;

    if (this.questionMaxIndex > this.questionIndex) {
      this.currentQuestion = this.questions[this.questionIndex]
    } else {
      this.finished = true;
      const result: string = await this.checkResult(this.answers);
      this.selectedAnswer = QUESTIONS.results[result as keyof typeof QUESTIONS.results]
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((prev, curr, i, arr) => {
      if (
        arr.filter(item => item === prev).length >
        arr.filter(item => item === curr).length
      ) {
        return prev;
      } else {
        return curr;
      }
    });

    return result;
  }

}
