import {config as loadEnv}  from  'dotenv'
import path  from 'node:path'
import   {fileURLToPath  } from 'node:url'
import {z}  from 'zod'

// 1. LOCATE THE ROOT BACKEND DIRECTORY
const  backendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// 2. LOAD THE .ENV FILE INTO process.env
loadEnv({path: path.join(backendDir, ".env")})

// 3. DEFINE A SCHEMA FOR VALIDATION
const envSchema= z.object({
    PORT:  z.coerce.number().default(4000),
    DATABRICKS_HOST:z.url(),
    DATABRICKS_TOKEN:z.string().min(1),
    DATABRICKS_SERVER_HOSTNAME:z.string().min(1),
    DATABRICKS_HTTP_PATH:z.string().min(1),
    DATABRICKS_CATALOG:z.string().default("signalforge")
})

// 4. PARSE & EXPORT FOR SAFE ACCESS
export const  env  = envSchema.parse(process.env);
export const CATALOG =  env.DATABRICKS_CATALOG;