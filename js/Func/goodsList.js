require(["config"],function(){
	require(["jquery","goodsListBrand","hover","commonBrand"],function($,gLB,Hover,cB){
		$(function(){
			gLB.init().start();
			new Hover("login", "login-brand", {
				opacity: 1,
				left: "-103px"
			}, 300, "#00C8FF", {
				opacity: 0,
				left: "-150px"
			}).init().start();
			new Hover("_collect", "_collect-brand", {
				opacity: 1,
				left: "-103px"
			}, 300, "#00C8FF", {
				opacity: 0,
				left: "-150px"
			}).init().start();
			new Hover("_history", "_history-brand", {
				opacity: 1,
				left: "-103px"
			}, 300, "#00C8FF", {
				opacity: 0,
				left: "-150px"
			}).init().start();
			new Hover("_service", "_service-brand", {
				opacity: 1,
				left: "-103px"
			}, 300, "#00C8FF", {
				opacity: 0,
				left: "-150px"
			}).init().start();
			cB.headerTopNav();
			cB.searchCompletement();
			cB.headerBottomNav();
			cB.headerBottomAccordion();
			cB.flotageCart();
			cB.flotageCode();
			cB.checkUser();
			cB.checkCount();
			cB.flotageTop();
			cB.flotageTopClick();
			cB.updateCartCount();
		})
	})
})
