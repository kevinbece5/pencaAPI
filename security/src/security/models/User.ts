export default class User {
  public username: string;
  public password: string;
  public createdAt: string;
  public isActive: number;
  public firstname: string;
  public lastname: string;
  public email: string;

  public constructor(username: string, password: string, firstname: string, lastname: string, email: string) {
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.isActive = 1;
  }
}