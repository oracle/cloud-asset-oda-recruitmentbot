"use strict";


module.exports = {

        metadata: () => (
        {
            "name": "computeAge",
            "properties": {
                "nlpVariable": { "type": "string", "required": true },
                "entityName": { "type": "string", "required": true },
                "outputVariable": { "type": "string", "required": true }
            },
            "supportedActions": []
        }
    ),

    invoke: (conversation, done) => {

        const nlpVarName = conversation.properties().nlpVariable; 
        const outputVarName = conversation.properties().outputVariable; 
        let nlpvar = conversation.nlpResult(nlpVarName);
        const entity = conversation.properties().entityName;
        let matches  = nlpvar.entityMatches(entity);
        if (matches.length>0) {
            let ageString = matches[0];
            const regex = /\d{2}/                
            let age = parseInt(ageString.match(regex)[0]);
            conversation.variable(outputVarName,age);
        }
        conversation.transition();
        done();
    }
};