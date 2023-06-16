const { transporter } = require('../config/email');
const db = require('../models/index')
const AssigndOrder = db.assignedOrders
const User = db.users
const Digitizer = db.digitizers
const Order = db.orders
const fs = require('fs');
const path = require('path');
const dirName = path.resolve(__dirname, '..')
const filePath = path.join(dirName, '/emailTemplates/assignOrder.html');
const emailTemplate = fs.readFileSync(filePath, 'utf-8');


const getAssignOrders = async (req,res)=>{
    try {
       

        
    } catch (error) {
        
    }

}

const getAssignOrder = async (req,res)=>{

    const { id } = req.params


    try {
       
        
    } catch (error) {
        
    }

}
const createAssignOrder = async (req,res)=>{

    try {
        const orderFiles = req?.files?.map((file) => ({
            filename: file.filename,
            originalname: file.originalname,
            path: file.path,
        }));

        let {design_name,order_priority,design_placement,color_preference,garment_material,dimension,instruction,digitizer_id,order_id,customerFiles} = req.body
        
        const customerFilesArr = JSON.parse(customerFiles)
        const allfiles = orderFiles.concat(customerFilesArr)
        let assignOrder= await AssigndOrder.create({design_name,order_priority,design_placement,color_preference,garment_material,dimension,instruction,digitizer_id,order_id,customerFiles,orderFiles})
        const digitizer = await Digitizer.findOne({where:{id :digitizer_id}})
        const user = await User.findOne({where:{id :digitizer.user_id}})
        const statusUpdate = await Order.update(
            { order_status :"In Progress" },
            { where: { id:order_id } }
        );
        
        let mailOptions = {
            from: 'admin@aacreativeemb.com',
            to: user.email,
            subject: order_priority,
            html: emailTemplate.replace('{{name}}', user.username,).replace('{{placement}}',design_placement,).replace('{{dimension}}',dimension).replace('{{preference}}',color_preference).replace('{{material}}',garment_material),
            attachments:allfiles.map(file=>({
                filename: file.filename,
                path:file.path,
            }))
          };
          
          transporter.sendMail(mailOptions, function (err, info) {
            
            if (err) {
                console.log("error",err)
                res.json(err);
            } else {
                res.json(info);
                console.log("info",info)
            }
          });
          res.status(200).json(assignOrder)

        
    } catch (error) {
        console.log(error)
        res.status(401).json({error:"data could not post successfullly"})
    }

}
const deleteAssignOrder = async (req,res)=>{
    try {

        
    } catch (error) {
        
    }

}

const updateAssignOrder = async (req,res)=>{
    try {

        
    } catch (error) {
        
    }

}




module.exports ={ getAssignOrders, getAssignOrder, createAssignOrder, deleteAssignOrder, updateAssignOrder }