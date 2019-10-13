const express = require('express')
require('./db/mongoose')
const user_router = require('./routers/user')
const task_router = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(user_router)
app.use(task_router)

const multer = require('multer')
const upload = multer({
    dest: 'images'
})


app.post('/upload', upload.single('upload'), (req, res)=>{
    res.send()
})

app.listen(port, ()=>{
    console.log('Server is up on port '+ port)
})