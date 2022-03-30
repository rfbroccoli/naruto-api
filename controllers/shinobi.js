import { clientPromise } from "../db.js"
import { Shinobi } from "../models/shinobi.js"

const client = await clientPromise
const db = client.db("naruto_api")
const col = db.collection("shinobi")

export const homePage = async (req, res) => {
    const data = await col.find({}).toArray()
    res.render('pages/index', {
        shinobi: data
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

export const createShinobi = async (req, res) => {
    const { name, team, picture } = req.body
    try {
        const shinobi = new Shinobi(name, team, picture)
        await col.insertOne(shinobi)
        res.json(shinobi)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

export const readOneShinobi = async (req, res) => {
    const { name } = req.params
    try {
        const shinobi = await col.findOne({ name })
        if (shinobi) {
            res.json(shinobi)
        } else {
            res.status(404).json("not found")
        }
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

export const readAllShinobi = async (req, res) => {
    try {
        const { query } = req
        const data = await col.find(query).toArray()
        res.json(data)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

export const updateOneShinobi = async (req, res) => {
    const { name } = req.params
    try {
        const data = await col.updateOne({ name }, { $set: { ...req.body } })
        if (data) {
            res.json(data)
        } else {
            res.status(404).json("not found")
        }
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

export const deleteOneShinobi = async (req, res) => {
    const { name } = req.params
    try {
        const data = await col.deleteOne({ name })
        if (data) {
            res.json(data)
        } else {
            res.status(404).json("not found")
        }
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}