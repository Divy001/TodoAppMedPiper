const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try {
        let token = req.headers['api-token'];
        if(!token){
            return res.status(400).send({ status: false, message: 'You are logged Out ..Please login to Proceed' });
        }
        let decodedJwtToken = jwt.verify(token, "ToDoAppKey")
        if(decodedJwtToken){
            req.userId = decodedJwtToken.userId
            next();
        } else {
            return res.status(400).send({ status: false, message: 'Invalid Token... Please Provide Valid Token'})
        }

    } catch (err) {
        return res.status(500).send({status: false, message: err.message});
    }
}
module.exports = {authenticate}