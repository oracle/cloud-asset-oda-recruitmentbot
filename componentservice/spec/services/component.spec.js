"use strict";

const supertest = require("supertest");
const Tester = require("@oracle/bots-node-sdk/testing");
describe('Component services', () => {
    let server;
    beforeAll(() => {
        server = require('../../index');
    });
    afterAll(done => {
        server.close(() => done());
    });
    it('should get component metadata', done => {
        supertest(server)
            .get('/components')
            .expect(200)
            .expect(res => {
            expect(res.body.version).toBeTruthy(`response did not contain metadata version`);
        }).end(err => err ? done.fail(err) : done());
    });
    it('should invoke component', done => {
        supertest(server)
            .post('/components/populateMultiValueEntities')
            .send(Tester.MockRequest())
            .expect(200)
            .expect(res => {
            expect(res.body).toEqual(jasmine.any(Object));
            expect(res.body.error).toBe(false);
        }).end(err => err ? done.fail(err) : done());
    });
});
