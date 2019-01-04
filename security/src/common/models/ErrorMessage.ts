export default class ErrorMessage {
  public code: number;
  public message: string;
  public detail?: any;

  constructor() {
    this.code = undefined;
    this.message = undefined;
    this.detail = undefined;
  }
}
