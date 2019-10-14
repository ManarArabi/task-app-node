const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {setupDatabase, new_user, new_user_id} = require('./fixtures/db')

beforeEach(setupDatabase)

test('signup new user', async ()=>{
    const response = await request(app).post('/users').send({
        name: 'manar',
        email: 'manar@gmail.com',
        password: 'pass77pass'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        user: {
            name: 'manar',
            email: 'manar@gmail.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('pass77pass')
})

test('should login existing user', async ()=>{
    const response = await request(app).post('/users/login').send({
        email: new_user.email,
        password: new_user.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(user.tokens[1].token).toBe(response.body.token)
})

test('shouldn\'t log non existing user', async ()=>{
    await request(app).post('/users/login').send({
        email: 'manar@gmail.com',
        password: new_user.password
    }).expect(400)
})

test('Should get user profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${new_user.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Shouldn\'t get user profile', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete user', async () => {
    const response = await request(app)
                        .delete('/users/me')
                        .set('Authorization', `Bearer ${new_user.tokens[0].token}`)
                        .send()
                        .expect(200)
    
    const user = await User.findById(response.body._id)
    expect(user).toBeNull()
})


test('Shouldn\'t delete user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () =>{
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${new_user.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(new_user_id)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update vallid user fields', async () => {
    await request(app)
                    .patch('/users/me')
                    .set('Authorization', `Bearer ${new_user.tokens[0].token}`)
                    .send({
                        name: 'mana8'
                    })
                    .expect(200)

    const user = await User.findById(new_user_id)
    expect(user.name).not.toBe(new_user.name)
})