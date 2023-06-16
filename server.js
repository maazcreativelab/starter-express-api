const express = require('express')
require('dotenv').config()
const db = require("./models");
const customerRoute = require("./routes/customer.route")
const adminRoute = require("./routes/admin.route")
const userRoutes = require("./routes/user.route")
const uploadRoutes = require("./routes/upload.route")
const verifyJWT = require('./middleware/verifyJWT');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');




if (process.env.NODE_ENV == 'local') {
    db.sequelize.sync({ force: false }).then(() => {
      console.log("Drop and re-sync db.");

    });
}
const app=express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use((req,res,next)=>{
    console.log("test middleware")
    next()
})

// enable cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
const corsOptions = {
    origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));
// app.options('*', cors());
app.use(cookieParser());


app.use('/api/user',userRoutes)
app.use('/refresh', require('./routes/refresh'));



app.use(verifyJWT);
app.use('/api/admin',adminRoute)
app.use('/api/customer',customerRoute)

app.listen(process.env.APP_PORT,'localhost',()=>{

    console.log('server started succesfully',process.env.APP_PORT)

})