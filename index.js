const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("dotenv").config();
const Person = require("./models/person");

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req-body"
  )
);

morgan.token("req-body", (req) => {
  return JSON.stringify(req.body);
});

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

// app.get("/api/persons/:id", (req, res) => {
//   const id = req.params.id;
//   const person = persons.find((person) => person.id === id);
//   if (person) {
//     res.json(person);
//   } else {
//     res.status(404).end();
//   }
// });

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
  );
});

// app.delete("/api/persons/:id", (req, res) => {
//   const id = req.params.id;
//   persons = persons.filter((person) => person.id !== id);
//   res.status(204).end();
// });
app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => {
      console.log(error);
    });
});

// app.post("/api/persons", (req, res) => {
//   const body = req.body;
//   if (!body.name || !body.number) {
//     return res.status(400).json({
//       error: "name or number is missing",
//     });
//   }
//   if (persons.find((person) => person.name === body.name)) {
//     return res.status(400).json({
//       error: "name must be unique",
//     });
//   }
//   const person = {
//     id: (Math.floor(Math.random() * 1000)).toString(),
//     name: body.name,
//     number: body.number,
//   };
//   persons = persons.concat(person);
//   res.json(person);
// });

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (body.content === undefined) {
    return res.status(400).json({ error: "content missing" });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
