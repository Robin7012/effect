$(function(){
	
	var clock;
	check(); //进入页面触发
	$(window).on('scroll',function(){
		if(clock){
			clearTimeout(clock); //清空DOM结构位置在请求加载图片 上的 图片队列
		}
		clock = setTimeout(function(){ 
			 check() //设置定时器，将img放入队列
		})
	});

	function check(){
		$('.item img').not('.load').each(function(){
			$this = this
			if(isVisible($this)){  //是否处于可视区域内
				show($this);
			}
		});
	}
	function isVisible($node){
		var	$windosHeight = $(window).height(),//窗口高度
		  	$windosScrollTop = $(window).scrollTop(),//窗口滚动高度
		  	$nodeHeight = $($node).height(), //节点cotentarea 高度
		  	$nodeOffsetTop = $($node).offset().top; //节点距根节点高度
		if(	$windosHeight+$windosScrollTop > $nodeOffsetTop && $windosScrollTop < $nodeOffsetTop+$nodeHeight) {
			//在可视区域内
			return true
		}
		return false;
	}


	function show($node){
		var dataSrc = $node.getAttribute('data-src');
		$node.setAttribute('src',dataSrc);
		$($node).addClass('load');//增加 已加载标志位
	}
})	






