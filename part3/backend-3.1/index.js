const express = require('express');
const bodyParser = require('body-parser')
const morgan = require('morgan')

const server = express();

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: "unknown endpoint" })
}

morgan.token("type", (req, res) => JSON.stringify(req.body))

server.use(bodyParser.json(), morgan(':method :type :url :status :res[content-length] - :response-time ms :type'))

let contacts = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

server.get('/api/contacts', (req, res) => {
  const count = contacts.length;
  res.end(`<h1>Phonebook has ${count}</h1> <p>${new Date()}</p>`)
})

server.get('/api/contacts/:id', (req, res) => {
  const id = req.params['id']
  const contact = contacts.find(item => item.id === id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404)
    res.end()
  }

})

server.post('/api/contacts', (req, res) => {
  let id = Math.floor(Math.random() * 1000)
  let name = '';
  let number = '';

  if (req.body) {
    if (req.body?.name) {
      name = req.body.name;
    } else {
      console.log("logging error")
      return res.status(400).end("Missing name field")
    }

    if (req.body?.number) {
      number = req.body.number;
    } else {
      console.log("logging error")
      return res.status(400).end("Missing number field")
    }

    const duplicateName = contacts.find(item => name === item.name);

    if (duplicateName) {
      return res.status(400).end("Name must be unique")
    }

  }

  const contact = {
    id: id.toString(),
    name: req.body.name,
    number: req.body.number
  }

  contacts = contacts.concat(contact);
  res.json(contact)
  res.status(201)
  res.end()
})

server.delete('/api/contacts/:id', (req, res) => {
  const id = req.params['id']
  contacts = contacts.filter(item => item.id !== id);
  res.json(contacts);
  res.status(201)
})

server.use(unknownEndpoint)

server.listen(3002, () => {
  console.log("batman")
});
