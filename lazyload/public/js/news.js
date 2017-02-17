/*
   问题：
   		1.防止用户重复点击
   		2.服务端没数据 不再发送请求

*/

$(function(){
	var page = 0,
		$wrapper = $('.wrapper');
		checkNews();

	$(window).on('scroll',checkNews)

	function checkNews(){
		if(isVisible($wrapper) && !$(window).data('isOver')){ //处于可视区域 不再发请求
			if($(this).data('isLoading')){  //this === window 获取一个状态锁
				return;
			}	
			getNews();
		}
	}

	function getNews(){
		$(window).data('isLoading',true);  //设置一个状态锁，防止在加载的数据回来之前用户多次点击
		$('.load').show();
		$.ajax({
			url:"http://localhost:8080/getNews",
			type:'get',
			dataType:'json',
			data:{
				page:page
			}
		}).done(function($data){
				$('.load').hide();
				appenHtml($data);
				page++;
				$(window).data('isLoading',false); //释放锁
				checkNews(); //判断是否在可视区域
				
		}).fail(function(){
			$(window).data('isLoading',false); //释放锁
			 alert('系统异常');
		}).always(function(){
			$('.load').hide();
		})
	}
	function appenHtml($data){
		var html = '',
		    $ct = $('.ct');
		 if($data.status === 0 && $data.msg.length >0){
		 	$($data.msg).each(function(){
				html += '<li class="item">'+this+'</li>';
			})
		 }else{
		 	$(window).data('isOver',true); //没内容加锁  不再发送请求
		 	html += '没有更多了';
		 }
		
		$ct.append(html);
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

})