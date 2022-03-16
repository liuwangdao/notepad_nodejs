var express = require('express');
var router = express.Router();

//接口程序
router.get("/", function(req, res, next) {
    console.log(req.query.value); //get param 
    writeMyData(req.query.value);
    // writeMyData(req.query.value.toString());
    // var data = "send to client"
    // res.send(data);
    res.end();
})


//写入文件
function writeMyData(textWrite) {
    var fs = require("fs");
    var myDate = new Date();
    var mytime = myDate.toLocaleTimeString();
    fs.appendFile('./msg.txt', "\n" + myDate + " " + mytime + "\n", (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });

    fs.appendFile('./msg.txt', textWrite, (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
    });
}

// /* GET /1 */
// router.get('/', function(req, res, next) {
//     res.send('1');
// });

module.exports = router;