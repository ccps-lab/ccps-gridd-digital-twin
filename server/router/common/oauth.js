/**
 * CCPS modification:
 * 
 * Implement 3-legged authentication.
 * Adapted from Autodesk Forge.
 * 
 * Autodesk doc url: https://learnforge.autodesk.io/#/oauth/3legged/nodejs?id=routescommonoauthjs.
 * Autodesk GitHub: https://github.com/Autodesk-Forge/learn.forge.viewhubmodels/tree/nodejs
 * 
 * @author: Asad Shahin Moghadam <https://github.com/asad-shmoghadam>
 * @author: Mina Shaygan <https://github.com/minashaygan>
 * 
 * 
 */


const { application } = require('express');
const { AuthClientThreeLegged } = require("forge-apis");


const ApplicationContext = require("../../../shared/config/ApplicationContext.js");


class OAuth {
    constructor(session) {
        this._session = session;
    }

    getClient(scopes = ApplicationContext.scopes.internal) {
        const { client_id, client_secret, callback_url } = ApplicationContext.credentials;
        return new AuthClientThreeLegged(client_id, client_secret, callback_url, scopes);
    }

    isAuthorized() {
        return !!this._session.public_token;
    }

    async getPublicToken() {
        if (this._isExpired()) {
            await this._refreshTokens();
        }

        return {
            access_token: this._session.public_token,
            expires_in: this._expiresIn()
        };
    }

    async getInternalToken() {
        if (this._isExpired()) {
            await this._refreshTokens();
        }

        return {
            access_token: this._session.internal_token,
            expires_in: this._expiresIn()
        };
    }

    // On callback, pass the CODE to this function, it will
    // get the internal and public tokens and store them 
    // on the session
    async setCode(code) {
        const internalTokenClient = this.getClient(ApplicationContext.scopes.internal);
        const publicTokenClient = this.getClient(ApplicationContext.scopes.public);
        const internalCredentials = await internalTokenClient.getToken(code);
        const publicCredentials = await publicTokenClient.refreshToken(internalCredentials);

        const now = new Date();
        this._session.internal_token = internalCredentials.access_token;
        this._session.public_token = publicCredentials.access_token;
        this._session.refresh_token = publicCredentials.refresh_token;
        this._session.expires_at = (now.setSeconds(now.getSeconds() + publicCredentials.expires_in));
    }

    _expiresIn() {
        const now = new Date();
        const expiresAt = new Date(this._session.expires_at)
        return Math.round((expiresAt.getTime() - now.getTime()) / 1000);
    };

    _isExpired() {
        return (new Date() > new Date(this._session.expires_at));
    }

    async _refreshTokens() {
        let internalTokenClient = this.getClient(ApplicationContext.scopes.internal);
        let publicTokenClient = this.getClient(ApplicationContext.scopes.public);
        const internalCredentials = await internalTokenClient.refreshToken({ refresh_token: this._session.refresh_token });
        const publicCredentials = await publicTokenClient.refreshToken(internalCredentials);

        const now = new Date();
        this._session.internal_token = internalCredentials.access_token;
        this._session.public_token = publicCredentials.access_token;
        this._session.refresh_token = publicCredentials.refresh_token;
        this._session.expires_at = (now.setSeconds(now.getSeconds() + publicCredentials.expires_in));
    }
}

module.exports = { OAuth };