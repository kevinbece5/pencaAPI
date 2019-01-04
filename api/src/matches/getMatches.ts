import {Repository} from '../repositories/Repository'
import { Match } from '../dataRetrieval/model';
import { buildResponse, buildErrorResponse } from '../common/lib';

export const getMatches = (repo: Repository) => {
    return new Promise((resolve, reject) => {
        try {
            repo.getItems({})
           .then((standings: Match[]) => {
                const response = buildResponse(200, standings)
                resolve(response)
           })
           .catch(error => {
               const errorResponse = buildErrorResponse({code: 500, detail:error})
               reject(errorResponse)
           })
        }
        catch (error) {
            const errorResponse = buildErrorResponse({code: 500, detail:error})
            reject(errorResponse);
        }
    });
}