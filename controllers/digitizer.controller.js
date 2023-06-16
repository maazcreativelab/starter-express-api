const ROLES_LIST = require('../config/roles_list')
const db = require('../models/index')
const Digitizer = db.digitizers
const User = db.users



const getDigitizers = async (req,res)=>{
    try {
        const digitizers = await Digitizer.findAll()
        res.status(200).json(digitizers)
        
    } catch (error) {
        res.status(401)
    }

}
const getDigitizer = async (req,res)=>{
    console.log("indside digitizer")
    const { id } = req.params;

    try {
      const digitizer = await Digitizer.findOne({ where: { id } ,include:User});
      console.log(digitizer)
    //   const user = await User.findOne({ where: { id:digitizer.user_id } });
    //   const data={...digitizer,...user}
      res.status(200).json(digitizer);
    } catch (error) {
        res.status(400).json({error})
    }

}

const createDigitizer = async (req,res)=>{
    console.log("first")
    const {email, password,username,salary,commissionType,commission,contactDetails,smsNumber,dateOfJoining,salaryCurrency} = req.body
    try {
        let roles =ROLES_LIST.Digitizer
        const user = await User.signup(email, password,username,roles)  
        console.log(user)
        const digitizer = await Digitizer.create({username,salary,commissionType,commission,contactDetails,smsNumber,dateOfJoining,salaryCurrency,user_id:user.id})
        console.log(digitizer)
        return res.status(200).json({digitizer})

    } catch (error) {
        console.log(error)
    }
}
const deleteDigitizer = async (req,res)=>{
    try {

        
    } catch (error) {
        
    }

}

const updateDigitizer = async (req,res)=>{
    try {

        
    } catch (error) {
        
    }

}

module.exports= { getDigitizers, getDigitizer, createDigitizer, deleteDigitizer, updateDigitizer }