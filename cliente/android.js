const http = require('http');
var bufferRes = [];

var opcoes = {
    hostname: 'localhost',
    port: 80,
    path: '/teste',
    method: 'post',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

//Content Type
/*
var json = {nome:'José'};//x-www-form-urlencoded
var jsonToString = JSON.stringify(json);
*/
var req = http.request(opcoes,function(res){
    res.on('data', function(pedaco){
        bufferRes.push(pedaco);
    });
    res.on('end',function(){
        var bodyRes = Buffer.concat(bufferRes).toString();
        console.log(bodyRes);
        console.log(res.statusCode);
    });
    
});
//req.write(jsonToString);
req.end();