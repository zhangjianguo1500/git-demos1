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
                    color:"grey"
                  });
                }
                if(e.target.tagName.toLowerCase() === "sup"){
                  utils.css(e.target,{
                    color:"red"
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
                    color:utils.css(e.target,"background-color")
                  });
                }
                if(e.target.tagName.toLowerCase() === "sup"){
                  utils.css(e.target,{
                    color:"grey"
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
                color:utils.css(document.getElementsByTagName("sup")[i].parentNode,"background-color")
              });
            }
            return this;
        }
    };

    window.Tab = TabChange;
    window.Modal = ModalChange;
}();


/* 组件：导航菜单
 ========================================================================================= */
function $G(Read_Id) { return document.getElementById(Read_Id) }

var openedObjId=null
function Effect(ObjectId){
    if (openedObjId){
        $G(openedObjId+"tab");
        Start(openedObjId,'Close');
    }
    if(openedObjId!=ObjectId){
        $G(ObjectId+"tab");
        Start(ObjectId,'Opens');
        openedObjId=ObjectId
    }
    else openedObjId=null
}
function Start(ObjId,method){
    var BoxHeight = $G(ObjId).offsetHeight;
    var MinHeight = 0;
    var MaxHeight = 130;
    var BoxAddMax = 1;
    var Every_Add = 0.1;
    var Reduce    = (BoxAddMax - Every_Add);
    var Add       = (BoxAddMax + Every_Add);

    if (method == "Close"){
        var Alter_Close = function(){
            BoxAddMax /= Reduce;
            BoxHeight -= BoxAddMax;
            if (BoxHeight <= MinHeight){
                $G(ObjId).style.display = "none";
                window.clearInterval(BoxAction);
            }
            else $G(ObjId).style.height = BoxHeight;
        }
        var BoxAction = window.setInterval(Alter_Close,1);
    }

    else if (method == "Opens"){
        var Alter_Opens = function(){
            BoxAddMax *= Add;
            BoxHeight += BoxAddMax;
            if (BoxHeight >= MaxHeight){
                $G(ObjId).style.height = MaxHeight;
                window.clearInterval(BoxAction);
            }else{
                $G(ObjId).style.display= "block";
                $G(ObjId).style.height = BoxHeight;
            }
        }
        var BoxAction = window.setInterval(Alter_Opens,1);
    }
}