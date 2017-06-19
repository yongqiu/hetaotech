$(function(){
	var $header = $('.header');
	var $navbar = $('.navbar');
	var $main = $('#main');
	var $home = $('.home');
	var $server = $('.server');
	var $demo = $('.demo');
	var $info = $('.info');
	var $detail = $('.detail');
	var $about = $('.about');
	var $contact = $('.contact');
	var $iframe = $('#iframe');
	var $leftIframe = $iframe.find('.iframe_left');
	var $rightIframe = $iframe.find('.iframe_right');

	//判断访问终端
	var browser={
    versions:function(){
      var u = navigator.userAgent, app = navigator.appVersion;
      return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == " qq" //是否QQ
      };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
	};

	//mainTL
	var mainTL = {
		home: (function(){
			var tl = new TimelineMax({paused: true});
			var $tit = $('.home .tit'),
					$box = $('.home .item-box'),
					$btns = $('.home .inner-view-box,.home .view-box');
			tl.staggerFrom([$tit, $box, $btns], 0.6, {opacity: 0, y: 30}, 0.5);
			return tl;
		})(),
		server: (function(){
			var tl = new TimelineMax({paused: true});
			var $tit = $('.server .tit'),
					$box = $('.server .item-box');
			tl.staggerFrom([$tit, $box], 0.6, {opacity: 0, y: 30}, 0.5);
			return tl;
		})(),
		demo: (function(){
			var tl = new TimelineMax({paused: true});
			return tl;
		})(),
		about: (function(){
			var tl = new TimelineMax({paused: true});
			var $sec1tit = $('.about .sec1 h2,.about .sec1 h3'),
					$sec1banner = $('.about .sec1 .banner'),
					$p = $('.about .sec1>p'),
					$box = $('.about .sec1 .box');
			tl.staggerFrom([$sec1tit, $sec1banner, $p, $box], 0.6, {opacity: 0, y: 30}, 0.5);
			return tl;
		})(),
		info: (function(){
			 var tl = new TimelineMax({paused: true});
			 var $tit = $('.info .hd h2,.info .hd h3');
			 tl.staggerFrom([$tit], 0.6, {opacity: 0, y: 30}, 0.5);
			 return tl;
		})(),
		contact: (function(){
			var tl = new TimelineMax({paused: true});
			var $tit = $('.contact h2, .contact h3'),
					$banner = $('.contact .banner'),
					$txts = $('.contact .txt'),
					$qr = $('.contact .qrcode');
			tl.staggerFrom([$tit, $banner, $txts.eq(0), $txts.eq(1), $txts.eq(2), $qr], 0.6, {opacity: 0, y: 30}, 0.5);
			return tl;
		})()
	};

	//预加载
	(function(){
		var imgArr = [
		  'images/about-bg.jpg',
		  'images/about-logo.png',
		  'images/about-logo-select.png',
		  'images/about-sec1-icon.png',
		  'images/close.png',
		  'images/contact-bg.jpg',
		  'images/demo-detail-pagearrow.png',
		  'images/demo-search.png',
		  'images/header-icon.png',
		  'images/home-bg1.jpg',
		  'images/home-items.png',
		  'images/home-tit.png',
		  'images/info-hd-bg.jpg',
		  'images/mouse-icon.png',
		  'images/navbar-bg.png',
		  'images/navbar-code.png',
		  'images/server-1.png',
		  'images/server-1-cur.png',
		  'images/server-2.png',
		  'images/server-2-cur.png',
		  'images/server-3.png',
		  'images/server-3-cur.png',
		  'images/server-4.png',
		  'images/server-4-cur.png',
		  'images/server-5.png',
		  'images/server-5-cur.png',
		  'images/server-bg.jpg',
		  'images/server-pop-bg.jpg',
		  'images/server-pop-test-img.jpg',
		  'images/server-tit.png'
		];
		preload({
		  files: imgArr,
		  complete: function(){
		  	$('.loading').fadeOut(function(){
		  		mainTL.home.play();
		  	});
		  }
		});
	})();

	function pauseMainTL(){
		mainTL.home.pause(0);
		mainTL.server.pause(0);
		mainTL.demo.pause(0);
		mainTL.about.pause(0);
		mainTL.info.pause(0);
		mainTL.contact.pause(0);
	}

	$header.on('click', '.logo', function(){
		$('.server-pop').find('.close').click();
		$navbar.find('li').eq(0).click();
	});
	$header.on('click', '.menu', function(){
		$('.server-pop').find('.close').click();
		$main.one('transitionend', function(){
			$navbar.addClass('zindex');
		});
		$header.find('.menu').addClass('hide');
		$main.addClass('open');
		$header.addClass('open');
	});
	$navbar.on('click', '.close', function(){
		$main.one('transitionend', function(){
			$header.find('.menu').removeClass('hide');
		});
		$navbar.removeClass('zindex');
		setTimeout(function(){
			$main.removeClass('open');
			$header.removeClass('open');
		}, 200);
	});
	$navbar.on('click', 'li', function(){
		$('.server-pop').find('.close').click();
		$navbar.removeClass('zindex');
		var index = $(this).index();
		$(this).addClass('cur').siblings('li').removeClass('cur');
		switch(index){
			case 0:  //首页
				allPageHide(function(){
					showPage($home, function(){
						pauseMainTL();
						mainTL.home.play();
					});
					hideNav();
				});
				break;
			case 1:  //服务
				allPageHide(function(){
					showPage($server, function(){
						pauseMainTL();
						mainTL.server.play();
					});
					hideNav();
				});
				break;
			case 2:  //工作
				allPageHide(function(){
					showPage($demo, function(){
						pauseMainTL();
						mainTL.demo.play();
						setDemoLoading();
					});
					hideNav();
				});
				break;
			case 3:  //关于
				allPageHide(function(){
					showPage($about, function(){
						pauseMainTL();
						mainTL.about.play();
					});
					hideNav();
				});
				break;
			case 4:  //信息
				allPageHide(function(){
					showPage($info, function(){
						pauseMainTL();
						mainTL.info.play();
						setInfoLoading();
					});
					hideNav();
				});
				break;
			case 5:  //联系方式
				allPageHide(function(){
					showPage($contact, function(){
						pauseMainTL();
						mainTL.contact.play();
					});
					hideNav();
				});
				break;
			default:
				console.log('操作错误');
		}
	});
	
	function hideNav(){
		setTimeout(function(){
			$main.removeClass('open');
			$header.removeClass('open');
			$header.find('.menu').removeClass('hide');
		}, 200);
	}

	//show page
	function showPage($page, cb){
		$page.show()
		$page.find('.page-modal').one('transitionend', function(){
			$page.addClass('middle');
			if(cb) cb();
		});
		setTimeout(function(){
			$page.addClass('in');
		}, 100);
	}
	//hide page
	function hidePage($page){
		$page.find('.page-modal').one('transitionend', function(){
			$page.removeClass('in middle out');
			$page.hide();
		});
		$page.addClass('out');
	}

	function allPageHide(cb){
		$('.page').each(function(index, elem){
			if($(elem).hasClass('middle')){
				$(elem).find('.page-modal').one('transitionend', function(){
					$(elem).removeClass('in middle out');
					$(elem).hide();
					if(cb) cb();
				});
				$(elem).addClass('out');
				return;
			}
		});
	}

	//首页
	(function(){
		$home.on('click', '.btn', function(){
			$navbar.find('li').eq(1).click();
		});
	})();

	//服务页
	(function(){
		var datas = [
			{
				imgUrl: 'images/server-pop-img1.png',
				title: '品牌整案服务',
				content: '<p>我们致力于帮助客户完成有别于其他品牌的战略定位及市场策略梳理，并通过团队高效执行力和市场资源、媒体渠道让计划落地实施，让品牌在受众用户群中建立高辨识度的唯一品牌印象，以此达到建立品牌影响力、促进市场销售的目标。</p>'
			},
			{
				imgUrl: 'images/server-pop-img2.png',
				title: '口碑营销',
				content: '<p>在企业品牌建立过程中，我们通过持续的营销策划、落地活动体验、媒体传播让品牌在市场和用户中建立一个好的品牌口碑，并形成自然的口碑传播，以及在服务过程中不断帮助企业维护品牌口碑。</p>'
			},
			{
				imgUrl: 'images/server-pop-img3.png',
				title: '新媒体营销',
				content: '<p>目前我们成立了专职的新媒体营销项目组，成功孵化了@精选限量美食 等优秀新媒体品牌，与新浪、网易、搜狐、腾讯、今日头条、一点资讯、爱奇艺、优酷土豆等主流媒体平台均建立了友好深度地合作关系，致力于帮助企业品牌最快建立好传播通道。</p>'
			},
			{
				imgUrl: 'images/server-pop-img4.png',
				title: '电子商务',
				content: '<p>我们帮助品牌转型于电子商务与实体结合，专业的电子商务服务团队帮助企业制定电子商务战略，搭建电子商务所需的基础设施，实现效益最大化。</p>'
			},
			{
				imgUrl: 'images/server-pop-img5.png',
				title: '视觉设计',
				content: '<p>为了更好地向客户提供服务，我们投资成立了专业的视觉设计创作公司：重庆妙雅唯创科技有限公司，旨在为客户品牌创造专业且有价值的视觉体验，并达到有效提升品牌视觉感和用户体验的商业价值。</p><div class="detail-btn"><a href="http://www.xiongmaopx.com" target="_blank">查看详情</a></div>'
			}
		];
		$server.find('.item-box').on('click', 'a', function(){
			$(this).addClass('cur').siblings().removeClass('cur');
			var index = $(this).index();
			createPop(datas[index]);
		});
		
		function createPop(data){
			var imgStr = '<div class="left"><img src="'+ data.imgUrl +'"></div>';
			var content = '<div class="right"><h2>'+ data.title +'</h2>'+ data.content +'</div>';
			var str = '<div class="server-pop">'+ imgStr + content +'<a href="javascript:;" class="close"></a></div>';
			$('body').append(str);
			setTimeout(function(){
				$('.server-pop').addClass('pop');
			}, 10);
			$('.server-pop').find('.close').on('click', function(){
				$('.server-pop').removeClass('pop');
				setTimeout(function(){
					$('.server-pop').remove();
				}, 500);
				$server.find('.item-box a').removeClass('cur');
			});
		}
	})();

	//案例页
	(function(){

		var pendOver = true;

		var $listbox = $demo.find('.demo-list');
		if(browser.versions.mobile||browser.versions.android||browser.versions.ios){
			$demo.find('.page-modal').css({
				'overflow-y': 'auto'
			});
			$demo.find('.page-modal').on('scroll', function(event){
				var scrollT = $demo.find('.page-modal').scrollTop();
				var vHeight = $(window).height();
				if(scrollT + vHeight + 100 >= $listbox.height()){
					getData();
				}
			});
		}else{
			$demo.find('.page-modal').mCustomScrollbar({
				callbacks:{
					onTotalScrollOffset: 100,
					onTotalScroll: function(){
						getData();
					}
				}
			});
		}

		//set loading
		function setLoading(){
			var len = $listbox.find('a').length;
			var $lastA = $listbox.find('a').eq(len-1);
			var h = $lastA.height();
			var rect = $lastA[0].getBoundingClientRect();
			var vHeight = window.innerHeight || document.documentElement.clientHeight;
			var str = '<span class="pageloading" style="float:left;width:100%;height:150px;background:#0d0d0d url(images/pageloading.gif) no-repeat center center;"></span>';
			if(rect.top + h > vHeight){
				$listbox.append(str);
			}
		}
		window.setDemoLoading = setLoading;

		function getData(){
			if(pendOver){
				pendOver = false;
				console.log('正在请求...');
				setTimeout(function(){
					var tmp = '<a class="animate" href="javascript:;">'+
											'<div class="demo-item-wrap">'+
												'<img class="img" src="images/demo-img1.jpg" alt="">'+
												'<div class="txt">'+
													'<div class="txt-wrap">'+
														'<i></i>'+
														'<h2>案例名称一定要长</h2>'+
														'<div class="line"></div>'+
														'<p>案例分类可以短</p>'+
													'</div>'+
												'</div>'+
											'</div>'+
										'</a>';
					for(var i=0; i<4; i++){
						tmp += tmp;
					}
					$('.pageloading').remove();
					$listbox.append(tmp);
					pendOver = true;
					setLoading();
				}, 3000);
			}
		}

		$listbox.on('click', 'a', function(){
			console.log($(this).index());
			var url = $(this).attr('href');
			$header.hide();
			$demo.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('moveToLeft');
			});
			$iframe.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('moveFromRight');
			});
			$demo.addClass('moveToLeft');
			$iframe.addClass('pt-page-current moveFromRight');
			$leftIframe.attr('src', url);
			$leftIframe.addClass('pt-page-current');
			return false;
		});

		function slideDemo(){
			console.log(1);
			$demo.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('moveFromLeft');
			});
			$iframe.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('pt-page-current moveToRight');
				$(this).find('iframe').removeClass('pt-page-current');
				$header.show();
			});
			$demo.addClass('moveFromLeft');
			$iframe.addClass('moveToRight');
		}
		function prevIframe(url){
			console.log(url);
			var $current = $iframe.find('.pt-page-current');
			var $other = $current.siblings();

			$other.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('moveFromLeft');
			});
			$current.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('pt-page-current moveToRight');
			});
			$other.addClass('pt-page-current moveFromLeft');
			$current.addClass('moveToRight');
			$other.attr('src', url);
		}
		function nextIframe(url){
			console.log(url);
			var $current = $iframe.find('.pt-page-current');
			var $other = $current.siblings();
			$other.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('moveFromRight');
			});
			$current.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('pt-page-current moveToLeft');
			});
			$other.addClass('pt-page-current moveFromRight');
			$current.addClass('moveToLeft');
			$other.attr('src', url);
		}
		window.slideDemo = slideDemo;
		window.prevIframe = prevIframe;
		window.nextIframe = nextIframe;
	})();

	//资讯页
	(function(){
		var pendOver = true;
		var $listbox = $info.find('.info-box');

		if(browser.versions.mobile||browser.versions.android||browser.versions.ios){
			$info.find('.page-modal').css({
				'overflow-y': 'auto'
			});
			$info.find('.page-modal').on('scroll', function(event){
				var scrollT = $info.find('.page-modal').scrollTop();
				var vHeight = $(window).height();
				if(scrollT + vHeight + 100 >= $info.find('.info-wrap').height()){
					getData();
				}
			});
		}else{
			$info.find('.page-modal').mCustomScrollbar({
				callbacks:{
					onTotalScrollOffset: 100,
					onTotalScroll: function(){
						getData();
					}
				}
			});
		}
		$listbox.on('click', 'a', function(){
			console.log($(this).index());
			var url = $(this).attr('href');
			$header.hide();
			$info.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('moveToLeft');
			});
			$iframe.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass('moveFromRight');
			});
			$info.addClass('moveToLeft');
			$iframe.addClass('pt-page-current moveFromRight');
			$leftIframe.attr('src', url);
			$leftIframe.addClass('pt-page-current');
			return false;
		});
		//set loading
		function setLoading(){
			var len = $listbox.find('a').length;
			var $lastA = $listbox.find('a').eq(len-1);
			var h = $lastA.height();
			var rect = $lastA[0].getBoundingClientRect();
			var vHeight = window.innerHeight || document.documentElement.clientHeight;
			var str = '<span class="pageloading" style="float:left;width:100%;height:150px;background:#0d0d0d url(images/pageloading.gif) no-repeat center center;"></span>';
			if(rect.top + h > vHeight){
				$listbox.append(str);
			}
		}
		window.setInfoLoading = setLoading;

		function getData(){
			if(pendOver){
				pendOver = false;
				console.log('正在请求...');
				setTimeout(function(){
					var tmp = '<a class="animate" href="javascript:;">'+
											'<div class="container">'+
												'<div class="img">'+
													'<img src="images/demo-img1.jpg">'+
													'<i></i>'+
												'</div>'+
												'<div class="txt">'+
													'<div class="txt-wrap">'+
														'<h4>这里是标题，所以名字应该很长</h4>'+
														'<div class="line"></div>'+
														'<p>2016.08.10</p>'+
													'</div>'+
												'</div>'+
											'</div>'+
										'</a>';
					for(var i=0; i<4; i++){
						tmp += tmp;
					}
					$('.pageloading').remove();
					$listbox.append(tmp);
					pendOver = true;
					setLoading();
				}, 3000);
			}
		}
	})();

	//关于
	(function(){
		if(browser.versions.mobile||browser.versions.android||browser.versions.ios){
			$about.find('.page-modal').css({
				'overflow-y': 'auto'
			});
		}else{
			$about.find('.page-modal').mCustomScrollbar();
		}
	})();

	//联系我们
	(function(){
		if(browser.versions.mobile||browser.versions.android||browser.versions.ios){
			$contact.find('.page-modal').css({
				'overflow-y': 'auto'
			});
		}else{
			$contact.find('.page-modal').mCustomScrollbar();
		}
	})();
});