const express=require('express')
const cors=require('cors')
const db=require('./database')
const app = express()
const seed = require('./seed')
const {addSpendings,getSpendings}=require('./controllers/spendings')


app.use(express.json())
app.use(cors())


app.post('/api/seed',seed)
app.post('/api/addSpendings',addSpendings)
app.get('/api/getSpendings',getSpendings)
db.sync()

app.listen(4000, ()=>console.log("Running on port 4000"))