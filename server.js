'use strict'
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const helpers = require('./server-helpers')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000)

app.locals.title = 'Grudge-bin Server'
app.locals.grudges = [{id: 1, name: 'Andrew Crist', offense: 'chowder', forgiven: false, date: '1974-31-01'}, {id: 2, name: 'Ricky Martin', offense: 'la vida loca', forgiven: false, date: '1999-09-09'}, {id: 3, name: 'Matt Kaufman', offense: 'sphongle', forgiven: true, date: '2012-08-31'}]

app.use(express.static(path.join(__dirname, '/src')))

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/src/index.html')
})

app.get('/api/grudges', (req, res) => {
  res.status(200).json(app.locals.grudges)
})

app.post('/api/grudges', (req, res) => {
  req.body.forgiven = JSON.parse(req.body.forgiven)
  req.body.id = JSON.parse(req.body.id)
  app.locals.grudges.push(req.body)
  res.status(200).json(app.locals.grudges)
})

app.get('/api/grudge/:id', (req, res) => {
  const id = req.params.id
  let scumbag = helpers.findGrudge(id, app.locals.grudges)
  res.status(200).json(scumbag[0])
})

app.patch('/api/grudge/:id', (req, res) => {
  const { id } = req.params
  app.locals.grudges = helpers.changeForgivenStatus(id, app.locals.grudges)
  let changedGrudge = helpers.findGrudge(id, app.locals.grudges)
  res.status(200).json(changedGrudge)
})

var server = app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is runnning on ${app.get('port')}`)
})

module.exports = server
