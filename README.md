基于ZeptoJs , 移动端touch轮播 Carousel.js

version 1.0

移动端 touch事件 初试


主要逻辑部分在touchend 中 

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
          
    //该段可进一步优化 
    
 本例二维码：
 
  ![alt text](screenshots.png)

 
 
