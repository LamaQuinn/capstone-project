const express=require('express')
// var Rollbar = require('rollbar')
// var rollbar = new Rollbar({
//   accessToken: 'ac2a65f5cb904005b01a0b49bbedc067',
//   captureUncaught: true,
//   captureUnhandledRejections: true,
// })
const cors=require('cors')
const db=require('./database')
const app = express()
const path=require('path')
const seed = require('./seed')
const {addSpendings,getSpendings,deleteSpendings,updateSpendings}=require('./controllers/spendings')



app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname,'../public')))

app.get('/',(req,res)=> {
  res.sendFile(path.resolve(__dirname,'../public/index.html'))
})
app.get('/plan',(req,res)=> {
    res.sendFile(path.resolve(__dirname,'../public/planBudget.html'))
  })
  app.get('/previous',(req,res)=> {
    res.sendFile(path.resolve(__dirname,'../public/previousBudgetList.html'))
  })
app.post('/api/seed',seed)
app.post('/api/addSpendings',addSpendings)
app.get('/api/getSpendings',getSpendings)
app.delete('/api/deleteSpendings/:id',deleteSpendings)
app.put('/api/updateSpendings/:id',updateSpendings)
db.sync()

app.listen(4000, ()=>console.log("Running on port 4000"))