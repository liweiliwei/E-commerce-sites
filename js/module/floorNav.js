define(["jquery"],function(){
	function FloorNav(){
		this.init = function(){
			this.scrTop = $(window).scrollTop();
			return this;
		}
		this.start =function(){
			this.wheel();
			this._flotageClick();
		}
		this.wheel = function(){
			if(this.scrTop < $("#jinritoutiao").offset().top){
				$(".flotage li").eq(0).addClass("active").siblings().removeClass("active");
			}
			if(this.scrTop >= $("#jinritoutiao").offset().top){
				$(".flotage li").eq(1).addClass("active").siblings().removeClass("active");
			}
			if(this.scrTop >= $("#pinpaituan").offset().top){
				$(".flotage li").eq(2).addClass("active").siblings().removeClass("active");
			}
			if(this.scrTop >= $("#jinrixinpin").offset().top){
				$(".flotage li").eq(3).addClass("active").siblings().removeClass("active");
			}
			
		}
		this._flotageClick = function(){
			$(".flotage li").eq(0).click(function(){
				$(window).scrollTop(0);
			})
			$(".flotage li").eq(1).click(function(){
				$(window).scrollTop($("#jinritoutiao").offset().top);
			})
			$(".flotage li").eq(2).click(function(){
				$(window).scrollTop($("#pinpaituan").offset().top);
			})
			$(".flotage li").eq(3).click(function(){
				$(window).scrollTop($("#jinrixinpin").offset().top);
			})
		}
	}
	return FloorNav;//构造函数
})