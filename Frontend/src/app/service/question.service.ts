import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:8080/api/question';

  constructor(private http: HttpClient) { }
  

  getQuestionJson(){
    return this.http.get<any>("assets/questions.json");
    
  }

  getAllQuestionBackend(){
    return this.http.get<any>(`${this.apiUrl}/allQuestions`);
  }

}
