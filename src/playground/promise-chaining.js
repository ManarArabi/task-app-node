require('../db/mongoose')
const User = require('../models/user')

//5d9e46750baadc2c503238d0

// user.findByIdAndUpdate('5d9e46750baadc2c503238d0', {age: 1}).then((users)=>{
//     console.log(users)
//     return user.countDocuments({ age: 1})
// }).then((num)=>{
//     console.log(num)
// }).catch((e)=>{
//     console.log(e)
// })

const UpdateAgeAndCount = async(id, age)=>{
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })

    return count
}

UpdateAgeAndCount("5d9e46750baadc2c503238d0", 5).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})