import { MatchesRepository } from './repositories/MatchesRepository';
import { HTTP } from './common/constants'
import { calculateStandings } from './standings/calculateStandings';
import { getStandings } from './standings/getStandings';
import { StandingsRepository } from './repositories/StandingsRepository';
import { BetRepository } from './repositories/BetRepository';

export function standingsHandler(event: any, context: any, callback: (err: any, res: any) => any) {
    const httpMethod = event.httpMethod;
    const repo = new MatchesRepository()
    const standingsRepo = new StandingsRepository()
    const betRepo = new BetRepository()
    switch (httpMethod) {
        case HTTP.POST:
        {
            calculateStandings(repo, betRepo, standingsRepo)
            .then(result => {
                callback(null, result)
            })
            .catch(error => {
                callback(null, error)
            })
        }
        case HTTP.GET:
        {
            getStandings(standingsRepo)
            .then(response => {
                callback(null, response)
            })
            .catch(errorResponse => {
                callback(null, errorResponse)
            })
        } 
    }
}