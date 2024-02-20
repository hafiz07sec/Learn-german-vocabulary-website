package com.hafiz.vocabulary.service.implementaiton;

import com.hafiz.vocabulary.entity.Question;
import com.hafiz.vocabulary.repository.QuestionRepository;
import com.hafiz.vocabulary.service.QuestionService;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {


  private final QuestionRepository questionRepository;

  public QuestionServiceImpl(QuestionRepository questionRepository){
      super();
      this.questionRepository = questionRepository;
  }
    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public Question createQuestion(Question question) {
            return questionRepository.save(question);
   }

    @Override
    public List<Question> getQuestionsByCategory(String category) {
       return  questionRepository.findByCategory(category);

    }
}
