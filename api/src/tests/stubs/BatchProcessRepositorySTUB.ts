import { Repository } from '../../Repository/Repository';
import { BatchProcessInstance } from '../../BatchCampaign/BatchProcessInstance'

export class BatchProcessRepositorySTUB implements Repository {
    private cb: (b: BatchProcessInstance) => void;
    
    constructor(cb) {
        this.cb = cb;
    }

    putItem(item: any) {
        return new Promise((resolve, reject) => {
            this.cb(item);
            resolve();
        })
    }

    getItemById(id: any) {
        return new Promise((resolve, reject) => {
            resolve(id);
        })
    }

    getItems(params: any = undefined) {
        return new Promise((resolve, reject) => {
            resolve(id);
        })
    }

    deleteItem(id: any) {
        return new Promise((resolve, reject) => {
            resolve(id);
        })
    }

}