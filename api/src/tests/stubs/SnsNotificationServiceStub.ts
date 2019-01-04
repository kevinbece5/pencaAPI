import { NotificationService } from '../../NotificationService/NotificationService';


export class SnsNotificationServiceStub implements NotificationService {
    constructor() {
    }

    notify(params: any): Promise<any> {
        return Promise.resolve();
    }
}