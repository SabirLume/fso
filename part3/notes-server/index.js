const express = require('express');
const cors = require('cors')
const server = express();
const PORT = process.env.PORT || 3005;
const origin = 'http://localhost:5173'
const corsOptions = {
  origin: origin,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

server.use(express.json(), cors(corsOptions))

let notes = [
  {
    id: "1",
    content: "HTML EX",
    important: true
  },
  {
    id: "2",
    content: "Browser executes JS",
    important: false
  },
  {
    id: "3",
    content: "GET / POST are important methods",
    important: true
  }
]

server.get('/api/notes', (req, res) => {
  res.json(notes)
})

server.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

server.post('/api/notes', (req, res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({
      error: 'content missing'
    });
  }

  const id = notes.length > 0 ? Math.max(...notes.map(note => Number(note.id))) : 0;

  const note = {
    id: id + 1,
    content: body.content,
    importance: Boolean(body.importance) || false
  }

  notes = notes.concat(note);

  res.json(note)
})


server.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const note = notes.find(note => note.id === id);

  if (note) {
    res.send(note)
  } else {
    res.status(400).send()
  }
})

server.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  notes = notes.filter(item => {
    if (item.id != id) {
      return item
    }
  })

  res.status(204).end()
})


server.listen(PORT)
console.log(`server running on port ${PORT}`)
