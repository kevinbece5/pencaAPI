import { stringify } from 'querystring';
import {
  ERROR_RETRIEVING_SESSION_DATA,
  ERROR_RETRIEVING_USER_DATA,
} from './../constants';
import { connection, tables } from './config';


export function getSessionData(token: string) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: tables.sessionData,
      KeyConditionExpression: '#tkn = :tkn',
      ExpressionAttributeNames: {
          '#tkn': 'token',
      },
      ExpressionAttributeValues: {
        ':tkn': token,
      }
    };
    connection.query(params, (error, result) => {
      if (error) {
        reject({ code: 500, message: ERROR_RETRIEVING_SESSION_DATA, detail: error });
      }
      resolve(result.Items[0]);
    });
  });
}

export function uploadSessionData (token: any) {
  const params = {
    TableName: tables.sessionData,
    Item: token,
    ReturnValues: 'NONE'
  };
  return new Promise((resolve, reject) => {
    connection.put(params, (error) => {
      if (error) {
        console.log({error});
        reject(error);
      }
      else {
        resolve();
      }
    });
  });
}

export function deleteSessionData(token: string) {
  const params = {
    TableName: tables.sessionData,
    Key: {
      "token": token
    }
  };
  return new Promise((resolve, reject) => {
    connection.delete(params, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}

//////USERS
export function getUser(username: string) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: tables.users,
      KeyConditionExpression: "#usr = :usr",
      ExpressionAttributeNames: {
          "#usr": "username",
      },
      ExpressionAttributeValues: {
        ":usr": username,
      }
    };
    connection.query(params, (error, result) => {
      if (error) {
        reject({ code: 500, message: ERROR_RETRIEVING_USER_DATA, detail: error });
      }
      console.log('result = ' + stringify(result));
      resolve(result);
    });
  });
}

export function addUser (user: any) {
  const params = {
    TableName: tables.users,
    Item: user,
    ReturnValues: 'NONE'
  };
  return new Promise((resolve, reject) => {
    connection.put(params, (error) => {
      if (error) {
        console.log({error});
        reject(error);
      }
      else {
        resolve(user);
      }
    });
  });
}

export function deleteUser(user: any) {
  const params = {
    TableName: tables.users,
    Key: { "username": user.username, "password": user.password }
  };

  return new Promise((resolve, reject) => {
    connection.delete(params, (error, result) => {
      if (error) {
          reject({ code: 500, message: JSON.stringify(error) });
      }
      resolve(result);
    });
  });
}

export function validateUserPwd(username: string, password: string) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: tables.users,
      KeyConditionExpression: 'username = :usrvalue and password = :pwdvalue',
      ExpressionAttributeValues: {
        ':usrvalue': username,
        ':pwdvalue': password,
      }
    };
    connection.query(params, (error, result) => {
      if (error) {
        reject({ code: 500, message: ERROR_RETRIEVING_USER_DATA, detail: error });
      }
      resolve(result);
    });
  });
}

export function scan(params) {
  return new Promise((resolve:(any) => any, reject) => {
      connection.scan(params, (error, result) => {
          if (error) {
              reject({ code: 500, message: JSON.stringify(error) });
          }else {
              resolve(result.Items);
          }
      });
  });
}

export function query (params) {
  return new Promise((resolve, reject) => {
      connection.query(params, (error, result) => {
          if (error) {
              reject({ code: 500, message: JSON.stringify(error) });
          } else {
              resolve(result.Items);
          }
      });
  });
}

export function put(params) {
  return new Promise((resolve, reject) => {
      connection.put(params, (error) => {
          if (error) {
              reject({ code: 500, message: JSON.stringify(error) });
          }else {
              resolve();
          }
      });
  });
}

export function deleteItem(params) {
  return new Promise((resolve, reject) => {
    connection.delete(params, (error, result) => {
      if (error) {
          reject({ code: 500, message: JSON.stringify(error) });
      }
      resolve(result);
    });
  });
}
