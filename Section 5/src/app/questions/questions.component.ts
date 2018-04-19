import {Component, OnInit} from '@angular/core';
import { QuestionService } from '../services/question.service';
import Question from '../../../models/question.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-questions',
  template: `<h3>Questions</h3>
  <div class="row" *ngFor="let question of questions$ | async">
    <div class='item'>
        <i class="arrow up"></i> 
        <div>{{question.count}}</div> 
        <i class="arrow down"></i>
    </div>
    {{question.text}}
  </div>
`
})
export class QuestionsComponent implements OnInit {
  public questions$: Observable<Question[]>;

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    console.log('get questions now!!!')
    this.questions$ = this.questionService.fetch();
  }
}
