//CRUD: create read update delete

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to to database!')
    }

    const db = client.db(databaseName)

    // db.collection('users').deleteOne({
    //     name: 'mayar'
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    
})


//create
    // db.collection('users').insertOne({
    //     name: 'Salma', 
    //     age: '23'
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: "completing the course",
    //         completed: false
    //     },{
    //         description: "listenning to a song",
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert task')
    //     }
    //     console.log(result.ops)
    // })

//find
    // db.collection('users').findOne({ name: 'Manar'}, (error, user) => {
    //     if(error){
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })

    //find returns a cursor in the database
    // db.collection('users').find({ age: 23 }).toArray((error, users) => {
    //     console.log(users)
    // })
    
    // db.collection('users').find({ age: 23 }).count((error, count) => {
    //     console.log(count)
    // })

    // db.collection('tasks').findOne({ _id: ObjectID("5d9d684ca3d4332a9801318b") }, (error, task) => {
    //     if(error){
    //         console.log('Unable to fetch')
    //     }
    //     console.log(task)
    // })

//update
    // const updatePromise = db.collection('users').updateOne({
    //     _id: ObjectID("5d9d665779667513f4db2c2c")
    // },{
    //     $inc:{
    //         age: 1
    //     }
    // })

    // updatePromise.then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // const updatePromise = db.collection('users').updateMany({
    //     age: 23
    // },{
    //     $inc:{
    //         age: 1
    //     }
    // })

    // updatePromise.then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

//delete
    // db.collection('users').deleteOne({
    //     name: 'mayar'
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
    // db.collection('users').deleteMany({
    //     age: "23"
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })