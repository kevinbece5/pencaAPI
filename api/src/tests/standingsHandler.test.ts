import {standingsHandler} from '../standingsHandler'
import { HTTP } from '../common/constants';

describe('standignshandler ', () => {

    test('standignshandler', (done) => {
        const event = {
            httpMethod: HTTP.GET
        }
        standingsHandler(event, null, (err, res) => {
            console.log(res);
            done()
            
        })
        
    });
});