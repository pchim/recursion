// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var i = 0;

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
  	return obj;
  };

  // function to parse strings
  var parseString = function(strString){
  	var str = '';
  	while(json[i] !== '\"' && i<json.length){
  		str+=json[i];
  		i++;
  	}
  	if (json.charAt(i) !== '\"'){
  		throw(SyntaxError);
  	}
  	i++;
  	return str;
  };


  while(i < json.length){
  	console.log(json.length);
  	if (json[i] === '['){	// start an array
  		i++;
  		var arr = parseArray(subJ(i));
  		if (json[i] === ']'){	// if the array closes, return it
  			i++;
  			return arr;
  		}
  	} else if (json[i] === '{'){
  		i++;
  		var obj = parseObject(subJ(i));
  		if (json[i] === '}'){
  			i++;
  			return obj;
  		}
  	} else if (json[i] === '\"'){
  		i++;
  		var str = parseString(subJ(i));
  		return str;
  	}
  	i++;	// reach end of json
  }

};
