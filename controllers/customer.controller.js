const db = require('../models/index')
const Customer = db.customers

// get All customers
const getCustomers = async (req, res) => {

    try {
        const customer = await Customer.findAll()
        res.status(200).json(customer)

    } catch (error) {
        console.log('error')
        res.status(401)
    }


}
const getCustomer = async (req, res) => {

    try {
        
        res.status(200).json({})

    } catch (error) {
       
        res.status(401)
    }


}
const createCustomer = async (req, res) => {

    try {
        
        res.status(200).json({})

    } catch (error) {
       
        res.status(401)
    }


}
const deleteCustomer = async (req, res) => {

    try {
        
        res.status(200).json({})

    } catch (error) {
       
        res.status(401)
    }


}
const updateCustomer = async (req, res) => {

    try {
        
        res.status(200).json({})

    } catch (error) {
       
        res.status(401)
    }


}





module.exports={ getCustomers,getCustomer,createCustomer,deleteCustomer, updateCustomer }