require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Contact = require("./models/contact");
const server = express();
const port = process.env.PORT || process.env.DEV_PORT;

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

morgan.token("type", (req, res) => JSON.stringify(req.body));

server.use(
  cors({ origin: "*", optionsSuccessStatus: 200 }),
  express.static("dist"),
  express.json(),
  morgan(
    ":method :type :url :status :res[content-length] - :response-time ms :type",
  ),
);

server.get("/api/contacts", (req, res, next) => {
  Contact.find({})
    .then((response) => {
      res.json(response);
      console.log("resonse", response);
    })
    .catch((e) => next(e));
});

server.get("/api/contacts/:id", (req, res, next) => {
  Contact.findById(req.params["id"])
    .then((r) => res.json(r))
    .catch((e) => {
      next(e);
    });
});

server.post("/api/contacts", (req, res, next) => {
  let name = "";
  let number = "";

  if (req.body) {
    if (req.body?.name) {
      name = req.body.name;
    } else {
      console.log("logging error");
      return res.status(400).end("Missing name field");
    }

    if (req.body?.number) {
      number = req.body.number;
    } else {
      console.log("logging error");
      return res.status(400).end("Missing number field");
    }
  }

  const contact = new Contact({
    name: req.body.name,
    number: req.body.number,
  });

  contact
    .save()
    .then((r) => {
      res.json(r).status(201).end();
    })
    .catch((e) => next(e));
});

server.delete("/api/contacts/:id", (req, res, next) => {
  Contact.findOneAndDelete({ _id: req.params["id"] })
    .then(() => res.status(202).end())
    .catch((e) => {
      next(e);
    });
});

const handleErrors = (error, req, res, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

server.use(handleErrors);
server.use(unknownEndpoint);

server.listen(port, () => {
  console.log(`batman on port ${port}`);
});
