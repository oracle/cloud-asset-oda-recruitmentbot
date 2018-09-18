"use strict";
const _ = require('lodash');

module.exports = {

    metadata: () => (
        {
            "name": "updateEntityVars",
            "properties": {
                "nlpVariable": { "type": "string", "required": true },
                "variables": { "type": "list", "required": true }
            },
            "supportedActions": []
        }
    ),

    invoke: (conversation, done) => {

        const nlpVarName = conversation.properties().nlpVariable; 
        let nlpvar = conversation.nlpResult(nlpVarName);
        const vars = conversation.properties().variables; 
        vars.forEach(var1 => {
            const varName = var1.name; 
            const entity =  var1.entity;
            let matches  = nlpvar.entityMatches(entity);
            if (matches.length==1) {
                conversation.variable(varName,matches[0]);
            }
            else if (matches.length>1) {
                let curValue = conversation.variable(varName);
                if (_.isEqual(curValue,matches[0])) {
                    conversation.variable(varName,matches[1]); 
                }
                else {
                    conversation.variable(varName,matches[0]);                 
                }
            }                
        });
        conversation.transition();
        done();
    }
};