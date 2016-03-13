// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  // your code here
  // use document.body, element.childNodes, element.classList
  var classElements = [];		
  var getNode = function(nodes){
	  for (var i = 0; i < nodes.length; i++){
	  	if ((nodes[i].classList) && nodes[i].classList.contains(className)){
	  		classElements.push(nodes[i]);
	  	}
	    if (nodes[i].childNodes){
		  	getNode(nodes[i].childNodes);
	    }
	  }
	}
  getNode([document.body]);
  return classElements;
};
