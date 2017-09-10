// This makes any element droppable
// Usage: <div droppable></div>
app.directive('droppable', ['$compile', 'modelService', function($compile, modelService) {
  return {
    restrict: 'A',
    link: function(scope,element,attrs){
      //This makes an element Droppable
      element.droppable({
        drop:function(event,ui) {

          var type = $(ui.draggable).attr('swarm-type');

          var canvasOffset = $(event.target).offset();

          var offset = {
            'top': event.clientY - canvasOffset.top - hexagonSize.height/2,
            'left': event.clientX - canvasOffset.left - hexagonSize.width/2
          }

          $(event.toElement).hide();

          scope.$parent.graph.addCell(modelService.addCell(offset, type));

          scope.$apply();
        }
      });
    }
  };
}]);