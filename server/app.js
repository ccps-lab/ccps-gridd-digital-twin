var express = require("express");
var bodyParser = require("body-parser");
var cookieSession = require("cookie-session");

var app = express();
var router = require("express").Router();

// CCPS modification:
//Set session for internal token.
//
app.use(
  cookieSession({
    name: "forge_session",
    keys: ["forge_secure_key"],
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days, same as refresh token
  })
);

app.use(bodyParser.json());

var env = process.env.ENV || "local";
var buildNumber = process.env.BUILD_NUMBER || "1";

var SiteConfig = require("../shared/config/SiteConfig")(env, buildNumber);
var ApplicationContext = require("../shared/config/ApplicationContext.js");
ApplicationContext.setup(SiteConfig);

require("./router/DataAPI.js")(router);
// require("./CustomRouter.js")(router); // Override or Add your custom API routes to this file

// CCPS modification:
//
require("./router/oauth.js")(router);

require("./router/Index.js")(router);

module.exports = {
  app,
  router,
};
