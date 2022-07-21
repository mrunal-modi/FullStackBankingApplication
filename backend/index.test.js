const supertest = require('supertest');
const app       = require('./index');
const request   = supertest(app);
const faker     = require('faker');
import { registerUser } from "../frontend/components/auth";

// returns a random user using faker
function user(){
    // setup
    const firstName     = faker.name.firstName();
    const lastName      = faker.name.lastName();

    // random data
    const name          = faker.name.findName(firstName, lastName);
    const email         = faker.internet.email(firstName, lastName);
    const password      = faker.internet.password();

    // return new user object
    return {
        name,
        email,
        password
    };
}

// create test users
const user1 = user();
const user2 = user();
const user3 = user();

it('populate data', async done => {
    await registerUser(user1);
    await registerUser(user2);
    await registerUser(user3);
    // await request.post('/add').send(user1);
    // await request.post('/add').send(user2);
    // await request.post('/add').send(user3);    
    done();
  })

it('verify data', async done => {
    const data = await request.get('/data');
    expect(data.body.some(e => e.name === user1.name)).toBeTruthy();
    expect(data.body.some(e => e.name === user2.name)).toBeTruthy();
    expect(data.body.some(e => e.name === user3.name)).toBeTruthy();
    done();
})  

var server = app.listen(3000, function(){
    console.log('Running on port 3000');
});

afterAll(done => {
    server.close();
    done();
});  