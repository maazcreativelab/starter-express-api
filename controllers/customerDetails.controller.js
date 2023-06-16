const db = require('../models/index')
const Customer = db.customers

// get All order
const getCustomerDetail = async (req, res) => {

    try {
        const customer = await Customer.findOne({where:{user_id:req.id}})
        res.status(200).json(customer)

    } catch (error) {
        console.log('error')
        res.status(401)
    }


}


// update order
const updateCustomerDetail = async (req, res) => {
    console.log("inside")
    const { id } = req.params
    console.log("customer edit id",id)
    console.log("customer edit",req.body)
    try {
        let rowUpdated = await Customer.update(req.body,{where:{id:id}})
        console.log("finally")
        res.status(200).json(rowUpdated)


    } catch (error) {
        console.log(error)
    }

   
}

module.exports = { getCustomerDetail, updateCustomerDetail }