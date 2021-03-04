var o = {
    v1:'v1',
    v2:'v2',
    f1:function (){
        console.log(this.v1);
    },
    f2:function () {
        console.log(this.v2);
    }
}

//JS에서는 함수도 값(변수)으로 저장될 수 있다.

o.f1();
o.f2();