import { clientPromise } from "../db.js"
import { Shinobi } from "../models/shinobi.js"


const client = await clientPromise
const db = client.db("naruto_api")
const col = db.collection("shinobi")


export const createShinobi = async (req, res) => {
    const { name, team, picture, village } = req.body
    try {
        const shinobi = new Shinobi(name, team, picture, village)
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
        const shinobi = await col.aggregate([
            {
                $match: {
                    name 
                }
            },
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
        // const data = await col.find(query).toArray()
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