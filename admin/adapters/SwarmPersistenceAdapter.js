/**
 * Created by PhpStorm.
 * User: Ion Bogatu
 * Date: 09/13/2017
 * Time: 10:52 PM
 */

var core        = require ("swarmcore");
thisAdapter = core.createAdapter("SwarmPersistenceAdapter");
var persistence = undefined;
var container = require('safebox').container;
var uuid = require('node-uuid');
var apersistence = require('apersistence');
var jsonify = require('jsonify');

container.declareDependency('formsAdapter',['mysqlPersistence'],function(outOfService,mysqlPersistence) {
    if (!outOfService) {

        persistence = mysqlPersistence;

        var models = [{
            modelName: "Swarm",
            structure: {
                swarmId:{
                    type: "string",
                    length: 255,
                    pk:true
                },
                name: {
                    type: "string",
                    length: 255
                },
                nodes: {
                    type: "JSON"
                }
            }
        }];

        models.forEach(function (model) {
            persistence.registerModel(model.modelName, model.structure, function (err, result) {
                if (err) {
                    console.log(err);
                }

                populateWithSwarms();
            })
        });
    }

    var populateWithSwarms = function(){
        var swarm = apersistence.createRawObject('Swarm', 1);
        swarm.name = 'First Swarm';
        swarm.nodes = {
            nodes: [
                {
                    _swarmId: 'hexagon1',
                    type: 'hexagon',
                    swarmComponentType: 'phase',
                    position: {
                        x: 100,
                        y: 40
                    },
                    attrs: {
                        text: {
                            text: 'id'
                        }
                    }
                }, {
                    _swarmId: 'hexagon2',
                    type: 'hexagon',
                    swarmComponentType: 'phase',
                    position: {
                        x: 380,
                        y: 40
                    },
                    attrs: {
                        text: {
                            text: 'id'
                        }
                    }
                }, {
                    _swarmId: 'hexagon3',
                    type: 'hexagon',
                    swarmComponentType: 'ctor',
                    position: {
                        x: 220,
                        y: 220
                    },
                    attrs: {
                        text: {
                            text: 'id'
                        }
                    }
                }, {
                    _swarmId: 'hexagon4',
                    type: 'hexagon',
                    swarmComponentType: 'phase',
                    position: {
                        x: 500,
                        y: 280
                    },
                    attrs: {
                        text: {
                            text: 'id'
                        }
                    }
                }, {
                    _swarmId: 'hexagon5',
                    type: 'hexagon',
                    swarmComponentType: 'phase',
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
                }, {
                    source: 'hexagon2',
                    target: 'hexagon5'
                }, {
                    source: 'hexagon1',
                    target: 'hexagon4'
                }, {
                    source: 'hexagon4',
                    target: 'hexagon3'
                }
            ]
        };

        persistence.save(swarm, function(err){
            if(err){
                console.log(err);
            }
        });

        swarm = apersistence.createRawObject('Swarm', 2);
        swarm.name = 'Second Swarm';
        swarm.nodes = {
            nodes: [
                {
                    _swarmId: 'hexagon1',
                    type: 'hexagon',
                    swarmComponentType: 'ctor',
                    position: {
                        x: 50,
                        y: 240
                    },
                    attrs: {
                        text: {
                            text: 'id'
                        }
                    }
                }, {
                    _swarmId: 'hexagon2',
                    type: 'hexagon',
                    swarmComponentType: 'phase',
                    position: {
                        x: 280,
                        y: 40
                    },
                    attrs: {
                        text: {
                            text: 'id'
                        }
                    }
                }, {
                    _swarmId: 'hexagon3',
                    swarmComponentType: 'phase',
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
                }, {
                    source: 'hexagon2',
                    target: 'hexagon3'
                }, {
                    source: 'hexagon1',
                    target: 'hexagon3'
                }
            ]
        };

        persistence.save(swarm, function(err){
            if(err){
                console.log(err);
            }
        });
    }
});

loadSwarms = function(filter, callback){

    persistence.filter("Swarm",filter,callback);
};

saveSwarmToDB = function(filter, swarmSerialized, callback){

    swarmSerialized = JSON.parse(swarmSerialized);

    persistence.filter("Swarm", filter, function(err, result){

        if(
            err === null &&
            result.length === 1
        ){
            var swarmRaw = result[0];

            swarmRaw.nodes = swarmSerialized;

            persistence.save(swarmRaw, function(err){

                callback(err);
            });
        }
    });
};