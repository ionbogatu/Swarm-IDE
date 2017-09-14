app.controller('swarmTreeController', ['$scope', 'modelService', function ($scope, modelService) {

	var initNodeTreeToggle = function(){

		$(document).ready(function () {

	    	$('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
	        $('.tree li.parent_li > span').on('click', function (e) {
	            var children = $(this).parent('li.parent_li').find(' > ul > li');
	            if (children.is(":visible")) {
	                children.hide('fast');
	                $(this).attr('title', 'Expand this branch').find(' > i').addClass('fa-plus-square-o').removeClass('fa-minus-square-o');
	            } else {
	                children.show('fast');
	                $(this).attr('title', 'Collapse this branch').find(' > i').addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
	            }
	            e.stopPropagation();
	        });
	    });
	};

	initNodeTreeToggle();

    $scope.project = {
        adapters: [],
        swarms: []
    };

    modelService.getSwarms(function(swarmCollection){

        $scope.project = {
            adapters: [],
            swarms: []
		};

    	for(var i in swarmCollection){
            $scope.project.swarms[i] = swarmCollection[i];
		}

		$scope.$apply();
	});

	$scope.startEditSwarm = function(swarm){
		$scope.objectForCanvas = swarm;
	}
}]);
