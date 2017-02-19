/*
    等到图片onload后摆放
*/

/*$(function () {

    barrel($('.ct'))

    function barrel($ct) {
        var $ctWidth = $ct.width(),
            arr = [],
            countWidth = 0;
        var $row = $('<dic class="row"></div>');
        for (var i = 0; i < 8; i++) { //模拟触发  50张图片 onload
            var Img = getImg(); //得到随机图片
            
            arr.push(Img);

           
            for (var j = 0; j < arr.length; j++) {
                countWidth += arr[j].imgWidth;
                if (countWidth > $ctWidth) {
                    var last = arr.pop();
                    for (k = 0; k < arr.length; k++) {
                        var $div = $('<img class="img">');
                        $div.css({
                            height: arr[k].imgHeight,
                            width: arr[k].imgWidth,
                            backgroundColor: arr[k].imgColor
                        })
                         $row.append($div);
                    }
                    $ct.append($row);
                    $row = $('<dic class="row"></div>');
                    
                    arr = [];
                    arr.push(last);
                    
                   
                }
            }

        }
    }

    function getImg() {
        //得到随机图片
        var dict = '0123456789';
        dict += 'abcdef';
        var imgHeight = Math.ceil(Math.random() * 100) + 100,
            imgWidth = Math.ceil(Math.random() * 50) + 50;
        //产生一个#000000-#ffffff的颜色
        var colorArr = [];
        for (var i = 0; i < 6; i++) {
            var index = Math.floor((Math.random() * 16));
            colorArr.push(dict[index]);
        }
        colorArr.unshift('#');
        var imgColor = colorArr.join('');
        return {
            imgHeight: imgHeight,
            imgWidth: imgWidth,
            imgColor: imgColor
        }
    }
})*/




function Barrel($ct) {
    this.$ct = $ct;
    this.rowList = [];
    this.loadImg();
}
Barrel.prototype = {  //放在new 前面
    loadImg: function () { //获取图片地址
        var _this = this //保存this
        var imgs = this.getImgUrls(40); //获取图片
        for (var i = 0; i < imgs.length; i++) {
            var img = new Image(); //通过构造器创建DOM IMG对象 HTMLImageElement实例 || document.createElement('img')
            img.src = imgs[i];
            img.onload = function () { //绑定句柄
                console.log(this);
                var imgInfo = {
                    target: this,
                    width: 100 * (this.width / this.height),
                    height: 100
                }
                _this.render(imgInfo);
            }
        }
    },
    getImgUrls: function (num) { //获取随机图片
        var color, width, height, urls = [];
        for (var i = 0; i < num; i++) {
            color = Math.random().toString(16).substring(2,8); //十六进制颜色
            width = Math.floor(Math.random() * 100 + 50);
            height = Math.floor(Math.random() * 30 + 50);
            urls.push('http://placehold.it/' + width + 'x' + height + '/' + color +'/'+ 'fff');
        }
        return urls;
    },
    render: function (imgInfo) {
        var clientWidth = this.$ct.width();
        var rowWidth = 0;
        var newrRowHeight = 0;
        this.rowList.push(imgInfo);
        var lastImginfo = imgInfo; //每次都是最后一个
        for (var i = 0; i < this.rowList.length; i++) {
            rowWidth = rowWidth + this.rowList[i].width;
        }
        if (rowWidth > clientWidth) {
            this.rowList.pop();
            rowWidth = rowWidth - lastImginfo.width;
            newrRowHeight = (clientWidth * 100) / rowWidth; //图片宽度自适应
            this.layout(newrRowHeight,this.rowList); //摆放
            this.rowList = [];
            this.rowList.push(imgInfo);
 
        }
    },
    layout: function (newrRowHeight,rowList) {
        var $rowCt = $('<div class="img-row"></div>');
        console.log(rowList);
        $.each(rowList, function (idx, imgInfo) {
            var $imgCt = $('<div class="img-box"></div>');
            $img = $(imgInfo.target);
            $img.height(newrRowHeight);
            $imgCt.append($img);
            $rowCt.append($imgCt);
        });
        this.$ct.append($rowCt);
    }
}
var barrels = new Barrel($('.ct')) //调用方式