import express, { json } from "express"
import { aboutPage, detailsPage, homePage } from "./controllers/page.js"
import shinobiRouter from "./routes/shinobi.js"
import villageRouter from "./routes/village.js"

const app = express()
const { PORT } = process.env

app.set('view engine', 'ejs')

app.get('/', homePage);

// about page
app.get('/about', aboutPage);

app.get("/shinobi/:slug", detailsPage)

app.use(json())
const apiRoute = "/api/v1"
app.use(`${apiRoute}/shinobi`, shinobiRouter)
app.use(`${apiRoute}/village`, villageRouter)



app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})

