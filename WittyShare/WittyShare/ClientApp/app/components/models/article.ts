import { Person } from './person';
import { Comment } from './comment';
export class Article {
    articleId: number;
    creator: Person;
    title: string;
    content: string;
    patentStatus: string;
    amazing: number;
    good: number;
    poor: number;
    comments: any=[];
    categories: any=[];
    favouritedBy: any=[];

    image: string;
    constructor(data: any) {
        if (data) {
            data = data || {};
            this.articleId = data.articleId;
            this.creator = new Person(data.creator);
            this.title = data.title;
            this.content = data.content;
            this.patentStatus = data.patentStatus;
            this.amazing = data.amazing;
            this.good = data.good;
            this.poor = data.poor;
            this.image = data.image;
            data.comments.forEach((c: any) => {
                this.comments.push(new Comment(c));
            });
            data.categories.forEach((o: any) => {
                this.categories.push(o);
            });
            data.favouritedBy.forEach((p: any) => {this.favouritedBy.push(new Person(p));
            });
        }
    }
}


