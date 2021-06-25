const mongoose=require('mongoose');

const artistSchema=new mongoose.Schema({
    artistid:{
        type:Number,
        unique:true    
    },
    first_name:String,
    last_name:String,
    wiki_url:String,
    profile_url:String,
    movies:Array
})

const Artist=mongoose.model('Artist',artistSchema);
module.exports=Artist;