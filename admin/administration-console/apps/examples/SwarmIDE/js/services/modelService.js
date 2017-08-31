"use strict"

app.service('modelService', ['$window', function($window){

	var _self = this;

	var models = {
		'1': {
			nodes: [
			{
				_swarmId: 'hexagon1',
				type: 'hexagon',
				position: {
					x: 100,
					y: 40
				},
				attrs: {
					text: {
						text: 'id'
					}
				}
			},{
				_swarmId: 'hexagon2',
				type: 'hexagon',
				position: {
					x: 380,
					y: 40
				},
				attrs: {
					text: {
						text: 'id'
					}
				}
			},{
				_swarmId: 'hexagon3',
				type: 'hexagon',
				position: {
					x: 220,
					y: 220
				},
				attrs: {
					text: {
						text: 'id'
					}
				}
			},{
				_swarmId: 'hexagon4',
				type: 'hexagon',
				position: {
					x: 500,
					y: 280
				},
				attrs: {
					text: {
						text: 'id'
					}
				}
			},{
				_swarmId: 'hexagon5',
				type: 'hexagon',
				position: {
					x: 520,
					y: 160
				},
				attrs: {
					text: {
						text: 'id'
					}
				}
			}
			],
			links: [
				{
					source: 'hexagon1',
					target: 'hexagon2'
				},{
					source: 'hexagon2',
					target: 'hexagon5'
				},{
					source: 'hexagon1',
					target: 'hexagon4'
				},{
					source: 'hexagon4',
					target: 'hexagon3'
				}
			]
		},
		'2': {
            nodes: [
                {
                    _swarmId: 'hexagon1',
                    type: 'hexagon',
                    position: {
                        x: 50,
                        y: 240
                    },
                    attrs: {
                        text: {
                            text: 'id'
                        }
                    }
                },{
                    _swarmId: 'hexagon2',
                    type: 'hexagon',
                    position: {
                        x: 280,
                        y: 40
                    },
                    attrs: {
                        text: {
                            text: 'id'
                        }
                    }
                },{
                    _swarmId: 'hexagon3',
                    type: 'hexagon',
                    position: {
                        x: 220,
                        y: 340
                    },
                    attrs: {
                        text: {
                            text: 'id'
                        }
                    }
                }
            ],
            links: [
                {
                    source: 'hexagon1',
                    target: 'hexagon2'
                },{
                    source: 'hexagon2',
                    target: 'hexagon3'
                },{
                    source: 'hexagon1',
                    target: 'hexagon3'
                }
            ]
        }
	};

	var swarms = [
		{
			id: 1,
			name: 'Main Swarm'
		},
        {
            id: 2,
            name: 'Second Swarm'
        }
	];

	this.getSwarms = function(){

		// subsitute with service call

		return swarms;
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

		return new joint.shapes.html.Hexagon(props);
	};

	this.addCell = function(offset, type){

		var props = {
            _swarmId: undefined,
            type: 'hexagon',
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

		return new joint.shapes.html.Hexagon(props);
	}
}]);