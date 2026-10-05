import  pg  from  'pg'


const parsed  = new  URL(process.env.DATABASE_URL!)
parsed.searchParams.set("sslmode", 'verify-full')

export  const  pool = new  pg.Pool({connectionString:parsed.toString()})

export async function  pingLakebase(): Promise<boolean>{
    const result = await  pool.query("SELECT 1 as  ok")
    return  result.rows[0]?.ok  === 1;
}