const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ObjectId = require("mongoose").Types.ObjectId;
const userModel = require("../models/userModel");
let aws = require("../aws/aws");

const  signUpUser = async function(req,res){
try {

    let userDetails = req.body;
    let files = req.files;
    const profileImage = await aws.uploadFile(files[0])
    console.log(profileImage);
    let {name,age,mobile,city,email,password} = userDetails;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password,salt)
    const userData = { name,age,mobile,city,email,profileImage,password }
    let createUser = await userModel.create(userData)
    console.log(createUser)
    return res.status(201).send({status:true, message:"User Registered Successfully", data: createUser})

} catch (err) {
     return res.status(500).send({status:false, message: err})
    }
}


//     // if (userCreated) {
//     //     let transporter = nodemailer.createTransport({
//     //         service: "gmail",
//     //         auth: {
//     //             user: "aman.free00628@gmail.com",
//     //             pass: process.env.MYPASS
//     //         },
//     //     });
//     //     let info = await transporter.sendMail({
//     //         from: 'aman.free00628@gmail.com',
//     //         to: email,
//     //         subject: "Verification mail by aman kumar for testing api",
//     //         text: `Message: Please click on given link for successfull verification,
//     //                Link - http://localhost:3000/yourverification?email=${email}`,
//     //     });
//     // if (info) {
//     //     return res.status(200).send({ status: true, message: "We have sent a verification link to your given email address ,Please click on that link for succcessful registration" })
//     // }
//     return res
//       .status(201)
//       .send({ status: true, message: "Created", data: userCreated });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

const loginUser = async (req, res) => {
  try {
    const uEmail = req.body.email;
    const uMobile = req.body.mobile;
    const uPassword = req.body.password;
    let user = await userModel.findOne({ email: uEmail });
    console.log("hello", user);
    if (!user) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid Credentials" });
    }
    const { _id, name, password } = user;
    console.log(password)
    console.log(uPassword);
    const validPwd = await bcrypt.compare(uPassword,password);

    if (!validPwd) {
      return res.status(400).send({ message: "Invalid Password" });
    }
    // jwt token generation

    let payload = { userId: _id, email: uEmail, password: password };
    const tokenGenerate = jwt.sign(payload, "ToDoAppKey", {
      expiresIn: "10080m",
    });
    res.header("api-token", tokenGenerate);
    return res.status(200).send({
      status: true,
      message: name + " " + "You have Logged In Successfully!",
      data: {
        userId: user._id,
        token: tokenGenerate,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ status: false, message: err });
  }
};

const updateUser = async (req, res) => {
  try {
    const paramsId = req.query.userId;
    console.log(paramsId);
    let info = req.body;
    console.log(info);
    
    let files = req.files;
    let profileImage;
    if(files[0]){
        profileImage = await aws.uploadFile(files[0])
    }
    let {name,age,mobile,city,email,password} = info;
    if(password){
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password,salt)
    }

    let profileUpdated = await userModel.findOneAndUpdate({_id: paramsId}, {profileImage: profileImage, name: name, mobile: mobile, city: city, email: email, password: password, age: age})
    return res.status(200).send({status: true, message: "User Profile Updated Successfully", data: profileUpdated})

  } catch (err) {
      return res.status(500).send({status: true, message:err})
  }
};

module.exports.signUpUser = signUpUser;
module.exports.loginUser = loginUser;
module.exports.updateUser = updateUser;
