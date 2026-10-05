import { Router } from "express";
import { pingDatabricks } from "../databricks/sql.js";
import { pingLakebase } from "../db/lakebase.js";

export const  healthRouter = Router()

healthRouter.get("/health", async(_req,res)=>{
   // const databricks = await pingDatabricks().catch(()=>false)
    const [databricksConnected,  lakebaseConnected]  = await  Promise.all([
        pingDatabricks().catch(()=>false),
        pingLakebase().catch(()=>false)
    ])
    res.json({
        ok:  databricksConnected &&  lakebaseConnected,
        services: { databricks: databricksConnected, lakebase: lakebaseConnected} 
    //    ok:databricks,
     //   services:{databricks}
    })
})