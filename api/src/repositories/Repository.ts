export interface Repository {
    putItem(item: any): Promise<any>;
    getItemById (id: any): Promise<any>;
    getItems(params: any): Promise<any>;
    deleteItem(id: any): Promise<any>;
}