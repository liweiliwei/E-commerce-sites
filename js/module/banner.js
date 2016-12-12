define(["jquery"], function($) {
	function Banner(father, obj1, obj2, _class, _class1) {
		this.init = function() {
			this.index = 0;
			this.father = father;
			this.obj1 = obj1;
			this.obj2 = obj2;
			this._class = _class;
			this._class1 = _class1;
			this.children1 = $("." + this.obj1).children();
			this.children2 = $("." + this.obj2).children();
			return this;
		}
		this.start = function() {
			this.tab();
			this.mouseIn();
			this.circleClick();
		}
		this.tab = function() {
			var self = this;
			this.Timer = setInterval(function() {
				self.index++;
				if(self.index > (self.children1.length - 1)) {

					self.index = 0;
				}

				self.children1.eq(self.index).show().addClass(self._class1).siblings().hide()

				self.children2.eq(self.index).addClass(self._class).siblings().removeClass(self._class);
			}, 2000)
		}
		this.mouseIn = function() {
			var self = this;
			$("." + this.father).hover(function() {
				clearInterval(self.Timer);
			}, function() {
				self.Timer = setInterval(function() {
					self.index++;
					if(self.index > (self.children1.length - 1)) {

						self.index = 0;
					}

					self.children1.eq(self.index).show().addClass(self._class1).siblings().hide();

					self.children2.eq(self.index).addClass(self._class).siblings().removeClass(self._class);
				}, 2000)
			})
		}

		this.circleClick = function() {
			var self = this;
			this.children2.click(function() {
				self.index = $(this).index();

				self.children1.eq(self.index).show().addClass(self._class1).siblings().hide();

				self.children2.eq(self.index).addClass(self._class).siblings().removeClass(self._class);
			})
		}
	}
	return Banner;
})