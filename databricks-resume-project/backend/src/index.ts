import express from  'express'
import cors from 'cors'
import  {env}  from './config.js'
import { healthRouter } from './routes/health.js'
import { productsRouter } from './routes/products.js'

const  app =  express()
app.use(cors())
app.use(express.json())

app.use("/api",healthRouter);
app.use("/api" ,productsRouter);

app.listen(env.PORT, ()=>{
    console.log(`SignalForge API is running  on PORT ${env.PORT}`)
})