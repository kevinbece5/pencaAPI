import { dataRetrieval, parseMatches, parseSingleMatch, parseMatchDays, parseTeam} from '../dataRetrieval/dataRetriever'
import * as moment from 'moment'

import { MatchesRepository } from '../repositories/MatchesRepository'

describe('dataRetrival ', () => {

    test.only('dataRetrieval error', (done) => {
        const repo = new MatchesRepository()
        dataRetrieval(repo)
        .then(res => {
            console.log(res);
            done()
        })
        .catch(error => {
            console.log(error);
            done()
        })
    });

    test('parseSingleMatch', (done) => {
        parseSingleMatch(oneMatch[0])
        .then(res => {
            console.log(res);
            done()
        })
        .catch(error => {
            console.log(error);
            done()
        })
    });

    test('parseMatchDays', (done) => {
        parseMatchDays(jsonResponse)
        .then(res => {
            console.log(res);
            done()
        })
        .catch(error => {
            console.log(error);
            done()
        })
    });

    test('parseMatches ', (done) => {
        parseMatches(oneMatch)
        .then(res => {
            console.log(res);
            done()
        })
        .catch(error => {
            console.log(error);
            done()
        })
    });

    test('parseMatches error', (done) => {
        parseMatches(oneMatch)
        .then(res => {
            console.log(res);
            done()
        })
        .catch(error => {
            console.log(error);
            done()
        })
    });

    test.only('parseTeam error', (done) => {
        parseTeam({code: "URU", name:"Uruguay"})
        .then(res => {
            console.log(res);
            done()
        })
        .catch(error => {
            console.log(error);
            done()
        })
    });

    test('parseDate error', () => {
        const date = moment("2018-09-01 20:00:00 UTC+3") //TODO: Find the correct format
        const currentDate = moment()
        expect(date.diff(currentDate) > 0);
        expect(date.utc().get('hour')).toBe(17)
        expect(date.get('minute')).toBe(0)
    });


});
