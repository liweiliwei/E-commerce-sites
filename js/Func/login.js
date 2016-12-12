require(["config"], function() {
	require(["jquery", "Toast", "loginBrand","commonBrand","_cookie"], function($, T, lB,cB,_cookie) {
		$(function() {
			lB.createCode();
			lB.changeCode();
			cB.headerTopNav();
			$(".captcha").blur(function() {
				var res = lB.checkCode($(this).val())
				if(!res) {
					T('验证码输入错误');
				}

			})
			$("._submit").click(function() {
				$.ajax({
					type: "get",
					url: "js/json/userInfo.json",
					success: function(data) {
						var flag = 0;
						var flag1 = 0;
						var flag2 = 0;
						for(var i = 0; i < data.length; i++) {
							if($(".phoneNumber").val() == data[i].username && $(".passWord").val() == data[i].userpwd) {
								flag1 = 1;
							}
						}
						var infodata = eval(_cookie.getCookie("userInfo"));
						//console.log(infodata)
						if(infodata){
							
							for(var i=0; i<infodata.length; i++){
								if($(".phoneNumber").val() == infodata[i]._name && $(".passWord").val() == infodata[i]._pwd) {
									flag2 = 1;
								}
							}
						}
						console.log(flag1 || flag2)
						if(flag1 || flag2){
							flag = 1;
						}
						if(flag && lB.checkCode($(".captcha").val())){
							console.log(1)
							T("登录成功!!");
							var _username = $(".phoneNumber").val();
							var _password = $(".passWord").val();
							var obj = {
								_name : _username,
								_pwd : _password
							}
							var arr = [];
							arr.push(obj);
							_cookie.setCookie("loginUser",JSON.stringify(arr),10);
							setTimeout(function(){
								window.location.href = "index.html";
							},2000)
						}else{
							T("登录失败，请检查信息是否填写正确");
						}
					}
				});
			})
		})
	})
})