import { ServiceExecutor } from '../../ServiceExecutor/ServiceExecutor';

const userdata = {
        "StatusCode": 200,
        "Payload": "{\"statusCode\":200,\"headers\":{\"Access-Control-Allow-Origin\":\"*\"},\"body\":\"{\\\"username\\\":\\\"mcalderon\\\"}\"}"
    };

export class AWSLambdaFunctionsExecutorStubUserName implements ServiceExecutor {
    private data;

    constructor() {
        this.data = userdata;
    }

    public executeService(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(this.data);
        });
    }
}
