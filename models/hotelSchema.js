// this is the model in MVC
const mongoose = require('mongoose')
const { Schema } = mongoose;

const hotelSchema = new Schema({
  hotel_name:{
    type:String,
    required:"hotel is required ",
    max:32,
    trim:true,
  },
  hotel_desc:{
    type:String,
    required:'hotel description is required',
    trim:true
  },
  image:String,
  star_rating:{
    type:Number,
    required:'hotel rating required',
    max:5
  },
  country:{
    type:String,
    required:'country is required',
    trim:true
  },
  cost_per_night:{
    type:Number,
    required:'cost is required '
  },
  available:{

    type:Boolean,
    default: true,
    required:'availibility is required'
  }
});

module.exports = mongoose.model('hotel',hotelSchema);