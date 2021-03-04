var fs = require('fs')//파일시스템 모듈 사용가능
fs.readFile('sample.txt', 'utf8', function(err, data){
    console.log(data)
});