// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var i = 0;

  var increment = function(){
  	i++;
  	while(json[i] === ' '){
  		i++;
  	}
  }

  // helper function to get the substring from i to end of json
  var subJ = function(index){
  	return json.substring(index,json.length);
  }

  // function to parse array elements
  var parseArray = function(arrString){
  	var arr = [];
  	return arr;
  };

  // function to parse object elements
  var parseObject = function(objString){
  	var obj = {};
/*  	var key = parseString(subJ(i));
  	if (json[i] === ':'){
  		increment();
  	}
 */
  	return obj;
  };

  // function to parse strings
  var parseString = function(strString){
  	var str = '';
  	while(json[i] !== '\"' && i<json.length){
  		str+=json[i];
  		increment();
  	}
  	if (json.charAt(i) !== '\"'){
  		throw(SyntaxError);
  	}
  	increment();
  	return str;
  };


  while(i < json.length){
  	console.log(json.length);
  	if (json[i] === '['){	// start an array
  		increment();
  		var arr = parseArray(subJ(i));
  		if (json[i] === ']'){	// if the array closes, return it
  			increment();
  			return arr;
  		}
  	} else if (json[i] === '{'){
  		increment();
  		var obj = parseObject(subJ(i));
  		if (json[i] === '}'){
  			increment();
  			return obj;
  		}
  	} else if (json[i] === '\"'){
  		increment();
  		var str = parseString(subJ(i));
  		return str;
  	}
  	increment();	// reach end of json
  }

};
