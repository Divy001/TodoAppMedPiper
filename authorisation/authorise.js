const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const authorisation = async (req, res, next) => {
    try {
        let userAuth = req.query.userId;
        if(!(req.userId == userAuth)){
            return res.status(400).send({ status:false, message: "You are not authorised to Perform this Task"});
        }
        next();
    } catch (err) {
        return res.status(500).send({status:false, message:err.message});
    }
}

module.exports = {authorisation}
