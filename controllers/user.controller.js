const { transporter } = require('../config/email');
const ROLES_LIST = require('../config/roles_list');
const db = require('../models');
const User = db.users
const Customer = db.customers
const jwt = require('jsonwebtoken')
const fs = require('fs');
const path = require('path');
const dirName = path.resolve(__dirname, '..')
const filePath = path.join(dirName, '/emailTemplates/registration.html');
const emailTemplate = fs.readFileSync(filePath, 'utf-8');

const createAccessToken = (id,roles)=>{
    // JWT.sign() takes three arguments: the payload, a secret key, and an options object.
    // return jwt.sign({id:id}, process.env.SECRET, { expiresIn: '3d' })
    return accessToken = jwt.sign(
      {id,roles },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15s' }
    );
} 
const createRefreshToken = (id)=>{
    // JWT.sign() takes three arguments: the payload, a secret key, and an options object.
    // return jwt.sign({id:id}, process.env.SECRET, { expiresIn: '3d' })
    return accessToken = jwt.sign(
      { id: id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
} 
// login a user
const loginUser = async (req, res) => {
    const {email, password} = req.body
  
    try {
      const user = await User.login(email, password)
   
      // create a token
      const accessToken  = createAccessToken (user.id,user.roles)
      const refreshToken  = createRefreshToken (user.id)
      
      User.update({refreshToken},{
        where:{
          id:user.id
        }
      })
     
      res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
      res.status(200).json({email,accessToken,roles:user.roles,username:user.username})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  
  // signup a user
  const signupUser = async (req, res) => {
    // console.log(req.body)
    const {email,password,username,currencyType} = req.body
    let roles=ROLES_LIST.Customer
    try {
      const user = await User.signup(email, password,username,roles)  
      // create a token
      // const token = createToken(user.id)

      const accessToken  = createAccessToken (user.id,user.roles)
      const refreshToken  = createRefreshToken (user.id)
      
      User.update({refreshToken},{
        where:{
          id:user.id
        }
      })
      //  
      await Customer.create({customer_name:username,user_id:user.id,currencyType})

      const mailOptions = {
        from: 'admin@aacreativeemb.com',
        to: email,
        subject: 'Welcome to AAcretiveEmb.com',
        html: emailTemplate.replace('{{name}}', username,).replace('{{email}}',email,).replace('{{password}}',password)
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
      res.status(200).json({email, accessToken ,roles:user.roles,username})
    } catch (error) {
      console.log(error.message)
      res.status(400).json({error: error.message})
    }
  }
  



module.exports = { signupUser, loginUser }