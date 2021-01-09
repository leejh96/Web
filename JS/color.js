var body = {

    setfontColor:function(color){
        // var target = document.querySelector('body');
        // target.style.color=color;
        $('body').css('color', color)//Jquery 사용, 위와 같음
    },
    setbackColor:function(color){
        // var target = document.querySelector('body');
        // target.style.backgroundColor=color;
        $('body').css('backgroundColor', color)//Jquery 사용, 위와 같음
    }
}
var links = {
    setlinkColor:function(color){
        // var alist = document.querySelectorAll('a');//node list
        // var i = 0

        // while(i < alist.length){
        //     alist[i].style.color = color;
        //     i = i + 1; 
        // }

        //JQuery로 사용
        $('a').css('color', color)//웹페이지의 모든 a태그를 제어하여 color를 변경
    }
}

function nightDayHandler(self){
    
    if(self.value === 'night'){
        body.setbackColor('black');
        body.setfontColor('white');
        self.value = 'day';
        links.setlinkColor('powderblue');
    }
    else{
        body.setbackColor('white');
        body.setfontColor('black');
        self.value = 'night'
        links.setlinkColor('blue');
    }
}