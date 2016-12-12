define(["jquery"],function($){
	function Hover(obj1,obj2,pram,speed,_color,pram1){
		this.init = function(){
			this.obj1 = obj1;
			this.obj2 = obj2;
			this.pram = pram;
			this.speed = speed;
			this._color = _color; 
			this.pram1 = pram1;
			return this;
		}
		this.start = function(){
			this.hover();
		}
		this.hover = function(){
			var self = this;
			$("."+this.obj1).hover(function(){
				$("."+self.obj2).show().stop().animate(self.pram,self.speed);
				$(this).css("background",self._color);
			
				
			},function(){
				$("."+self.obj2).stop().animate(self.pram1,self.speed).hide();
				$(this).css("background","")
			})
		}
	}
	return Hover;
})