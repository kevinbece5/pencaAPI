import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { isValidJson, isValidProperty, trimObject } from "../common/lib";
import { INVALID_JSON_BODY, UNAUTHORIZED } from "./constants";
import { uploadSessionData } from './../dbTools/dynamoDb/lib';
import LogIn from "./models/LogIn";
import Session from "./models/Session";
import { validateUserPwd } from '../dbTools/dynamoDb/lib';

export function encriptPassword (password) {
  const secret = process.env.SECRET_ENCRYPT_PASSWORD;
  return crypto.createHmac('sha256', secret).update(password).digest('hex');
}

export function validateBody(body: any) {
  if (!isValidJson(body)) {
    throw ({ code: 400, message: INVALID_JSON_BODY });
  }
  const parsedBody = JSON.parse(body);
  if (!isValidProperty(parsedBody.username) || !isValidProperty(parsedBody.password)) {
    throw ({ code: 401, message: UNAUTHORIZED });
  }
  trimObject(parsedBody);
  const logIn: LogIn = new LogIn(parsedBody.username, encriptPassword(parsedBody.password));
  return logIn;
}

function createToken(username: string) {
  return new Promise((resolve, reject) => {
    const ttl = process.env.TTL;    
    const expirationDate = moment().unix() + Number(ttl);
    const jwtParams = {
      username,
      creationDate: moment().unix()
    };
    const token = jwt.sign(jwtParams, process.env.TOKEN_SECRET);
    
    const session = new Session(username, token, expirationDate);
    uploadSessionData(session)
    .then(() => {
      resolve(session);
    })
    .catch((error) => {
      reject(error);
    })
  });
}

export function validateLogIn (logIn: LogIn) {
  return new Promise((resolve, reject) => {
    try {
      return validateUserPwd(logIn.username, logIn.password)
      .then((result: any) => {
        if (result.Count === 0) {
          reject({ code: 401, message: UNAUTHORIZED });
        }
        return createToken(logIn.username);
      })
      .then((session) => {
        resolve(session);
      })
      .catch((error) => {
        console.log({error});
        reject(error);
      });
    }
    catch (err) {
      reject (err);
    }
  });
}