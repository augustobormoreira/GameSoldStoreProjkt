export class User {
    private identificationNumber!: String;
    private name: String;
    private streetNumber: String;
    private houseNumber: String;
    private streetName: String;
    private username: String;
    private password: String;

    constructor(uName: string, stNumber: string, hoNumber: string, stName: string, uUser: string, uPw: string){
        this.name = uName;
        this.streetNumber = stNumber;
        this.houseNumber = hoNumber;
        this.streetName = stName;
        this.username = uUser;
        this.password = uPw;
    }

    

   
}