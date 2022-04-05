import { clientPromise } from "../db.js"

const { BASE_URL } = process.env
const client = await clientPromise
const db = client.db("naruto_api")
const col = db.collection("shinobi")

export const homePage = async (req, res) => {
    const data = await col.aggregate([
        {
            $lookup:
            {
                from: 'village',
                localField: 'village',
                foreignField: 'name',
                as: 'village'
            },
        },
        // { $unwind: "$village" },
    ]).toArray()
    const url = `${BASE_URL}/api/v1/shinobi`
    res.render('pages/index', {
        shinobi: data,
        url
    });
}

export const detailsPage = async (req, res) => {
    const { slug } = req.params
    const data = await col.findOne({ slug })
    res.render('pages/details', {
        shinobi: data
    });
}

export const aboutPage = async (req, res) => {
    res.render('pages/about')
}