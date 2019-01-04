import axios from 'axios';
import * as moment from 'moment';
import * as _ from 'lodash';
import {Match, Team} from './model'
import { Repository } from '../repositories/Repository';

export const dataRetrieval = (repo: Repository) => {
    return new Promise((resolve, reject) => {
        try {
            axios.get("https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.json")
            .then((result) => {
                return parseMatchDays(result.data)
            })
            .then(results =>{
                //Store the Matches
                return storeMatches(_.flatten(results), repo)
            })
            .catch((error) => {
                reject(error)
            })
        }
        catch (error) {
            reject(error);
        }
    });
}
export const storeMatches = (matches: Match[], repo: Repository) => {
    const matchesPromise = matches.map(match => {
        return repo.putItem(match)
    })

    return Promise.all(matchesPromise);
}
export const parseMatchDays = (data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        try {
            const parseMatchesPromises = data.rounds.map(round => {
                return parseMatches(round.matches)
            });
            Promise.all(parseMatchesPromises)
            .then(results => {
                resolve(results)
            })
            .catch(error => {
                resolve(error)
            })
        }
        catch (error) {
            reject(error);
        }
    })
}

export const parseMatches = (matches: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        try {
            const matchesPromiseAPI = matches.map(data => {
                return parseSingleMatch(data)
            });
            Promise.all(matchesPromiseAPI)
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

export const parseSingleMatch = (match): Promise<Match> => {
    return new Promise((resolve, reject) => {
        try {
            Promise.all([parseTeam(match.team1), parseTeam(match.team2)])
            .then(results => {
                const team1: Team = results[0]
                const team2: Team = results[1]
                const matchId = generateMatchId(match);
                const matchStartDateTime = getMatchStartDateTime(match).format()            
                const team1Score = getScore(match.score1)
                const team2Score = getScore(match.score2)
                resolve({
                    id: matchId,
                    team1,
                    team2,
                    team1Score,
                    team2Score,
                    time: matchStartDateTime,
                    team1AdditionalScore: null,
                    team2AdditionalScore: null
                })
            })
            .catch(errors => {
                reject(errors)
            })
        }
        catch (error) {
            reject(error);
        }
    })
}

export const parseTeam = (inTeam): Promise<Team> => {
    return new Promise((resolve, reject) => {
        try {
            getImageForTeamName(inTeam.name)
            .then(teamUrl => {
                const team: Team = {
                    id: inTeam.code,
                    name: inTeam.name,
                    imageURL: teamUrl
                }
                resolve(team)
            })
            .catch(error => {
                reject(error)
            })
            
        }
        catch (error) {
            console.log("FAiLED");
            reject(error);
        }
    })
}

export const getImageForTeamName = (inTeamName): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            axios.get(`https://restcountries.eu/rest/v2/name/${inTeamName}`)
            .then((result) => {
                const data = result.data;
                const country = data[0];
                resolve(country.flag);
            })
            .catch(error => {
                console.log(error);
                resolve("NO URL")
            })
        } catch (error) {
            reject(error)
        }
    })
}
export const generateMatchId = (match) => {
    return `${match.num}`;
}

export const getMatchStartDateTime = (match) => {
    const dateStr = match.date;
    const timeStr = match.time;
    const timeZoneStr = match.timezone;
    const completeDate = `${dateStr} ${timeStr} ${timeZoneStr}`;
    const matchDateTime = moment(completeDate);
    return matchDateTime;
}

export const getScore = (score) => {
    return  score !== null ? _.toNumber(score) : null
}
