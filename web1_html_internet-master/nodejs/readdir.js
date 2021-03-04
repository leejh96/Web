//파일의 목록을 배열로 만드는 함수
var testFolder = './data';
var fs = require('fs');

fs. readdir(testFolder, function(error, filelist){
    console.log(filelist);
})