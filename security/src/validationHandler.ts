import {
  getAllowPolicy,
  getCredentialsFromEvent,
  validateAuthorizationCredentials
} from './security/validation';

export function validationHandler(
  event: any,
  context: any,
  callback: (err: any, res: any) => any,
) {
  let token;
  getCredentialsFromEvent(event)
  .then((credentials: any) => {
    token = credentials.token;
    return validateAuthorizationCredentials(token);
  })
  .then(() => {
    return getAllowPolicy(token);
  })
  .then((authResponse) => {
    callback(null, authResponse);
  })
  .catch(() => {
    callback('Unauthorized', 'Unauthorized');
  })
}
