const express = require('express')
const colors = require('colors')
const cors = require("cors");
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 8000

connectDB()

const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.urlencoded({extended: false}))

app.use('/api/flights',require('./routes/flightRoutes'))
app.use('/api/users',require('./routes/userRoutes'))

app.use(errorHandler)
app.listen(port, ()=>console.log(`Server started on port ${port}`))