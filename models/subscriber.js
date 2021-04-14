const mongoose = require('mongoose')

//keys for all properties of subscriber (model)
const subscriberSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    subscribedToChannel: {
        type: String,
        required: true
    },
    subscribeDate:{
        type: Date,
        required: true,
        default: Date.now
    }

})

//export so can be imported into routes
module.exports = mongoose.model('Subscriber', subscriberSchema)