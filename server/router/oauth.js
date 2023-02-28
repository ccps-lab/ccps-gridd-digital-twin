
/**
 * CCPS modification:
 * 
 * Implement 3-legged authentication
 * Adapted from Autodesk Forge.
 * 
 * Autodesk doc url: https://learnforge.autodesk.io/#/oauth/3legged/nodejs?id=routesoauthjs
 * Autodesk GitHub: https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/tree/nodejs
 * 
 * @author: Asad Shahin Moghadam <https://github.com/asad-shmoghadam>
 * @author: Mina Shaygan <https://github.com/minashaygan>
 * 
 */


const ApplicationContext = require("../../shared/config/ApplicationContext.js");
const { OAuth } = require("./common/oauth.js");



module.exports = function (router) {


    router.get("/oauth/callback" ,async (req, res, next) => {

        const { code } = req.query;
        const oauth = new OAuth(req.session);
        try {
            await oauth.setCode(code);
            res.redirect('/');
        } catch (err) {
            next(err);
        }

    });

     router.get("/oauth/url" ,(req,res) => {
        const url = "https://developer.api.autodesk.com" +
        "/authentication/v1/authorize?response_type=code" +
        "&client_id=" +
        ApplicationContext.credentials.client_id +
        "&redirect_uri=" +
        ApplicationContext.credentials.callback_url +
        '&scope=' + ApplicationContext.scopes.internal.join(' ');
        res.end(url);
     });

     router.get("/api/token" ,async (req, res, next) =>{

        const oauth = new OAuth(req.session);

        if(!oauth.isAuthorized()){

            res.status(401).end();
            return;
        }
        try{
            const accessToken = await oauth.getPublicToken();
            res.json(accessToken);
        } catch (err){
            next(err);
        }
     });
   


}