const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')

const router = new express.Router()

router.post('/users', async (req, res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res)=>{
    try {

        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })

        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
        
})

router.post('/users/logoutall', auth, async(req, res)=>{
    try {
        req.user.tokens = []
        console.log(req.user.tokens)

        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res)=>{
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res)=>{

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password', 'email', 'age']
    const isValidOperator = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperator){
        return res.status(400).send("Invalid updates")
    }
    
    try{
        // const user = await User.findById(_id)
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/users/me', auth, async (req, res)=>{
    
    try{
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     res.status(404).send()
        // }

        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000 //1Mb
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|(png|PNG))$/)){
            return cb(new Error('the image must be jpg or jpeg or png'))
        }
        return cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res)=>{
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next)=>{
    res.status(400).send({Error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res)=>{
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/dd', async (req, res)=>{
    const user = await User.findById('5da1a37ac2ad86080c20a6a4')
    res.send(user)
})

module.exports = router