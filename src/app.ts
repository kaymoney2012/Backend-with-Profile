import express from "express"
import newUserRouter from "./routes/newUserRoutes.js";
import cors from "cors"




const app = express ();

app.use(express.json()).use(cors())

app.use("/new-user", newUserRouter)

export default app;