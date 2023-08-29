const express=require('express')
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'ac2a65f5cb904005b01a0b49bbedc067',
  captureUncaught: true,
  captureUnhandledRejections: true,
})
const cors=require('cors')
const db=require('./database')
const app = express()
const seed = require('./seed')
const {addSpendings,getSpendings,deleteSpendings,updateSpendings}=require('./controllers/spendings')



app.use(express.json())
app.use(cors())


app.post('/api/seed',seed)
app.post('/api/addSpendings',addSpendings)
app.get('/api/getSpendings',getSpendings)
app.delete('/api/deleteSpendings/:id',deleteSpendings)
app.put('/api/updateSpendings/:id',updateSpendings)
db.sync()

app.listen(4000, ()=>console.log("Running on port 4000"))