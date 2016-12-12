define(["jquery"],function(){
	function CheckLogin(){
		this.createCode = function(){
			var arr = [0, 0, 0, 0];
			for(var i = 0; i < arr.length; i++) {
				var rand = 0;
				rand = Math.round(Math.random() * 42 + 48); 
				if((rand >= 48 && rand < 57) || (rand > 65 && rand <= 90)) {//48到57 是0-9  65到90是A-Z	
					arr[i] = String.fromCharCode(rand);
				}

			}
			$(".authCode").children("span").text(arr.join(""));
		}
		this.changeCode = function(){
			$(".authCode").children("b").click(function(){
				var arr = [0, 0, 0, 0];
				for(var i = 0; i < arr.length; i++) {
					var rand = 0;
					rand = Math.round(Math.random() * 42 + 48); 
					if((rand >= 48 && rand < 57) || (rand > 65 && rand <= 90)) {//48到57 是0-9  65到90是A-Z	
						arr[i] = String.fromCharCode(rand);
					}
	
				}
				$(".authCode").children("span").text(arr.join(""));
			})
		}
		this.checkCode = function(txt){
			if(txt != $(".authCode span").text()){
					
					return false;
				}else{
					return true;
				}
		}
	}
	CheckLogin.instance = new CheckLogin();
	return CheckLogin.instance;
})