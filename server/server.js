const express=require('express')
const cors=require('cors')
const db=require('./database')
const app = express()
const seed = require('./seed')


app.use(express.json())
app.use(cors())


app.post('/api/seed',seed)
db.sync()

app.listen(6000, ()=>console.log("Running on port 6000"))