import * as moment from 'moment';
import { encriptPassword } from '../security/logIn';
import { deleteSessionData, getSessionData, addUser, deleteUser } from './../dbTools/dynamoDb/lib';
import { logInHandler } from './../logInHandler';
import { logOutHandler } from './../logOutHandler';

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

let token: string;

const beforePromise = () => {
    return new Promise((resolve, reject) => {
        Promise.all([
            addUser(USER),
        ])
        .then(() => { resolve(); })
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

describe('Log in handler test', () => {

    beforeAll(() => {
        console.log('Before All login handler ...');
        return beforePromise().then(() => { console.log("Before All login handler executed"); });
    });

    afterAll(() => {
        console.log('After All login handler ...');
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
          token = parsedBody.token;
          getSessionData(token)
          .then((dbToken: any) => {
          expect(dbToken).toBeDefined();
          const currentDate = moment().unix();
          expect(dbToken.expirationDate).toBeGreaterThan(currentDate);
          done();
          });
      });
    });
 });

 describe('Log in Invalid Login Requests', () => {
  test('Invalid log-in test', (done) => {
    const event = {
      body: JSON.stringify({
        username: USER.username,
        password: `${PASSWORD}123abc`,
      }),
    };
    logInHandler(event, {}, (error, response) => {
      expect(response.statusCode).toBe(401);
      done();
    });
  });

  test('Invalid log-in missing password', (done) => {
    const event = {
      body: JSON.stringify({
        username: USER.username,
      }),
    };

    logInHandler(event, {}, (error, response) => {
      expect(response.statusCode).toBe(401);
      done();
    });
  });

  test('Invalid logIn missing username', (done) => {
    const event = {
      body: JSON.stringify({
        password: USER.password,
      }),
    };

    logInHandler(event, {}, (error, response) => {
      expect(response.statusCode).toBe(401);
      done();
    });
  });
});

describe('Log Out handler test', () => {
  test('Valid Logout', (done) => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    const event = {
      body: JSON.stringify({
        token: token,
      }),
    };
    logOutHandler(event, {}, (error, response) => {
        expect(response.statusCode).toBe(204);
        done();
    });
  });
});
