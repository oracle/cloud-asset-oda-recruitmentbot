"use strict";


module.exports = {

        metadata: () => (
        {
            "name": "computeExperience",
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
        let matches = nlpvar.entityMatches(entity);
        console.log("MATCHS: "+JSON.stringify(matches));
        const regex = /\d{1,2}/
        let years = 0;
        // the entiy match is an array of matches of Salary regular expression
        // so we loop over the macthes, extract the actual number from the reg exp match
        // and add it up
        years = matches.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.match(regex)[0]),years);
        if (years===0) {
            // if no eperience found, and we have te graduation year, we derive the years experience
            // from graduation year (assuming it is a resoanble value)
            let gradYear = conversation.variable('allInfo').GraduationYear;
            if (gradYear) {
                // extract the year from the reg exp
                console.log("GRAD YEAR: "+gradYear);
                const regex2 = /\d{2,4}/                
                let y = parseInt(gradYear.match(regex2)[0]);
                y = y < 20 ? y+2000 : (y<100 ? y+1900 : y); 
                if (y>1900) {
                    years = (new Date()).getFullYear() - y;
                }
            }
        }
        console.log("YEARS: "+years);
        conversation.variable(outputVarName,years);
        conversation.transition();
        done();
    }
};