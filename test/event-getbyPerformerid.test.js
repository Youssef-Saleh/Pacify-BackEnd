'use strict';

const mongoose = require('mongoose');

const dbHandler = require('./db-handler');
const eventsServices = require('../services/eventsServices');
const eventModel = require('../Database Seeds/models/event');

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await dbHandler.connect();
});

/**
 * Seed the database.
 */
beforeEach(async () => {
    await createEvents();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
    await dbHandler.clearDatabase();
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await dbHandler.closeDatabase();
});

/**
 * Product getById test suite.
 */
describe('event getByPerformerID ', () => {
    /**
     * Should return null if getById doesn't find any event with the provided performer id.
     */
    it('should return null if nothing is found', async () => {
        await expect(eventsServices.getEvents(mongoose.Types.ObjectId()))
            .resolves
            .toStrictEqual([]);
    });

    /**
     * Should return the correct event.
     */
    it('should retrieve correct event if performer id matches', async () => {
        const foundevent = await eventsServices.getEvents({ Performer: mongoose.Types.ObjectId("5ecbf031ebeaf6595c0ba73b")});
        //console.log(foundevent);
        expect(foundevent[0]._id).toStrictEqual(followEventId);
        expect(foundevent[0].Type).toBe(followEvent.Type);
    });
});

/**
 * Seed the database with products.
 */
const createEvents = async () => {
    const createdEvent = await eventModel.create(followEvent);
    //console.log(createdEvent);
    followEventId = createdEvent._id;
    await eventModel.create(likeEvent);
};

let followEventId;

const followEvent = {
    Performer: "5ecbf031ebeaf6595c0ba73b",
    Affected: "5ecbf031ebeaf6595c0ba73b", 
    Type: "Follow"
};

const likeEvent = {
    Performer: "5ecbf031ebeaf6595c0ba72b",
    Affected: "5ecbf031ebeaf6595c0ba74d", 
    Type: "Like"
};