const express = require("express");
const path = require("path")
const cookieParser = require("cookie-parser")
const { connectToMongoDB } = require("./connect")
const {restrictToLoggedinUserOnly, checkAuth} = require('./middleware/auth')
const URL = require('./models/url');
// const { url } = require("inspector");

const urlRoute = require('./routes/url')
const staticRouter  = require("./routes/staticRouter")
const userRoute = require("./routes/user")
const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/short-url').then(() => console.log("MONGODB CONNECTED"))


app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());



// app.get("/test", async (req, res) => {
//     const allurl = await URL.find({})
//     return res.render("home",{
//         url:allurl,
//     });
// });

app.use("/url",restrictToLoggedinUserOnly , urlRoute)
app.use("/user", userRoute)
app.use("/",checkAuth,staticRouter)

app.get('/url/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory:{
                timestamp: Date.now(),
            }
        }
    })
    res.redirect(entry.redirectURL)
})

app.listen(PORT,()=>console.log(`server started at PORT: ${ PORT }`))