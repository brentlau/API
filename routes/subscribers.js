const express = require('express')
const router = express.Router()

//imports the subscriber model and schema
const Subscriber = require('../models/subscriber')

//Get all use slash
router.get('/', async (req, res) => {
    try{
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Get one
//colon makes it a parameter e.g.(:id - req.params.id would give the id parameter)
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})

//Create one (post)
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({

        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel

    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    }
        catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Update one (put, patch)
//patch only updates info that gets passed instead of whole record
router.patch('/:id', getSubscriber, async(req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    }
    catch (err) {
        res.status(400).json({ message: err.message})
    }
})

//Delete one
router.delete('/:id', getSubscriber, async(req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: 'Subscriber deleted!'})
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }

})

//middleware
async function getSubscriber(req, res, next){
let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null){
        //return exits function if no subscriber
        return res.status(404).json({ message: 'Cannot find subscriber'})
    }
}
catch (err) {
    return res.status(500).json({ message: error.message})
}

res.subscriber = subscriber
next()
}
module.exports = router