const asyncHandler = require('express-async-handler')

const Flight = require('../models/flightModel')


// @desc Get flights
// @route Get/api/flights
// access private
const getFlights = asyncHandler(async(req,res)=>{
    const flights = await Flight.find({user:req.user.id})
    res.status(200).json(flights)

})

// @desc set flight
// @route Post/api/flight
// access private
const setFlight = asyncHandler(async(req,res)=>{
    if (!req.body.Destination_From && !req.body.Destination_To && !req.body.Journey_Date && !req.body.Guests && !req.body.ClassType) {
        res.status(400)
        throw new Error('please add a given field')
    }

     const flight = await Flight.create({
        Destination_From: req.body.Destination_From,
        Destination_To: req.body.Destination_To,
        Journey_Date: req.body.Journey_Date,
        Guests: req.body.Guests,
        ClassType: req.body.ClassType,
       user: req.user.id
     })

    res.status(200).json(flight)

})

// @desc Update Flight
// @route PUT/api/flights/:id
// access private
const updateFlight = asyncHandler(async(req,res)=>{

    const flight = await Flight.findById(req.params.id)

    if(!flight){
        res.status(400)
        throw new Error('Flight not found')
    }

    // const user = await User.findById(req.user.id)
     
    //  Check for user
    if(!req.user){
      res.status(401)
      throw new Error('User not found')
    }
      
    // make sure the logged in  user matches the goal user
    if(flight.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedFlight)


})

// @desc Delete Flight
// @route Delete/api/flights/:id
// access private
const deleteFlight = asyncHandler(async(req,res)=>{
    const flight = await Flight.findById(req.params.id)
     
    if(!flight){
        res.status(400)
        throw new Error('Flight not found')
    }

    // const user = await User.findById(req.user.id)
     
    //  Check for user
    if(!req.user){
      res.status(401)
      throw new Error('User not found')
    }
      
    // make sure the logged in  user matches the goal user
    if(flight.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }  

    await flight.deleteOne()

    res.status(200).json({id: req.params.id});

})

module.exports = {
    getFlights,
    setFlight,
    updateFlight,
    deleteFlight
}