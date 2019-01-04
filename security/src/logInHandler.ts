import { buildErrorResponse, buildResponse } from './common/lib';
import { validateBody, validateLogIn  } from './security/logIn';
import LogIn from './security/models/LogIn';
import Session from './security/models/Session';

export function logInHandler(
  event: any,
  context: any,
  callback: (err: any, res: any) => any,
) {
  try {
    const logIn: LogIn = validateBody(event.body);
    validateLogIn(logIn)
    .then((session: Session) => {
      context.callbackWaitsForEmptyEventLoop = false;
      const response = buildResponse(200, session);
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
