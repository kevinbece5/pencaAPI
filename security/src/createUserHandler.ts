import { buildErrorResponse, buildResponse } from './common/lib';
import User from './security/models/User';
import { createUser, validateBody  } from './security/users/createUser';

export function createUserHandler(
  event: any,
  context: any,
  callback: (err: any, res: any) => any,
) {
  try {
    const user: User = validateBody(event.body);
    createUser(user)
    .then((id) => {
      context.callbackWaitsForEmptyEventLoop = false;
      const response = buildResponse(201, id);
      callback(null, response);
    })
    .catch((error) => {
      console.log({error});
      context.callbackWaitsForEmptyEventLoop = false;
      const response = buildErrorResponse(error);
      callback(null, response);
    });
  }
  catch (error) {
    console.log({error});
    context.callbackWaitsForEmptyEventLoop = false;
    const response = buildErrorResponse(error);
    callback(null, response);
  }
}
