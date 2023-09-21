import { User } from "./User";

export class UserEmployee extends User {

    jobRole: string;
    salary: string;

    constructor(uName: string, stNumber: string, hoNumber: string, stName: string, uUser: string, uPw: string, jbRole: string, empSalary: string){
        super(uName, stNumber, hoNumber, stName, uUser, uPw);
        this.jobRole = jbRole;
        this.salary = empSalary;
    }

    public get getJobRole(): string {
        return this.jobRole;
    }
    public set setJobRole(value: string) {
        this.jobRole = value;
    }
    public get getSalary(): string {
        return this.salary;
    }
    public set setSalary(value: string) {
        this.salary = value;
    }
}