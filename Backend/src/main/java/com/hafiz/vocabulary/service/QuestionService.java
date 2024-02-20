package com.hafiz.vocabulary.service;
import com.hafiz.vocabulary.entity.Question;
import org.springframework.http.ResponseEntity;
import java.util.List;

public interface QuestionService {


    public List<Question>getAllQuestions();


    public Question createQuestion(Question question) ;

    public List<Question> getQuestionsByCategory(String category);


}
