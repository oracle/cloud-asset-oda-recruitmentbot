"use strict";
const _ = require('lodash');

module.exports = {

    metadata: () => (
        {
            "name": "disambiguate",
            "properties": {
                "variable": { "type": "list", "required": true },
                "entityName": { "type": "list", "required": true }
            },
            "supportedActions": []
        }
    ),

    invoke: (conversation, done) => {
        const DOUBLES_VAR = 'doubleNames';
        let entityName = conversation.properties().entityName;
        let entityVar = conversation.variable(conversation.properties().variable);
        let attendees = entityVar[entityName];
        let text = conversation.text();

        if (conversation.variable(DOUBLES_VAR)) {
            let doubles = conversation.variable(DOUBLES_VAR);
            let doublesUpper = doubles.map(d => d.toUpperCase());
            let match;
            doublesUpper.forEach(n => {
                if (n.includes(text.toUpperCase())) {
                    let index = doublesUpper.indexOf(n);
                    match = doubles[index];
                }
            })
            if (match) {
                // first remove all doubles, then andd the single match
                attendees = attendees.filter(n =>  !(new Set(doublesUpper).has(n.toUpperCase())));
                // then re-add the chose match from doubles
                attendees.push(match);                
                conversation.variable(DOUBLES_VAR,null);
                conversation.variable("updatedEntities",["the attendees"]);
                entityVar[entityName] = attendees;
                conversation.variable(conversation.properties().variable,entityVar);
            }
            conversation.transition();
        }
        else {
            text = text.replace(',',' ');
            text = text.replace(' and ',' ');
            text = text.replace('  ',' ');
            text = text.replace('  ',' ');
            var names = text.split(' ');
            console.log(names);
            
            var doubles = [];
            var nameUsed;
            
            names.forEach(name => {
                var hits = attendees.filter(n => n.toUpperCase().includes(name.toUpperCase()));
                if (hits.length>1) {
                    doubles = hits;   
                    nameUsed =  name;  
                }
            })
            if (doubles.length>1) {
                conversation.variable(DOUBLES_VAR,doubles);
                conversation.reply('There are '+doubles.length+' persons with '+nameUsed+' in their name. Did you mean '+doubles.join(' or ')+'?');
            }
            else {
                conversation.variable("noDoubles",'true');
                conversation.transition();
            }
    
        }
        done();
    }
};

