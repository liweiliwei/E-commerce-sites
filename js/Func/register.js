require(["config"], function() {
require(["jquery", "registerBrand", "Toast","commonBrand","_cookie"], function($, rB, T,cB,_cookie) {
	$(function() {
		rB.createCode();
		rB.changeCode();
		cB.headerTopNav();
		$(".phoneNumber").blur(function() {
			var res = rB.checkPhone($(this).val())
			if(!res) {
				T("请输入以15/13开头的11位数字")
			}
		})
		$(".passWord").blur(function() {
			var res = rB.checkPwd($(this).val());
			if(!res) {
				T("请输8-14位数字和字母的组合")
			}
		})
		$(".rePassWord").blur(function() {
			var res = rB.checkRePwd($(this).val());
			if(!res) {
				T("两次输入密码不一样")
			}
		})
		$(".captcha").blur(function() {
			var res = rB.checkCode($(this).val())
			if(!res) {
				T("验证码输入错误")
			}
		})
		$("._submit").click(function() {
			var result = rB.checkPhone($(".phoneNumber").val(), function() {}) && rB.checkPwd($(".passWord").val()) && rB.checkRePwd($(".rePassWord").val()) && rB.checkCode($(".captcha").val());
			if(!result) {
				T("请完成所有选项")
				return;
			}
			$.ajax({
				type: "get",
				url: "js/json/userInfo.json",
				success: function(data) {
					for(var i = 0; i < data.length; i++) {
						//console.log($(".phoneNumber").val(), data[i].username);
						if($(".phoneNumber").val() == data[i].username) {
							T("用户名已存在!!")
							return;
						}

					}
					var infodata = eval(_cookie.getCookie("userInfo"));
					if(infodata){
						for(var i=0;i<infodata.length;i++){
							if($(".phoneNumber").val() == infodata[i]._name) {
								T("用户名已存在!!")
								return;
							}
						}
						
					}
				T("注册成功!!")
					var _username = $(".phoneNumber").val();
					var _password = $(".passWord").val();
					var obj = {
						_name : _username,
						_pwd : _password
					}
					
					
					if(!infodata){
						var arr = [];
					}else{
						var arr = infodata;
					}
					arr.push(obj);
					console.log(arr)
					_cookie.setCookie("userInfo",JSON.stringify(arr),10);
					
						setTimeout(function() {
							window.location.href = "_login.html";
		
					}, 2000)

				}
			});


		});

	});

});
});
