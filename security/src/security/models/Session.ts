export default class Session {
  public username: string;
  public token: string;
  public expirationDate: number;

  public constructor(username: string, token: string, expirationDate: number) {
    this.username = username;
    this.token = token;
    this.expirationDate = expirationDate;
  }
}