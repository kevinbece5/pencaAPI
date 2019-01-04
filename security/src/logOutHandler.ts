import { buildErrorResponse, buildResponse } from './common/lib';
import { deleteSessionData } from './dbTools/dynamoDb/lib';
import { validateBody } from './security/logOut';

export function logOutHandler(
  event: any,
  context: any,
  callback: (err: any, res: any) => any,
) {
  try {
    const token: string = validateBody(event.body);
    deleteSessionData(token)
    .then(() => {
      context.callbackWaitsForEmptyEventLoop = false;
      const response = buildResponse(204, {});
      callback(null, response);
    })
    .catch((error) => {
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
