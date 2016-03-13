// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  // your code here
  // use document.body, element.childNodes, element.classList
  var classElements = [];
  // recursive function to get find all nodes w/ className			
  var getNode = function(nodes){
  	// loop through the array of nodes...
	  for (var i = 0; i < nodes.length; i++){
	  	// to check which nodes has the class name... 
	  	if ((nodes[i].classList) && nodes[i].classList.contains(className)){
	  		// and push it to our result if it does
	  		classElements.push(nodes[i]);
	  	}
	  	// if the node has child nodes...
	    if (nodes[i].childNodes){
	    	// recurse onto the array of child nodes
		  	getNode(nodes[i].childNodes);
	    }
	  }
	}
  getNode([document.body]);
  return classElements;
};
