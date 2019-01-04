import * as moment from 'moment';

import ErrorMessage from './models/ErrorMessage';
import ErrorResponse from './models/ErrorResponse';

export function buildResponse (statusCode: number, body: any) {
  const response = {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
    },
    body: JSON.stringify(body)
  };

  return response;
}

function getErrorResponse (error: any): ErrorResponse {
  const errorResponse = new ErrorResponse();
  const errorMessage = new ErrorMessage();

  errorMessage.code = 500;
  if (error.code) {
    errorMessage.code = error.code;
  }

  errorMessage.message = JSON.stringify(error);
  if (error.message) {
    errorMessage.message = error.message;
  }

  if (error.detail) {
    errorMessage.detail = error.detail;
  }

  errorResponse.error = errorMessage;
  return errorResponse;
}

export function buildErrorResponse (error: any) {
  const errorResponse = getErrorResponse(error);
  const response = {
    statusCode: errorResponse.error.code,
    headers: {
      "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
    },
    body: JSON.stringify(errorResponse)
  };

  return response;
}

export function isValidJson(str) {
  try {
    const obj = JSON.parse(str);
    if (obj && typeof obj === 'object' && obj !== null) {
      return true;
    }
  } catch (err) {}
  return false;
}

export function isValidProperty(property: string) {
  return property !== undefined && property !== null && String(property).trim().length !== 0;
}

export function trimObject(object: any) {
  for (let prop in object) {
    if (typeof object[prop] === 'string') {
      object[prop] = object[prop].trim();
    }
  }
}

export function isValidNumber(number: string) {
  if (isNaN(Number(number))) {
    return false;
  }
  return true;
}

export function getCurrentDate() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}