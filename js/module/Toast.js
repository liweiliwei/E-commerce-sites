define(["jquery"], function() {
	var Toast = (function() {
	var t;
	return function(info) {
		if(!t) {
			var t = document.createElement("div");
			with(t.style) {
				padding = "15px";
				backgroundColor = "#443C12";
				color = "white";
				fontSize = "15px";
				fontFamily = "微软雅黑";
				borderRadius = "5px";
				opacity = 0;
				position = "fixed";
				left = "30%";
				top = "20%";
			}
			document.body.appendChild(t);
			t.style.marginLeft = -t.offsetWidth / 2 + "px";
			t.style.marginTop = -t.offsetHeight / 2 + "px";
			t.show = function(callback) {
				var num = 0;
				clearInterval(t.timer);
				t.timer = setInterval(function() {
					num += 0.02;
					t.style.opacity = num;
					if(num >= 1) {
						clearInterval(t.timer);
						setTimeout(function() {
							callback();
						}, 1000)
					}
				}, 30)
			}
			t.hide = function() {
				var num = 1;
				clearInterval(t.timer);
				t.timer = setInterval(function() {
					num -= 0.02;
					t.style.opacity = num;
					if(num <= 0) {
						clearInterval(t.timer);
					}
				}, 30)
			}
		}
		t.innerText = info;
		new Promise(t.show).then(t.hide);
	}
})();
	return Toast;
})