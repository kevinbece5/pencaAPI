import { isValidJson, isValidProperty, trimObject } from '../common/lib';
import { INVALID_JSON_BODY, MISSING_TOKEN } from './constants';

export function validateBody(body: any) {
  if (!isValidJson(body)) {
    throw ({ code: 400, message: INVALID_JSON_BODY });
  }
  const parsedBody = JSON.parse(body);
  if (!isValidProperty(parsedBody.token)) {
    throw ({ code: 400, message: MISSING_TOKEN });
  }
  trimObject(parsedBody);  
  return parsedBody.token;
}