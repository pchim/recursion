
// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var i = 0;	// index of JSON string

  // increment index and ignore all upcoming empty spaces
  var increment = function(){
  	i++;
  	chompSpace();
  };

  // increment index w/out chomping spaces (e.g. for strings)
  var incNoSpace = function(){
  	i++;
  };

  // helper function to check that character at index === target char
  var chompChar = function(char, errorMessage){
  	if (json[i] === char){
  		increment();
  	} else {
  		showError(errorMessage);
  	}
  };

  // ignore empty spaces not in strings
  var chompSpace = function(){
  	// check for spaces, tabs, newlines and carriage returns
  	var whiteSpaces = [' ', '\t', '\n', '\r'];
   	while(whiteSpaces.indexOf(json[i]) > -1){
  		i++;
  	}
  };

  // helper function to throw an error and show message
  var showError = function(message){
   	throw new SyntaxError('Char ' + i + ': ' + '\'' + message + '\'');
  }

  // helper function to get the substring from i to end of json string
  var subJ = function(index){
  	return json.substring(index,json.length);
  }

  // function to parse array elements
  var parseArray = function(){
  	var arr = [];		// initialize array to return
  	chompSpace();		// get rid of white spaces
  	if (json[i] === ']'){	// check that the array is just empty
  		increment();
  		return arr;
  	}

  	var element;	// holds array elements
  	var moreElements = true;	// check if more elements 
  	while (moreElements) {
  		element = parseValue(json[i]);
  		arr.push(element);
  		chompSpace();
  		// if more elements, continue w/in this parse loop
  		if (json[i] === ','){
  			increment();
  		} else {
  			moreElements = false;
  		}
  	}
  	chompSpace();
	  chompChar(']', 'missing ] to close array');
  	return arr;
  };

  // function to parse object elements
  var parseObject = function(){
  	var obj = {};		// initialize object to return
  	chompSpace();		// get rid of white spaces
  	if (json[i] === '}'){	// check that the object is just empty
  		increment();
  		return obj;
  	}

  	var morePairs = true;		// check if more pairs
  	while(morePairs){
  		// key must be a string in double quotes
	  	chompChar('\"', 'missing \" before key');
 			var key = parseString(subJ(i));
 			// value must be a proper value
	  	chompChar(':', 'missing : after key');
	  	var value = parseValue(json[i]);
	  	// assign the key:value pair
	  	obj[key] = value;
	  	chompSpace();
	  	// if more pairs, continue w/in this parse loop
	  	if (json[i] === ','){
	  		increment();
	  	} else {
	  		morePairs = false;
	  	}
		}
		chompSpace();
  	chompChar('}', 'missing } to close object');
  	return obj;
  };

  // function to parse a number, boolean, or string
  var parseValue = function(firstChar){
  	if (json[i] === '['){	// start an array
	  	increment();
	  	return parseArray();
  	} else if (json[i] === '{'){	// start an object
  		increment();
  		return parseObject();
  	} else if (firstChar === '\"'){	// start a string
  		incNoSpace();
  		return parseString();
  	} else if (!isNaN(firstChar) || firstChar === '-'){	// start a number
  		return parseNumber();
  	} else if (firstChar === 't' || firstChar === 'f'){	// start a boolean
  		return parseBoolean();
  	} else if (firstChar === 'n'){	// start a null char
  		return parseNull();
  	} else {	// unrecognized first characters
  		showError('unexpected token');
  	}
  }

  // helper function to parse strings
  var parseString = function(){
  	var str = '';
  	// function to handle esc characters in strings
  	var esc = function(char){
  		// handle characters after esc character
  		if (char === '\\'){
  			incNoSpace();
  			// return esc if double escape
  			if (json[i] === '\\'){
  				return '\\';
  			} 
  		} 		
  		// return like normal if no esc chars	
  		return json[i];
  	};

  	// loop through string
  	while(json[i] !== '\"' && i<json.length){
  		// first check if it's an escape character
  		str+= esc(json[i]);
  		incNoSpace();
  	}
  	chompChar('\"', 'missing \" to end string');
  	return str;
  };

  // function to parse numbers
  var parseNumber = function(){
  	var num = json[i];	// initialize number string
  	incNoSpace();
  	var decimalFound = false;

  	// function to check more than one decimal (if any)
  	var checkDecimals = function(){
   		if(json[i] === '.'){ // check if char is decimal
  			if (!decimalFound){	// check if it's first decimal found
  				num+=json[i];		 // append the decimal
  				incNoSpace();		 // increment index w/out chomping spaces
  				decimalFound = true;
  				if(isNaN(json[i])){		// if not a number after the decimal
  					showError('missing digits after . ');
  				} else {
  					num+=json[i];
  					incNoSpace();
  				}
  			} else {
  				showError('extra . in number');
  			}
  		} 		
  	}
  	checkDecimals();
  	// parse only digits
  	while(!isNaN(json[i])){
  		num += json[i];
  		incNoSpace();
  		checkDecimals();
  	}

  	chompSpace();
  	if (isNaN(Number(num))){
  		showError('undetermined number');
  	} else {
  		return Number(num);
  	}
  };


  // function to parse boolean strings
  var parseBoolean = function(boolStr){
  	var bool = '';		// intialize boolean string
  	var tString = 'true';
  	var fString = 'false';
  	// function to build up bool string and compare to json string
  	var compBool = function(firstChar, boolString){
  		for (var j = 0; j < boolString.length; j++){
  			bool += json[i];
  			incNoSpace();
  		}
  		if (bool === boolString){
  			return true;
			} else {
				return false;
			}
  	};

  	chompSpace();
	  // check if string is equal to true or false
	  if (json[i] === 't'){
	  	if (compBool('t', tString)) { return true; }
	  } else if (json[i] === 'f'){
	  	if (compBool('f', fString)) { return false; }
	  }
  	showError('non-boolean string');
  };

  // function to parse null strings
  var parseNull = function(nullStr){
  	var nul = '';		// initialize null string
  	var nString = 'null';
  	// build up null string and compare to json string
  	for (var j = 0; j < nString.length; j++){
  		nul += json[i];
  		incNoSpace();
  	}
  	chompSpace();
  	if (nul === nString){
  		return null;
  	}
  	showError('undetermined string');
  };


  // intiialize parsing
  while(i < json.length){
  	return parseValue(json[i]);
  	increment();	// ensure a reach to end of json
  }

};
