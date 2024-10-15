import {CosmosClient} from "@azure/cosmos"
import dotenv from "dotenv"

dotenv.config({
    path: "src/.env"
})

const client  = new CosmosClient({
    endpoint: process.env.COSDB_ENDPOINT || "",
    key: process.env.COSDB_KEY || "",
})

const todoDb = client.database("todoDb")
const todoContainer = todoDb.container("todoContainer")


export {todoContainer}
