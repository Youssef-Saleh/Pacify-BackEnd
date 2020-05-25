'use strict';

const mongoose = require('mongoose');

const dbHandler = require('./db-handler');
const userServices = require('../services/userServices');
const userModel = require('../Database Seeds/models/user');

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
 * Premium test suite.
 */
describe('user getUserByEmail ', () => {
    /**
     * Should return null if getById doesn't find any user.
     */
    it('should return null if nothing is found', async () => {
        await expect(userServices.getUsers({email: " "}))
            .resolves
            .toStrictEqual([]);
    });

    /**
     * Should return the correct event.
     */
    it('should retrieve correct user if user email matches', async () => {
        const foundUser = await userServices.getUsers({email: "user1@gmail.com", type: "Free"});
        //console.log(foundUser);
        expect(foundUser[0]._id).toStrictEqual(freeUserId);
        expect(foundUser[0].email).toBe(freeUser.email);
    });
});

describe('user updateUser ', () => {
    
    
    
    /**
     * Should return the correct User.
     */
    it('should retrieve correct user if user email matches after he is premium', async () => {
        var updateFilter = {email: "user1@gmail.com"};
        var query = {$set: {type: "Premium"}};
        await userServices.updateUser(updateFilter, query);    
        const foundUser = await userServices.getUsers({email: "user1@gmail.com", type: "Premium"});
        //console.log(foundUser);
        expect(foundUser[0]._id).toStrictEqual(freeUserId);
        expect(foundUser[0].email).toBe(freeUser.email);
    });
});


/**
 * Seed the database with products.
 */
const createEvents = async () => {
    const createdUser = await userModel.create(freeUser);
    //console.log(createdEvent);
    freeUserId = createdUser._id;
    await userModel.create(premiumUser);
};

let freeUserId;

const freeUser = {
    "type" : "Free",
    "activated" : false,
    "birthdate" : "1980-08-20T00:00:00.000Z",
    "fbuser" : false,
    "country" : "Egypt",
    "email" : "user1@gmail.com",
    "password" : "123456789",
    "nickname" : "ahmad",
    "gender" : "Female",
    "phone" : "01118862871",
    "img" : "https://lh3.googleusercontent.com/_BYXqMQuEuvN4fWbN7eZ7KiWfdeATbOh5WAd352bascYPHMFleL6a1XPciob60JpyPLCn7xNuM5lpc1QDFm7vvc",
};

const premiumUser = {
    "activated" : false,
    "birthdate" : null,
    "email" : "user3@admin.com",
    "password" : "secret",
    "nickname" : "User",
    "type" : "Premium",
    "gender" : "Male",
    "phone" : "0123534569",
};