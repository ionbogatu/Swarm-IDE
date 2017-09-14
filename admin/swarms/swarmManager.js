/*
 * Swarm for CRUD operations on swarms
 */

var swarmManager = {
    getSwarms: function(){
        this.swarm('doLoadSwarmsFromDB');
    },
    saveSwarm: function(swarmId, serializedSwarm){

        this.swarmId = swarmId;
        this.swarmSerialized = serializedSwarm;

        this.swarm('doSaveSwarmIntoDB');
    },
    doLoadSwarmsFromDB: {
        node: 'SwarmPersistenceAdapter',
        code: function() {
            self = this;
            loadSwarms(false, S(function(err, result){
                self.result = result;
                self.home('gotSwarmsFromDB');
            }));
        }
    },
    doSaveSwarmIntoDB: {
        node: 'SwarmPersistenceAdapter',
        code: function(){
            self = this;

            saveSwarmToDB({'swarmId': self.swarmId}, self.swarmSerialized, S(function(err){
                self.err = err;
                self.home('savedSwarmToDb');
            }));
        }
    }
};

swarmManager;