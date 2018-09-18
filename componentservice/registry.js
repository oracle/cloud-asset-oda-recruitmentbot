"use strict";
/**
 * This file is provided as a legacy reference, however may still be used
 * as a direct replacement in services/component.
 * @see README.md for more information.
 */
const registry = {
    components: {
        'computeAge': require('./components/computeAge'),
        'computeExperience': require('./components/computeExperience'),
        'disambiguate': require('./components/disambiguate'),
        'findJobs': require('./components/findJobs'),
        'ourOfOrderMatches': require('./components/ourOfOrderMatches'),
        'populateCompositeEntity': require('./components/populateCompositeEntity'),
        'updateCompositeEntityVar': require('./components/updateCompositeEntityVar'),
        'updateEntityVars': require('./components/updateEntityVars')
    }
};
module.exports = registry;
