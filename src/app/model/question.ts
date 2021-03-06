import { Category } from './category'

export class Question {
  id: string;
  questionText: string;
  answers: Answer[];
  ordered: boolean;
  explanation?: string;
  tags: string[];
  categories?: Category[];
  categoryIds: number[];
  published?: boolean;
  status?: QuestionStatus;
  created_uid?: string;
  createdOn?: Date;
  lastUpdated_uid?: string;
  lastUpdatedOn?: Date;
  approved_uid?: string;
  approvedOn?: Date;
  
  constructor() {
    this.id = "";
    this.answers = [new Answer(), new Answer(), new Answer(), new Answer()];
    this.ordered = false;
    this.tags = [];
    this.categories = [];
    this.categoryIds = [];
    this.published = false;
    this.status = QuestionStatus.SAVED;
  }

  static getViewModelFromDb(db: any): Question 
  {
    //console.log(db);
    let question: Question = new Question();

    question.id = db.id;
    question.answers = db.answers;
    question.categoryIds = db.categoryIds;
    question.published = db.published;
    question.questionText = db.questionText;
    question.status = db.status;
    question.tags = db.tags;
    
    return question;
  }

  static getViewModelFromES(hit: any): Question 
  {
    //console.log(hit);
    let question: Question = new Question();

    question.id = hit["_id"];
    let source = hit["_source"];

    question.answers = source.answers;
    question.categoryIds = source.categoryIds;
    question.published = source.published;
    question.questionText = source.questionText;
    question.status = source.status;
    question.tags = source.tags;
    
    return question;
  }

}

export class Answer {
  id: number;
  answerText: string;
  correct: boolean;
}

export enum QuestionStatus {
  SAVED,
  SUBMITTED,
  APPROVED,
  INACTIVE
}
