const validator = require('validator')
const bcrypt = require('bcrypt')
module.exports = (sequelize, Sequelize) => {
const User = sequelize.define('User',{
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    username:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
    },
    roles:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
        defaultValue:2001
    },
    refreshToken:{
        type:Sequelize.DataTypes.STRING,
        allowNull:true,
    }
   
})
User.signup = ('signup',async(email,password,username,roles)=>{

    if(!email||!password,!username){
        throw Error('All feild must filled')
    }
    if(!validator.isEmail(email)){
        throw Error("please enter a valid email")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("please type a strong password")
    }
    const trimmedUsername = username.trim();
    if(!validator.isAlpha(trimmedUsername)){
        throw Error("username must be alpha ")
    }
    const exist = await User.findOne({where:{email}})
    if(exist){
        throw  new Error('email already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = User.create({email,password:hash,username,roles})

    return user
})

User.login =('login',async(email,password)=>{

    if(!email || !password){
        throw new Error('All feild must be filled')
    }
    const user = await User.findOne({where:{email}})
    if(!user){
        throw new Error('Incorrect email')
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw new Error('Incorrect Password')
    }

    return user

})

    return User
}