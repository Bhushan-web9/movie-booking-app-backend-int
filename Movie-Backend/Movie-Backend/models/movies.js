const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema

const moviesSchema=new mongoose.Schema({
    movieid:{
        type:Number,
        unique:true
    },
    title:String,
    published:Boolean,
    released:Boolean,
    poster_url:String,
    release_date:String,
    publish_date:String,
    artists:[],
    genres:[],
    duration:Number,
    critic_rating:Number,
    trailer_url:String,
    wiki_url:String,
    story_line:String,
    shows:Array
})

const Movie=mongoose.model('Movie',moviesSchema);
module.exports=Movie