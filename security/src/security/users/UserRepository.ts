import { tables } from '../../dbTools/dynamoDb/config';
import { deleteItem, put, query, scan } from '../../dbTools/dynamoDb/lib';
import { IRepository } from '../../Repository/Repository';
import { ERROR_USER_NOT_FOUND } from './errors';

export class UserRepository implements IRepository {
    private table: string;
    constructor() {
        this.table = tables.users;
    }

    public putItem(item: any) {
        const params = {
            TableName: this.table,
            Item: item,
            ReturnValues: 'NONE',
        };
        return new Promise((resolve,reject) =>{
            put(params)
            .then(() => {
                resolve(item);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    public getItemById(id: any) {
        const params = {
            TableName: this.table,
            KeyConditionExpression: 'username = :id',
            ExpressionAttributeValues: {
                ':id': id,
            },
        };
        return new Promise((resolve, reject) => {
            query(params)
            .then((items: any[]) => {
                if (items.length > 0) {
                    resolve(items[0]);
                } else {
                    reject(ERROR_USER_NOT_FOUND(id));
                }
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    public getItems(params: any) {
        let scanParams;
        if (params.filterExpression !== undefined && params.expressionAttributeValues !== undefined) {
            scanParams = {
                TableName: this.table,
                FilterExpression: params.filterExpression,
                ExpressionAttributeValues: params.expressionAttributeValues,
                ProjectionExpression: params.fields ? params.fields : undefined,
            };
        }else {
            scanParams = {
                TableName: this.table,
                FilterExpression: 'isActive = :isActive',
                ExpressionAttributeValues: {
                    ':isActive': '1',
                },
                ProjectionExpression: params.fields ? params.fields : undefined,
            };
        }
        return new Promise((resolve, reject) => {
            scan(scanParams)
            .then((items) => {
                resolve(items);
            })
            .catch((error) => {
                reject(error);
            })
        })
    }

    public deleteItem(id: any) {
        const params = {
            TableName: this.table,
            Key: {
              username: id,
            },
          };
        return new Promise((resolve, reject) => {
            deleteItem(params)
            .then(_ => {
                resolve();
            })
            .catch(error => {
                reject(error);
            });
        });
    }
}
