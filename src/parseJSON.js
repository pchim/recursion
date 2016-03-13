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

  // helper function to check character at index === char,
  // if not, throw an error
  var chompChar = function(char, errorMessage){
  	if (json[i] === char){
  		increment();
  	} else {
  		showError(errorMessage);
  	}
  }

  // helper function to throw an error
  var showError = function(message){
   	throw new SyntaxError('Char ' + i + ': ' + '\'' + message + '\'');
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
	  chompChar('\"', 'missing \" before key');
 		var key = parseString(subJ(i));
	  chompChar(':', 'missing : after key');
	  //var value = 
  	return obj;
  };

  // function to parse a number, boolean, or string
  var parseValue = function(firstChar){
  	if (fistChar === '\"'){
  		return parseString(subJ(i));
  	} else if (!isNan(firstChar)){
  		return parseNumber(subJ(i));
  	} else if (firstChar === 't' || firstChar === 'f'){
  		return parseBoolean(subJ(i));
  	} else if (firstChar === 'n'){
  		return parseNull(subJ(i));
  	}
  }

  // function to parse strings
  var parseString = function(strString){
  	var str = '';
  	while(json[i] !== '\"' && i<json.length){
  		str+=json[i];
  		increment();
  	}
  	chompChar('\"', 'missing \" to end string');
  	return str;
  };


  var parseNumber = function(numStr){
  	return numStr;
  }

  var parseBoolean = function(boolStr){
  	return true;
  }

  var parseNull = function(nullStr){
  	return null;
  }


  while(i < json.length){
  	console.log(json.length);
  	if (json[i] === '['){	// start an array
	  	increment();
	  	var arr = parseArray(subJ(i));
	  	chompChar(']', 'missing ] to close array');
  		return arr;
  	} else if (json[i] === '{'){
  		increment();
  		var obj = parseObject(subJ(i));
  		chompChar('}', 'missing } to close object');
  		return obj;
  	} else if (json[i] === '\"'){
  		increment();
  		var str = parseString(subJ(i));
  		return str;
  	}
  	increment();	// reach end of json
  }

};
