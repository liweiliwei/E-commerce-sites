define(["jquery", "_cookie", "Toast"], function($, _cookie, T) {
	function OrderInfo() {
		this.init = function() {
			this.goodsData = eval(_cookie.getCookie("goodsinfo"));
			this.addressData = eval(_cookie.getCookie("addressInfo"))
			this.priceSum = 0;
			this.allSum = 0;
			this.flag1 = 0;
			this.flag2 = 0;
			this.flag3 = 0;
			this.flag4 = 0;

			return this;
		}
		this.start = function() {
			this.checkName();
			this.checkAddress();
			this.checkPostcode();
			this.checkPhone();
			this.addSelect();
			this.addGoods();
			this.cal();
			this.checkBtn();
			
		}
		this.checkName = function() {
			var self = this;
			$("#userName").blur(function() {
				if(!/^[\u4e00-\u9fa5]{2,4}$/.test($(this).val())) {
					T("姓名格式输入错误!!!");
					self.flag1 = 0
				} else {
					self.flag1 = 1
				}

			})
		}
		this.checkAddress = function() {
			var self = this;
			$("#detailAddress").blur(function() {
				if($(this).val() == "") {
					T("地址不能为空!!!");
					self.flag2 = 0
				} else {
					self.flag2 = 1
				}
			})
		}
		this.checkPostcode = function() {
			var self = this;
			$("#postCode").blur(function() {
				if(!/^[1-9][0-9]{5}$/.test($(this).val())) {
					new T("邮政编码格式输入错误!!!").init().show();
					self.flag3 = 0
				} else {
					self.flag3 = 1
				}
			})
		}
		this.checkPhone = function() {
			var self = this;
			$("#phoneNumber").blur(function() {
				if(!/^(13[0-9]{9})|(15[89][0-9]{8})$/.test($(this).val())) {
					new T("手机格式不正确!!!").init().show();
					self.flag4 = 0;
				} else {
					self.flag4 = 1;
				}
			})
		}
		this.addSelect = function() {			
		
			$.ajax({
				type: "get",
				url: "js/json/city.json",
				success: function(data) {
					//console.log(data.regions)
					data.regions.map(function(item, index) {
						var op = document.createElement("option");
						op.innerText = item.name;
						op.value = item.id;
						op.municipality = item.municipality ? true : false;
						$("#droplist").children(":eq(0)").append(op);
					});
				}
			});

			$("#droplist").on("change", "select", function(e) {
				var $this = $(e.target);
				//console.log($this.val());
				switch($this.index()) {
					case 0:
						{
							$("#droplist").children(":eq(1)").html("<option>市</option>")
							$("#droplist").children(":eq(2)").html("<option>县</option>")
							$.ajax({
								type: "get",
								url: "js/json/city.json",
								success: function(data) {
									var arr = data.regions.filter(function(item, index) {
										return item.id == $this.val();
									})[0].regions;
									//console.log(arr);
									arr.map(function(item) {
										var op = document.createElement("option");
										op.innerText = item.name;
										op.value = item.id;
										$("#droplist").children(":eq(1)").append(op);
									})
								}
							});
						}
						break;
					case 1:
						{
							$("#droplist").children(":eq(2)").html("<option>县</option>");
							$.ajax({
								type: "get",
								url: "js/json/city.json",
								success: function(data) {
									var arr = data.regions.filter(function(item, index) {
										return item.id == $("#droplist").children(":eq(0)").val();
									})[0].regions;

									var arr1 = arr.filter(function(item) {
										return item.id == $this.val();
									})[0].regions;
									/*console.log(arr.filter(function(item){
										return item.id == $this.val();
									}));*/

									arr1.map(function(item) {
										var op = document.createElement("option");
										op.innerText = item.name;
										op.value = item.id;
										$("#droplist").children(":eq(2)").append(op);
									})
								}
							});
						}
						break;

				}
				
			})
		

		}
		this.checkBtn = function(){
				var self = this;
				$(".address-btn").click(function(){
			
					if(self.flag1 && self.flag2 && self.flag3 && self.flag4){
						var name  = $("#userName").val();
						var address = $("#detailAddress").val();
						var post = $("#postCode").val();
						var phone = $("#phoneNumber").val();
						var _area = $("#droplist").find("select option:selected").text();
						self.obj = {
							name:name,
							address:address,
							post:post,
							phone:phone,
							_area:_area
						}
						setTimeout(function(){
							self.qiehuan()
						},1000)
						}
				})
			
		}
		this.qiehuan = function(){
			$(".address-wrap1").hide();
			$(".address-wrap2").show();
			var oLi = $("<li></li>");
			var p1 = $("<p></p>");
			p1.text("姓名:"+this.obj.name);
			var p2= $("<p></p>");
			p2.text("电话："+this.obj.phone);
			var p3 = $("<p></p>");
			p3.text("邮编:"+this.obj.post);
			var p4 = $("<p></p>");
			p4.text("详细地址："+this._area+this.address);
			oLi.append(p1);
			oLi.append(p2);
			oLi.append(p3);
			oLi.append(p4);
			$(".address-wrap2").find("ul").append(oLi)
		}
		this.addGoods = function() {

			//console.log(this.goodsData);
			for(var i = 0; i < this.goodsData.length; i++) {
				var tr = $("<tr></tr>");
				var td1 = $("<td></td>");
				var img = $("<img />")
				img.css({
					height: "80px",
					width: "68px",
					display: "block",
					float: "left"
				});
				img.attr("src", this.goodsData[i]._img);
				var a = $("<a></a>");
				a.text(this.goodsData[i]._goodsname);
				td1.append(img);
				td1.append(a);
				var td2 = $("<td></td>");
				td2.text(this.goodsData[i]._price);
				var td3 = $("<td></td>")
				td3.text(this.goodsData[i]._count);
				var td4 = $("<td></td>")
				td4.text(Number(this.goodsData[i]._count) * Number(this.goodsData[i]._price));
				tr.append(td1);
				tr.append(td2);
				tr.append(td3);
				tr.append(td4);
				$(".payTable").find("table").append(tr);

			}
		}
		this.cal = function() {
			for(var i = 0; i < this.goodsData.length; i++) {
				this.priceSum += Number(this.goodsData[i]._count) * Number(this.goodsData[i]._price);
			}
			this.allSum = (this.priceSum + Number($(".yunfei-em").text())).toFixed(2);
			//console.log(Number($(".yunfei-em").text()))
			$(".goodsPrice-em").text("￥" + this.priceSum);
			$(".allPrice-em").text("￥" + this.allSum);
			$(".remark-tip-right").find("em").text("￥" + this.allSum);
		}

	}
	OrderInfo.instance = new OrderInfo();
	return OrderInfo.instance;
})