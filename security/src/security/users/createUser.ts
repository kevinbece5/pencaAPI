import {
  INVALID_JSON_BODY,
  MISSING_EMAIL,
  MISSING_FIRSTNAME,
  MISSING_LASTNAME,
  MISSING_PASSWORD,
  MISSING_USERNAME,
  REPEATED_USERNAME,
} from './../constants';
import { encriptPassword } from './../logIn';
import { addUser, getUser } from '../../dbTools/dynamoDb/lib';
import {getCurrentDate, isValidJson, isValidProperty, trimObject } from './../../common/lib';
import User from './../models/User';

export function validateBody(body: any) {
  if (!isValidJson(body)) {
    throw ({ code: 400, message: INVALID_JSON_BODY });
  }
  const parsedBody = JSON.parse(body);
  if (!isValidProperty(parsedBody.username)) {
    throw ({ code: 400, message: MISSING_USERNAME });
  }
  if (!isValidProperty(parsedBody.password)) {
    throw ({ code: 400, message: MISSING_PASSWORD });
  }
  if (!isValidProperty(parsedBody.firstname)) {
    throw ({ code: 400, message: MISSING_FIRSTNAME });
  }
  if (!isValidProperty(parsedBody.lastname)) {
    throw ({ code: 400, message: MISSING_LASTNAME });
  }
  if (!isValidProperty(parsedBody.email)) {
    throw ({ code: 400, message: MISSING_EMAIL });
  }

  trimObject(parsedBody);
  const user: User = new User(parsedBody.username, encriptPassword(parsedBody.password),
                              parsedBody.firstname, parsedBody.lastname,parsedBody.email);
  user.createdAt = getCurrentDate();
  return user;
}

function validateUsername(username: string) {
  return new Promise((resolve, reject) => {
    return getUser(username)
    .then((result: any) => {
      if (result.Count > 0) {
        reject({ code: 400, message: REPEATED_USERNAME });
      }
      else {
        resolve();
      }
    })
    .catch((error) => {
      reject (error);
    });
  })
}

export function createUser (user: User) {
  return new Promise((resolve, reject) => {
    try {
      validateUsername(user.username)
      .then(() => {
        return addUser(user)
      })
      .then((result: any) => {
        resolve({ username: result.username });
      })
      .catch((error) => {
        reject (error);
      });
    }
    catch (err) {
      reject (err);
    }
  });
}
