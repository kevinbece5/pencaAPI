import { MatchesRepository } from './repositories/MatchesRepository';
import { HTTP } from './common/constants'
import { calculateStandings } from './standings/calculateStandings';
import { getStandings } from './standings/getStandings';
import { StandingsRepository } from './repositories/StandingsRepository';
import { BetRepository } from './repositories/BetRepository';
import { getMatches } from './matches/getMatches';

export function gamesHandler(event: any, context: any, callback: (err: any, res: any) => any) {
    const httpMethod = event.httpMethod;
    const matchRepo = new MatchesRepository()
    switch (httpMethod) {
        case HTTP.GET:
        {
            getMatches(matchRepo)
            .then(response => {
                callback(null, response)
            })
            .catch(errorResponse => {
                callback(null, errorResponse)
            })
        } 
    }
}