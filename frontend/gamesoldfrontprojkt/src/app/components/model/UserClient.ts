import { User } from "./User";

export class UserClient extends User {
    clientIsBlacklisted!: boolean;
    clientDebt!: number;

    constructor(uName: string, stNumber: string, hoNumber: string, stName: string, uUser: string, uPw: string, userRole: String, cliBL: boolean, cliDbt: number){
        super(uName, stNumber, hoNumber, stName, uUser, uPw, userRole);
        this.clientIsBlacklisted = cliBL;
        this.clientDebt = cliDbt;
    }

    public get getClientIsBlacklisted(): boolean {
        return this.clientIsBlacklisted;
    }
    public set setClientIsBlacklisted(value: boolean) {
        this.clientIsBlacklisted = value;
    }
    public get getClientDebt(): number {
        return this.clientDebt;
    }
    public set setClientDebt(value: number) {
        this.clientDebt = value;
    }

}