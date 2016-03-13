// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var i = 0;

  // function to parse array elements
  var parseArray = function(arrString){
  	var arr = [];
  	return arr;
  };

  var parseObject = function(objString){
  	var obj = {};
  	return obj;
  };

  while(i < json.length){
  	console.log(json.length);
  	if (json[i] === '['){	// start an array
  		i++;
  		var arr = parseArray(json.substring(i,json.length));
  		if (json[i] === ']'){	// if the array closes, return it
  			i++;
  			return arr;
  		}
  	} else if (json[i] === '{'){
  		i++;
  		var obj = parseObject(json.substring(i,json.length));
  		if (json[i] === '}'){
  			i++;
  			return obj;
  		}
  	}
  	i++;	// reach end of json
  }

};
