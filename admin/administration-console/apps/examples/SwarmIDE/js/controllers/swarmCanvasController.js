app.controller('swarmCanvasController', ['$scope', 'modelService', function ($scope, modelService) {

    var paperElement = $('#paper');

    new joint.dia.Paper({
        el: paperElement,
        width: paperElement.width(),
        height: paperElement.height(),
        model: $scope.$parent.graph,
        gridSize: 1
    });

	var reloadGraphCells = function(){

        $scope.$parent.graph.clear();
		$scope.$parent.graph.addCells($scope.$parent.graphCells);
	};

	$scope.$watch('editModel', function(swarm){

	    // when page is first loaded swarm is undefined

	    if(typeof(swarm) !== "undefined") {

            // load graph cells for selected swarm based on swarm.id

            var $swarmId = parseInt(swarm.id);

            $scope.$parent.graphCells = modelService.getGraphCells($swarmId);

            reloadGraphCells();
        }
    });
}]);
