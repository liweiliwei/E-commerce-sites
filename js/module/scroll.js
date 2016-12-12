define(["jquery"],function($){
	
		function Scroll(num,obj){
			this.init = function(){
				this._scrolltop = $(window).scrollTop();

				
				return this;
				
			}
			this.start = function(){
				this.check();
			}
			this.check = function(){
				if(this._scrolltop >num ){
					$("."+obj).show();
				}else{
					$("."+obj).hide();
				}
			}
		}
		
		
		return Scroll;
	
})