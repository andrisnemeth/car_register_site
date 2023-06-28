const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const db = require("./db");

app.use(cors());

const users = [
  {
    id: 1,
    email: "n.andris939@hotmail.com",
    teljesNev: "Németh András",
    felhasználónév: "Andris",
    státusz: "Aktív",
  },
  {
    id: 2,
    email: "lovassyr@gmail.com",
    teljesNev: "Lovassy Réka",
    felhasználónév: "Réka",
    státusz: "Aktív",
  },
  {
    id: 3,
    email: "hugocica@hotmail.com",
    teljesNev: "Lovassy Hugo",
    felhasználónév: "Hugo",
    státusz: "Aktív",
  },
  {
    id: 4,
    email: "frigyescica@gmail.com",
    teljesNev: "Lovassy Frigyes",
    felhasználónév: "Frigyes",
    státusz: "Aktív",
  },
];

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo"] });
});

app.get("/getWords", (req, res) => {
  res.status(200).send("finike");
});

app.get("/getUsers", (req, res) => {
  res.send(users);
});

app.listen(PORT, async () => {
  console.log(`Server started listening on PORT ${PORT}`);

  await db.sync({ alter: true });
  console.log('DB has been initialized');
});
