const User = require('./UserModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

/**
 * Implemented for insert User in to the database
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * sends response with inserted User document
 */
exports.createUser = async (req,res) =>{

    try{
        let newUser = {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password,
            userType:req.body.userType,
        }
        User.findOne({
         email: req.body.email
       })
       .then(user =>{ 
           
         if(!user){  //if entered email is not used by someone
 
             bcrypt.hash(req.body.password, 10, (err, hash) => {
                 newUser.password = hash;
                 User.create(newUser)
                   .then(user => {
                     res.json(user)
                   })
                   .catch(err => {
                     res.json({ error: err });
                   });
             });
             
         }else{ //if entered email is already exsisting
             res.status(403).json({ message: "User already registered" });
         }
 
     })
  
     }catch(err){
         res.json({ error: err });
     } 
}

/**
 * Implemented for login User in to the database
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * sends response with logged User document
 */
exports.loginUser = async(req,res)=>{

    try{
        User.findOne({
            email:req.body.email
        })
        .then(user =>{
            if(user){
                if(bcrypt.compareSync(req.body.password,user.password)){

                    
                    let payload={
                        _id:user.id,
                        firstName:user.firstName,
                        lastName:user.lastName,
                        email:user.email,
                        userType:user.userType,
                    }

                    jwt.sign(
                        payload,
                        "secretkey",  
                        { expiresIn: "100h" },
                        (err, token) => {
                          res.json(
                          { 
                          'token' : token,
                          }
                          );
                        }
                    );

                }
                else{
                    res.status(400).json({message:'Entered Password is Incorrect'})
                }
            }
            else{
                res.status(404).json({ message: "User does ot exist in the system" });
            }
        })
    }
    catch(err){
        res.json({ error: err });
    }

}

/**
 * Implemented for update a Food document in the database
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * sends response with updated Food document
 */
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message,
        });
    }
};