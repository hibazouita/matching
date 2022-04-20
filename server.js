const express = require('express');
const multer=require('multer')
let {PythonShell}=require("python-shell")
const cors=require('cors');
var path = require('path');
var app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storage })
var uploadMultiple = upload.fields([{ name: 'file1' }, { name: 'file2'}])
app.post('/uploadfile', uploadMultiple, function (req, res, next) {

  if(req.files){
      name1=req.files['file1'][0]['filename'];
      path1=`${__dirname}/public/uploads/${name1}`
      name2=req.files['file2'][0]['filename'];
      path2=`${__dirname}/public/uploads/${name2}`
      let options ={
        args :[path1,path2,name1,name2],
        scriptPath:"C:/Users/Hiba Zouita/app-matching/scriptPython"
        
         //scriptPath : "C:/Users/Hiba Zouita/projetpfe/back-end/routes",  
      };
      PythonShell.run("scriptpython.py",options,function(err2,res2){
        if (res2){
          res.send(JSON.stringify(res2));

          res.json({"filePath1":res2[0],"filePath2":res2[1]})
          print("doneeee scripttttt")
        } 
        if (err2) console.log("ereurr script",err2);
       })
      
  }
  else{
    console.log("errrrrr")
  }
  next();

  console.log("doneeeeeeee")
  
})

app.listen(5000, () => console.log('Server Started...'));