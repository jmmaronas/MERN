import express from "express";
import postRoutes from "./routes/posts.routes.js"
import fileUpload from "express-fileupload"
import { dirname, join } from "path"
import { fileURLToPath } from "url";


const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

//Midleware
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload"
}))

//Routes
app.use(postRoutes)

app.use(express.static(join(__dirname, "../client/build")))

export default app