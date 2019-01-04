import * as AWS from 'aws-sdk';
import { awsConfig, globalConst } from './appVariables';

export const connection = new AWS.DynamoDB.DocumentClient(awsConfig);

export const tables = {
    matches: `${globalConst.stage}_matches`,
    bets: `${globalConst.stage}_bets`,
    standings: `${globalConst.stage}_standings`,
};
