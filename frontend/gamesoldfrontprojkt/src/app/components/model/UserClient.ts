import { User } from "./User";

export class UserClient extends User {
    preferredPaymentMethod!: string;
    clientIsBlacklisted!: boolean;
    clientDebt!: number;

    constructor(uName: string, stNumber: string, hoNumber: string, stName: string, uUser: string, uPw: string, ppMethod: string, cliBL: boolean, cliDbt: number){
        super(uName, stNumber, hoNumber, stName, uUser, uPw);
        this.preferredPaymentMethod = ppMethod;
        this.clientIsBlacklisted = cliBL;
        this.clientDebt = cliDbt;
    }

    public get getPreferredPaymentMethod(): string {
        return this.preferredPaymentMethod;
    }
    public set setPreferredPaymentMethod(value: string) {
        this.preferredPaymentMethod = value;
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