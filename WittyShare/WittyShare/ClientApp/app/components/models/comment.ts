import { Person } from './person';
export class Comment {
    commentData: string;
    commentedBy: Person;
    upVote: number;
    downVote: number;
    verified: boolean;
    password: string;
    profession: string;
    experience: number;
    degree: string;
    degreeMajor: string;
    dob: string;
    

    constructor(data: any) {
        if (data) {
            data = data || {};
            this.commentData = data.commentData;
            this.commentedBy = new Person(data.commentedBy);
            this.upVote = data.upVote;
            this.downVote = data.downVote;
            this.verified = data.verified;
       
        }
    }
}     
