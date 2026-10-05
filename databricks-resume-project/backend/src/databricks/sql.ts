import { DBSQLClient } from "@databricks/sql";
import { env } from "../config.js";

let client: DBSQLClient | null = null;
let session: Awaited<ReturnType<DBSQLClient["openSession"]>> | null = null;

async function getSession() {
  if (!client) {
    client = new DBSQLClient();
    console.log(env.DATABRICKS_SERVER_HOSTNAME,env.DATABRICKS_HTTP_PATH,env.DATABRICKS_TOKEN)
      await client.connect({
      host: env.DATABRICKS_SERVER_HOSTNAME,
      path: env.DATABRICKS_HTTP_PATH,
      token: env.DATABRICKS_TOKEN,
    });

    
  }

  if (!session) {
    console.log('Session inside...')
    session = await client.openSession();
  }

  console.log('Session inside function...')

  return session;
}

export async function queryDatabricks<T extends Record<string, unknown>>(
  sql: string,
): Promise<T[]> {

   console.log("Seession Starts") 
  const extractSession = await getSession();
 console.log("Seession Ends")
 console.log("Execute  Statement...")
  const sqlOperationResult = await extractSession.executeStatement(sql, {
    runAsync: true,
  });
  console.log("End   Statement")
  console.log(" Starts sqlOperationalResul....")
  const rowsResult = (await sqlOperationResult.fetchAll()) as T[];
 console.log("Ends sqlOperationalResul....")
  await sqlOperationResult.close();
  return rowsResult;
}

export async function pingDatabricks(): Promise<boolean> {
  const rows = await queryDatabricks<{ ok: number }>("SELECT 1 AS ok");
  return rows[0]?.ok === 1;
}
