const express = require('express')

const bodyParser = require('body-parser')

var path = require("path")

const fs = require('fs')

const app = express()

app.set('view engine',"ejs")

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res) => {
    res.render("index")
})

app.post('/downloadfile',(req,res) => {

    var text = req.body.text
    var extension = req.body.extension

    var path = Date.now() + "test." + extension;

    console.log(text)
    console.log(extension)

    fs.writeFileSync(path,text)

    console.log("file created successfully")

    res.json({
        path:path
    })

})

app.get("/download", (req, res) => {
    var pathoutput = req.query.path;
    console.log(pathoutput);
    var fullpath = path.join(__dirname, pathoutput);
    res.download(fullpath, (err) => {
      if (err) {
        fs.unlinkSync(fullpath);
        res.send(err);
      }
      fs.unlinkSync(fullpath);
    });
  });

app.listen(5000,() => {
    console.log("App is listening on port 5000")
})