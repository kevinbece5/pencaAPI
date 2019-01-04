import * as moment from 'moment';
import { encriptPassword } from '../security/logIn';
import {  addUser, deleteSessionData, deleteUser, getSessionData } from './../dbTools/dynamoDb/lib';
import { getUserNameHandler } from './../getUserNameHandler';
import { logInHandler } from './../logInHandler';

let TOKEN: string;
const USERNAME: string = 'test';
const PASSWORD: string = 'my_password!';
const EMAIL: string = 'user@email.com';
const FIRSTNAME: string = 'User';
const LASTNAME: string = 'Test';

const USER = {
    username: USERNAME,
    password: encriptPassword(PASSWORD),
    firstname: FIRSTNAME,
    lastname: LASTNAME,
    email: EMAIL,
};

const beforePromise = () => {
    return new Promise((resolve, reject) => {
        Promise.all([
            addUser(USER),
        ])
        .then(() => {
            resolve();
        })
        .catch(err => { console.log({err}); reject(err); })
    });
}

const afterPromise = () => {
    return new Promise((resolve, reject) => {
        Promise.all([
            deleteUser(USER)
        ])
        .then(() => { resolve(); })
        .catch(err => { console.log({err}); reject(err); })
    });
}

describe('getUserName handler test', () => {

    beforeAll(() => {
        console.log('Before All getUserName handler ...');
        return beforePromise().then(() => { console.log("Before All login handler executed"); });
    });

    afterAll(() => {
        console.log('After All getUserName handler ...');
        return afterPromise().catch(error => { console.error("Failed After All login handler: ", error); })
    });

    test('Valid log-in test', (done) => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
        const event = {
          body: JSON.stringify({
            username: USER.username,
            password: PASSWORD,
          }),
        };
        logInHandler(event, {}, (error, response) => {
            expect(response.statusCode).toBe(200);
            const parsedBody = JSON.parse(response.body);
            TOKEN = parsedBody.token;
            done();
            });
        });

    test('Valid Get UserName test from API GATEWAY CALL', (done) => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
      const event = {
        body: JSON.stringify({
          token: TOKEN,
        }),
        requestContext: {
          path: '/test'},
      };
      getUserNameHandler (event, {}, (error, response) => {
          expect(response.statusCode).toBe(200);
          const parsedBody = JSON.parse(response.body);
          expect(parsedBody.username).toBe(USER.username);
          done();
          });
    });

    test('Valid Get UserName test From another Microservice internally', (done) => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

        const event = {
            body: JSON.stringify({
              username: USER.username,
              password: PASSWORD,
            }),
        };
        logInHandler(event, {}, (error, response) => {
            const event = {   
                token: JSON.parse(response.body).token,
                requestContext: undefined,
            };
            getUserNameHandler (event, {}, (error, response) => {
                expect(response.statusCode).toBe(200);
                const parsedBody = JSON.parse(response.body);
                expect(parsedBody.username).toBe(USER.username);
                done();
            });
        })
    });
 });
