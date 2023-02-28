/**
 * This function serves as the configuration when ApplicationContext.js
 * invokes it. As more environments are deemed necessary, they will be
 * added as additional 'env' variables.
 *
 * @param {string} env The environment to configure the site for.
 *
 */
var SiteConfig = function (env, buildNumber) {
  var LocalDev = {
    assetRoot: "http://localhost:9081",
    assetUrlPrefix: "http://localhost:9081/assets",
    lmvUrl: "https://autodeskviewer.com/viewers/latest",
    baseUrl: "",

    // CCPS modification:
    // Set credentials and scopes for using in server/router/oauth and server/router/common/oauth.
    //
    credentials: {
      client_id: process.env.FORGE_CLIENT_ID,
      client_secret: process.env.FORGE_CLIENT_SECRET,
      callback_url: process.env.FORGE_CALLBACK_URL,
    },
    scopes: {
      // Required scopes for the server-side application
      internal: [
        "bucket:create",
        "bucket:read",
        "data:read",
        "data:create",
        "data:write",
      ],
      // Required scope for the client-side viewer
      public: ["viewables:read"],
    },
  };

  // Override the env in your env.
  var Dev = {};

  var Stage = {};

  var Prod = {
    assetRoot: process.env.ASSET_ROOT,
    assetUrlPrefix: process.env.ASSET_URL_PREFIX,
    lmvUrl: process.env.LMV_URL || "https://viewer.autodesk.com/viewer/latest",
    baseUrl: process.env.BASE_URL || "",

    // CCPS modification:
    // Set credentials and scopes for using in server/router/oauth and server/router/common/oauth.
    credentials: {
      client_id: process.env.FORGE_CLIENT_ID,
      client_secret: process.env.FORGE_CLIENT_SECRET,
      callback_url: process.env.FORGE_CALLBACK_URL,
    },
    scopes: {
      // Required scopes for the server-side application
      internal: [
        "bucket:create",
        "bucket:read",
        "data:read",
        "data:create",
        "data:write",
      ],
      // Required scope for the client-side viewer
      public: ["viewables:read"],
    },
  };

  var result = LocalDev;
  result.env = env; // Preserve 'env' value.

  switch (env) {
    case "stage":
      result = Object.assign({}, result, Stage);
      break;
    case "dev":
      result = Object.assign({}, result, Dev);
      break;
    case "prod":
      result = Object.assign({}, result, Prod);
      break;
  }

  result.toSCSSEnv = function () {
    var str = "";
    for (var key in result) {
      if (typeof result[key] == "string") {
        str += `$${key}: '${result[key]}'; `;
      }
    }
    return str;
  };
  return result;
};

module.exports = SiteConfig;
