const { transporter } = require("../config/email");
const db = require("../models/index");
const User = db.users;
const Order = db.orders;
const Customer = db.customers;
const fs = require("fs");
const path = require("path");
const dirName = path.resolve(__dirname, "..");
const filePath = path.join(dirName, "/emailTemplates/orderplacement.html");
const emailTemplate = fs.readFileSync(filePath, "utf-8");
const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {}
};

const getOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOne({ where: { id } });
    res.status(200).json(order);
  } catch (error) {}
};
const createOrder = async (req, res) => {
  try {
    const orderFiles = req?.files?.map((file) => ({
      filename: file.filename,
      originalname: file.originalname,
      path: file.path,
    }));
    const { customer_id } = req.body;

    const customer = await Customer.findOne({ where: { id: customer_id } });
    const user = await User.findOne({ where: { id: customer.user_id } });

    const order = await Order.create({ ...req.body, orderFiles: orderFiles });

    console.log(order);
    let mailOptions = {
      from: "admin@aacreativeemb.com",
      to: user.email,
      subject: `Congratulations Your order is successfully processed`,
      html: emailTemplate
        .replace("{{name}}", user.username)
        .replace("{{date}}", order.createdAt)
        .replace("{{priority}}", order.order_priority)
        .replace("{{type}}", order.order_type)
        .replace("{{designName}}", order.design_name)
        .replace("{{status}}", order.order_status),
      attachments: order.orderFiles.map((file) => ({
        filename: file.filename,
        path: file.path,
      })),
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log(info);
        res.json(info);
      }
    });
    console.log(
      order.orderFiles.map((file) => ({
        filename: file.filename,
        path: file.path,
      }))
    );

    res.status(200).json(order);
  } catch (error) {
    console.log("error",error)
    res.status(401).json(error);
  }
};
const deleteOrder = async (req, res) => {
  try {
  } catch (error) {}
};

const updateOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const orderFiles = req?.files?.map((file) => ({
      filename: file.filename,
      originalname: file.originalname,
      path: file.path,
    }));

    const order = await Order.findOne({ where: { id } });
    const allfiles = orderFiles.concat(order.orderFiles);
    let rowUpdated = await Order.update(
      { ...req.body, orderFiles: allfiles },
      { where: { id } }
    );
    res.status(200).json(rowUpdated);
  } catch (error) {
    res.status(401).json({ error });
  }
};
const getPendingOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({where : {order_status:"pending"}});
    res.status(200).json(orders);
  } catch (error) {}
};
module.exports = { getOrders, getOrder, createOrder, deleteOrder, updateOrder,getPendingOrders };
