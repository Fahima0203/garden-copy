const express = require("express");
const app = express();
const multer = require('multer')
const bodyParser = require("body-parser")
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require('fs')
const ImageModell = require("./src/models/nodeModel")
const LoginModel = require("./src/models/loginModel")


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//connect to mongoose
mongoose.connect("mongodb+srv://rila:passpass@practice.h3rag7f.mongodb.net/plantsdb")
// mongoose.connect("mongodb+srv://fahima:fahimapassword@farilhan-garden.wtlkmzz.mongodb.net/plantsdb")

//require route
// app.use("/", require("./src/routes/noteRoute"));

//storage
const Storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
      },
    filename: function (req,file,cb)
    {
        cb(null, file.originalname) //cb(null, Date.now+file.originalname)
    },
});

const upload = multer({
    storage: Storage
})

app.post("/upload", upload.single("testImage"), (req, res) => {
    // res.send(req.file); 
    const saveImage =  ImageModell({
      plantName: req.body.plantName,
      image: req.body.image,
      desc: req.body.desc
      // image: {
      //   data: fs.readFileSync("uploads/" + req.file.filename),
      //   contentType: "image/png",
      // },
    });
    saveImage
      .save()
      .then((res) => {
        console.log("image is saved");
      })
      .catch((err) => {
        console.log(err, "error has occur");
      });
      res.send('image is saved')
  });
  

// app.post('/upload',upload.single('testImage'),(req, res,err)=>{
     
     
//             const newImage = new ImageModel({
//                 plantName: req.body.plantName,
//                 image: {
//                     data: fs.readFileSync("./uploads/",req.file.filename),
//                     contentType: "image/jpeg"
//                 }
//             })
//             newImage.save().then(()=>res.send('Successfully Uploaded')).catch(err=>console.log(err))
//         }
//     )

    app.get('/fetch',async (req,res)=>{
        const allData = await ImageModell.find()
        res.json(allData)
      })

      app.get('/fetchLogin',async (req,res)=>{
        const allData = await LoginModel.find()
        res.json(allData)
      })
    // app.get('/fetch', (req, res) => { 
    //     ImageModel.find({}, (err, items) => { 
    //         if (err) { 
    //             console.log(err); 
    //         } 
    //         else { 
    //             res.json({ items: items }); 
    //         } 
    //     }); 
    // });

  app.listen(5001, ()=>{
      console.log("Express server is running on port 5001");
  });