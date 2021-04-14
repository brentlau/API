//imports .env variables
require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

//gets config from env file
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
//if db error, display error
db.on('error', (error) => console.error(error))
//run once on open
db.once('open', () => console.log('Connected to Database'))

//set up server to accept json
app.use(express.json())

const subscribersRouter = require('./routes/subscribers')

//any URL that is /subscribers goes to the subscriber route
app.use('/subscribers', subscribersRouter)

//port for localhost
app.listen(3000, () => console.log('Server Started'))