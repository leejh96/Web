var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');//모듈생성
var path = require('path');//입력 보안
var sanitizeHtml = require('sanitize-html');//스크립트 태그를 넣는걸 방지
// var template = {
//   HTML: function(title, list, body, control){
//     return `<!doctype html>
//            <html>
//            <head>
//              <title>WEB - ${title}</title>
//              <meta charset="utf-8">
//            </head>
//            <body>
//              <h1><a href="/">WEB</a></h1>
//                ${list}
//                ${control}
//                ${body}
//            </body>
//            </html>`;
//   },
//   list: function(filelist){
//     var list = '<ul>';
//     for(var i = 0; i < filelist.length; i++){
//         list = list + `
//         <li>
//           <a href="/?id=${filelist[i]}">${filelist[i]}</a>
//         </li>`;
//     }
//     list = list + '</ul>';
//     return list;
//   }
// }


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    
    if (pathname === '/'){//패스가 없는 경로 즉, 루트, 홈을 의미, 홈으로 바로 들어갈경우
      if(queryData.id === undefined){ 
        fs.readdir('./data', function(err, filelist){
          var title = 'Welcome';
          var description = 'Hello Node.js';
          var list = template.list(filelist);
          var html = template.HTML(title ,list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`);
          response.writeHead(200);
          response.end(html);
        });
      }
      else{
        fs.readdir('./data', function(err, filelist){
          var filterId = path.parse(queryData.id).base
          fs.readFile(`data/${filterId}`, 'utf8', function(err, description){
            var title = queryData.id;
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description);
            var list = template.list(filelist);
            var html = template.HTML(sanitizedTitle ,list,
              `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
              `<a href="/create">create</a>
              <a href="/update?id=${sanitizedTitle}">update</a><!--url에 쿼리스트링을 줄때 ?id={title}로 id값을 title값으로 한다-->
              <form action = "delete_process" method = "post" ><!--글 삭제는 어떤 링크로 들어가는 것이 아니고 바로 해당페이지에서 삭제해야하기때문에 링크가 아닌 폼으로 만든다-->
                <input type ="hidden" name = "id" value = "${sanitizedTitle}">
                <input type ="submit" value = "delete">
              </form>
              `);

            response.writeHead(200);
            response.end(html);
          });
      });
    }
  }
  else if(pathname === '/create'){
    fs.readdir('./data', function(err, filelist){
      var title = 'WEB - create';
      var list = template.list(filelist);
      var html = template.HTML(title ,list,`
        <form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
              <textarea name="description" id="" cols="30" rows="10" placeholder = "description"></textarea>
          </p>
          <p>
              <input type="submit">
          </p>
        </form>
      `,'');
      response.writeHead(200);
      response.end(html);
    })
  }
  else if(pathname === '/create_process'){
    var body = '';
    request.on('data', function(data){//서버쪽에서 수신할때마다 이 콜백 함수를 호출하도록 약속되어 있고 그 때 data인자를 통해서 수신한 정보를 줌
      body = body + data;
    });
    request.on('end', function(){//수신할 정보가 이제 없다면 이 콜백 함수를 호출하여 수신이 끝났음을 알림
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.writeHead(302, {Location:`/?id=${title}`}); //create를 눌러 제목과 내용을 적고 제출을 눌렀을 때 내가 제출했던 제목과 내용이 바로 나올 수 있도록 하는 부분
        response.end();
      })
    });
  }
  else if(pathname === '/update'){
    fs.readdir('./data', function(err, filelist){
      var filterId = path.parse(queryData.id).base
      fs.readFile(`data/${filterId}`, 'utf8', function(err, description){
        var title = queryData.id;
        var list = template.list(filelist);
        var html = template.HTML(title ,list,
          `
            <form action="/update_process" method="post">
              <input type = "hidden" name= "id" value = "${title}"><!--어느 파일을 수정해야할지 골라야할 때 그냥 title 을 쓰면 제목 수정시 그파일을 찾을 수 없으므로 hidden 속성을 사용해서 변경하기전 파일이름을 저장해둔 후 나중에 바꿀 파일명으로 쓴다-->
              <p><input type="text" name="title" placeholder="title" value = "${title}"></p><!--value는 디폴트 값 주기-->
              <p>
                  <textarea name="description" id="" cols="30" rows="10" placeholder = "description">${description}</textarea><!--textarea 디폴트값은 <textarea>여기</textarea>에 주기-->
              </p>
              <p>
                  <input type="submit">
              </p>
            </form>
          `,
          `<a href="/create">create</a>
          <a href="/update?id=${title}">update</a>`);//url에 쿼리스트링을 줄때 ?id={title}로 id값을 title값으로 한다
        response.writeHead(200);
        response.end(html);
      });
    });
  }
  else if (pathname === '/update_process'){
    var body = '';
    request.on('data', function(data){//서버쪽에서 수신할때마다 이 콜백 함수를 호출하도록 약속되어 있고 그 때 data인자를 통해서 수신한 정보를 줌
      body = body + data;
    });
    request.on('end', function(){//수신할 정보가 이제 없다면 이 콜백 함수를 호출하여 수신이 끝났음을 알림
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      var id = post.id;
      fs.rename(`data/${id}`, `data/${title}`, function(err){
        fs.writeFile(`data/${title}`, description, 'utf8', function (err){
          response.writeHead(302, {Location: `/?id=${title}`});//redirection 의 코드번호가 302번
          response.end();
        })
      });
    });
  }
  else if (pathname === '/delete_process'){
    var body = '';
    request.on('data', function(data){//서버쪽에서 수신할때마다 이 콜백 함수를 호출하도록 약속되어 있고 그 때 data인자를 통해서 수신한 정보를 줌
      body = body + data;
    });
    request.on('end', function(){//수신할 정보가 이제 없다면 이 콜백 함수를 호출하여 수신이 끝났음을 알림
      var post = qs.parse(body);
      var id = post.id;
      var filterId = path.parse(id).base

      fs.unlink(`data/${filterId}`, function (err) {
        response.writeHead(302, {Location: `/`});
        response.end();
      })
    });
  }
  else{//홈으로 바로 들어가지않고 url에 id나 name을 넣어 접속하는 경우
    response.writeHead(404);//웹서버와 웹브라우저 사이에 통신수단으로 200을 주면 잘 된거고 404면 오류인것 
    response.end('Not found');
  }
})
app.listen(3000);