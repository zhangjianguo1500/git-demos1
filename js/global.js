~function () {
    var ModalChange = {
        show:function (elDom,className){
            var el = document.getElementById(elDom),
                enlarge =  utils.getElementsByClass("enlarge",el)[0],
                narrow =  utils.getElementsByClass("shrink",el)[0];

            if("block"==fade.style.display&&!utils.hasClass(el,"fullscreen"))
                return;

            utils.removeClass(el,"fullscreen");
            utils.addClass(el,className);

            utils.css(el,{
                display:"block"
            });
            utils.css(enlarge,{
                display:"block"
            });
            utils.css(narrow,{
                display:"none"
            });

            this.fade.style.display='block';
            this.fade.style.width = document.body.scrollWidth;
            this.fade.style.height=utils.css(document,"height");
        },
        close:function(elDom) {
            var el = document.getElementById(elDom);

            el.style.display='none';
            this.fade.style.display='none';
        },
        fullscreen:function(elDom,oldClassName){
            var el = document.getElementById(elDom),
                enlarge =  utils.getElementsByClass("enlarge",el)[0],
                narrow =  utils.getElementsByClass("shrink",el)[0];

            utils.removeClass(el,oldClassName);
            utils.addClass(el,"fullscreen");
            utils.css(enlarge,{
                display:"none"
            });
            utils.css(narrow,{
                display:"block"
            });
        },
        fade: document.getElementById("fade")
    };

    function TabChange(container, defaultIndex) {
        return this.init(container, defaultIndex);
    }
    TabChange.prototype = {
        constructor: TabChange,
        defaultIndexEven: function () {
            utils.addClass(this.oLis[this.defaultIndex], "select");
            utils.addClass(this.divList[this.defaultIndex], "select");
        },
        liveClick: function () {
            var _this = this;
            this.tabFirst.onclick = function (e) {
                e = e || window.event;
                e.target = e.target || e.srcElement;
                if (e.target.tagName.toLowerCase() === "li") {
                    _this.detailFn(e.target);
                }
                if(e.target.tagName.toLowerCase() === "sup"){
                    var targetPar=e.target.parentNode;
                    _this.detClick(targetPar);

                }
            };
        },
        hover: function () {
            var _this = this;
            this.tabFirst.onmouseover = function (e) {
                e = e || window.event;
                e.target = e.target || e.srcElement;
                if(e.target.tagName.toLowerCase() === "li"){
                    utils.css(utils.firstChild(e.target),{
                        color:"grey",
                        display:"block"
                    });
                }
                if(e.target.tagName.toLowerCase() === "sup"){
                    utils.css(e.target,{
                        color:"red",
                        display:"block"
                    });
                }
            };
        },
        hoverOut: function () {
            var _this = this;
            this.tabFirst.onmouseout = function (e) {
                e = e || window.event;
                e.target = e.target || e.srcElement;
                if(e.target.tagName.toLowerCase() === "li"){
                    utils.css(utils.firstChild(e.target),{
                        display:"none"
                    });
                }
                if(e.target.tagName.toLowerCase() === "sup"){
                    utils.css(e.target,{
                        color:"grey",
                        display:"block"
                    });
                }
            };
        },
        detClick:function(tag){
            var index=utils.index(tag);
            this.container.removeChild(this.divList[index]);
            tag.parentNode.removeChild(tag);
            index===0? this.detailFn(this.oLis[index+1]):this.detailFn(this.oLis[index-1]);
        },
        detailFn: function (curEle) {
            var index = utils.index(curEle);
            utils.addClass(curEle, "select");
            this.divList = utils.getElementsByClass("tab-page",this.container);
            this.oLis = utils.children(this.tabFirst);
            for (var i = 0; i < this.divList.length; i++) {
                i === index ? utils.addClass(this.divList[i], "select") : (utils.removeClass(this.divList[i], "select"), utils.removeClass(this.oLis[i], "select"));
            }
        },
        init: function (container, defaultIndex) {
            this.container = container || null;
            this.defaultIndex = defaultIndex || 0;
            this.tabFirst = this.container.getElementsByTagName("ul")[0];
            this.oLis = utils.children(this.tabFirst);
            this.divList = utils.getElementsByClass("tab-page",this.container);
            this.defaultIndexEven();
            this.liveClick();
            this.hover();
            this.hoverOut();
            for(var i=0;i<document.getElementsByTagName("sup").length;i++){
                utils.css(document.getElementsByTagName("sup")[i],{
                    display:"none"
                });
            }
            return this;
        }
    };

    window.Tab = TabChange;
    window.Modal = ModalChange;
}();


/* 组件：获取系统时间
 ========================================================================================= */
window.onload = function(){
    showTime();
}
function showTime(){
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var date = myDate.getDate();
    //var dateArr = ["日","一",'二','三','四','五','六'];
    //var day = myDate.getDay();
    var hours = myDate.getHours();
    var minutes = formatTime(myDate.getMinutes());
    var seconds = formatTime(myDate.getSeconds());
    /*var systemTime = document.getElementById("time");
     systemTime.innerHTML = " " + year + "年" + month +"月" + date + "日" + " " + hours + ":" + minutes + ":" + seconds;*/
    var systemTime = document.getElementById("year");
    systemTime.innerHTML = " " + year + "/" + month +"/" + date + "/" + " " ;
    var systemTime = document.getElementById("time");
    systemTime.innerHTML = "  " + hours + ":" + minutes + ":" + seconds;
    setTimeout("showTime()",500);
}
//格式化时间：分秒。
function formatTime (i){
    if(i < 10){
        i = "0" + i;
    }
    return i;
}

/* 组件：header菜单
 ========================================================================================= */
var lastCursel = -1;
function change(name,cursel){
    var menu=document.getElementById("con_"+name+"_"+cursel);
    if (menu.style.display == "")
    {
        menu.style.display = "none";
    }
    else
    {
        menu.style.display = "";
    }
    if (lastCursel>=0 && lastCursel != cursel)
    {
        var lastmenu=document.getElementById("con_"+name+"_"+lastCursel);
        lastmenu.style.display = "none";
    }
    lastCursel = cursel;
}
