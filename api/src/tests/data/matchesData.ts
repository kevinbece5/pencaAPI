import {Match, Team, Bet} from '../../dataRetrieval/model'

export const Uruguay: Team = {
    id: "URU",
    name: "Uruguay",
    imageURL: "flag",
}

export const Brazil: Team = {
    id: "BRA",
    name: "Brazil",
    imageURL: "flag",
}

export const Argentina: Team = {
    id: "ARG",
    name: "Argentina",
    imageURL: "flag",
}

export const match1: Match = {
    id: "1",
    team1: Uruguay,
    team2: Argentina,
    team1Score: 2,
    team2Score: 0,
    team1AdditionalScore: null,
    team2AdditionalScore: null,
    time: "2018-06-20T13:00:00-0500",
}

export const match2: Match = {
    id: "2",
    team1: Brazil,
    team2: Uruguay,
    team1Score: 2,
    team2Score: 2,
    team1AdditionalScore: null,
    team2AdditionalScore: null,
    time: "2018-06-22T15:00:00-0500",
}

export const match3: Match = {
    id: "3",
    team1: Brazil,
    team2: Argentina,
    team1Score: 0,
    team2Score: 0,
    team1AdditionalScore: null,
    team2AdditionalScore: null,
    time: "2018-06-22T15:00:00-0500",
}

export const matches = [match1, match2, match3];


export const Bet1: Bet = {
    user: "franklin",
    matchId: "1",
    team1Score: 1,
    team2Score: 2,
    winner: null
}

export const Bet1_EXACT: Bet = {
    user: "franklin",
    matchId: "1",
    team1Score: 2,
    team2Score: 0,
    winner: null
}

export const Bet1_WINNER_DIFF: Bet = {
    user: "franklin",
    matchId: "1",
    team1Score: 4,
    team2Score: 2,
    winner: null
}
export const Bet1_WINNER: Bet = {
    user: "franklin",
    matchId: "1",
    team1Score: 4,
    team2Score: 1,
    winner: null
}

export const Bet1_DIFF: Bet = {
    user: "franklin",
    matchId: "1",
    team1Score: 0,
    team2Score: 2,
    winner: null
}

export const Bet1_SCORE_LOSER: Bet = {
    user: "franklin",
    matchId: "1",
    team1Score: 0,
    team2Score: 0,
    winner: null
}

export const Bet2: Bet = {
    user: "kevin",
    matchId: "1",
    team1Score: 3,
    team2Score: 0,
    winner: null
}

export const Bet3: Bet = {
    user: "kurt",
    matchId: "1",
    team1Score: 2,
    team2Score: 2,
    winner: null
}

export const Bet4: Bet = {
    user: "franklin",
    matchId: "2",
    team1Score: 1,
    team2Score: 1,
    winner: null
}

export const Bet5: Bet = {
    user: "kevin",
    matchId: "2",
    team1Score: 2,
    team2Score: 3,
    winner: null
}

export const Bet5_RESULT_DIFF: Bet = {
    user: "kevin",
    matchId: "2",
    team1Score: 3,
    team2Score: 3,
    winner: null
}
export const Bet5_SCORE: Bet = {
    user: "kevin",
    matchId: "2",
    team1Score: 2,
    team2Score: 3,
    winner: null
}
export const Bet5_NOTHING: Bet = {
    user: "kevin",
    matchId: "2",
    team1Score: 0,
    team2Score: 1,
    winner: null
}

export const Bet6: Bet = {
    user: "kurt",
    matchId: "2",
    team1Score: 0,
    team2Score: 3,
    winner: null
}

export const Bets = [Bet1,Bet2,Bet3,Bet4,Bet5,Bet6]