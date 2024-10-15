import * as appInsights from "applicationinsights";
import dotenv from "dotenv"

dotenv.config({
    path:"src/.env"
})


appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING).start();
const client = appInsights.defaultClient;
export {client}
