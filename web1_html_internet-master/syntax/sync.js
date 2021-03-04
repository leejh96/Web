var fs = require('fs');

//동기식 방법
// console.log('A');
// var result = fs. readFileSync('syntax/sample.txt','utf8');
// console.log(result);
// console.log('C')


//비동기식 방법
console.log('A');
fs. readFile('syntax/sample.txt','utf8', /*콜백함수: 첫번째 인자로 준 sample.txt를 읽고 후에 이 함수를 실행*/function(err, result){
    console.log(result);
});
console.log('C')