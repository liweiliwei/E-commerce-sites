define(["jquery","_cookie",],function($,_cookie){
	return {
		
		ADclick : function(){
			var flag = 1;
			$(".unfold").click(function(){
				if( flag ){
					$(".AD-content").css("background","url(././images/AD_2.jpg) no-repeat center top").stop().animate({height:"350px"});
					$(this).children().eq(0).text("收起").siblings().css({
						"background": "url(././images/三角形－上.png)",
						"background-size": "100% 100%"
					});
					flag = 0;
					
				}else{
					$(".AD-content").stop().animate({height:"100px"},300,function(){
						$(".AD-content").css("background","url(././images/AD_1.jpg) no-repeat center top");
					})
					$(this).children().eq(0).text("展示").siblings().css({
						"background": "url(././images/三角形－下.png)",
						"background-size": "100% 100%"
					});
					flag = 1;
				}
			})
		},
		
		//类似轮播
		xiaozhiClick : function(){
			var recommendIndex = 0
			$(".recommend-leftBtn").click(function(){
				recommendIndex --;
				if(recommendIndex*1100<-3300){
					//$(".recommend-list").css("left","0");
					recommendIndex = 0;
				}
				$(".recommend-list").stop().animate({left:recommendIndex*1100+"px"});
			})
			$(".recommend-rightBtn").click(function(){
				recommendIndex++;
				if(recommendIndex*1100>0){
					//$(".recommend-list").css("left","-3300px");
					recommendIndex = -3;
				}
				$(".recommend-list").stop().animate({left:recommendIndex*1100+"px"});
			})
		},
		//类是轮播
		hotBrandClick : function(){
			var brandIndex = 0;
			$(".brand-nav ul>li").mouseover(function(){
				$(this).css("color","#00C8FF").find("span").css("borderBottom","2px solid #00c8ff");
				$(this).siblings().css("color","#000").find("span").css("borderBottom","0");
				brandIndex = $(this).index();
				$(".brand-content-cnt").eq(brandIndex).show().siblings().hide();
			})
			$(".brand-content-leftBtn").click(function(){
				brandIndex--;
				if(brandIndex<0){
					brandIndex = 3;
				}
				$(".brand-nav li").eq(brandIndex).css("color","#00C8FF").find("span").css("borderBottom","2px solid #00c8ff");
				$(".brand-nav li").eq(brandIndex).siblings().css("color","#000").find("span").css("borderBottom","0");
				$(".brand-content-cnt").eq(brandIndex).show().siblings().hide();
			})
			$(".brand-content-rightBtn").click(function(){
				brandIndex++;
				if(brandIndex>3){
					brandIndex = 0;
				}
				$(".brand-nav li").eq(brandIndex).css("color","#00C8FF").find("span").css("borderBottom","2px solid #00c8ff");
				$(".brand-nav li").eq(brandIndex).siblings().css("color","#000").find("span").css("borderBottom","0");
				$(".brand-content-cnt").eq(brandIndex).show().siblings().hide();
			})
	
		},
		//鼠标划过加阴影
		todayNewsShadow : function(){
			$(".todayNewsul>li").hover(function(){
				$(this).find(".news-shadow").show();
			},function(){
				$(this).find(".news-shadow").hide();
			})
		},
		//动态生成图片，根据窗口的高度+滚动的高度是否等于文档额高度来判断
		createGoods : function(){
			var arr = ["././images/news1.jpg","././images/news2.jpg","././images/news3.jpg",
						"././images/news4.jpg","././images/news5.jpg","././images/news6.jpg"				
			];
			var _scrolltop = $(window).scrollTop();
			var _windowHeight = $(window).height();
			var _docHeight = $(document).height();
			var todayNewsul = document.getElementsByClassName("todayNewsul")[0];
			var flag = 1;
			if( _docHeight>6779 ){
				flag = 0;
			}
			if((_scrolltop+_windowHeight) == _docHeight){
				if( flag ){
					var arr1 = [];
					for(var i=0; i<6; i++){
						var Oli = document.createElement("li");
						todayNewsul.appendChild(Oli);
						Oli.style.float = "left";
						Oli.style.width = "350px";
						Oli.style.height = "507px";
						Oli.style.margin = "25px 0 0 25px";
						Oli.style.background = "#FFFFFF";
						var Oimg = document.createElement("img");
						arr1.push(Oimg);
						Oimg.src = "././images/load_wait.gif";
						Oli.appendChild(Oimg);				
					}
						setTimeout(function(){
							for(var i=0;i<arr1.length;i++){
								arr1[i].src = arr[i];
							}	
							
						},1000)
					
				}
			
			}
		},
		//点击加入购物车，运动，以及存cookie
		addToCart :function(){
			var list = $(".todayNewsul").find(".price-info").find("a");		
			var cart = $(".borderSide").find(".cart");
				list.click(function(){
					var oCart = $("<img />");
					oCart.css({height:"20px",width:"20px",position:"absolute",left:0,top:0,zIndex:90})
					oCart.attr("src","images/购物车small.png");
					$(this).append(oCart);		
					var _left = $(this).offset().left;
					var _left1 = cart.offset().left;
					var x = _left1 - _left + "px";
					var _top = $(this).offset().top;
					var _top1 = cart.offset().top + 20;
					var y = _top1 - _top + "px";
					oCart.stop().animate({left:x,top:y},1000,function(){
						oCart.remove();
						var countSum = 0;
						var _goodsdata = eval(_cookie.getCookie("goodsinfo"));
						for(var i=0;i<_goodsdata.length;i++){
							countSum += _goodsdata[i]._count;
				
						}
						$(".borderSide").find(".cart").find("b").text(countSum);
						$(".cart-count").css({display:"block"});
						$(".cart-count").text(countSum);
						//console.log($(".borderSide").find(".cart").find("b").text());
					});
					var goods = $(this).parent().parent().find("a:first").text();
					var imgs = $(this).parent().parent().siblings().eq(0).attr("src");
					var prices = $(this).siblings("span").text();
					//console.log(goods,imgs,prices);
					var obj = {
						_img : imgs,
						_goodsname : goods,
						_price : prices,
						_count : 1
					}
					//console.log(obj);
					var goodsdata = _cookie.getCookie("goodsinfo");
					if(!goodsdata){
						var arr = [];
						arr.push(obj);
						//console.log(typeof arr);
						//console.log(typeof arrStr)
						_cookie.setCookie("goodsinfo",JSON.stringify(arr),10);//tosource对象的源代码
						
					}
					else{
						var arr = eval(goodsdata);
						var isIn = 0;
						for(var i=0;i<arr.length;i++){
							if (arr[i]._goodsname == obj._goodsname){
								isIn = 1;
								arr[i]._count +=1;
								_cookie.setCookie("goodsinfo",JSON.stringify(arr),10);
								break;
							}
						}
						if(!isIn){
							arr.push(obj);
							_cookie.setCookie("goodsinfo",JSON.stringify(arr),10);
						}
						
						
					}
				
				})
		},
		//倒计时
		countDown:function(){
			var all = 24*60*60;
			var Timer = setInterval(function(){
				all --;
				var day = parseInt(all/(24*60*60)) ;
				var hour = parseInt(all%(24*60*60)/(60*60));
				var min = parseInt(all%(24*60*60)%(60*60)/60) ;
				var sec = all%(24*60*60)%(60*60)%60;
				$(".list-content-time").find("i").text(day+"天"+hour+"小时"+min+"分"+sec+"秒");
				if(all<=0){
					clearInterval(Timer);
					return;
				}
			},1000)
		}
/*		searchCompletement:function(){
			$(".header_center-ipt1").keyup(function(){
				var _script = $("<script></script>");
				_script.attr("src","http://suggestion.baidu.com/su?wd="+$(this).val()+"&cb=show");
				$("body").append(_script);
			})
			window.show = function(data){
				$(".search-cnt").text("");
				for(var i = 0 ;i<data.s.length;i++){
					var p = $("<p></p>");
					p.text(data.s[i]);
					$(".search-cnt").append(p);
				}
			}
		}
*/
		
	}
})
