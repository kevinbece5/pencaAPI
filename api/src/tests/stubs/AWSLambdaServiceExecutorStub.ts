import { ServiceExecutor } from '../../ServiceExecutor/ServiceExecutor';

export class AWSLambdaFunctionsExecutorStub implements ServiceExecutor {
    private counter: number
    constructor() {
        this.counter = 0;
    }

    public executeService(): Promise<any> {
        this.counter += 1;
        return new Promise((resolve, reject) => {
            resolve(this.counter);
        })
    }
}
