"use strict";

const express = require("express");
const supertest = require("supertest");
describe('RecruitmentBot', () => {
    let server;
    describe('as standalone dev container', () => {
        beforeAll(() => {
            server = require('../index');
        });
        afterAll(done => {
            server.close(() => done());
        });
        it('should respond', done => {
            supertest(server)
                .get('/')
                .expect(404)
                .end(err => err ? done.fail(err) : done());
        });
    });
    describe('as OMCe service', () => {
        beforeAll(() => {
            const app = express();
            const Main = require('../'); // read main from package.json (app.js)
            Main(app);
            server = app.listen(process.env.PORT || 3001);
        });
        afterAll(done => {
            server.close(() => done());
        });
        it('should respond', done => {
            supertest(server)
                .get('/mobile/custom/recruitment_bot')
                .expect(404)
                .end(err => err ? done.fail(err) : done());
        });
    });
});
