import express from "express"
import { myRouter } from "./routes/routes.js"
import cors from "cors"



const app = express()

app.use(express.json())
app.use(cors())


app.use("/api/business", myRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})