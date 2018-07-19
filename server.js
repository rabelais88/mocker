const express = require('express')
const fs = require('fs')
const app = express()
const http = require('http').Server(app)

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const randtoken = require('rand-token')
const suid = randtoken.suid
const settings = require('./settings.json')
let mockdata = require('./mockdata.js')

mockdata.gamelist = mockdata.gamelist.map(el=>{return {...el, id:suid(16)}})
mockdata.countrieslist = mockdata.countrieslist.map(el=>{return {...el, id:suid(16)}})

http.listen(settings.port, function () {
  console.log(`mock server is up at ${this.address().port}\nmode:${process.env.NODE_ENV}`)

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

app.get('/countries',(req,res) => {
  res.set(CORSheader)
  res.send(mockdata.countrieslist)
})