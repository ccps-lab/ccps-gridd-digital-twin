# CCPS Digital Twin

## Requirements

## Local

## Production

Please make sure you use the following version of `node` for deploying to production, otherwise you will encounter errors.

### server

> Make sure to move `shared` folder to `server` directory when deploying to production. This requires to update the imports in the following directories:
>
> - `server/router/App.js`
> - `server/router/Index.js`
> - `server/app.js`

```shell
Node version: lts/fermium -> v14.x
```

### client

> Make sure the `shared` folder is in root directory before you run the build script `npm run build` for deploying to production.
> Also make sure to move `dist` folder to `assets` directory after building the client. Then upload the `assets` folder to the static website container (Azure Storage).

```shell
Node version: lts/erbium -> v12.x
```
## Deploy your model in a web
### Create application in forge developer portal
1. After login into the [Autodesk Forge Website](https://aps.autodesk.com/?mktvar002=5030950%7CSEM%7C17292865638%7C136462699666%7Ckwd-349085082457&mkwid=sNRzCTm4G%7Cpcrid%7C598884900698%7Cpkw%7Cautodesk%20forge%7Cpmt%7Ce%7Cpdv%7Cc%7Cslid%7C%7Cpgrid%7C136462699666%7Cptaid%7Ckwd-349085082457%7Cpid%7C&utm_medium=cpc&utm_source=google&utm_campaign=GGL_Cross_Forge_AMER_CA_Visits_SEM_BR_New_EX_ADSK_3455132_&utm_term=autodesk%20forge&utm_content=sNRzCTm4G%7Cpcrid%7C598884900698%7Cpkw%7Cautodesk%20forge%7Cpmt%7Ce%7Cpdv%7Cc%7Cslid%7C%7Cpgrid%7C136462699666%7Cptaid%7Ckwd-349085082457%7C&gclid=Cj0KCQjwy5maBhDdARIsAMxrkw0yL2WtAIpS_U3Mwp-qbiXuv-bZJLlVJunSe2E6294bqXaxw7fO8csaAtkYEALw_wcB&ef_id=YoUzQwAAAFzLiwN2:20221012142040:s), you have to create an application for your production.
2. Select the Create application, choose the name for your application and then click create.
3. Now you can see a new page that includes Client Credentials and General Settings. You need client ID and Client secret in the section configuration azure.
4. in the section general settings, in the callback URL you have to write
<YOUR_APP_URL>/oauth/callback (<YOUR_APP_URL> created in the section create URL in IONOS).

### Create App Service in Azure
>Please just follow the steps.

1. In the App Services section in Azure, select Create.
2. In the Basics section, select ccps-rg for the Resource group.
3. In the Name section, choose a name for the web app name.
4. In the Runtime stack section, select Node 14 LTS.
5. In the Region section, select Canada east. **Do not change anything and click Review + create.**
6. go to the configuration section. **For this part, please read the configuration in the Azure document**

### Create Storage Account in Azure
>Please just follow the steps.
1. In the [Storage Account section](https://portal.azure.com/?Microsoft_Azure_Education_correlationId=c0ba2f6c-77f6-4c42-bc21-de416980632e#view/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts), select `Create`.
2. In the Resource group section, select `ccps-rg`.
3. In the Storage account name, choose a name (e.g, gridddigitaltwinv2)
4. In the Region section, select `Canada east`.
5. In the Redundancy section, choose `Locally-redundant storage(LRS)`.

**Do not change anything and click Review + create.**







## Environments Variables
> Please follow the instruction on [Environment Template](./server/env_template.md) to setup the your production and development environment.
