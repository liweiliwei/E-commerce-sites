define(["jquery"],function($){
	function CheckRegister(){
		
	
		this.checkPhone = function(txt,callback){
			if(! /^(13[0-9]{9})|(15[0-9]{9})$/.test(txt)){
				return false;
			}else{

				return true;	
			}
			
		}
		this.checkPwd = function(txt){
			if(!/^[a-zA-z0-9]{8,14}/.test(txt)){
				return false;
			}else{
				return true;
			}
			
		}
		this.checkRePwd = function(txt){
			if(txt != $(".passWord").val()){
				
				return false;
			}else{
				return true;
			}
			
		}
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
	CheckRegister.instance=new CheckRegister();//单例

		return CheckRegister.instance;
});
