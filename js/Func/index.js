require(["config"], function() {
	require(["jquery", "banner", "hover", "indexBrand", "scroll", "floorNav", "commonBrand"], function(jq, Banner, Hover, iB, Scroll, FloorNav, cB) {
		jq(function() {
			new Banner("banner", "banner-ul1", "banner-ul2", "active1", "addZoom").init().start();
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
			iB.ADclick();
			iB.xiaozhiClick();
			iB.hotBrandClick();
			cB.checkUser();
			cB.headerTopNav();
			cB.searchCompletement();
			cB.checkCount();
			cB.headerBottomNav();
			cB.headerBottomAccordion();
			$(window).scroll(function() {

				new Scroll(100, "flotage").init().start();
				iB.createGoods();
				new FloorNav().init().start();
			})
			cB.flotageCart();
			cB.flotageCode();
			cB.flotageTop();
			iB.todayNewsShadow();
			cB.flotageTopClick();
			iB.addToCart();
			//console.log(cm.getCookie("goodsinfo"))
			cB.updateCartCount();
			iB.countDown();
			//iB.searchCompletement();


		})
	})
})