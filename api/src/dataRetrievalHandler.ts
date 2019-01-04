import {dataRetrieval} from './dataRetrieval/dataRetriever'
import { MatchesRepository } from './repositories/MatchesRepository';
import { HTTP } from './common/constants'

export function dataRetrievalHandler(event: any, context: any, callback: (err: any, res: any) => any) {
    const repo = new MatchesRepository()
    dataRetrieval(repo)
    .then(results => {
        console.log(results);
        callback(null, results)
    })
    .catch(error => {
        console.log(error);
        callback(null, error)
    })
}