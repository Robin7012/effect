/**
 * 实现渐现轮播
 * 问题:
 *    
 */


$(function () {

    var $carousel = $('.carousel'),
        $carouselItem = $('.carousel-item'),
        $carouselItemWidth = $carouselItem.width();
    $carousel.width($carouselItemWidth) //重新设置容器宽度
    curPageIndex = 0;
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
        curPageIndex -= n;
        if (curPageIndex < 0) {
            curPageIndex = 3;
        }
        $carouselItem.hide();
        setBullet();
        $carouselItem.eq(curPageIndex).fadeIn(600, function () {
            isAnimate = false;
        });
    }

    function playNext(n) {
        if (isAnimate) {
            return;
        }
        isAnimate = true; //加锁
        curPageIndex += n;
        if (curPageIndex > 3) {
            curPageIndex = 0;
        }
        $carouselItem.hide();
        setBullet();
        $carouselItem.eq(curPageIndex).fadeIn(600, function () {
            isAnimate = false;
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