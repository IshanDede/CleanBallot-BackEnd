const Candidate = require("../models/Candidate").Candidate;


const casteVote = async (req, res, next)=>{
    try {
        
    } catch (error) {
        error.statusCode = 400;
        next(error);
    }
    const {candId} = req.body;
    const candidate =await Candidate.findById(candId);
    if(!candidate){
        return res.send({success:false, message:"candidae no longer available"})
    }
    const isUpdate = await Candidate.updateOne({_id:candId},{ $inc: { voteCount: +1} });
    if (isUpdate.modifiedCount > 0) {
        return res.status(201).send({ success: true, message: `Vote Casted Successfully to ${candidate.name} ..!` });
    }
    res.send({success:false, message:"Coudnlt update the vote count"})
}
module.exports = {casteVote}