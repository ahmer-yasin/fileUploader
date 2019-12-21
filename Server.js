var express = require("express");
var multer = require('multer');
var app = express();
var done = false;

app.use(multer({
  dest: './uploads/',
  rename: function (fieldname, filename) {
    return filename + Date.now();
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
    done = true;
  }
}));

app.get('/', function (req, res) {
  res.sendfile("index.html");
});

app.post('/api/photo', function (req, res) {
  if (done == true) {
    console.log(req.files);
    res.send({ file: req.files });
  }
});
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Working on port 3000");
});
