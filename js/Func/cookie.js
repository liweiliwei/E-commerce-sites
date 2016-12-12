define(["jquery"], function() {
	return {
		//存cookie
		setCookie: function(key, value, expires, path) {
			expires = expires || 0;
			path = path || "/";
			var d = null;
			if(expires) {
				d = new Date();
				d.setDate(d.getDate() + expires);

			}
			document.cookie = key + "=" + value + (d ? ";expires=" + d : "") + (path ? ";path=" + path : "")
		},
		//获取cookie
		getCookie: function(key) {
			var str = document.cookie;
			if(!str) {
				return "";
			}
			var arr1 = str.split("; "); //以;空格为标准分割成数组形式
			for(var i = 0; i < arr1.length; i++) {
				var arr2 = arr1[i].split("=");
				if(arr2[0] == key) {
					return arr2[1];
				}
			}
		}

	}
})