/**
 * Configuration class
 */

// The config param only work for server side.
var ApplicationContext = function () {};

ApplicationContext.prototype.setup = function (config) {
    this.assetUrlPrefix = config.assetUrlPrefix;
    this.assetRoot = config.assetRoot || config.assetUrlPrefix;
    this.lmvUrl = config.lmvUrl;
    this.dataUrl = config.dataUrl;
    this.baseUrl = config.baseUrl;

    this.env = config.env;

    // CCPS MODIFICATION:
    //Set the credentials and scopes in ApplicationContext
    this.credentials = config.credentials;
    this.scopes = config.scopes;
};

module.exports = new ApplicationContext();
