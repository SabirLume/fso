require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Note = require("./models/note");

const server = express();
const PORT = process.env.PORT || process.env.DEV_PORT;
const origin = "*";

const corsOptions = {
  origin: origin,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

server.use(express.json(), cors(corsOptions), express.static("dist"));

server.get("/api/notes", (req, res, next) => {
  Note.find({}).then((r) => res.json(r));
});

server.post("/api/notes", (req, res, next) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  });
  note
    .save()
    .then((r) => res.json(r))
    .catch((e) => next(e));
});

server.put("/api/notes/:id", (req, res, next) => {
  const id = req.params.id;
  const { content, important } = req.body;
  if (!id) {
    res.status(400).end();
  }

  const newNote = {
    content,
    important,
  };

  Note.findByIdAndUpdate(id, newNote, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((e) => next(e));
});

server.get("/api/notes/:id", (req, res, next) => {
  const id = req.params.id;

  Note.findById(id)
    .then((note) => {
      if (note) {
        res.send(note);
      }
      res.status(404).end();
    })
    .catch((e) => {
      next(e);
      console.error("error finding the note", e);
      res.status(400).send({ error: "malformated id" });
    });
});

server.delete("/api/notes/:id", (req, res, next) => {
  const id = req.params.id;
  Note.findByIdAndDelete(id)
    .then(() => {
      res.status(204).send();
    })
    .catch((e) => next(e));
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(404).send({ error: "malformed id" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};

server.use(errorHandler);

server.listen(PORT);
console.log(`server running on port ${PORT}`);
