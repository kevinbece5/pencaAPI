import { createUserHandler } from './createUserHandler';
import { HTTP } from './constants';
import { REPO_KEYS } from './Repository/constants';
import { getUsers } from './getUsers';
import { getRepository } from './Repository/Repository';

export function usersHandler(
  event: any,
  context: any,
  callback: (err: any, res: any) => any,
) {
  switch (event.httpMethod) {
    case HTTP.POST:
         createUserHandler(event, context, callback);
         break;
    case HTTP.GET:
         getUsersHandler(event, context, callback);
         break;
    default:
         break;
  }
}

function getUsersHandler(event: any, context: any, callback: (err: any, res: any) => any,) {
  const usersRepository = getRepository(REPO_KEYS.USERS);
  getUsers(usersRepository)
    .then((response) => {
      callback(null, response);
    })
    .catch((error) => {
      callback(null, error);
    });
}