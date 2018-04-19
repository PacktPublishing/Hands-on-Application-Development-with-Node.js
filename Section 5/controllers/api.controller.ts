import { Request, Response, NextFunction } from 'express';
import { interfaces, controller, httpGet, httpPost, request, response, queryParam } from 'inversify-express-utils';
import Question from '../models/question.model';

@controller('/api')
export class ApiController implements interfaces.Controller {

    @httpGet("/p/questions")
    private index(req: Request, res: Response, next: NextFunction): string[] {
        return ['How does inversify works?', 'Create for me an api?'];
    }

    @httpGet("/questions")
    private questionsFromDB(req: Request, res: Response, next: NextFunction): Promise<Question[]> {
        return new Promise((resolve, reject) => {
            Question.findAll()
                    .then(values => resolve(values))
                    .catch( err => reject(err));
        });
    }

    @httpPost("/question")
    private async create(@request() req: Request, @response() res: Response) {
        try {
            let question = await Question.create({text: req.body, count: 0});
            question.save();
            res.sendStatus(201);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    @httpGet("/question")
    private async createWithGet(@queryParam("text") text: string, req: Request, res: Response): Promise<string> {
        try {
            let question = await Question.create({text: text, count: 0});
            question.save();
            return question.text.toString();
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}