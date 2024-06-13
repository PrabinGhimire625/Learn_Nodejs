const express=require('express');
const router=express.Router()
const menu=require('./../models/menu')

//post route for the menu
router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const newMenu = new menu(data);
      const response = await newMenu.save();
      console.log("Data saved");
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  //get route for menu
  router.get("/", async (req, res) => {
    try {
      const data = await menu.find();
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get("/:testType",async (req, res)=>{
    try{
        const testType=req.params.testType;
        if (testType=='sweet'|| testType=='spicy'|| testType=='sour'){
            const response= await menu.find({taste:testType})
            console.log("Successfully saved the data!")
            res.status(200).json(response)

        }else{
            res.status(404).json({error:"test type is not defined"})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"})
    }
  })

  module.exports=router //export to the server.js file
