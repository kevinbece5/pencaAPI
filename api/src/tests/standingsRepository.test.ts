import {StandingsRepository} from '../repositories/StandingsRepository'
import {Standing} from '../dataRetrieval/model'
describe('standigns repository ', () => {
    
    const repo = new StandingsRepository()
    
    // beforeAll(() => {
    //     console.log('Before FB buildOut Test ...');

    //     return Promise.all([
    //         upsertDataObject(FB_DATA_OBJECT),
    //         createBuildOutErrorCheck(ERROR_CHECKS_FACEBOOK),
    //         createDealer(dealer_6),
    //         createTemplate(fb_template_1),
    //         upsertTagObject(TAG_OBJECT_3),
    //         upsertDefault(fb_defaults),
    //         upsertSetting(fb_settings),
    //         upsertStateItem(dealer_6_state)
    //     ])
    //     .then(() => {
    //       console.log("... Done");
    //     })
    //     .catch((error) => {
    //         console.log("... Error", error);
    //     })
    // });

    afterAll(() => {
        console.log('After FB buildOut Test ...');
        return Promise.all([
            repo.deleteItem({user: "franklin"}),
        ])
        .then(() => {
            console.log("... Done");
        })
        .catch((err) => {
            console.log("... Error", err);
        })
    });

    test('add standing', (done) => {
        const stand: Standing = {
            user: "franklin",
            points: 44
        }
        repo.putItem(stand)
        .then(res => {
            console.log(res);
            done()
        })
        .catch(error => {
            console.log(error);
            done()
        })
    });

});
