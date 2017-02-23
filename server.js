const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000)

app.locals.title = 'Grudge-bin Server'
app.locals.grudges = [{id: 1, name: 'Andrew Crist', offense: 'chowder', forgiven: false, date: '1974-31-01'}]

app.use(express.static(path.join(__dirname, '/src')))

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/public/index.html')
})

app.get('/grudges', (req, res) => {
  res.status(200).json(app.locals.grudges)
})



app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is runnning on ${app.get('port')}`)
})
