export class SignUpInfo {
    userName: string;
    email: string;
    password: string;

    constructor(name: string, userName: string, email: string, password: string) {
        this.userName = userName;
        this.email = email;
        this.password = password;
    }
}
