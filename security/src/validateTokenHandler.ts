import { buildErrorResponse, buildResponse } from './common/lib';
import { validateBody, validateToken } from './security/validateToken';

export function validateTokenHandler(event: any, context: any, callback: (err: any, res: any) => any,
) {
  try {
    const token: string = validateBody(event.body);
    validateToken(token)
    .then(() => {
      context.callbackWaitsForEmptyEventLoop = false;
      const response = buildResponse(200, {});
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
