import ErrorMessage from './model/ErrorMessage';
import ErrorResponse from './model/ErrorResponse';

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


export function deepCopyObject (object: any) {
  const newObject = JSON.parse(JSON.stringify(object));
  return newObject;
}

export function isArray(body: any) {
  return body.constructor === Array;
}

export function isValidProperty(property: any) {
  if (property !== undefined && property !== null && String(property).length > 0) {
    return true;
  }
  return false;
}

export function isValidNumber(number: string) {
  let finalStr = number;
  if (typeof number === 'string') {
    finalStr = number.replace(/,/g, '');
  }
  if (isNaN(Number(finalStr))) {
    return false;
  }
  return true;
}

export function parseStringIntoNumber(number: string) {
  let finalStr = number;
  if (typeof number === 'string') {
    finalStr = number.replace(/,/g, '');
  }
  return parseFloat(finalStr);
}

export function isValidJson(str: string) {
  try {
    const obj = JSON.parse(str);
    if (obj && typeof obj === 'object' && obj !== null) {
      return true;
    }
  } catch (err) {}
  return false;
}
