app.controller('swarmCanvasController', ['$scope', 'modelService', 'ModalService', function ($scope, modelService, ModalService) {

    var paperElement = $('#paper');

    var paper = new joint.dia.Paper({
        el: paperElement,
        width: paperElement.width(),
        height: paperElement.height(),
        model: $scope.$parent.graph,
        gridSize: 1,
        linkPinning: false
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

    /* Evets handling */

    paperElement.on('click', function(event){

        var element = $(event.toElement);

        // hide handlers from previous selected element
        $('.handlers-wrapper, .handler').css({'display': 'none'});
        // show handlers for currently selected element
        var cellView = element.closest('.type-hexagon');
        if(cellView.length === 1){
            cellView.find('.handlers-wrapper, .handler').css({'display': 'initial'});
        }
    });

    $scope.targetChanged = false;

    $scope.$parent.graph.on('change:target', function(cellView){

        console.log('change:target');
        console.log($scope.$parent.graph);
        console.log(cellView);

        if(cellView.getTargetElement() !== null){

            //hide cell handlers to remove space between edge of the link and cell itself
            var hiddenElements = $('g[model-id="' + cellView.getSourceElement().id + '"]').find('.handlers-wrapper, .handler');
            hiddenElements.css('display', 'none');

            var props = {
                source: {
                    id: cellView.getSourceElement().id
                },
                target: {
                    id: cellView.getTargetElement().id
                }
            }

            var newLink = modelService.addLink(props);

            $scope.$parent.graph.addCell(newLink);

            cellView.remove();

            // show handlers again
            hiddenElements.css('display', 'initial');
        }
    });

    paper.on('cell:pointerdblclick', function(cellView){

        if(cellView.model.attributes.type === 'hexagon'){
            
            // set display formular according to node type (ctor or phase)
            $scope.displayFormularByType = cellView.model.attributes.swarmComponentType;

            // open modal

            ModalService.showModal({
                templateUrl: "tpl/modals/swarmComponentFormModal.html",
                controller: "swarmComponentFormModalController"
            }).then(function(modal) {
                modal.element.modal();
            });
        }
    });
}]);
