"use strict"

app.service('modelService', ['$window', 'swarmHubService', function($window, swarmHubService){

    var swarmHub = swarmHubService.hub;

	var _self = this;

    	var models = [];
	
	var swarms = [];

	this.getSwarms = function(callback){

	// subsitute with service call

        swarmHub.on('swarmManager.js', 'gotSwarmsFromDB', function(swarm){

            models = [];

            swarms = [];

            for(var elem in swarm.result){

            	var node = swarm.result[elem];

				swarms.push({
					id: node.swarmId,
					name: node.name
				});

				models[node.swarmId.toString()] = node.nodes;
			}

			callback(swarms);
        });

		swarmHub.startSwarm('swarmManager.js', 'getSwarms');
	};

	this.getGraphCells = function(swarmId){

		// subsitute with service call

		var nodes = [];

		if(typeof(swarmId) !== "undefined"){

			var _nodes = {};
			var index, node;

			var model = models[swarmId];

			for (index in model.nodes){

				node = _self.addHexagon(model.nodes[index]);

				nodes.push(node);

				_nodes[model.nodes[index]._swarmId] = node;
			}

			for (index in model.links){

				node = {};
				angular.copy(model.links[index], node);
				node.source = {
					id: _nodes[node.source].id
				};
				node.target = {
					id: _nodes[node.target].id
				};

				node = _self.addLink(node);

				nodes.push(node);
			}
		}

		return nodes;
	};

	this.addLink = function(props){

		return new joint.dia.Link(props);
	};

	this.addHexagon = function(props){

		var cell = new joint.shapes.html.Hexagon(props);

		if(typeof(props.swarmData) !== 'undefined'){
			cell.swarmData = props.swarmData;
		}

		cell.addPort({group: 'top'});
	    cell.addPort({group: 'bottom'});
	    cell.addPort({group: 'left'});
	    cell.addPort({group: 'right'});

		return cell;
	};

	this.addCell = function(offset, swarmComponentType){

		var props = {
            _swarmId: undefined,
            type: 'hexagon',
            swarmComponentType: swarmComponentType,
            position: {
                x: offset.left,
                y: offset.top
            },
            attrs: {
                text: {
                    text: 'id'
                }
            }
        };

		return _self.addHexagon(props);
	};

	var serializeSwarm = function(graph){

		var cells = graph.attributes.cells.models;

		var nodes = [];
		var links = [];

		for(var i in cells){

            var cell = cells[i];

			if(cell.attributes.type === 'hexagon'){

				var node = {
                    _swarmId: cell.attributes._swarmId,
                    type: cell.attributes.type,
                    swarmComponentType: cell.attributes.swarmComponentType,
                    position: cell.attributes.position,
                    attrs: {
                        text: {
                            text: cell.attributes.attrs.text.text
                        }
                    }
				};

				if(typeof(cell.swarmData) !== 'undefined'){
				    node.swarmData = cell.swarmData;
				    node.attrs.text.text = cell.swarmData.name;
                }

                nodes.push(node);
			}else if(cell.attributes.type === 'link'){

			    var sourceCellId = cell.attributes.source.id;
			    var sourceCell = graph.getCell(sourceCellId).attributes._swarmId;

                var targetCellId = cell.attributes.target.id;
                var targetCell = graph.getCell(targetCellId).attributes._swarmId;

			    links.push({
                    source: sourceCell,
                    target: targetCell
                });
            }
		}

		return {
		    nodes: nodes,
            links: links
        }
	};

	this.saveSwarm = function(graph, swarmId, callback){

        swarmHub.on('swarmManager.js', 'savedSwarmToDb', function(swarm){

            if(!swarm.err){
                callback();
            }
        });

	    var serializedSwarm = serializeSwarm(graph);

	    /*swarmHub.startSwarm('swarmManager.js', 'saveSwarm', swarmId, serializedSwarm);*/
        swarmHub.startSwarm('swarmManager.js', 'saveSwarm', swarmId, JSON.stringify(serializedSwarm, null));
	}
}]);