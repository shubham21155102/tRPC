import express from "express" 
import cors from "cors"
import {initTRPC} from "@trpc/server"
import {createExpressMiddleware} from "@trpc/server/adapters/express"
const app=express();
const t=initTRPC.create();
const appRouter=t.router({
    sayHi:t.procedure.query(()=>{
        return "Hello from TRPC!"
    }),
    logToServer:t.procedure.input(v=>{
        if(typeof v==="string"){
            return v;
        }
        throw new Error("Invalid input")
    }).mutation((req)=>{
        console.log(`Message from client: ${req.input}`)
        return true;
    })
})
app.use(cors({origin:"*"}))
app.use("/trpc",createExpressMiddleware({router:appRouter}))  
app.listen(3000,()=>{
    console.log("Server started on port 3000")
})