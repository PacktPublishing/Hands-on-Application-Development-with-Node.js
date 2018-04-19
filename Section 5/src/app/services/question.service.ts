import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import Question from "../../../models/question.model";

@Injectable()
export class QuestionService {

    constructor(private httpClient: HttpClient) {}

    public fetch(): Observable<Question[]> {
        return this.httpClient.get<Question[]>('/api/questions');
    }
}