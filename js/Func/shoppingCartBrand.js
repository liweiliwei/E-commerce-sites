define(["jquery","_cookie","Toast"],function($,_cookie,T){
	function Cart(){
		this.init = function(){
			this.goodsdata = _cookie.getCookie("goodsinfo");
			this._goodsdata = eval((this.goodsdata));
			this.table = $(".shoppingCartTable").find("table");
			this.count = $(".shoppingCart-allInfoShow2").children("p").find("span");
			this.price = $(".shoppingCart-allInfoShow2").children("em");	
			this.nav = $(".increasePurchase-nav").children().children();
			this.wrap = $(".increasePurchase-cnt");
			
			return this;
		}
		this.start = function(){
			this.check();
			this.addData();
			this.addAndCut();
			this._delete();
			this.cal();
			this.tabHover();
			this.jiesuan();
		}
		this.check = function(){
			if(this._goodsdata){
				$(".my-shoppingCart-have").show();
				$(".my-shoppingCart-none").hide();
			}else{
				$(".my-shoppingCart-have").hide();
				$(".my-shoppingCart-none").show();
			}
		}
		this.addData = function(){
			var self = this;
			if(this._goodsdata){				
				for(var i=0;i<this._goodsdata.length;i++){
					var tr = $("<tr></tr>");
					var td1 = $("<td></td>");
					var img =$("<img />")
					img.css({height:"80px",width:"68px",display:"block",float:"left"});
					img.attr("src",this._goodsdata[i]._img);
					var a = $("<a></a>");
					a.text(this._goodsdata[i]._goodsname);
					td1.append(img);
					td1.append(a);
					var td2 = $("<td></td>");
					td2.text(this._goodsdata[i]._price);
					var td3 = $("<td></td>");
					var span1 = $("<span></span>");
					span1.css({height:"14px",width:"14px",display:"block",float:"left",border:"1px solid #ccc",cursor:"pointer",borderRadius:"50%",margin:"5px",lineHeight:"14px"});
					span1.text("-");
					var input1 = $("<input />");
					input1.val(this._goodsdata[i]._count);
					input1.css({height:"22px",width:"29px",float:"left",textAlign:"center"})
					var span2 = $("<span></span>");
					span2.css({height:"14px",width:"14px",display:"block",float:"left",border:"1px solid #ccc",cursor:"pointer",borderRadius:"50%",margin:"5px"});
					span2.text("+");
					td3.append(span1);
					td3.append(input1);
					td3.append(span2);
					var td4 = $("<td></td>")
					td4.text(Number(this._goodsdata[i]._count) * Number(this._goodsdata[i]._price))
					td4.css({color:"red"});
					var td5 = $("<td></td>")
					td5.text(Number(this._goodsdata[i]._count) * Number(this._goodsdata[i]._price))
					var td6 = $("<td></td>")
					var span1 = $("<span></span>")
					span1.text("删除");
					span1.css({cursor:"pointer"});
					td6.append(span1);
					tr.append(td1);
					tr.append(td2);
					tr.append(td3);
					tr.append(td4);
					tr.append(td5);
					tr.append(td6);
					this.table.append(tr);
				}
			}
			
		}
		this.addAndCut = function(){
			var self = this;
			$(".shoppingCartTable").find("table").find("tr").find("td:eq(2)").find("span:eq(1)").click(function(){
				var cnt = $(this).parent().siblings().eq(0).find("a").text();
				//console.log(typeof cnt);
				var arr = self._goodsdata;
				for(var i=0; i<arr.length;i++){
					if(arr[i]._goodsname == cnt){
						arr[i]._count += 1;
						var num = Number($(this).parent().siblings().eq(1).text());
						$(this).siblings().eq(1).val(Number($(this).siblings().eq(1).val())+1);
						$(this).parent().siblings().eq(2).text(Number($(this).parent().siblings().eq(2).text())+num);
						$(this).parent().siblings().eq(3).text(Number($(this).parent().siblings().eq(3).text())+num);
						self.count.text(Number(self.count.text())+1);
						self.price.text(Number(self.price.text())+num);
						
					}
				}
				_cookie.setCookie("goodsinfo",JSON.stringify(arr),10);
				
			});
			$(".shoppingCartTable").find("table").find("tr").find("td:eq(2)").find("span:eq(0)").click(function(){
				var cnt = $(this).parent().siblings().eq(0).find("a").text();
				var arr = self._goodsdata;
				for(var i=0; i<arr.length;i++){
					if(arr[i]._goodsname == cnt){
						if(arr[i]._count <= 1){
							return;
						}else{
							
							arr[i]._count -= 1;
							var num = Number($(this).parent().siblings().eq(1).text());
							$(this).siblings().eq(0).val(Number($(this).siblings().eq(0).val())-1);
							$(this).parent().siblings().eq(2).text(Number($(this).parent().siblings().eq(2).text())-num);
							$(this).parent().siblings().eq(3).text(Number($(this).parent().siblings().eq(3).text())-num);
							self.count.text(Number(self.count.text())-1);
							self.price.text(Number(self.price.text())-num);
						}
						
					}
				}
				_cookie.setCookie("goodsinfo",JSON.stringify(arr),10);
				
			})
			
		}
		this._delete = function(){
			
			var self = this;
			$(".shoppingCartTable").find("table").find("tr").find("td:eq(5)").find("span").click(function(){
				var cnt = $(this).parent().siblings().eq(0).find("a").text();
				var arr = self._goodsdata;
				for(var i=0;i<arr.length;i++){
					if(arr[i]._goodsname == cnt){
						arr.splice(i,1);
						$(this).parent().parent().remove();
						var count = Number($(this).parent().siblings().eq(2).find("input").val());
						var price = Number($(this).parent().siblings().eq(1).text());
						self.count.text(Number(self.count.text())-count);
						self.price.text(Number(self.price.text())-price*count);
					}
					
				}
				_cookie.setCookie("goodsinfo",JSON.stringify(arr),10);
			})
		}
		this.cal = function(){
			var countSum = 0;
			var priceSum = 0;
			for(var i=0;i<this._goodsdata.length;i++){
				countSum += this._goodsdata[i]._count;
				priceSum += Number(this._goodsdata[i]._count) * Number(this._goodsdata[i]._price);
			}
			this.count.text(countSum);
			this.price.text(priceSum);
		}
		this.tabHover = function(){
			var self = this;
			this.nav.mouseover(function(){
				var index = $(this).index();
				$(this).addClass("active2").siblings().removeClass("active2");
				self.wrap.eq(index).show().siblings().hide();
			})
		}
		this.jiesuan = function(){
			$(".shoppingCart-allInfoShow2-a").click(function(){
				var goodsinfo = eval(_cookie.getCookie("loginUser"));
			
				if(!goodsinfo){
					T("请先登录!!")
					
				}else{
					window.location.href = "orderInfo.html";
				}
			})
		}
		
		
	}
	 Cart.instance = new Cart();
	 return Cart.instance;
	
})