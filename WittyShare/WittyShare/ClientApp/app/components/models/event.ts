import { Article } from './article';
import { Person } from './person';
export class Event {
    eventArticle: Article;
    eventName: string;
    eventDate: string;
    address: string;
    eventId: number;
    peopleAttending: Person[];

    constructor(data: any) {
        if (data) {
          this.eventArticle = new Article(data.eventArticle);
          this.eventId = data.eventId;
            this.eventName = data.eventName;
            this.eventDate = data.eventDate;
            this.address = data.address;
            data.peopleAttending.forEach((o :any) => {
              this.peopleAttending.push(new Person(o));
            });
        }
    }
} 
