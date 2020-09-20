	function textSize(fontSize,fontFamily,text){//获取文本的宽度大小
		var span = document.createElement("font");
		var result = {};
		result.width = span.offsetWidth;
		result.height = span.offsetHeight;
		span.style.visibility = "hidden";
		span.style.fontSize = fontSize;
		span.style.fontFamily = fontFamily;
		span.style.display = "inline-block";
		document.body.appendChild(span);
		if(typeof span.textContent != "undefined"){
			span.textContent = text;
		}else{
			span.innerText = text;
		}
		result.width = parseFloat(window.getComputedStyle(span).width) - result.width;
		result.height = parseFloat(window.getComputedStyle(span).height) - result.height;
		return result;
	}
	
	// 拼接json类型的对象
	function JsonJoin(Json_One, Json_Tow) {
	  let Join_Json = []
		
		for (let X = 0, Y = Json_One.length;X<Y;X++) {
		  Join_Json.push(Json_One[X])
		}
		
		for (let X = 0, Y = Json_Tow.length;X<Y;X++) {
		  Join_Json.push(Json_Tow[X])
		}
		
		return Join_Json
	}