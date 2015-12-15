/*!
 * @import zepto.js,  version 1.0
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

          //touchStart
          slideBox.on("touchstart", function (e) {
               var touch = e.touches[0];
               e.preventDefault();
               startX = touch.pageX;

               clearInterval(timer);
          });

          //touchMove
          slideBox.on("touchmove", function (e) {
               var touch = e.touches[0];
               e.preventDefault();
               moveX = touch.pageX - startX;
               Ascroll(slideUl, initX + moveX);
          });

          //touchEnd
          slideBox.on("touchend", function (e) {
               initX += moveX; // total：initX

               if (Math.abs(moveX) > 50) {
                    if (moveX > 1) {
                         j--;
                         if (j <= 0) {
                              j = 0;
                              Ascroll(slideUl, 0);
                              console.log("j=0 :"+initX);
                            //  initX = -j * slideWidth;
                         };
                         Pointindex(j);
                         Ascroll(slideUl, -j * slideWidth);
                         initX = -j * slideWidth;

                         console.log(j);
                    } else {
                         j++;
                         if (j >= lenghts - 1) {
                              j = lenghts - 1;
                              Ascroll(slideUl, -j * slideWidth);
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
          });

          Autoplay();


          function Ascroll(Obj, iTarget) {
               Obj.css({
                    '-webkit-transform': 'translate3d(' + iTarget + 'px,0 , 0)',
                    'transform': 'translate3d(' + iTarget + 'px,0 ,0)'
               });
          };

          function Pointindex(index) {
               slideBox.find('.point span').eq(index).addClass('current').siblings().removeClass('current');
          };


          function Autoplay(){
             timer= setInterval(function(){
                 j++ ;
                  if(j>=5){
                     j=0
                  };
                   Ascroll(slideUl, -j * slideWidth);
                   console.log(j);
                   Pointindex(j);

                   initX = -j * slideWidth;//notice

              } , 3000);
          };

     })(Zepto);
