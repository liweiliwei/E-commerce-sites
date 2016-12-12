define(["jquery", "_cookie", "jquery-ui"], function($, _cookie) {
	return {
		checkCount:function(){
			var infodata = eval(_cookie.getCookie("goodsinfo"));
			var sum = 0;
			if(infodata){
				$(".cart-count").css({display:"block"});
				for(var i=0;i<infodata.length;i++){
					sum += infodata[i]._count;
				}
				$(".cart-count").text(sum);
			}
		},
		checkUser:function(){
			var infodata = eval(_cookie.getCookie("loginUser"));
			if(infodata){
				$(".login-wrap").html("欢迎您"+infodata[0]._name);
				$(".login-wrap").css({color:"##00C8FF"})
				$(".register-wrap").html("<a href='index.html'>[退出]</a>")
				$(".register-wrap").click(function(){
					cm.setCookie("loginUser",JSON.stringify(infodata),-1)
				})
			}
		},
		headerTopNav: function() {
			$(".header-top-ul>li").not(":nth-child(2)").hover(function() {
				$(this).css("background", "#fff").find("img").eq(0).attr("src", "images/上尖号.png");
				$(this).find(".header-top-ul1").slideDown(500);

			}, function() {
				$(this).css("background", "").find("img").eq(0).attr("src", "images/下尖号.png");
				$(this).find(".header-top-ul1").slideUp(500);
			});
		},
		searchCompletement: function() {
			$(".header_center-ipt1").autocomplete({
				source: function(request, response) {
					var _script = document.createElement("script");
					_script.src = "http://suggestion.baidu.com/su?wd=" + request.term + "&cb=show";
					document.body.appendChild(_script);
					window.show = function(data) {
						response(data.s);
					}
				}
			});
		},
		headerBottomNav: function() {
			$(".header-bottom-ul1>li").eq(1).hover(function() {
				$(this).addClass("active");
				$(this).find(".zhiwoStore").slideDown(500);

			}, function() {
				$(this).removeClass("active");
				$(this).find(".zhiwoStore").slideUp(100);
			})
			$(".header-bottom-ul1>li").eq(2).hover(function() {
				$(this).find("img").attr("src", "images/home_overseas_current.gif");

			}, function() {
				$(this).find("img").attr("src", "images/home_overseas.gif")
			})
		},
		headerBottomAccordion: function() {
			$(".header-bottom-box-1").hover(function() {
				$(this).stop().animate({
					width: 120
				}).siblings().stop().animate({
					width: 20
				});
			}, function() {
				$(this).stop().animate({
					width: 20
				});
			})
		},
		flotageCart: function() {
			$(".cart").hover(function() {
				$(this).css("background", "#00C8FF").find("b").css("color", "red").css("background", "url(images/sidebarico.png) no-repeat top -245px left 0");
			}, function() {
				$(this).css("background", "").find("b").css({
					"color": "#ffffff",
					"background": "url(images/sidebarico.png) no-repeat top -210px left 0"
				});
			})

		},
		flotageCode: function() {
			$(".twoCode").hover(function() {
				$(this).css("background", "#00C8FF");
				$(".twoCode-brand").show();
			}, function() {
				$(this).css("background", "");
				$(".twoCode-brand").hide();
			})
		},
		flotageTopClick: function() {
			$(".goTop").click(function() {
				$(window).scrollTop(0);
			})
		},
		flotageTop: function() {
			$(".goTop").hover(function() {
				$(this).css("background", "#00C8FF");
			}, function() {
				$(this).css("background", "");
			})

		},
		updateCartCount: function() {
			var countSum = 0;
			var _goodsdata = eval(_cookie.getCookie("goodsinfo"));
			if(_goodsdata == undefined) {
				countSum = 0;
			} else {
				for(var i = 0; i < _goodsdata.length; i++) {
					countSum += _goodsdata[i]._count;

				}

			}
			$(".borderSide").find(".cart").find("b").text(countSum);
		},

	}

})