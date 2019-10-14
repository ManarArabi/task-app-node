const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {setupDatabase, new_user, new_user_id, taskTwo} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async ()=>{
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${new_user.tokens[0].token}`)
        .send({
            description: 'from my test'
        })
        .expect(201)

    const task = Task.findById(response.body._id)
    expect(task).not.toBeNull()
})

test('Should return all tasks for particular user', async ()=>{
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${new_user.tokens[0].token}`)
        .expect(200)

    expect(response.body.length).toEqual(1)
})

test('Shouldn\'t delete another user task', async()=>{
    console.log('/tasks/'+taskTwo._id)
    await request(app)
        .delete('/tasks/'+taskTwo._id)
        .set('Authorization', `Bearer ${new_user.tokens[0].token}`)
        .expect(404)
})