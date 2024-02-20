package com.hafiz.vocabulary.controller;

import com.hafiz.vocabulary.dto.QuestionDto;
import com.hafiz.vocabulary.entity.Question;
import com.hafiz.vocabulary.service.QuestionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/question")
@CrossOrigin(origins = "http://localhost:4200")
public class QuestionController {

    @Autowired
    private ModelMapper modelMapper;


   private QuestionService questionService;

   public QuestionController(QuestionService questionService){
       super();
       this.questionService = questionService;
   }

    @GetMapping("allQuestions")
    public List<QuestionDto> getAllQuestions(){

       return questionService.getAllQuestions().stream().map(question -> modelMapper.map(question, QuestionDto.class))
               .collect(Collectors.toList());
    }

    @GetMapping("category/{category}")
    public List<QuestionDto> getQuestionsByCategory(@PathVariable String category){
        return questionService.getQuestionsByCategory(category).stream().map(question -> modelMapper.map(question, QuestionDto.class))
                .collect(Collectors.toList());
    }

    @PostMapping("add")
    public ResponseEntity<QuestionDto> createQuestion(@RequestBody QuestionDto questionDto){
        //convert DTO to entity
        Question questionRequest = modelMapper.map(questionDto, Question.class);

        Question question = questionService.createQuestion(questionRequest);

        //convert entity to DTO
        QuestionDto questionResponse = modelMapper.map(question, QuestionDto.class);

        return  new ResponseEntity<QuestionDto>(questionResponse, HttpStatus.CREATED);
    }



}
