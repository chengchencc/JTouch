﻿/*
	Name: Javascript Translate Plugin 
	Link: niumowang.org
	Author: ok8008@yeah.net
*/
(function(){
	var Translate = function(params){
		var _this = this;
		_this.params = params;
		_this.len = _this.current = _this.bothWidth = 0;
		_this.obj =  _this.params.obj || document.getElementById('touch');
		_this.items = _this.params.items || _this.obj.getElementsByTagName('li');
		_this.circle = _this.params.circle || false;
		window.addEventListener('orientationchange',function(){
			_this.init();
		},false);
		_this.init();
	};
	Translate.prototype.init=function(){
		var _this = this;
		_this.width = document.body.offsetWidth;
		_this.len = _this.items.length;
		_this.bothWidth = _this.width*_this.len;
		for(var i=0;i<_this.len;i++){
			_this.items[i].style.width = _this.width+'px';
		}
		_this.obj.style.width = _this.bothWidth +'px';
		_this.obj.style.webkitTransform = 'translate3d(0,0,0)';
		if(_this.circle){
			_this.circleShow();
		};
	};
	Translate.prototype.circleShow = function(){
		var _this = this;
		if(!_this.circleObj && _this.circle){
			var newObj = document.createElement('div');
			newObj.id = 'circle';
			var html = '';
			for(var j=0;j<_this.len;j++){
				if(j == 0){
					html += '<a href="#" class="cur"></a>';
				}else{
					html += '<a href="#" ></a>';
				};
			};
			newObj.innerHTML = html;
			_this.obj.parentNode.appendChild(newObj);
			_this.circleObj = newObj;
		};
	};
	Translate.prototype.circleTurn = function(num){
		var _this = this;
		for(var i=0;i<_this.len;i++){
			if(i == num){
				_this.circleObj.getElementsByTagName('a')[i].className = 'cur';
			}else{
				_this.circleObj.getElementsByTagName('a')[i].className = '';
			}
		}
	};
	Translate.prototype.offset = function(distance){
		var _this = this;
		_this.removeClass(_this.obj,'animate');
		var nowPercent = -(100/_this.len)*_this.current;
        var movePercent = (100/_this.bothWidth)*distance;
		_this.move(nowPercent+movePercent);
	};
	Translate.prototype.move = function(percent){
		var _this = this;
		_this.obj.style.webkitTransform = 'translate3d('+percent+'%,0,0)';
		if(_this.circle){
			_this.circleTurn(_this.current);
		}
	};
	Translate.prototype.end = function(distance){
		var _this = this;
		_this.addClass(_this.obj,'animate');
		if(Math.abs(distance) > _this.width/2){
			if(distance<0){
				_this.current = (_this.current+1<_this.len)?_this.current+1:_this.len-1;
				var percent = (100/_this.len)*_this.current;
				_this.move(-percent);
			}else{
				_this.current = (_this.current > 1)?_this.current-1:0;
				var percent = (100/_this.len)*_this.current;
				_this.move(-percent);
			}
		}else{
			var percent = (100/_this.len)*_this.current;
			_this.move(-percent);
		};
	};
	Translate.prototype.next = function(){
		var _this = this;
		_this.addClass(_this.obj,'animate');
		_this.current = (_this.current+1<_this.len)?_this.current+1:_this.len-1;
		_this.move(-(100/_this.len)*_this.current);
	};
	Translate.prototype.prev = function(){
		var _this = this;
		_this.addClass(_this.obj,'animate');
		_this.current = (_this.current > 1)?_this.current-1:0;
		_this.move(-(100/_this.len)*_this.current);
	};
	Translate.prototype.addClass=function(element,value){
		if(!element.className){
			element.className = value;
		}else{
			var oValue = element.className;
			oValue += " ";
			oValue += value;
			element.className = oValue;
		}
	};
	Translate.prototype.removeClass=function(element, className){
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		if (element.className.match(reg)){
			var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
			element.className = element.className.replace(reg, ' ');
		}
	};
	window.Translate = Translate;
}());