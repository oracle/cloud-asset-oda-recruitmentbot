"use strict";


module.exports = {

        metadata: () => (
        {
            "name": "populateCompositeEntity",
            "properties": {
                "variable": { "type": "string", "required": true }
               , "nlpVariable": { "type": "string", "required": true }
               , "entityNames": { "type": "string", "required": true }
            },
            "supportedActions": []
        }
    ),

    invoke: (conversation, done) => {

        const varName = conversation.properties().variable; 
        const varValue = conversation.variable(varName);

        const nlpVarName = conversation.properties().nlpVariable; 
        let nlpvar = conversation.nlpResult(nlpVarName);
        const entities = conversation.properties().entityNames.split(',');
        for (let entity of entities) {
            let matches = nlpvar.entityMatches(entity);
            matches = Array.from(new Set(matches));
            varValue[entity] = matches;

        }        
        console.log("COMP ENT: "+JSON.stringify(varValue));
        conversation.variable(varName,varValue);

        conversation.transition();
        done();
    }
};