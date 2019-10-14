const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const new_user_id = new mongoose.Types.ObjectId()
const new_user2_id = new mongoose.Types.ObjectId()

const new_user ={
    _id: new_user_id,
    name: 'manar',
    email: 'manar22@gmail.com',
    password: 'pass88pass',
    tokens: [{
        token: jwt.sign({_id: new_user_id}, process.env.JWT_SECRET)
    }]
}

const new_user2 = {
    _id: new_user2_id,
    name: 'lolo',
    email: 'lolo22@gmail.com',
    password: 'pass88pass',
    tokens: [{
        token: jwt.sign({_id: new_user2_id}, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId,
    description: 'task one',
    completed: false, 
    owner: new_user_id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId,
    description: 'task two',
    completed: true, 
    owner: new_user2_id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(new_user).save()
    await new User(new_user2).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
}

module.exports = {
    setupDatabase,
    new_user,
    new_user_id,
    taskTwo
}