"use strict"

app.controller('swarmComponentFormModalController', ['$scope', 'ModalService', '$element', 'modelService', 'close', function($scope, ModalService, $element, modelService, close){

    var cell = $scope.$parent.$parent.graph.getCell($scope.$parent.elementId);

    if(typeof(cell.swarmData) !== 'undefined'){
        $scope.object = {};
        $scope.object.name = cell.swarmData.name;

        var params = [];
        for(var i in cell.swarmData.params){
            params.push(cell.swarmData.params[i]);
        }

        $scope.params = params;
        $scope.object.code = cell.swarmData.code;
    }else{
        $scope.params = [{
            'name': '',
            'value': ''
        }];
    }

    $scope.addMoreParams = function(index){
        $scope.params.splice(index + 1, 0, {
            'name': '',
            'value': ''
        });
    };

    $scope.removeParam = function(index){
        $scope.params.splice(index, 1);
        if($scope.params.length === 0){
            $scope.params.push({
                'name': '',
                'value': ''
            })
        }
    };

    $scope.saveObject = function(formularType){

        if(formularType === 'ctor'){

            var elementId = $scope.$parent.elementId;
            var cell = $scope.$parent.$parent.graph.getCell(elementId);

            cell.swarmData = {
                'name': $scope.object.name,
                'params': $scope.params,
                'code': $scope.object.code
            };

            cell.attributes.attrs.text = $scope.object.name;
        }

        var swarmId = $scope.$parent.editModel.id;

        var graph = $scope.$parent.$parent.graph;

        modelService.saveSwarm(graph, swarmId, function(){

            $element.modal('hide');
            close(null, 500);

            modelService.getSwarms(function(){
                var graphCells = modelService.getGraphCells(swarmId);
                graph.clear();
                graph.addCells(graphCells);
            });
        });
    }
}]);