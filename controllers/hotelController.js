// import the schemas 
const Hotel = require('../models/hotelSchema.js');

// this file is a series of functions 

// GET REQ
// exports.homePage=(req,res)=>{
//   res.render('index', { title: "Let's Travel" });
// };

exports.listOfHotels= async(req,res,next)=>{
  try{
    const allHotels = await Hotel.find({available:{$eq:true}});
    res.render('all_hotels',{title:"All Hotels", allHotels});
  }catch(error){
    next(error);
  }

};
exports.listAllCountries = async (req,res,next)=>{
  try{
    const allCountries = await Hotel.distinct("country");
    res.render('all_countries',{title:"Brows By country", allCountries});
  }
  catch(error){
    next(error);
  }
};

exports.homePageFilters = async (req,res,next)=>{
try{
  const hotels = await Hotel.aggregate([
    {$match:{ available:true}},
    {$sample:{size:9}},
    

  ]);

  const countries = await Hotel.aggregate([
    {$group:{_id:'$country'}},
    {$sample:{size:9}}
  ]);

  res.render('index',{countries,hotels})

}
catch(error){
  next(error);
}

}


// register routes

exports.signUp=(req,res,next)=>{
  //signUp
  console.log("signing up...")
  next();
}
exports.logIn=(req,res)=>{
  //login
  console.log("logging you in")


}

// admin routes
exports.adminPage = (req,res)=>{
  res.render('admin',{title:'Admin'});
};
exports.createHotelGet = (req,res)=>{
  res.render('add_hotel',{title:'Add new Hotel'});
};
exports.editRemoveHotelGet = (req,res)=>{
  res.render('edit_remove_hotel',{title:'Edit Hotel'});
};
exports.hotelUpdateGet = async (req,res,next)=>{
  try{
    const hotel = await Hotel.findOne({_id:req.params.hotelId});
    res.render('add_hotel',{title:'Update hotel', hotel});

  }
  catch(error){
    next(error);
  }
};

exports.hotelDeleteGet = async(req,res,next)=>{
  try{
    const hotel = await Hotel.findOne({_id:req.params.hotelId});
    res.render('add_hotel',{title:'delete Hotel', hotel});
  }
  catch(error){
    next(error);

  }
}

exports.hotelDetail = async (req,res, next)=>{
  try{
    const hotelParam = req.params.hotel;
    const hotelData =await Hotel.find({_id:hotelParam});
    res.render('hotel_detail',{title:'lets travel ', hotelData});
    
  }
  catch(error){
    next(error);
  }
}
 







// post req

exports.createHotelPost = async (req,res,next)=>{
  try{
    const hotel =await new Hotel(req.body);
    hotel.save();
    res.render('admin_success',{title:'success', action:'successful add', hotelID:`${hotel._id}`});

  
  }
  catch(error){
    next(error);

  }
  
};

exports.editRemoveHotelPost =  async(req,res,next)=>{
  try{
    const hotelId = req.body.hotel_id || null;
    const hotelName = req.body.hotel_name || null;
    const hotelData = await Hotel.find({$or:[
      {_id:hotelId},
      {hotel_name:hotelName}
    ]}).collation({
      locale:'en',
      strength:2
    });
    if(hotelData.length > 0){
  res.render('hotel_detail',{title:'Add / Remove Hotel', hotelData});
      
    }
    else{
      res.redirect('/admin/edit-remove');
    }

  }
  catch(error){
    next(error);
  }
  
};

exports.hotelUpdatePost = async (req,res,next)=>{
  try{
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findByIdAndUpdate(hotelId, req.body,{new:true});
    console.log("hello");
    res.redirect(`/all/${hotelId}`);
  }
  catch(error){
    next(error);
  }
}
exports.hotelDeletePost = async(req,res,next)=>{
  try{
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findByIdAndRemove({_id:hotelId});
    res.redirect('/');
  }
  catch(error){
    next(error);

  }
}
