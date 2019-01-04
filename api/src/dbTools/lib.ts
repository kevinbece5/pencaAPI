import { connection, } from './config';
import * as _ from 'lodash'

export function scan(params) {
    return new Promise((resolve:(any) => any, reject) => {
        connection.scan(params, (error, result) => {
            if (error) {
                reject({ code: 500, message: JSON.stringify(error) });
            }else {
                resolve(result.Items);
            }
        });
    });
}

export function query (params) {
    return new Promise((resolve, reject) => {
        connection.query(params, (error, result) => {
            if (error) {
                reject({ code: 500, message: JSON.stringify(error) });
            } else {
                resolve(result.Items);
            }
        });
    });
}

export function put(params) {
    return new Promise((resolve, reject) => {
        connection.put(params, (error) => {
            if (error) {
                reject({ code: 500, message: JSON.stringify(error) });
            }else {
                resolve();
            }
        });
    });
}

export function deleteItem(params) {
    return new Promise((resolve, reject) => {
      connection.delete(params, (error, result) => {
        if (error) {
            reject({ code: 500, message: JSON.stringify(error) });
        }
        resolve(result);
      });
    });
}

export function batchWrite(params) {
    return new Promise((resolve, reject) => {
      connection.batchWrite(params, (error, result) => {
        if (error) {
            reject({ code: 500, message: JSON.stringify(error) });
        }
        resolve(result);
      });
    });
}

export function batchGet(params) {
    return new Promise((resolve, reject) => {
        connection.batchGet(params, (error) => {
            if (error) {
                reject({ code: 500, message: JSON.stringify(error) });
            }else {
                resolve();
            }
        });
    });
}

export const EMPTY_STRING = "*_EMPTY_STRING_*";

export function cleanObjectForDynamo(object: Object, isPut: boolean = true): Object {
    let comparisson = isPut ? '' :EMPTY_STRING ;
    let exchangeValue = isPut ? EMPTY_STRING : '';
    return Object.keys(object).reduce((result, key) => {
        if (_.isNull(object[key]) || _.isUndefined(object[key])) {
            result[key] = object[key];
            return result;
        } 
        if (_.isArray(object[key])) {
            result[key] = object[key].map(item => cleanObjectForDynamo(item));
            return result
        } 
        if(_.isPlainObject(object[key])) {
            const res = cleanObjectForDynamo(object[key]);
            if (Object.keys(res).length > 0) {
                result[key] = res;
            }
        } else {
            if (_.isString(object)) {
                return object;
            } else {
                let value = object[key];
                if (value === comparisson) {
                    value = exchangeValue;
                }
                result[key] = value;
            }
        } 
        return result;
    },{})
}

// the dynamo batch write limit is either 25 items or 16 MB lol. DynamoDb at its best
export const requestBatchExecutor = (items: any[], batchRequestPromise: (any) => Promise<any>): Promise<any> => {

    const dynamoBatchWriteItemLimit: number = 25;

    return new Promise((resolve, reject) => {
        const groupedItems: any[][] = createGroupedItems(items, dynamoBatchWriteItemLimit);

        const arrayOfPromises: (() => Promise<any>)[] = groupedItems.map(gi => () => batchRequestPromise(gi));
        
        return arrayOfPromises.reduce((p: Promise<any>, fn: () => Promise<any>) =>  { 
            return p.then(_ => {
                return fn();
            })
        }, Promise.resolve())
        .then(_ => {
            resolve(items);
        })
        .catch(error => {
            reject(error)
        })
    })
}
    
export const createGroupedItems = (items: any[], groupSize: number): any[][] => {
    let groups = [], i;
    for (i = 0; i < items.length; i += groupSize) {
        groups.push(items.slice(i, i + groupSize));
    }
    return groups;
}