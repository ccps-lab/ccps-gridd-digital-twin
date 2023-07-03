$env:FORGE_CLIENT_ID="SCqwrJCQgJbRyxTIAEtcAyMeEtF1UGJU"
$env:FORGE_CLIENT_SECRET="PxBp3vCQZGQjp8Bx"

$env:FORGE_ENV="AutodeskProduction"
$env:FORGE_API_URL="https://developer.api.autodesk.com"
$env:FORGE_CALLBACK_URL="http://localhost:9000/oauth/callback"


$env:ENV="local"

## Please uncomment the following part if you want to connect to Azure IoTHub and Time Series Insights
## Connect to Azure IoTHub and Time Series Insights
$env:ADAPTER_TYPE="azure"
$env:AZURE_IOT_HUB_CONNECTION_STRING="HostName=iot-hub-gridd-ccps-00.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=S0C1cMKlwHZlBGkgPfaYEO4m+t5+n+8YBfz57laZGNw="
$env:AZURE_TSI_ENV="https://1de59eb2-c417-4484-801f-c6539152e4f9.env.timeseries.azure.com/timeseries/query?api-version=2020-07-31&storeType=WarmStore"

## Azure Service Principle

$env:AZURE_CLIENT_ID="35aeef28-dd68-46ea-8c82-d686102627cc"
$env:AZURE_APPLICATION_SECRET="Sfr8Q~w1szF2Nm14tOP68do2KngR0kLYGENcYcdK"
$env:AZURE_TENANT_ID="67a1ad5c-46c0-4d93-9ec0-028c648ca7f1"
$env:AZURE_SUBSCRIPTION_ID="239f7d61-9eb4-4df5-a795-6ccb08322d7c"
#
## Path to Device Model configuration File
# DEVICE_MODEL_JSON="${__dirname}/../gateways/azure/device-models.json"
## End - Connect to Azure IoTHub and Time Series Insights

##GRIDD URN
$env:FORGE_DOC_URN="urn:dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLlJRZ3ZTOEd0VHo2LVR5R0hDc3JBNGc_dmVyc2lvbj00"

## please run this command "Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
##. .\setenv-gridd.ps1"
