import { Option } from "./option.model";

export class Question {
    QnID:number;
    Qn:string;
    ImageName:string;
    Answer:number;
    Correct:number;
    Options:Option[];
}
