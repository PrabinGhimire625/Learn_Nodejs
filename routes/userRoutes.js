const express = require("express");
const router = express.Router();
const user = require("./../models/user"); //export user schema

//endpoint where client sends data and data needs to be saved in database
// post route to add a user
router.post("/", async (req, res) => {
  try {
    const data = req.body; //body parser convert data into javascript obj and store in req.body (user data came on req.body )
    const newuser = new user(data); //Create a new user document/row using the Mongoose model
    const response = await newuser.save(); //save the new user to the database

    console.log("Data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get method to get the data from the database and display
router.get("/", async (req, res) => {
  try {
    const data = await user.find(); //find all record of user table/collection and give
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get method of the user/:Web developer (Use for searching the data having the diff worktype and display)
router.get("/:workType", async (req, res) => {
  // workType is local variable
  try {
    const workType = req.params.workType; // fetch work type using params
    if (
      workType == "Web developer" ||
      workType == "Designer" ||
      workType == "App developer"
    ) {
      const response = await user.find({ work: workType }); // find work field/column in the find table/collection and give all data
      console.log("Data is successfully fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Work type is not defined" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//updates the user details
router.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id; //extract the id from url parameter
    const updateUserData = req.body; // data which we going update
    const response = await user.findByIdAndUpdate(userId, updateUserData, {
      new: true, //return the updated document/row
      runValidators: true, //run mongoose validation
    });
    //if that id data is not available
    if (!response) {
      return res.status(404).json({ error: "User not found!" });
    }

    console.log("User data is successfully updated!");
    res.status(500).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


//delete the user
router.delete('/:id',async (req,res)=>{
    try{
        const userId=req.params.id;
        const response= await user.findByIdAndDelete (userId);
        if(!response){
            return res.status(404).json({error : "Person not found"})
        }
        console.log('Data delete');
        res.status(200).json({message: 'Person delete successfully'})

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"})

    }

})

module.exports = router; //export to the server.js file
