import { User } from "./User";

export class UserEmployee extends User {

    private _jobRole: string;
    private _salary: string;

    constructor(uName: string, stNumber: string, hoNumber: string, stName: string, uUser: string, uPw: string, jbRole: string, empSalary: string){
        super(uName, stNumber, hoNumber, stName, uUser, uPw);
        this._jobRole = jbRole;
        this._salary = empSalary;
    }

    public get jobRole(): string {
        return this._jobRole;
    }
    public set jobRole(value: string) {
        this._jobRole = value;
    }
    public get salary(): string {
        return this._salary;
    }
    public set salary(value: string) {
        this._salary = value;
    }
}