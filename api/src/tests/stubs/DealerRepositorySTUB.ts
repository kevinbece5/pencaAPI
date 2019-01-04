import { Repository } from '../../Repository/Repository';
import { tables, indexes} from '../../dbTools/config';
import { Dealer } from '../../Dealer/Dealer';
import { ERROR_NO_BUILD_OUT_JOB } from '../../BatchBuildOut/errors';

export class DealerRepositorySTUB implements Repository {
    private dealer: Dealer
    
    constructor(dealer: Dealer) {
        this.dealer = dealer;
    }

    putItem(item: any) {
        
        return new Promise((resolve,reject) =>{
            this.dealer = item;
            resolve(this.dealer);
        });
    }

    getItemById(id: any) {
        return new Promise((resolve,reject) =>{
            if (this.dealer.id === id) {
                resolve(this.dealer);
            }
            reject({code:404, message:"No dealer found"});
        });
    }

    getItems(params: any = undefined) {
        return new Promise((resolve, reject) => {
            resolve([this.dealer]);
        })
    }

    deleteItem(id: any) {
        return new Promise((resolve,reject) =>{
            resolve();
        });
    }

}