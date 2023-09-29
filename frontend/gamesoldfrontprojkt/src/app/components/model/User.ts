export class User {
    identificationNumber!: String;
    name: String;
    streetNumber: String;
    houseNumber: String;
    streetName: String;
    username: String;
    password: String;
    userRole!: String;

    constructor(uName: string, stNumber: string, hoNumber: string, stName: string, uUser: string, uPw: string, userRole: String){
        this.name = uName;
        this.streetNumber = stNumber;
        this.houseNumber = hoNumber;
        this.streetName = stName;
        this.username = uUser;
        this.password = uPw;
        this.userRole = userRole;
    }

    public get getUserRole(): String {
        return this.userRole;
    }
    public set setUserRole(value: String) {
        this.userRole = value;
    }

    public get getName(): String {
        return this.name;
    }
    public set setName(value: String) {
        this.name = value;
    }

    public get getStreetNumber(): String {
        return this.streetNumber;
    }
    public set setStreetNumber(value: String) {
        this.streetNumber = value;
    }
    public get gethouseNumber(): String {
        return this.houseNumber;
    }
    public set sethouseNumber(value: String) {
        this.houseNumber = value;
    }
    public get getstreetName(): String {
        return this.streetName;
    }
    public set setstreetName(value: String) {
        this.streetName = value;
    }
    public get getuserName(): String {
        return this.username;
    }
    public set setuserName(value: String) {
        this.username = value;
    }
    public get getPassWord(): String {
        return this.password;
    }
    public set setPassWord(value: String) {
        this.password = value;
    }

    

   
}