$(function () {
    waterfall(window);
    $(window).on('resize', function () {
        waterfall(window);

    })

    function waterfall($ct) {
        var $ctWidth = $($ct).width(),
            $itemWidth = $('.item').eq(0).outerWidth(true), //定宽
            num = parseInt($ctWidth / $itemWidth);
        // var arr = new Array(num);   //数组内容是空位，读取返回undefined，但是取不到key
        var arr = [];
        for (var i = 0; i < num; i++) {
            arr.push(0); //数组初始化;
        }

        $('.item').each(function () { //遍历每个itme
            $_this = $(this);
            var obj = getMinHeightAndIndex(arr); //遍历数组中height最小值
            setPosition(obj); //放置 item 位置
            arr[obj['index']] = obj.height + $_this.outerHeight(true); //重设数组min height
        })

        function getMinHeightAndIndex(arr) {
            var index = 0;
            min = arr[index];
            for (var i = 0; i < arr.length; i++) {
                if (arr[index] > arr[i]) {
                    index = i;
                    min = arr[i];
                }
            }
            return {
                index: index,
                height: min
            };
        }


        function setPosition(obj) {
            var posX = obj.index * $itemWidth;
            posY = obj.height;
            $_this.css({
                left: posX,
                top: posY
            })
        }

    }


})