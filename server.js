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
const faker = require('faker')

// mockdata.gamelist = mockdata.gamelist.map(el=>{return {...el, id:suid(16)}})
mockdata.countrieslist = mockdata.countrieslist.map(el=>{return {...el, id:suid(16)}})

const lib = require('./library.js')
const {hr, CORSheader, rand, aryPick} = lib

const mockTeams = new Array(settings.maxTeam).fill(0).map(el=>{
  const gameIdx = rand(mockdata.gamelist.length)
  return {
    name: faker.random.word(),
    gameId: mockdata.gamelist[gameIdx].id,
    game: mockdata.gamelist[gameIdx],
    introduction: faker.hacker.phrase(),
    createdAt: faker.date.past(),
    type: aryPick(['NORMAL','PRO']),
    id: suid(16)
  }
})
const myMockTeams = new Array(settings.maxTeam).fill(0).map(el=>{
  const gameIdx = rand(mockdata.gamelist.length)
  return {
    role:aryPick(['CAPTAIN', 'MEMBER']),
    joinedAt: faker.date.recent(),
    teamId: suid(16),
    team: aryPick(mockTeams),
    gameId: mockdata.gamelist[gameIdx].id,
    game: mockdata.gamelist[gameIdx]
  }
})

http.listen(settings.port, function () {
  hr()
  console.log(`${moment()}\nmock server is up at ${this.address().port}\nmode:${process.env.NODE_ENV}`)
})

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

app.get('/teams', (req,res) => {
  res.set(CORSheader)
  // if ilter is designated, it tries to find matching teams from the filter
  if (req.params.filter) {
    res.send([mockTeams.find(el=>el.id === filter.where.id)])
  } else {
    // send an unfiltered list of teams
    res.send(mockTeams)
  }
})

app.get('/users/me/teams', (req, res) => {
  res.set(CORSheader)
  res.send(myMockTeams)
})

app.get('/teams/:id')

console.log ('R E S E T')
hr('*')
const routes = all_routes(app)
routes.forEach(el=>console.log(`${el.methods} --- ${el.path}`))

