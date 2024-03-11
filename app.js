const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  const result = 2 + 2;
  res.send(`The result of 2 + 2 is ${result}`);
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
