import { UserRepository } from '../security/users/UserRepository';
import { ERROR_REPO_NOT_FOUND } from './errors';

export interface IRepository {
    putItem(item: any): any;
    getItemById (id: any);
    getItems(params: any);
    deleteItem(id: any);
}

const repositoryIndex = {
    USERS: new UserRepository(),
};

export function getRepository(key: string) {
    const repository = repositoryIndex[key];
    if (!repository) {
        throw (ERROR_REPO_NOT_FOUND(key));
    }
    return repository;
}

export class RepositoryMap {
    public repos: { [key: string]: IRepository };

    public constructor (keys: string[]) {
        this.repos = {};
        keys.forEach((key: string) => {
            this.repos[key] = getRepository(key);
        });
    }
}