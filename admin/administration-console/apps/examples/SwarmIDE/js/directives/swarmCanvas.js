"use strict"

app.directive('swarmCanvas', function(){
	return {
		restrict: 'E',
		templateUrl: 'tpl/swarmCanvas.html',
		controller: 'swarmCanvasController',
		scope: {
			editModel: "=editModel"
		}
	}
});