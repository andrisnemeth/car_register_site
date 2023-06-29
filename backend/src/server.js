const PORT = process.env.PORT || 8000;
const db = require("./db");
const app = require("./app");

app.get("/api", (req, res) => {
  res.json();
});

app.listen(PORT, async () => {
  console.log(`Server started listening on PORT ${PORT}`);

  await db.sync({ alter: true });
  console.log("DB has been initialized");
});
