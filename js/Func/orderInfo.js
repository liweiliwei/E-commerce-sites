require(["config"],function(){
	require(["jquery","commonBrand","orderInfoBrand"],function($,cB,oIB){
		$(function(){
			cB.headerTopNav();
			cB.checkUser();
			oIB.init().start();
		})
	})
})
