	
	(function(){
		document.getElementById("clear").addEventListener("click", clearText);
		document.getElementById("point").addEventListener("click", ()=>{addPoint(document.getElementById("point"))});
		document.getElementById("add").addEventListener("click", ()=>{addLogOp(document.getElementById("add"))});
		document.getElementById("minus").addEventListener("click", ()=>{addLogOp(document.getElementById("minus"))});
		document.getElementById("multi").addEventListener("click", ()=>{addLogOp(document.getElementById("multi"))});
		document.getElementById("divide").addEventListener("click", ()=>{addLogOp(document.getElementById("divide"))});
		document.getElementById("mod").addEventListener("click", ()=>{addLogOp(document.getElementById("mod"))});
		document.getElementById("chara").addEventListener("click", ()=>{addLogOp(document.getElementById("chara"))});
		document.getElementById("num0").addEventListener("click", ()=>{addExp(document.getElementById("num0"))});
		document.getElementById("num1").addEventListener("click", ()=>{addExp(document.getElementById("num1"))});
		document.getElementById("num2").addEventListener("click", ()=>{addExp(document.getElementById("num2"))});
		document.getElementById("num3").addEventListener("click", ()=>{addExp(document.getElementById("num3"))});
		document.getElementById("num4").addEventListener("click", ()=>{addExp(document.getElementById("num4"))});
		document.getElementById("num5").addEventListener("click", ()=>{addExp(document.getElementById("num5"))});
		document.getElementById("num6").addEventListener("click", ()=>{addExp(document.getElementById("num6"))});
		document.getElementById("num7").addEventListener("click", ()=>{addExp(document.getElementById("num7"))});
		document.getElementById("num8").addEventListener("click", ()=>{addExp(document.getElementById("num8"))});
		document.getElementById("num9").addEventListener("click", ()=>{addExp(document.getElementById("num9"))});
		document.getElementById("equal").addEventListener("click", getResult);


		document.onkeydown=function(event) {
			let e = event || window.event || arguments.callee.caller.arguments[0];
			let shiftKey = e.shiftKey || e.metaKey;
			if(e.keyCode == 48 && !shiftKey){
				addExp(document.getElementById("num0"));
			}
			if(e.keyCode == 49 && !shiftKey){
				addExp(document.getElementById("num1"));
			}
			if(e.keyCode == 50 && !shiftKey){
				addExp(document.getElementById("num2"));
			}
			if(e.keyCode == 51 && !shiftKey){
				addExp(document.getElementById("num3"));
			}
			if(e.keyCode == 52 && !shiftKey){
				addExp(document.getElementById("num4"));
			}
			if(e.keyCode == 53 && !shiftKey){
				addExp(document.getElementById("num5"));
			}
			if(e.keyCode == 54 && !shiftKey){
				addExp(document.getElementById("num6"));
			}
			if(e.keyCode == 55 && !shiftKey){
				addExp(document.getElementById("num7"));
			}
			if(e.keyCode == 56 && !shiftKey){
				addExp(document.getElementById("num8"));
			}
			if(e.keyCode == 57 && !shiftKey){
				addExp(document.getElementById("num9"));
			}else if(shiftKey && e.keyCode==56) {
			 	addLogOp(document.getElementById("multi"));
			} else if(shiftKey && e.keyCode==187) {
				addLogOp(document.getElementById("add"));
			} else if(e && e.keyCode== 191) {
				addLogOp(document.getElementById("divide"));
			} else if( e && e.keyCode== 189) {
				addLogOp(document.getElementById("minus"));
			} else if(e && e.keyCode== 190) {
				addPoint(document.getElementById("point"));
			} else if(e && e.keyCode== 13) {
				getResult();
				e.returnValue = false;
			} else if(e && e.keyCode== 8) {
				clearText();
			} else if((e && shiftKey && e.keyCode==53)) {
				addLogOp(getElementById("mod"));
			}
		}


		let calculator = {
	    	logLevel : ['+','*','-','/'],
	    	//存放临时的数
			num1 : "",
			num2 : "",
			num3 : "",
			//存放临时的算数运算符
			op1 : "",
			op1 : "",
			op3 : "",
			//前面存放了小数点
			isPoint1 : false,
			isPoint2 : false,
			isPoint3 : false,
			//是否最后一位为小数点
			errorPoint1 : false,
			errorPoint2 : false,
			errorPoint3 : false,
			//前面存放了逻辑运算符
			isLogiOp : false,
			isLogiOp2 : false,
			isNum : false
	    }

	    function clearExcNum1(){
	    	calculator.op1 = "";
			calculator.op2 = "";
			calculator.op3 = "";
			calculator.num2 = "";
			calculator.num3 = "";
			calculator.isNum = false;
			calculator.isPoint1 = false;
			calculator.isPoint2 = false;
			calculator.isPoint3 = false;
			calculator.errorPoint1 = false;
			calculator.errorPoint2 = false;
			calculator.errorPoint3 = false;
			calculator.isLogiOp = false;
			calculator.isLogiOp2 = false;
	    }

		function clearText(){
			document.getElementById("text").value="0";
			calculator.num1 = "";
			clearExcNum1();

		}

		function addNum1(obj , text){
			calculator.num1 += obj.value;
			text.value = calculator.num1;	
		}

		function addNum2(obj , text){
			calculator.num2 += obj.value;
			text.value = calculator.num2;	
		}

		function addNum3(obj , text){
			calculator.num3 += obj.value;
			text.value = calculator.num3;	
		}

		function addExp(obj){
			let text = document.getElementById("text");
			if(!calculator.isNum){
				calculator.isNum = true;
				if(!calculator.isLogiOp){
					text.value = obj.value;
					calculator.num1 = text.value;
				}else{
					text.value = obj.value;
					calculator.num2 = text.value;
				}
			}else{
				if(calculator.isLogiOp2){
					addNum3(obj,text);
					calculator.errorPoint3 = false;
					calculator.num3 = text.value;
				}else if(!calculator.isLogiOp){
					addNum1(obj,text);
					calculator.errorPoint1 = false;
				}else{
					addNum2(obj,text)
					calculator.errorPoint2 = false;
				}
			}
		}

		function addPoint(obj){
			let text = document.getElementById("text");
			if(calculator.isLogiOp2 && !calculator.isPoint3){
					addNum3(obj,text);
					calculator.isPoint3 = true;
					calculator.errorPoint3 = true;
			}else if(!calculator.isLogiOp && !calculator.isPoint1){
					addNum1(obj,text);
					calculator.isPoint1 = true;
					calculator.errorPoint1 = true;
			}else if(!calculator.isPoint2){
				addNum2(obj,text);
				calculator.isPoint2 = true;
				calculator.errorPoint2 = true;
			}
		}

		function addLogOp(obj){
			let text = document.getElementById("text");
			if(obj.value == "+/-"){
				addChara(obj,text);
				return
			}
			calculator.isLogiOp = true;
			if(!calculator.isNum){
				calculator.num1 = "0";
				calculator.isNum = true;
			}
			if(calculator.num2 == ""){
				calculator.op1 = obj.value;
				calculator.isLogiOp = true;
				return 
			}
			if(calculator.op1 != ""){
				if(calculator.isLogiOp2){
					addLogOp3(obj,text);
				}else if((calculator.logLevel.indexOf(obj.value))%2 > (calculator.logLevel.indexOf(calculator.op1))%2){
					calculator.op2 = obj.value;
					calculator.isLogiOp2 = true;
				}else{
					calculator.num1 = eval(calculator.num1 + calculator.op1 + calculator.num2 +"");
					calculator.isPoint2 = false;
					text.value = calculator.num1;
					calculator.op1 = obj.value;
					calculator.num2 = "";
				}
			}else{
				calculator.op1 = obj.value;
				calculator.isLogiOp = true;
			}
		}

		function addLogOp3(obj, text){
			if((calculator.logLevel.indexOf(obj.value))%2 != (calculator.logLevel.indexOf(calculator.op2))%2){
				clearText();
			}else{
				calculator.num2 = eval(calculator.num2 + calculator.op2 + calculator.num3 +"");
				text.value = calculator.num2;
				calculator.op2 = obj.value;
				calculator.num3 = "";
				calculator.isPoint3 = false;
				calculator.errorPoint3 = false;
			}
		}

		function addChara(obj,text){
			let comp = parseFloat(text.value);
			if(comp < 0){
				text.value = text.value.substr(1,text.value.length-1);
			} else{
				text.value = "-" + text.value;
			}
			if(calculator.isLogiOp2){
				calculator.num3 = text.value;
			}else if(calculator.isLogiOp){
				calculator.num2 = text.value;
			}else{
				calculator.num1 = text.value;
			}
		}

		function getResult(){
			if(calculator.errorPoint1){
				console.log( calculator.num1.substr(0,calculator.num1.length-1) );
				calculator.num1 = calculator.num1.substr(0,calculator.num1.length-1);
			}
			if(calculator.errorPoint2){
				calculator.num2 = calculator.num2.substr(0,calculator.num2.length-1);
			}
			if(calculator.errorPoint3){
				calculator.num3 = calculator.num3.substr(0,calculator.num3.length-1);
			}
			if(calculator.isLogiOp2){
				calculator.num1 = calculator.num1 + calculator.op1 + calculator.num2 + calculator.op2 + calculator.num3 + "";
			}else{
				calculator.num1 = calculator.num1 + calculator.op1 + calculator.num2 +"";
			}
			calculator.num1 = eval(calculator.num1);
			clearExcNum1();
			calculator.isNum = true;
			let text = document.getElementById("text");
			text.value = calculator.num1;
		}
	})();
	
	