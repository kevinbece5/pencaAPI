import { HTTP } from './common/constants'
import { getBetsForMatch } from './bets/getBets';
import { BetRepository } from './repositories/BetRepository';

export function betsHandler(event: any, context: any, callback: (err: any, res: any) => any) {
    const httpMethod = event.httpMethod;
    const betRepository = new BetRepository()
    const pathParameters = event.pathParameters;
    const matchId = pathParameters ? pathParameters.matchId : null
    switch (httpMethod) {
        case HTTP.GET:
        {
            getBetsForMatch(matchId, betRepository)
            .then(result => {
                callback(null, result)
            })
            .catch(error => {
                callback(null, error)
            })
        }
    }
}