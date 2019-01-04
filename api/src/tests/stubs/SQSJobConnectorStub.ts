import { JobQueueConnector, JobQueueMessage } from '../../JobQueueConnector/JobQueueConnector';


export class SQSConnectorStub implements JobQueueConnector {
    private messagesToReturn: JobQueueMessage[]
    constructor(messagesToReturn: JobQueueMessage[]) {
        this.messagesToReturn = messagesToReturn;
    }   

    public sendMessage(messageContent: any): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    public readMessages(maxNumberOfMessages: number = 1): Promise<JobQueueMessage[]> {
        return new Promise((resolve, reject) => {
            resolve(this.messagesToReturn)
        });
    }

    public deleteMessage(message: JobQueueMessage) {
        return new Promise((resolve, reject) => {
            resolve()
        });
    }

    public purge() { }

    public getNumberOfMessages(): Promise<number> {
        return new Promise((resolve, reject) => {
            resolve(this.messagesToReturn.length);
        })
    }
}