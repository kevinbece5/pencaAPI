import {Repository} from '../repositories/Repository'
import { Standing } from '../dataRetrieval/model';
import { buildResponse, buildErrorResponse } from '../common/lib';


export const getStandings = (repo: Repository) => {
    return new Promise((resolve, reject) => {
        try {
            repo.getItems({})
           .then((standings: Standing[]) => {
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