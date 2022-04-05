import { clientPromise } from "../db.js"
import { Village } from "../models/village.js"


const client = await clientPromise
const db = client.db("naruto_api")
const col = db.collection("village")


export const createVillage = async (req, res) => {
    const { name, nameMeaning, picture, hokages, country } = req.body
    try {
        const village = new Village(name, nameMeaning, picture, country, hokages)
        await col.insertOne(village)
        res.json(village)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

export const readOneVillage = async (req, res) => {
    const { name } = req.params
    try {
        const village = await col.findOne({ name })
        if (village) {
            res.json(village)
        } else {
            res.status(404).json("not found")
        }
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

export const readAllVillage = async (req, res) => {
    try {
        const { query } = req
        const data = await col.find(query).toArray()
        res.json(data)
    } catch (err) {
        console.log(err)
        res.json(err)
    }
}

export const updateOneVillage = async (req, res) => {
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

export const deleteOneVillage = async (req, res) => {
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