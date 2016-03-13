// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	if (obj === null){
  	return 'null';
  } else if (typeof obj === 'string') {
  	return '\"' + obj + '\"';
  } else if (typeof obj === 'boolean' || typeof obj === 'number'){
  	return obj.toString();
  } 

};
