const { transporter } = require('../config/email');
const db = require('../models/index')
const User = db.users
const Order = db.orders
const Customer = db.customers
const fs = require('fs');
const path = require('path');
const dirName = path.resolve(__dirname, '..')
const filePath = path.join(dirName, '/emailTemplates/orderplacement.html');
const emailTemplate = fs.readFileSync(filePath, 'utf-8');



// get All order

const getCustomerOrders = async (req, res) => {

    try {
        const customer = await Customer.findOne({where:{user_id:req.id}})
        const orders = await Order.findAll({where:{customer_id:customer.id}})
       
        
        res.status(200).json(orders)
        
    

    } catch (error) {
        console.log('error')
        res.status(401)
    }


}

// get single order
const getCustomerOrder = async (req, res) => {

    // const { id } = req.params
    // console.log(id)
    try {
        // const workout = await  Workout.findOne({ where: { id }})
        // res.status(200).json(workout)
        res.status(200).json([])

    } catch (error) {
        console.log(error)
    }
    console.log('inside get single')

}

// post a new order
const createCustomerOrder = async (req, res) => {
    
    try {
      
        const orderFiles = req?.files?.map((file) => ({
            filename: file.filename,
            originalname: file.originalname,
            path: file.path,
          }));

        const user = await User.findOne({where:{id:req.id}})

        const customer = await Customer.findOne({where:{user_id:req.id}})
      
        const order = await Order.create({...req.body,orderFiles:orderFiles,customer_id:customer.id})

        console.log(order)
        let mailOptions = {
            from: 'admin@aacreativeemb.com',
            to: user.email,
            subject: `Congratulations Your order is successfully processed`,
            html: emailTemplate.replace('{{name}}', user.username,).replace('{{date}}',order.createdAt,).replace('{{priority}}',order.order_priority).replace('{{type}}',order.order_type).replace('{{designName}}',order.design_name).replace('{{status}}',order.order_status),
            attachments:order.orderFiles.map(file=>({
                filename: file.filename,
                path:file.path,
            }))
          };
          
          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              res.json(err);
            } else {
              res.json(info);
            }
          });
        console.log(order.orderFiles.map(file=>({
          filename: file.filename,
          path:file.path,
      })))

        res.status(200).json(order)



    } catch (error) {
        console.log(error)
    }
}

// delete existing order
const deleteCustomerOrder = async (req, res) => {
    // const { id } = req.params
    try {

        // const workout = Workout.destroy({ where: { id } });
        // res.status(200).json(workout)

    } catch (error) {

    }
    console.log('inside delete single')
}

// update order
const updateCustomerOrder = async (req, res) => {

    // const { id } = req.params
    try {
        // const workout = await Workout.findOne({where:{id}}).update({...req.body}).save()
        // Workout.update(req.body

        //     , {
        //         where: {
        //             id
        //         }
        //     }).then(function (rowsUpdated) {
        //         console.log('rowsUpdated'); // 1 (affected row) 
        //         res.status(200).json(rowsUpdated)
        //     });

        // let rowUpdated = await Workout.update(req.body,{where:{id}})
        // res.status(200).json(rowUpdated)


    } catch (error) {
        console.log(error)
    }

    console.log('inside update single')
}

module.exports = { getCustomerOrders, getCustomerOrder, createCustomerOrder, deleteCustomerOrder, updateCustomerOrder }