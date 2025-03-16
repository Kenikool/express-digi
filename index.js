import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let teaData = [];
let nextId = 1;

// add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// get all teas
app.get("/teas", (req, res) => {
  res.send(teaData);
});

// get a tea by id
app.get("/teas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tea = teaData.find((t) => t.id === id);
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.send(tea);
});

// update a tea by id
app.put("/teas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;
  const tea = teaData.find((t) => t.id === id);
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  tea.name = name;
  tea.price = price;
  res.send(tea);
});

// delete a tea by id
app.delete("/teas/:id", (req, res) => {
  console.log("delete");
  console.log(req.params.id);

  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Tea not found");
  }
  teaData.splice(index, 1);
  return res.status(204).send();
  /*  const id = parseInt(req.params.id);
  const tea = teaData.find((t) => t.id === id);
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  teaData = teaData.filter((t) => t.id !== id);
  res.send(tea); */
});

app.listen(PORT, () => {
  console.log(`server is listening at: http://localhost:${PORT}...`);
});
