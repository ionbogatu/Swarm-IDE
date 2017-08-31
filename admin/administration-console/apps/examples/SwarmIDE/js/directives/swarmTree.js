"use strict"

app.directive('swarmTree', function(){
	return {
		restrict: 'E',
		templateUrl: 'tpl/swarmTree.html',
		controller: 'swarmTreeController',
		scope: {
			project: "=model",
			objectForCanvas: "=editModel"
		}
	}
});