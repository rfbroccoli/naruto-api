import express, { json } from "express"
import { aboutPage, detailsPage, homePage } from "./controllers/shinobi.js"
import shinobiRouter from "./routes/shinobi.js"

const app = express()
const { PORT } = process.env

app.set('view engine', 'ejs')

app.get('/', homePage);

// about page
app.get('/about', aboutPage);

app.get("/shinobi/:slug", detailsPage)

app.use(json())
app.use("/api/v1/shinobi", shinobiRouter)



app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})

