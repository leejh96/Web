var M = {
    v : 'v',
    f : function (){
        console.log(this.v);
    }
}

module.exports = M; //M을 외부에서 사용할 수 있도록 하겠다.