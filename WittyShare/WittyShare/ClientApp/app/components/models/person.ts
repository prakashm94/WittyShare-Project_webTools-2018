export class Person {
    personId: number;
    fullname: string;
    gender: string;
    contact: string;
    email: string;
    password: string;
    profession: string;
    experience: number;
    degree: string;
    degreeMajor: string;
    dob: string;
    skills: any = [];
    pic: string;
    constructor(data: any) {
        if (data) {
            data = data || {};
            this.personId = data.personId;
            this.fullname = data.fullname;
            this.gender = data.gender;
            this.contact = data.contact;
            this.email = data.email;
            this.password = data.password;
            this.profession = data.profession;
            this.degree = data.degree;
            this.degreeMajor = data.degreeMajor;
            this.pic = data.pic;
            this.skills = [];
            data.skills.forEach((q:any) => {
                this.skills.push(q);
            });
        }
    }
}

