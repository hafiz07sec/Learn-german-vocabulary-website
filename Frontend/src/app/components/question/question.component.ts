import { Component } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';
import { interval } from 'rxjs';
import { ChangeBgDirective } from '../../change-bg.directive';
@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    ChangeBgDirective
  ],
  providers:[QuestionService],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss'
})
export class QuestionComponent {



  opt:  string [] = [];
  

  public name : string =" ";

  public questionList: any = [];
  public currentQuestion: number =0;
  public points: number = 0;
  counter = 60;
  correctAnswer:number = 0;
  inCorrectAnswer:number = 0;

  interval$:any;

  progress:string = '0';

  isQuizCompleted : boolean =false;
  

  constructor(private questionService : QuestionService){

  }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
    
  }

/**
 * Retrieves all questions from the server and updates the question list.
 * This method subscribes to the question service's getAllQuestions() method
 * and assigns the response to the questionList property. It also invokes
 * the getOption() method to retrieve options for each question.
 */
 
  getAllQuestions(){
      this.questionService.getAllQuestions()
      .subscribe((res)=>{
        this.questionList = res;
        this.getOption();
      });
  }

  /**
 * Retrieves options for the current question from the question list.
 * This method populates the 'opt' array with options for the current question
 * based on the 'currentQuestion' index and the 'questionList' array.
 * The options are retrieved from the 'option1', 'option2', 'option3', and 'option4'
 * properties of the current question in the 'questionList' array.
 * If any option is not available or if the 'questionList' is not defined,
 * the corresponding entry in the 'opt' array will be 'undefined'.
 * @returns {void}
 */

  getOption(){
    this.opt = [
      this.questionList[this.currentQuestion]?.option1,
      this.questionList[this.currentQuestion]?.option2,
      this.questionList[this.currentQuestion]?.option3,
      this.questionList[this.currentQuestion]?.option4
    ];
  }

  nextQuestion(){
      this.currentQuestion++;
      this.getOption();
     
  }

  previousQuestion(){
    this.currentQuestion--;
    this.getOption();
    // this.resetCounter();
   
  }

/**
 * Processes the answer to a question.
 * This method takes the question number ('currentQno') and the selected option ('option') as parameters.
 * If the 'currentQno' equals the total number of questions in the quiz, the quiz is marked as completed,
 * If the selected 'option' matches the correct answer for the current question,the user earns points, the correct answer count is incremented,
 * and the next question is displayed after a delay. The timer is reset, and the progress percentage is updated.
 * If the selected 'option' does not match the correct answer,the user loses points, the incorrect answer count is incremented,
 * and the next question is displayed after a delay. The timer is reset, and the progress percentage is updated.
 * @param {number} currentQno The question number being answered.
 * @param {any} option The option selected as the answer.
 * @returns {void}
 */

  answer(currentQno:number, option:any){
   
    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
    }

    if(option===this.questionList[this.currentQuestion]?.rightAnswer){
      this.points+=10;
      this.correctAnswer++;
      setTimeout(()=>{
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000); 
     
    }else{
      setTimeout(()=>{
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);
      this.points-=10;
   
    }
  
  }

  startCounter(){
    this.interval$=interval(1000).subscribe(val=>{
      this.counter--;
      if(this.counter===0){
        this.currentQuestion++;
        this.counter=60;
        this.points -=10;
      }
    });
    setTimeout(()=>{
      this.interval$.unsubscribe();
    }, 6000000);
  }
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter = 0;

  }
  resetCounter(){
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress = "0";
  }

  getProgressPercent(){
    this.getOption();
    this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }

}
