// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	var JSONarray = function(obj){
		var arrayString = '';
		for (var i = 0; i < obj.length; i++){
			arrayString += stringifyJSON(obj[i]) + ',';
		}
		return arrayString.substring(0,arrayString.length-1);
  };

  var JSONobj = function(obj){
  	var objString = '';
  	for (key in obj){
  		if (obj[key] !== undefined && typeof obj[key] !== 'function'){
  			objString += stringifyJSON(key) + ":" + stringifyJSON(obj[key]) + ',';
  		}
  	}
  	return objString.substring(0,objString.length-1);
  }

  if (Array.isArray(obj)){
  	return '[' + JSONarray(obj) + ']';
  } else if (obj === null){
  	return 'null';
  } else if (typeof obj === 'string') {
  	return '\"' + obj + '\"';
  } else if (typeof obj === 'boolean' || typeof obj === 'number'){
  	return obj.toString();
  } else if (typeof obj !== 'function'){
  	return '{' + JSONobj(obj) + '}';
  } else {
  	return '';
  }

};
