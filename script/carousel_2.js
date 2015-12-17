/*!
 * @import Zepto.js||jQuery.js,  version 1.2
 *
 * http://chinacoder.cn/
 *
 * Date: 2015-9-01
 */
	
	 ;(function ($) {
          var slideBox = $(".slideBox"),
              slideUl = slideBox.children(".slideUl"),
              slideList = slideUl.children('.list'),
              slideWidth = slideBox.width(),
              lenghts = slideList.length;

          var startX = 0,
              moveX = 0,
              initX = 0,
              j = 0,
              timer;

          var point = "<div class='point'>";


          for (var i = 0; i < lenghts; i++) {
               Ascroll(slideList.eq(i), i * slideWidth); //position ready
               point += "<span></span>"; //dom ready
          };

          point += "</div>";
          slideBox.append(point);
          slideBox.find('.point span').eq(0).addClass('current');

          Acss(slideUl , 0.2);
		  
		  var firstListDom = slideList.first().clone(),
		      LastListDom = slideList.last().clone();
			  
		  Ascroll(firstListDom, lenghts * slideWidth); //position
		  Ascroll(LastListDom, -slideWidth); //position
		   
		  slideUl.prepend(LastListDom).append(firstListDom); //dom ready
		     
          //touchStart
          slideBox.on("touchstart", function (e) {
               var touch= !$.touches && !e.touches ?  e.originalEvent.touches[0] : e.touches[0] ;
               e.preventDefault();
               startX = touch.pageX;

               clearInterval(timer);
          });

          //touchMove
          slideBox.on("touchmove", function (e) {
               var touch= !$.touches && !e.touches ?  e.originalEvent.touches[0] : e.touches[0] ;
               e.preventDefault();
               moveX = touch.pageX - startX;

               Acss(slideUl , 0);//取消touchmove时,位移缓执行时间,加强交互感
               Ascroll(slideUl, initX + moveX);
          });

          //touchEnd
          slideBox.on("touchend", function (e) {
               initX += moveX; // total：initX

               if (Math.abs(moveX) > 50) {
                    if (moveX > 1) {
                         j--;
                         if (j <= -1) {
                              j = -1;
                         };

                         Pointindex(j);
                         Ascroll(slideUl, -j * slideWidth);
                         initX = -j * slideWidth;

                         console.log(j);
                    } else {
                         j++;
                         if (j >= lenghts ) {
                              j = lenghts ;
                         };
                         Pointindex(j);
                         Ascroll(slideUl, -j * slideWidth);
                         initX = -j * slideWidth;

                         console.log(j);
                    }
               } else {
                    Ascroll(slideUl, -j * slideWidth);
                    initX = -j * slideWidth;
                    console.log(initX);

               }
               Autoplay();
               Acss(slideUl , 0.2); //恢复位移缓执行时间
			   
			    if (j == lenghts) {
                    setTimeout(function() {
						Ascroll(slideUl , 0);
						Acss(slideUl ,0);
                    }, 200);
                    j=0;
					initX=  0;  
					Pointindex(j);  
                }
                if (j == -1) {
                    setTimeout(function() {
						Ascroll(slideUl ,  -(lenghts - 1) * slideWidth);
						Acss(slideUl ,0);
						 
                    }, 200) 
						
					j=lenghts - 1;
					initX=  -j * slideWidth;	
					Pointindex(j);
					
                }
			   
          });

          Autoplay();
		  

          function Ascroll(Obj, iTarget) { 
               Obj.css({
                    '-webkit-transform': 'translate3d(' + iTarget + 'px,0 , 0)',
                    'transform': 'translate3d(' + iTarget + 'px,0 ,0)'
               });
          };

          function Acss(Obj , Seconds){ 
              Obj.css({
                  '-webkit-transition': ' all ' + Seconds + 's ease',
                  'transition': ' all ' + Seconds + 's ease'
              });
          };

          function Pointindex(index) {
               slideBox.find('.point span').eq(index).addClass('current').siblings().removeClass('current');
          };

          function Autoplay(){
             timer= setInterval(function(){
                 j++ ;
                  if(j>=lenghts){
                     j= lenghts 
                  };
				   Acss(slideUl , 0.2);
                   Ascroll(slideUl, -j * slideWidth);
                  // console.log(j);
                   Pointindex(j);
                  
                   initX = -j * slideWidth;//notice
				   
			    if (j == lenghts) {
                    setTimeout(function() {
						Ascroll(slideUl , 0);
						Acss(slideUl ,0);
                    }, 200);
                    j=0;
					initX=  0;  
					Pointindex(j);  
                }
                

              } , 4000);
          };

     })(window.Zepto||window.jQuery);
