import { Repository } from "./Repository";
import { tables } from "../dbTools/config";
import { put, query, scan, deleteItem } from "../dbTools/lib";


export class StandingsRepository implements Repository {
    private table: string;
    
    constructor() {
        this.table = tables.standings;
    }

    putItem(item: any) {
        const params = {
            TableName: this.table,
            Item: item,
            ReturnValues: 'NONE'
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

    getItemById(id: any) {
        const params = {
            TableName: this.table,
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": id
            }
        };
      
        return new Promise((resolve,reject) =>{
            query(params)
            .then((items: any[]) => {
                if (items.length > 0) {
                    resolve(items[0]);
                }
            })
            .catch(error => {
                reject(error);
            });
        });
    }

    getItems(_: any) {
        const scanParams: any = {
            TableName: this.table
        };

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

    deleteItem(id: any) {
        const params = {
            TableName: this.table,
            Key: {
              "user": id.user,
            }
          };
        return new Promise((resolve,reject) =>{
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