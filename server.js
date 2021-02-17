const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');


//Import routes
const UserRoute = require('./Services/Users/UserRoutes');


//middlewear
const app = express();


//body parser middlewwear
app.use(bodyParser.json());
app.use(cors());



//get the mongodb url
const db = require("./config/keys").mongoURI;

//Connet to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("Mongo DB Connected."))
  .catch(err => console.log(err));



//get routes from controllers
app.use("/api/users",UserRoute);



//Serve static assets if you are in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}



const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server started on ${PORT}`));