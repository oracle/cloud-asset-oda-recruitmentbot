"use strict";
const _ = require('lodash');

module.exports = {

    metadata: () => (
        {
            "name": "updateCompositeEntityVar",
            "properties": {
                "nlpVariable": { "type": "string", "required": true },
                "variable": { "type": "list", "required": true },
                "compositeEntity": { "type": "list", "required": true },
                "updatedEntitiesVar": { "type": "list", "required": true },
                "outOfOrderEntitiesVar": { "type": "list", "required": true },
                "entities": { "type": "list", "required": true }
            },
            "supportedActions": []
        }
    ),

    invoke: (conversation, done) => {

        let nlpvar = conversation.nlpResult(conversation.properties().nlpVariable);
        let entityVarName = conversation.properties().variable;
        let compositeEntityName = conversation.properties().compositeEntity;
        let entityVar = conversation.variable(entityVarName) || {'name':compositeEntityName};
        let oldEntityVar = JSON.parse(JSON.stringify(entityVar));


        let compositeEntityMatches  = nlpvar.entityMatches(compositeEntityName);
        let updatedEntities = [];

        if (compositeEntityMatches.length>0) {
            let compositEntityMatch = compositeEntityMatches[0];

            const entities = conversation.properties().entities; 
            entities.forEach(entity => {
                const entityName = entity.name; 
                let matches  = compositEntityMatch[entityName] || [];
                // if DATE entity, then ignore matches with just a number
                matches = matches.filter(entry => entry.entityName!='DATE' || isNaN(Number(entry.originalString)));
                if (matches.length>0) {
                    let curValue = entityVar[entityName];
                    if (entity.multiSelect) {
                        // new matches that are also in old array are removed.
                        // new matches that are not in old array are added 
                        // const filledEntitiesSet = new Set(matches); 
                        // const unfilledEntities = allEntities.filter(item => { return !filledEntitiesSet.has(item)} );                 
                        entityVar[entityName] = matches;                                                
                    }
                    else {
                        let matchIndex = 0;
                        if (matches.length>1) {
                            if (_.isEqual(curValue,matches[0])) {
                                matchIndex = 1;
                            }
                        }                
                        entityVar[entityName] = matches[matchIndex];                                                
                    }
                    if (curValue && entity.text!='') {
                        let newValue = entityVar[entityName];
                        if (entityName==='DATE') {
                            newValue = newValue.originalString;
                        }
                        else if (entityName==='CURRENCY') {
                            newValue = newValue.amount+' '+newValue.currency;
                        }
                        updatedEntities.push(entity.text+' to '+newValue);
                    }
                }
            });    
        }
        conversation.variable(conversation.properties().variable,entityVar);                     
        conversation.variable(conversation.properties().updatedEntitiesVar,updatedEntities);                 

        let outOfOrderMatches = [];
        const entities = conversation.properties().entities; 
        let emptyIndex = 999;
        for (let i = 0; i < entities.length; i++) {
            if (entities[i].text!='' && emptyIndex < i && entityVar[entities[i].name] && !oldEntityVar[entities[i].name]) {
                outOfOrderMatches.push(entities[i].text);
            }
            else if (!entityVar[entities[i].name]) {
                emptyIndex = i;
            }            
        }    

        conversation.variable(conversation.properties().outOfOrderEntitiesVar,outOfOrderMatches);                 


        conversation.transition();
        done();
    }
};

