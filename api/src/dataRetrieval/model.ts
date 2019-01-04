export interface Round {
    name: string,
    matches: Match[]
}

export interface Match {
    id: string,
    team1: Team
    team2: Team
    team1Score: number
    team2Score: number
    team1AdditionalScore: number | null
    team2AdditionalScore: number | null
    time: string
}

export interface Team {
    id: string
    name: string
    imageURL: string
}

export interface Bet {
    user: string,
    matchId: string,
    team1Score: number,
    team2Score: number,
    winner: string | null
}

export interface Standing {
    user: string,
    points: number
}