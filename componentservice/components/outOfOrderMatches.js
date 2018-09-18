"use strict";
const _ = require('lodash');

module.exports = {

    metadata: () => (
        {
            "name": "outOfOrderMatches",
            "properties": {
                "variable": { "type": "string", "required": true },
                "oldVariable": { "type": "string", "required": true },
                "outputVariable": { "type": "string", "required": true },
                "entities": { "type": "list", "required": true }
            },
            "supportedActions": []
        }
    ),

    invoke: (conversation, done) => {

        let outOfOrderMatches = [];
        let entityVar = conversation.variable(conversation.properties().variable);
        let oldEntityVar = conversation.variable(conversation.properties().oldVariable) || {};
        if (entityVar) {
            const entities = conversation.properties().entities; 
            let emptyIndex = 999;
            for (let i = 0; i < entities.length; i++) {
                if (emptyIndex < i && entityVar[entities[i].name] && !oldEntityVar[entities[i].name]) {
                    outOfOrderMatches.push(entities[i].text);
                }
                else if (!entityVar[entities[i].name]) {
                    emptyIndex = i;
                }            
            }    
        }

        conversation.variable(conversation.properties().outputVariable,outOfOrderMatches);                 
        conversation.transition();
        done();
    }
};