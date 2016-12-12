define(["jquery"],function($){
	function List(){
		this.init = function(){
			this.showOrHide = $(".showOrHide1");
			return this;
		}
		this.start = function(){
			this.show();
			this.loadInfo();
		}
		this.show = function(){
			var self = this;
			var flag = 1;
			//点击展示，并生成滚动条
			this.showOrHide.click(function(){
				if(flag){
					$(this).text("收起");
					$(this).parent().css({height:"154px"});
					$(this).parent().children(".lb_menu_1_cnt").css({height:"154px"})
					self._scroll = $("<div></div>")
					self._scroll.css({height:"85%",width:"1px",background:"#ccc",position:"absolute",top:"8%",
								right:"60px",zIndex:10})
					self._scrollBar = $("<div></div>");
					self._scrollBar.css({height:"30px",width:"4px",background:"#000",position:"absolute",top:0,right:0})
					self._scroll.append(self._scrollBar);
					$(this).parent().append(self._scroll);
					flag = 0;
					self.scroll();
				}else{
					$(this).text("展开");
					$(this).parent().css({height:"20px"});
					$(this).parent().children(".lb_menu_1_cnt").css({height:"20px"});
					self._scroll.remove();
					flag = 1;

				}	
				
			})
		}	
		//鼠标按下拖拽
		this.scroll = function(){
			var self = this;
			this._scrollBar.mousedown(function(e){
				$(this).css({cursor:"pointer"})
				var disx = e.offsetX;
				var disy = e.offsetY;
				$(".lb_menu_1").mousemove(function(e){
					var _top = e.clientY + document.documentElement.scrollTop+document.body.scrollTop-self._scroll.offset().top-disx;
					if(_top<0){
						_top = 0;
					}
					if(_top>(self._scroll.height()-self._scrollBar.height())){
						_top = self._scroll.height()-self._scrollBar.height();
					}
					self._scrollBar.css({top:_top});
					$(".lb_menu_1_cnt")[0].scrollTop = self._scrollBar[0].offsetTop/self._scroll.height()*$(".a_wrap").height();
				})

			})
			$(".lb_menu_1").mouseup(function(){				
				console.log(1)
				$(".lb_menu_1")[0].onmousemove = "";
			})							
		}
		this.loadInfo = function(){
			$.ajax({
				url:"js/json/goodsInfo.json",
				success:function(data){
					//请求的数据添加成li装在arr里面
					var arr = [];
					data.forEach(function(item){						
						var oLi = $("<li></li>");
						var oA = $("<a></a>");
						oA.css({dispaly:"block"});
						oA.attr("href","ProductDetails.html?id="+item.id);
						var oImg = $("<img/>");
						oImg.attr("src",item.src);
						oImg.css({height:item.height,width:item.width});
						oA.append(oImg);
						var oDiv = $("<div></div>")
						oDiv.attr("class","goods_price");					
						var oDiv3 = $("<div></div>");
						oDiv3.attr("class","goodsName");
						oDiv3.text(item._name);
						oDiv.append(oDiv3);
						var oDiv1 = $("<div></div>");
						oDiv1.attr("class","nowPriceAndBuy");
						var oI = $("<i></i>");
						oI.text("￥");
						oDiv1.append(oI);
						var oSpan = $("<span></span>");
						oSpan.text(item.price);
						oDiv1.append(oSpan);
						var oDel = $("<del></del>");
						oDel.text(item.del);
						oDiv1.append(oDel);
						var oDiv2 = $("<div></div>");
						oDiv2.addClass("addTocart");
						oDiv2.text("加入购物车");
						oDiv1.append(oDiv2);
						oDiv.append(oDiv1);
						oA.append(oDiv);
						oLi.append(oA);
						arr.push(oLi);					
					})
					var index = 1;
					for(var i=(index-1)*8;i<index*8;i++){
						$(".goodsList-ul").append(arr[i]);
					}
					//console.log($(".pageCount").find("si").eq(0));
					//上一页点击
					$(".pageCount").find("i").eq(0).click(function(){
						index--;
						if(index<=1){
							index = 1;
						}
						$(".goodsList-ul").text("");
						for(var i=(index-1)*8;i<index*8;i++){
							$(".goodsList-ul").append(arr[i]);
						}
						$(".pageCount").find("b").text(index);
					})
					//下一页点击
					$(".pageCount").find("i").eq(1).click(function(){
						index++;
						if(index>=4){
							index = 4;
						}
						$(".goodsList-ul").text("");
						for(var i=(index-1)*8;i<index*8;i++){
							$(".goodsList-ul").append(arr[i]);
						}
						$(".pageCount").find("b").text(index);
					})
					//菜单点击变换样式
					$(".pb_subnav").find("a").click(function(){
						$(this).css({background:"#fff",color:"#000"}).siblings().css({background:"#6c6c6c",color:"#fff"})
					})
					//排序 
					$(".pb_subnav").find("a").eq(3).click(function(){
						$(this).css({background:"#fff",color:"#000"}).siblings().css({background:"#6c6c6c",color:"#fff"})
						for(var i=0; i<arr.length; i++){
							for(var j=0; j<arr.length-1-i; j++){
								if(Number(arr[j].find("span").text())>Number(arr[j+1].find("span").text())){
									var temp;
									temp = arr[j];
									arr[j]=arr[j+1];
									arr[j+1] = temp;
									
								}
							}
						}
						$(".goodsList-ul").text("");
						for(var k=(index-1)*8;k<index*8;k++){
							$(".goodsList-ul").append(arr[k]);
						}
					})
				}
			})
		}
	}
	List.instance = new List();
	return List.instance;
})