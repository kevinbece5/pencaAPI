import * as _ from 'lodash';

import { Match, Bet, Standing } from '../dataRetrieval/model';
import { POINTS_FOR_SAME_SCORE, POINTS_FOR_GOAL_DIFFERENCE, POINTS_FOR_RESULT } from './constants';
import { StandingsRepository } from '../repositories/StandingsRepository';
import { MatchesRepository } from '../repositories/MatchesRepository';
import { BetRepository } from '../repositories/BetRepository';

export const calculateStandings = (matchRepo: MatchesRepository, betRepo:BetRepository, standingsRepo: StandingsRepository) => {
    return new Promise((resolve, reject) => {
        try {
           getAllMatches(matchRepo)
           .then((allMatches: Match[]) => {
                return processMatches(allMatches, betRepo) 
           })
           .then((listOfStandingsPerMatch: Standing[][]) => {
                const standings: Standing[] = mergeStandings(listOfStandingsPerMatch)
                return storeStandings(standings, standingsRepo)
           })
           .catch(error => {
               reject(error)
           })
        }
        catch (error) {
            reject(error);
        }
    });
}

export const getAllMatches = (repo: MatchesRepository): Promise<Match[]> => {
    return new Promise((resolve, reject) => {
        try {
            repo.getItems({})
            .then((results: Match[]) => {
                resolve(results)
            })
        }
        catch (error) {
            reject(error);
        }
    })
}
export const processMatches = (matches: Match[], betRepo: BetRepository): Promise<any> => {
    return new Promise((resolve, reject) => {
        try {
            getAllBets(betRepo)
            .then((bets: Bet[]) => {
                const allMatchesProcess = matches.map(match => {
                    const betsForMatch = bets.filter((bet) => {
                        return bet.matchId === match.id
                    })
                    return processOneMatch(match, betsForMatch)
                });
                return Promise.all(allMatchesProcess)
            })
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            })
        }
        catch (error) {
            reject(error);
        }
    })
}

export const getAllBets = (repo: BetRepository): Promise<Bet[]> => {
    return new Promise((resolve, reject) => {
        try {
            repo.getItems({})
            .then((results: Bet[]) => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            })
        }
        catch (error) {
            reject(error);
        }
    })
}

export const processOneMatch = (match: Match, bets: Bet[]): Promise<Standing[]> => {
    return new Promise((resolve, reject) => {
        try {
            if (bets && bets.length > 0) {
                const standingForMatch: Standing[] = bets.map(bet => {
                    return processMatchBet(match, bet)
                })
                resolve(standingForMatch)
            } else {
                resolve([])
            }
        }
        catch (error) {
            reject(error);
        }
    })
}

export const processMatchBet = (match: Match, bet: Bet): Standing => {
    let point = 0
    if (match.team1Score === bet.team1Score) {
        point += POINTS_FOR_SAME_SCORE
    }
    if (match.team2Score === bet.team2Score) {
        point += POINTS_FOR_SAME_SCORE
    }
    const matchResultDifference = match.team1Score - match.team2Score;
    const betResultDifference = bet.team1Score - bet.team2Score
    if (Math.abs(matchResultDifference) === Math.abs(betResultDifference)) {
        point += POINTS_FOR_GOAL_DIFFERENCE
    }
    if (Math.sign(matchResultDifference) === Math.sign(betResultDifference)) {
        point += POINTS_FOR_RESULT
    }
    return {
        user: bet.user,
        points: point
    }
}

export const mergeStandings = (listOfListOfStandings: Standing[][]) => {
    const flattenStandings = _.flatten(listOfListOfStandings);
    const byUserName = _.groupBy(flattenStandings, "user");
    const results: Standing[] = _.keys(byUserName).map(userName => {
        const pointsList = byUserName[userName];
        const sumPoints = pointsList.reduce((acc, cv) => {
            return acc + cv.points
        }, 0)
        return {
            user: userName,
            points: sumPoints
        }
    })
    return results
}

export const storeStandings = (list: Standing[], repo: StandingsRepository) => {
    return new Promise((resolve, reject) => {
        try {
           const storingPromises = list.map(standing => {
                repo.putItem(standing)
           })
           Promise.all(storingPromises)
           .then(results => {
               resolve(results)
           })
           .catch(error =>{
               reject(error)
           })
        }
        catch (error) {
            reject(error);
        }
    })
}