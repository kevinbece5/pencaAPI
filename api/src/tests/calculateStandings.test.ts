import { processMatchBet, calculateStandings } from '../standings/calculateStandings'

import * as moment from 'moment'
import { match1, Bet1, Bet1_EXACT, Bet1_DIFF, Bet1_SCORE_LOSER, Bet1_WINNER_DIFF, match2, Bet1_WINNER, Bet5_NOTHING, Bet5_RESULT_DIFF, Bet5_SCORE } from './data/matchesData';
import { StandingsRepository } from '../repositories/StandingsRepository';
import { BetRepository } from '../repositories/BetRepository';
import { MatchesRepository } from '../repositories/MatchesRepository';

describe('calculateStandings ', () => {

    test('processMatchBet error', () => {
        const result = processMatchBet(match1, Bet1_EXACT)
        expect(result.user).toBe("franklin");
        expect(result.points).toBe(5)
        
    });
    test('processMatchBet error', () => {
        const result = processMatchBet(match1, Bet1_DIFF)
        expect(result.user).toBe("franklin");
        expect(result.points).toBe(1)
        
    });
    test('processMatchBet error', () => {
        const result = processMatchBet(match1, Bet1_SCORE_LOSER)
        expect(result.user).toBe("franklin");
        expect(result.points).toBe(1)
        
    });
    test('processMatchBet error', () => {
        const result = processMatchBet(match1, Bet1_WINNER_DIFF)
        expect(result.user).toBe("franklin");
        expect(result.points).toBe(3)
        
    });
    test('processMatchBet error', () => {
        const result = processMatchBet(match1, Bet1)
        expect(result.user).toBe("franklin");
        expect(result.points).toBe(0)
        
    });
    test('processMatchBet error', () => {
        const result = processMatchBet(match1, Bet1_WINNER)
        expect(result.user).toBe("franklin");
        expect(result.points).toBe(2)
        
    });

    test('processMatchBet error', () => {
        const result = processMatchBet(match2, Bet5_NOTHING)
        expect(result.user).toBe("kevin");
        expect(result.points).toBe(0)
        
    });

    test('processMatchBet error', () => {
        const result = processMatchBet(match2, Bet5_RESULT_DIFF)
        expect(result.user).toBe("kevin");
        expect(result.points).toBe(3)
        
    });

    test('processMatchBet error', () => {
        const result = processMatchBet(match2, Bet5_SCORE)
        expect(result.user).toBe("kevin");
        expect(result.points).toBe(1)
        
    });

    test.only('calculateStandings error', (done) => {
        const standingsRepo = new StandingsRepository()
        const betRepo = new BetRepository()
        const matchesRepo = new MatchesRepository()
        calculateStandings(matchesRepo, betRepo, standingsRepo)
        .then(result => {
            console.log(result);
            done()
        })
        .catch(error => {
            console.log(error);
            done()
        })        
    });

});
