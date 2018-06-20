var express=require("express");
var multer  = require("multer");
var app = express();
var done = false;

app.use(multer({ dest: "./uploads/",
  rename: function (fieldname, filename) {
    return filename+Date.now();
  },
  onFileUploadStart: function (file) {
    /* eslint-disable no-alert, no-console */
    console.log(file.originalname + " is starting ...");
    /* eslint-enable no-alert, no-console */

  },
  onFileUploadComplete: function (file) {
    /* eslint-disable no-alert, no-console */
    console.log(file.fieldname + " uploaded to  " + file.path);
    /* eslint-enable no-alert, no-console */

    done=true;
  }
}));

app.get("/",function(req,res){
  res.sendfile("index.html");
});

app.post("/api/photo",function(req,res){
  if(done==true){
    /* eslint-disable no-alert, no-console */
    console.log(req.files);
    /* eslint-enable no-alert, no-console */
    res.end("File uploaded.");
  }
});

app.listen(3000,function(){
  /* eslint-disable no-alert, no-console */
  console.log("Working on port 3000");
  /* eslint-enable no-alert, no-console */
});
