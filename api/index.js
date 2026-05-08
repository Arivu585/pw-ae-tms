const express = require("express");
const app = express();
const path = require("path");
const controllers = require(path.join(__dirname,'controllers','controller'));
const cors = require("cors");
const bodyParser =require("body-parser");
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin:"*"}));
app.use("/public",express.static(path.join(__dirname,"public")));

const TokenAuth = (req,res,next)=>{

  const authString = req.headers.authorization;
  if(!authString){
    res.status(401).send("Need Authentication");
  }
  
  console.log(authString);

  const [authType,authToken] = authString.split(" ");

  if(authType!='Bearer'){
    res.status(401).send("Need Bearer Authentication");
  }

  try{
    const user = jwt.verify(authToken,process.env.JWT_SECRET);
    console.log(user);
    next();
  }catch(err){
    res.status(401).send("Invalid Token | Token Expired");
  }
}

//---------------------------------------------------------------------------------

//Admin Login Start
app.post("/adminLogin", controllers.adminLogin);
//Admin Login End

//---------------------------------------------------------------------------------

//Packages Start
app.get("/packages", TokenAuth, controllers.showAllPackages);
app.get("/packagesLimit/:limit", TokenAuth, controllers.showLimitPackages);
app.get("/packages/:id", TokenAuth, controllers.showSinglePackage);
app.post("/packages", TokenAuth, controllers.addPackage);
app.put("/packages/:id", TokenAuth, controllers.editPackage);
app.delete("/packages/:id", TokenAuth, controllers.deletePackage);
//Packages End

//---------------------------------------------------------------------------------

//Pages Start
app.get("/pages", TokenAuth, controllers.showAllPages);
app.get("/pages/:id", TokenAuth, controllers.showSinglePage);
app.get("/pagesType/:type", TokenAuth, controllers.showPageType);
app.post("/pages", TokenAuth, controllers.addPage);
app.put("/pages/:id", TokenAuth, controllers.editPage);
app.delete("/pages/:id", TokenAuth, controllers.deletePage);
//Pages End

//---------------------------------------------------------------------------------

//User Login Start
app.post("/userLogin", controllers.userLogin);
//User Login End

//---------------------------------------------------------------------------------

//User register Start
app.post("/user", controllers.addUser);
app.get("/user", TokenAuth, controllers.showAllUsers);
app.get("/user/:id", TokenAuth, controllers.showSingleUser);
app.put("/user/:id", TokenAuth, controllers.editUser);
app.delete("/user/:id", TokenAuth, controllers.deleteUser);
//User register End

//---------------------------------------------------------------------------------

//Booking Start
app.post("/booking", TokenAuth, controllers.addBooking);
app.get("/booking", TokenAuth, controllers.showAllBookings);
app.get("/booking/:id", TokenAuth, controllers.showSingleBooking);
app.put("/booking/:id", TokenAuth, controllers.editBooking);
app.delete("/booking/:id", TokenAuth, controllers.deleteBooking);
//Booking End

//---------------------------------------------------------------------------------

//Enquiry Start
app.post("/enquiry", TokenAuth, controllers.addEnquiry);
app.get("/enquiry", TokenAuth, controllers.showAllEnquiry);
app.get("/enquiry/:id", TokenAuth, controllers.showSingleEnquiry);
app.put("/enquiry/:id", TokenAuth, controllers.editEnquiry);
app.delete("/enquiry/:id", TokenAuth, controllers.deleteEnquiry);
//Enquiry End

//---------------------------------------------------------------------------------

const PORT = 5000;
app.listen(5000, () => console.log(`Server start on ${PORT}`));