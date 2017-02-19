/**
 * 实现无限左右轮播
 * 问题:
 *      1.解决页数匹配
 *      2.重复点击
 */


$(function () {

    var $carousel = $('.carousel'),
        $carouselItem = $('.carousel-item'),
        $carouselItemWidth = $carouselItem.width();
    countWidth = $carouselItem.length * $carouselItemWidth,
        $firstItem = $carouselItem.first().clone(), //克隆第一个轮播节点
        $lastItem = $carouselItem.last().clone(); //克隆最后一个轮播节点
    $carousel.prepend($lastItem);
    $carousel.append($firstItem);
    $carousel.width($('.carousel-item').length * $carouselItemWidth) //重新设置容器宽度
    left = -$carouselItemWidth,
        curPageIndex = 0;
    $carousel.css('left', left); //设置为第一张轮播图
    isAnimate = false;
    $('.carousel-play-prev').on('click', function (e) {
        e.preventDefault();
        playPre(1);
    })
    $('.carousel-play-next').on('click', function (e) {
        e.preventDefault();
        playNext(1);
    })

    function playPre(n) {
        if (isAnimate) {
            return;
        }
        isAnimate = true; //加锁
        left += n * $carouselItemWidth;
        curPageIndex -= n;
        $carousel.animate({
            left: left
        }, function () {
            // if(left >= 0){
            //     $carousel.css('left',-countWidth); 
            //     left = -countWidth;
            // }
            if (curPageIndex === -1) {
                $carousel.css('left', -countWidth);
                left = -countWidth;
                curPageIndex = $carouselItem.length - 1;
            }
            setBullet();
            isAnimate = false; //释放锁
        });
    }

    function playNext(n) {
        if (isAnimate) {
            return;
        }
        isAnimate = true; //加锁
        curPageIndex += n;
        left -= n * $carouselItemWidth;
        $carousel.animate({
            left: left
        }, function () {
            // if(left < -countWidth) {
            //     $carousel.css('left',-$carouselItemWidth); //将指针重设为默认值，这过程瞬间完成肉眼观察不到图片闪烁
            //     left = -$carouselItemWidth;
            // }
            if (curPageIndex === $carouselItem.length) {
                $carousel.css('left', -$carouselItemWidth); //将指针重设为默认值，这过程瞬间完成肉眼观察不到图片闪烁
                left = -$carouselItemWidth;
                curPageIndex = 0;
            }
            setBullet();
            isAnimate = false; //释放锁
        });
    };

    function setBullet() {
        $('.carousel-bullet-item').removeClass('active');
        $('.carousel-bullet-item').eq(curPageIndex).addClass('active');
    }
    $('.carousel-bullet-item').on('click', function (e) {
        e.preventDefault();
        var index = $(this).index();
        var cp = curPageIndex;
        if (index > curPageIndex) {
            playNext(Math.abs(index - cp));
        } else {
            playPre(Math.abs(index - cp));
        }
    })


})