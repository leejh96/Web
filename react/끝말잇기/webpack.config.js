const path = require('path');
const refreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
module.exports = {
    name : 'wordRelay-setting',
    mode : 'development', //실서비스 : production
    devtool : 'eval', //실서비스 : hidden-source-map
    
    //entry 안에 있는 배열에 js jsx json css 등등 확장자를 안쓰기위해서는 
    //resolve로 선언해두면 웹팩이 스스로 찾아준다.
    resolve : {
        extensions : ['.js', '.jsx']
    },

    //합치고자 하는 jsx(js) 파일 입력
    entry : {
         //client.jsx에서 WordRelay.jsx를 불러오기 때문에 따로 넣지 않아도 된다.
        app : ['./client.jsx' /*'./WordRelay.jsx'*/],
    },

    //entry의 파일을 읽고 modules의 모듈을 적용하여 output으로 출력
    module : {
        rules : [{
            test : /\.jsx?/, //정규표현식 js와 jsx파일에 룰을 적용하겠다.
            loader : 'babel-loader',
            options : {
                //presets도 세세한 설정가능
                presets : ['@babel/preset-env', '@babel/preset-react'],
                plugins : [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ]
            }
        }]
    },
    
    // 플러그인 적용하려면 사용
    plugins : [
        new refreshWebpackPlugin()
    ],
    
    //index.html에서 script src에 app.js로 받기 때문에 app.js를 출력
    output : {
        path : path.join(__dirname, 'dist'),//실제 경로
        filename : 'app.js',
        publicPath : '/dist/',//가상의 경로, express.static과 비슷
    },

    //
    devServer : {
        publicPath : '/dist/',
        hot : true,
    }
};