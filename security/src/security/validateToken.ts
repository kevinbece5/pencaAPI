import * as moment from 'moment';
import { isValidJson, isValidProperty, trimObject } from '../common/lib';
import { getSessionData } from './../dbTools/dynamoDb/lib';
import { INVALID_JSON_BODY, UNAUTHORIZED} from './constants';
import Session from './models/Session';

export function validateBody(body: any) {
  if (!isValidJson(body)) {
    throw ({ code: 400, message: INVALID_JSON_BODY });
  }
  const parsedBody = JSON.parse(body);
  if (!isValidProperty(parsedBody.token)) {
    throw ({ code: 401, message: UNAUTHORIZED });
  }
  trimObject(parsedBody);
  return parsedBody.token;
}

export function validateToken(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    getSessionData(token)
    .then((sessionData: Session) => {
      const currentDate = moment().unix();
      if (!sessionData || sessionData.expirationDate < currentDate) {
        reject({ code: 401, message: UNAUTHORIZED });
      }
      else {
        resolve(sessionData);
      }
    })
  });
}
