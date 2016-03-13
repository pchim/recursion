// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	var JSONarray = function(obj){
		if (obj.length === 0){
			return '';
		}
		var item = obj.shift();
		var comma = (obj.length) ? ',' : '';
  	return stringifyJSON(item) + comma + JSONarray(obj);
  };

  var JSONobj = function(obj){
  	var objString = '';
  	for (key in obj){
  		objString += stringifyJSON(key) + ":" + stringifyJSON(obj[key]) + ',';
  	}
  	objString = objString.substring(0,objString.length-1);
  	return objString;
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
  }

};
