import { Repository } from '../../Repository/Repository';
import { tables, indexes} from '../../dbTools/config';
import { BuildOutJob } from '../../BatchBuildOut/BuildOutJob';
import { ERROR_NO_BUILD_OUT_JOB } from '../../BatchBuildOut/errors';

export class BuildOutJobRepositorySTUB implements Repository {
    private buildOutJob: BuildOutJob
    constructor(boj: BuildOutJob) {
        this.buildOutJob = boj;
    }

    putItem(item: any) {
        return new Promise((resolve,reject) =>{
            this.buildOutJob = item;
            resolve(this.buildOutJob);
        });
    }

    getItemById(params: any) {
        return new Promise((resolve,reject) =>{
            if (params.id && params.id === this.buildOutJob.id) {
                resolve(this.buildOutJob);
            }
            else if (params.externalId) {
                const idNotFound = params.id ? params.id : params.externalId;
                reject(ERROR_NO_BUILD_OUT_JOB(idNotFound));
            }
            reject({code:404, message:"No BuildOutJob found"});
        });
    }

    getItems(params: any = undefined) {
        return new Promise((resolve, reject) => {
            resolve([this.buildOutJob]);
        })
    }

    deleteItem(id: any) {
        return new Promise((resolve,reject) =>{
            resolve();
        });
    }

}