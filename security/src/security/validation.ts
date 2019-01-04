import * as moment from 'moment';
import { getSessionData } from './../dbTools/dynamoDb/lib';
import Session from './models/Session';

export function getCredentialsFromEvent(event: any) {
  return new Promise((resolve, reject) => {
    if (!event.authorizationToken) {
      reject();
    }
    try {
      const auth = JSON.parse(event.authorizationToken);
      if (!auth.token) {
        reject();
      }
      const credentials =  {
        token: auth.token
      };
      resolve(credentials);
    }
    catch (error) {
      reject();
    }
  })
}

export function validateAuthorizationCredentials(token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    getSessionData(token)
    .then((sessionData: Session) => {
      if (sessionData) {
        const currentDate = moment().unix();
        if (sessionData.expirationDate >= currentDate) {
          resolve();
        }
        else {
          reject();
        }
      }
      else {
        reject();
      }
    })
  });
}

export function getAllowPolicy(token: string) {
  return new Promise((resolve) => {
    const actualTime = moment().unix();
    const principalId = `${token}/${actualTime}`;
    const authResponse = {
      "principalId": principalId,
      "policyDocument": {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Action": "execute-api:Invoke",
            "Effect": "Allow",
            "Resource": "arn:aws:execute-api:*:*:*"
          }
        ]
      }
    };
    resolve(authResponse);
  });
}
