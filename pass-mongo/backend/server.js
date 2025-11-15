import express from 'express'
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import bodyparser from 'body-parser';
import cors from "cors";


dotenv.config()

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'Password-mgmt';
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())

client.connect()

// get all passwords
app.get('/', async(req, res) => {
  const db=client.db(dbName)
  const collection = db.collection('documents')
  const findResult= await collection.find({}).toArray();
  res.json(findResult)
})
//Save
app.post('/', async(req, res) => {
  const password = req.body
  const db=client.db(dbName)
  const collection = db.collection('Passwords')
  const findResult= await collection.insertOne(password);
  res.send({success: true, result: findResult})
})
//Delete
app.delete('/', async(req, res) => {
  const password = req.body
  const db=client.db(dbName)
  const collection = db.collection('Passwords')
  const findResult= await collection.deleteOne(password);
  res.send({success: true, result: findResult})
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})