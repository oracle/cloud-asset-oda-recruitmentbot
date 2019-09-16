/*******************************************************************************
 Copyright © 2019, Oracle and/or its affiliates. All rights reserved.
 Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 ******************************************************************************/
"use strict";


module.exports = {

        metadata: () => (
        {
            "name": "computeAge",
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