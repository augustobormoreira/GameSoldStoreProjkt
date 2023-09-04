import { User } from "./User";

export class UserClient extends User {
    private _preferredPaymentMethod: string;
    private _clientIsBlacklisted: boolean;
    private _clientDebt: number;

    constructor(idNumber: String, uName: string, stNumber: string, hoNumber: string, stName: string, uUser: string, uPw: string, ppMethod: string, cliBL: boolean, cliDbt: number){
        super(idNumber, uName, stNumber, hoNumber, stName, uUser, uPw);
        this._preferredPaymentMethod = ppMethod;
        this._clientIsBlacklisted = cliBL;
        this._clientDebt = cliDbt;
    }
}