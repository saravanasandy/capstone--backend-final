const mongoose  = require('mongoose')

const flightSchema = mongoose.Schema({
     user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
     },
     Destination_From:{
        type:String,
        required: [true, 'please select From value']
    },
    Destination_To:{
        type:String,
        required: [true, 'please select To value']
    },
    Journey_Date:{
        type:String,
        required: [true, 'please select a date']
    },
    Guests:{
        type:String,
        required: [true, 'please select NO: Guest']
    },
    ClassType:{
        type:String,
        required: [true, 'please select ClassType']
    }

},
{
    timestamps: true

}
)

module.exports = mongoose.model('Flight',flightSchema)