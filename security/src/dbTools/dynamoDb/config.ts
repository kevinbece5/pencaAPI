import * as AWS from 'aws-sdk';
import { awsConfig, globalConst } from './appVariables';

export const connection = new AWS.DynamoDB.DocumentClient(awsConfig);
export const tables = {
  sessionData: `${globalConst.stage}_security_sessions`,
  users: `${globalConst.stage}_security_users`,
};
