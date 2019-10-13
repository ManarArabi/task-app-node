require('../db/mongoose')
const Task = require('../models/task')

//5d9e49790872422e68e3e9ed

// task.findByIdAndDelete('5d9e61872503d9216020f90c').then((tasks)=>{
//     console.log(tasks)
//     return task.countDocuments({ completed: false})
// }).then((num)=>{
//     console.log(num)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount = async (id)=>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount("5d9e61c2c4b09c022c8d3cb7").then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})