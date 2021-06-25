const mongoose=require('mongoose');

const genereSchema=new mongoose.Schema({
    genreid:{
        type:Number,
        unique: true,
    },
    genre:{
        type:String
    }
})

const Genre=mongoose.model('Genre',genereSchema)
module.exports=Genre;