"use strict";
const Config = require('./config.json');
/**
 * RecruitmentBotService
 * Mobile Cloud custom service entrypoint. The package.json:main implementation
 * @param service {external:ExpressApplicationObject}
 * @see {@link http://expressjs.com/4x/api.html#app}
 */
function RecruitmentBotService(service) {
    /**
     * Initialize middleware layer compatible with OMCe.
     * customize service prefix based on the required API endpoint.
     */
    const baseUri = service.locals._baseUri || '/mobile/custom/recruitment_bot/';
    // add configured services to the router
    const services = Config.services;
    services.forEach(conf => {
        const endpoint = baseUri + conf.uri.replace(/^\//, '');
        const handler = require(`./services/${conf.type}`);
        service.use(endpoint, handler());
    });
}
module.exports = RecruitmentBotService;
