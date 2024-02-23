import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:8080/api/question';

  constructor(private http: HttpClient) { }
  

  getAllQuestions(){
    return this.http.get<any>(`${this.apiUrl}/allQuestions`);
  }
    
  

}
