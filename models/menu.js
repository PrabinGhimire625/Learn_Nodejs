const mongoose=require('mongoose')
const menuSchema=new mongoose.Schema({
    name : {type: String, require: true},
    price : {type : Number, require: true},
    taste :{type: String, enum:['sweet','spicy','sour'], require: true}, 
    ingredients:{type: [String], default:[]},
    num_sales: {type:Number,default:0}
})
const menu= mongoose.model('menu', menuSchema);

//export the model
module.exports=menu
