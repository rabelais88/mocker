const express = require('express')
const fs = require('fs')
const app = express()
const http = require('http').Server(app)
const moment = require('moment')
const all_routes = require('express-list-endpoints')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const randtoken = require('rand-token')
const suid = randtoken.suid
const settings = require('./settings.json')
let mockdata = require('./mockdata.js')

mockdata.gamelist = mockdata.gamelist.map(el=>{return {...el, id:suid(16)}})
mockdata.countrieslist = mockdata.countrieslist.map(el=>{return {...el, id:suid(16)}})

function hr(...argv){
  if(argv.length > 0){
    console.log(argv[0].repeat(60))
  } else {
  console.log('-'.repeat(60))
  }
}

http.listen(settings.port, function () {
  hr()
  console.log(`${moment()}\nmock server is up at ${this.address().port}\nmode:${process.env.NODE_ENV}`)
})

const CORSheader = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': ['*'],
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
}

app.get('/games',(req,res) => {
  res.set(CORSheader)
  res.send(mockdata.gamelist)
})

app.get('/games/:id', (req,res) => {
  res.set(CORSheader)
  res.send(Object.values(mockdata.gamelist).find(el => el.id === req.params.id))
})

app.get('/countries',(req,res) => {
  res.set(CORSheader)
  res.send(mockdata.countrieslist)
})
console.log ('R E S E T')
hr('*')
const routes = all_routes(app)
routes.forEach(el=>console.log(`${el.methods} --- ${el.path}`))