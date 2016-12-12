define(["jquery","_cookie","url"],function($,_cookie,getUrl){
	function ProductDetail(){
		this.init = function(){
			this.smallPic = $(".singleImg-wrap");
			this.smallcursor = $(".small-cursor");
			this.bigPic = $(".magnifying-glass-img");
			this.bigcursor = $(".magnifying-glass");
			this.cut = $(".addAndCut").find("span:eq(0)");
			this.add = $(".addAndCut").find("span:eq(1)");
			this.count = $(".addAndCut").find("input");
			this.addCart = $(".singleInfo-intro-div4").find("a");
			this.cart = $(".borderSide").find(".cart");
			this._input = $(".group-recommend-purchase-ul").find("li").find("input");
			this.page = 1;
			this.id = null;
			return this;
		}
		this.start = function(){
			this.getUrlInfo();
			this.ginseng();
			this.fangdajing();
			this.countAddAndCut();
			this.addToCart();
			this.groupBuy();
			this.createDiscuss();
			this.tabPage();
		}
		this.getUrlInfo = function(){
			this.id = getUrl.param("id")
			//console.log(this.id)
		}
		this.ginseng = function(){
			var self = this;
			$.ajax({
				type:"get",
				url:"js/json/goodsInfo.json",
				async:true,
				success:function(data){
					//console.log(data);
					for(var i=0;i<data.length;i++){
						if(data[i].id == self.id){
							$(".singleImg-wrap").css({background:"url("+data[i].src+")"});
							$(".magnifying-glass-img").attr("src",data[i].src);
							$(".singleInfo-intro").find("h1").text(data[i]._name);
							$(".singleInfo-intro-div1").find("em").text(data[i].price);
							$(".singleInfo-intro-div1").find("del").text(data[i].del);
							$("#group-recommend-purchase-img1").attr("src",data[i].src);
							$("#group-recommend-purchase-a1").text(data[i]._name);
							$("#group-recommend-purchase-p1").text(data[i].price);
							$(".buy-together").find("p").find("em").text(data[i].price)
							
						}
					}
				}
			});
		}
		this.fangdajing = function(){
			var self = this;
			this.smallPic.hover(function(){
				var _width = self.bigcursor.width()/self.bigPic.width() * self.smallPic.width();
				var _height = self.bigcursor.height()/self.bigPic.height() * self.smallPic.height();
				var _ratio = self.smallPic.width()/self.bigPic.width();
				//console.log(self.bigcursor.width(),self.bigPic.width())
				self.smallcursor.width(_width).height(_height).show();
				self.bigcursor.show();
				$(this).mousemove(function(e){
					var _mouseX = e.pageX - $(this).offset().left;
					var _mouseY = e.pageY - $(this).offset().top;
					//console.log(_width/2);
					self.smallcursor.css({
						left:Math.min(self.smallPic.width()-_width,Math.max(0,_mouseX-_width/2)),
						top:Math.min(self.smallPic.height()-_height,Math.max(0,_mouseY-_height/2))
						});
					self.bigPic.css({
						left:-self.smallcursor.position().left/_ratio,
						top:-self.smallcursor.position().top/_ratio
					})
				})
			},function(){
				self.smallcursor.hide();
				self.bigcursor.hide();
			})
		}
		this.countAddAndCut = function(){
			var self = this;
			this.add.click(function(){
				self.count.val(Number(self.count.val())+1);
				
			})
			this.cut.click(function(){
				if(self.count.val() == 1){
					return;
				}else{
					self.count.val(Number(self.count.val())-1);
				}
			})
		}
		this.addToCart = function(){
			var self = this;
			this.addCart.click(function(){
				var goodsdata = eval(_cookie.getCookie("goodsinfo"));
				var goods = $(".singleInfo-intro").find("h1").text();
				var prices = $(".singleInfo-intro-div1").find("em").text();
				var count = Number(self.count.val());
				var imgs = $(".magnifying-glass-img").attr("src");
				console.log(Number(count))
				var obj = {
						_img : imgs,
						_goodsname : goods,
						_price : prices,
						_count : count
					}
				if(!goodsdata){
					var arr = [];
					arr.push(obj);
					_cookie.setCookie("goodsinfo",JSON.stringify(arr),10);
					
				}else{
					var arr = goodsdata;
					var isIn = 0;
					for(var i=0;i<arr.length;i++){
						if (arr[i]._goodsname == obj._goodsname){
							isIn = 1;
							arr[i]._count += count;
							_cookie.setCookie("goodsinfo",JSON.stringify(arr),10);
							break;
					
						}
					}
					if(!isIn){
						arr.push(obj);
					}
					_cookie.setCookie("goodsinfo",JSON.stringify(arr),10);
					
				}
			});

		}
		this.groupBuy = function(){
			var self = this;
			
			this._input.click(function(){
				//console.log($(".group-recommend-purchase-ul").find("li").find("input:checked").length)
				$(".buy-together").find("p").find("i").text($(".group-recommend-purchase-ul").find("li").find("input:checked").length + 1)
				var arr = $(".group-recommend-purchase-ul").find("li").find("input:checked").siblings();
				var sum = 0
				if(arr.length>0){
					for(var i=0;i<arr.length;i++){
						sum += Number(arr[i].innerHTML)
					}
				}
				var price = Number($("#group-recommend-purchase-p1").text());
				
				$(".buy-together").find("p").find("em").text("￥"+(sum+price));
			})
		}
		this.createDiscuss = function(){
				$.ajax({
						url:"http://comment.secoo.com/comment/comment.jsp?process=5&pageSize=8&isImg=0&productId=13929107&productBrandId=3524&productCategoryId=1220",
						async:true,
						dataType:"jsonp",
						jsonp : "callback",
						data : {currPage:this.page},
						success : function(data){
							var list = data.data.productCommentList;							
							for(var i=0; i<list.length;i++){
								
								var dl = $("<dl></dl>")
								var dt = $("<dt></dt>")
								var img = $("<img />")
								img.attr("src","http://pic12.secooimg.com/home/detail/tx.jpg");
								var p = $("<p></p>");
								p.text(list[i].userName);
								dt.append(img);
								dt.append(p);
								dl.append(dt);
								var dd = $("<dd></dd>");
								var div1 = $("<div></div>");
								div1.text(list[i].content);
								div1.attr("class","userReputation-cnt")
								var div2 = $("<div></div>");
								div2.attr("class","userReputation-info")
								var span = $("<span></span>");
								span.text("来自:")
								var b = $("<b></b>");
								b.text(list[i].sourceText);
								var _i = $("<i></i>")
								_i.text("丨");
								_i.css({padding:"0 10px"});
								var em =$("<em></em>");								
								var d = new Date(list[i].createDate);
								d.toGMTString();							
								em.text(d);
								div2.append(span);
								div2.append(b);
								div2.append(_i);
								div2.append(em);
								dd.append(div1);
								dd.append(div2);
								dl.append(dt);
								dl.append(dd);
								$(".userReputation").append(dl);																
							}
						}
					});
		}
		this.tabPage = function(){
			var self = this;
			$(".paging-pre").click(function(){
				if(self.page <= 1){
					return;
				}else{
					self.page -= 1;
					$(".userReputation").html("");
					$.ajax({
						url:"http://comment.secoo.com/comment/comment.jsp?process=5&pageSize=8&isImg=0&productId=13929107&productBrandId=3524&productCategoryId=1220",
						async:true,
						dataType:"jsonp",
						jsonp : "callback",
						data : {currPage:self.page},
						success : function(data){
							var list = data.data.productCommentList;							
							for(var i=0; i<list.length;i++){
							
								var dl = $("<dl></dl>")
								var dt = $("<dt></dt>")
								var img = $("<img />")
								img.attr("src","http://pic12.secooimg.com/home/detail/tx.jpg");
								var p = $("<p></p>");
								p.text(list[i].userName);
								dt.append(img);
								dt.append(p);
								dl.append(dt);
								var dd = $("<dd></dd>");
								var div1 = $("<div></div>");
								div1.text(list[i].content);
								div1.attr("class","userReputation-cnt")
								var div2 = $("<div></div>");
								div2.attr("class","userReputation-info")
								var span = $("<span></span>");
								span.text("来自:")
								var b = $("<b></b>");
								b.text(list[i].sourceText);
								var _i = $("<i></i>")
								_i.text("丨");
								_i.css({padding:"0 10px"});
								var em =$("<em></em>");								
								var d = new Date(list[i].createDate);
								d.toGMTString();							
								em.text(d);
								div2.append(span);
								div2.append(b);
								div2.append(_i);
								div2.append(em);
								dd.append(div1);
								dd.append(div2);
								dl.append(dt);
								dl.append(dd);
								$(".userReputation").append(dl);																
							}
						}
					});
				}
			})
			$(".paging-next").click(function(){
				self.page += 1;
				$(".userReputation").html("");
				$.ajax({
						url:"http://comment.secoo.com/comment/comment.jsp?process=5&pageSize=8&isImg=0&productId=13929107&productBrandId=3524&productCategoryId=1220",
						async:true,
						dataType:"jsonp",
						jsonp : "callback",
						data : {currPage:self.page},
						success : function(data){
							var list = data.data.productCommentList;							
							for(var i=0; i<list.length;i++){
							
								var dl = $("<dl></dl>")
								var dt = $("<dt></dt>")
								var img = $("<img />")
								img.attr("src","http://pic12.secooimg.com/home/detail/tx.jpg");
								var p = $("<p></p>");
								p.text(list[i].userName);
								dt.append(img);
								dt.append(p);
								dl.append(dt);
								var dd = $("<dd></dd>");
								var div1 = $("<div></div>");
								div1.text(list[i].content);
								div1.attr("class","userReputation-cnt")
								var div2 = $("<div></div>");
								div2.attr("class","userReputation-info")
								var span = $("<span></span>");
								span.text("来自:")
								var b = $("<b></b>");
								b.text(list[i].sourceText);
								var _i = $("<i></i>")
								_i.text("丨");
								_i.css({padding:"0 10px"});
								var em =$("<em></em>");								
								var d = new Date(list[i].createDate);
								d.toGMTString();							
								em.text(d);
								div2.append(span);
								div2.append(b);
								div2.append(_i);
								div2.append(em);
								dd.append(div1);
								dd.append(div2);
								dl.append(dt);
								dl.append(dd);
								$(".userReputation").append(dl);																
							}
						}
					});
			})
		}
	}
	ProductDetail.instance = new ProductDetail();
	return ProductDetail.instance;
})