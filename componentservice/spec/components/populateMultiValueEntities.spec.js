"use strict";

const Tester = require("@oracle/bots-node-sdk/testing");
const PopulateMultiValueEntitiesComponent = require('../../components/populateMultiValueEntities');
describe('PopulateMultiValueEntitiesComponent', () => {
    it('should chat', done => {
        const conv = Tester.MockConversation.any();
        PopulateMultiValueEntitiesComponent.invoke(conv, (err) => {
            expect(err).toBeFalsy();
            expect(conv.getReplies()).toBeDefined();
            expect(conv.getReplies().length).toBeGreaterThan(0);
            done();
        });
    });
});
