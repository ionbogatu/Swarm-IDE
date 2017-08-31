app.controller('swarmIdeController', ['$scope', 'swarmHubService', 'modelService', function ($scope, swarmHubService, modelService) {

	//INIT VARS AND CALL SWARMS
	var hub = swarmHubService.hub;

	var initGraph = function(){

		$scope.graph = new joint.dia.Graph;
	};

	/*var getAvailableSwarms = function(){

		$scope.swarms = modelService.getSwarms();
	};*/

	var initGraphCells = function(){

		// var graphCells = modelService.getGraphCells();
		$scope.graphCells = [];
	};

	initGraph();
	// getAvailableSwarms();
	initGraphCells();

	$scope.project = {
		adapters: [],
		swarms: modelService.getSwarms()
	}
}]);
