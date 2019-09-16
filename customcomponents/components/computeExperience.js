/*******************************************************************************
 Copyright © 2019, Oracle and/or its affiliates. All rights reserved.
 Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 ******************************************************************************/
"use strict";


module.exports = {

        metadata: () => (
        {
            "name": "computeExperience",
            "properties": {
                "entityName": { "type": "string", "required": true },
                "outputVariable": { "type": "string", "required": true }
            },
            "supportedActions": []
        }
    ),

    invoke: (conversation, done) => {

        const outputVarName = conversation.properties().outputVariable; 
        const entity = conversation.properties().entityName;

        const allInfo = conversation.variable("allInfo");
        let matches = allInfo[entity] || [];

        console.log("MATCHS: "+JSON.stringify(matches));
        const regex = /\d{1,2}/
        let years = 0;
        // the entiy match is an array of matches of YearsExperience regular expression
        // so we loop over the macthes, extract the actual number from the reg exp match
        // and add it up
        years = matches.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.match(regex)[0]),years);
        if (years===0) {
            // if no eperience found, and we have te graduation year, we derive the years experience
            // from graduation year (assuming it is a resoanble value)
            let gradYear = allInfo.GraduationYear;
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