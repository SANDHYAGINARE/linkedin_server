const express=require('express');
const port=process.env.PORT||3001;
const passport = require('passport');
require('dotenv').config()
const session=require('express-session');
const strat=require('./auth/passport-linkedin')
const app=express()


app.use(session({
    secret: "ihsxujghjdxsbxhj",
    resave: false,
    saveUninitialized: true
})
);
app.use(passport.initialize());
app.use(passport.session());
app.get('/',(req,res)=>{
    if (req.user) {
        const name = req.user.name.givenName;
        const family = req.user.name.familyName;
        const photo = req.user.photos[0].value;
        const email = req.user.emails[0].value;
    res.send(`<center style="font-size:160%"><p>This is Home Page </p>
    <p>User is not Logged In</p>
    <img style="cursor:pointer;"  onclick="window.location='/auth/linkedin'" src="http://www.bkpandey.com/wp-content/uploads/2017/09/linkedinlogin.png"/>
    </center>
    `);
    }
})

app.use('/auth',require('./routes/linkedin'))
app.listen(port,()=>{
    console.log("Listening at "+port);
})


// https://www.linkedin.com/developers/apps/verification/7f1a5e2d-d303-4efa-bdb7-0decabc467a9